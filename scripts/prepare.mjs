// scripts/collectMetadata.mjs
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import fg from "fast-glob";
import chroma from "chroma-js";
import { getColorSet, TITLE_COLOR_MAP } from "./lib/image-metadata.mjs";
import "dotenv/config";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const ROOT_DIR = "./_docs"; // change to your folder
const OUTPUT_FILE = "./metadata.json";

collectMetadata();

function toUnixPath(p) {
  return p.split(path.sep).join("/");
}

async function collectMetadata() {
  const files = await fg("**/*.md", { cwd: ROOT_DIR, absolute: true });

  // load existing metadata.json if present
  let oldData = {};
  try {
    const raw = await fs.readFile(OUTPUT_FILE, "utf-8");
    const arr = JSON.parse(raw);
    oldData = Object.fromEntries(arr.map((item) => [item.file, item]));
  } catch {
    console.log("ℹ️ No existing metadata.json found, starting fresh.");
  }

  // start from old data to keep JSON stable and minimize diffs
  const results = Object.values(oldData);
  const indexByFile = Object.fromEntries(results.map((item, idx) => [item.file, idx]));

  for (const file of files) {
    try {
      const raw = await fs.readFile(file, "utf-8");
      const { data } = matter(raw);
      let relPath = path.relative(ROOT_DIR, file);
      relPath = toUnixPath(relPath)
        .replace(/\.md$/, "")
        .toLowerCase()
        .replace(/[^\w\/-]+/g, "") // replace punctuation (except / and -) with -
        .replace(/\/+/g, "/") // collapse multiple slashes
        .replace(/^-+/, "") // remove leading -
        .replace(/-+$/, ""); // remove trailing -

      const old = oldData[relPath];
      const locationPart = await processLocation(data, old);
      const coverPart = await processCover(data, old, file, relPath);

      let didChange = false;
      if (locationPart || coverPart || !old) {
        const merged = old ? { ...old } : { file: relPath };
        if (locationPart) {
          merged.city = locationPart.city;
          merged.locations = locationPart.locations;
        }
        if (coverPart) {
          merged.cover = coverPart.cover;
          merged.colorSet = coverPart.colorSet;
        }

        const idx = indexByFile[relPath];
        if (typeof idx === "number") {
          // Only replace when there is an actual change
          const before = JSON.stringify(results[idx]);
          const after = JSON.stringify(merged);
          if (before !== after) {
            results[idx] = merged;
            didChange = true;
          }
        } else {
          indexByFile[relPath] = results.length;
          results.push(merged);
          didChange = true;
        }
      }

      if (didChange) {
        console.log(`✅ Processed: ${relPath}`);
      }
    } catch (err) {
      console.error(`❌ Error parsing ${file}:`, err.message);
    }
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\n📦 Metadata updated in ${OUTPUT_FILE}`);
}

// ---- helpers ----

// ---- processors ----
async function processLocation(data, old) {
  if (!data?.city) return undefined;
  const cityList = Array.isArray(data.city) ? data.city : [data.city];

  if (!GOOGLE_API_KEY) {
    console.error("❌ GOOGLE_API_KEY is missing, skipping geocoding and keeping empty/previous locations.");
    return { city: cityList, locations: old?.locations ?? [] };
  }

  if (old && old.city && JSON.stringify(old.city) === JSON.stringify(cityList)) {
    return { city: old.city, locations: old.locations };
  }

  const locations = [];
  for (let i = 0; i < cityList.length; i++) {
    try {
      const city = cityList[i];
      const searchData = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${GOOGLE_API_KEY}`
      );
      const searchDataJson = await searchData.json();
      const location = searchDataJson.results?.[0]?.geometry?.location;
      if (location) {
        locations.push({ latitude: location.lat, longitude: location.lng });
      } else {
        console.error(`❌ Failed to fetch location for city: ${city}`);
      }
    } catch (err) {
      const city = cityList[i];
      console.error(`❌ Error fetching location for city: ${city}`, err.message);
    }
  }

  return { city: cityList, locations };
}

async function processCover(data, old, file, relPath) {
  if (!data?.cover?.url) return undefined;

  if (old && old.cover?.url === data.cover.url) {
    return undefined;
  }

  const colorSet = await getColorSet(data.cover.url, {
    baseDir: path.dirname(file),
    relPath,
    saveTraceToDir: path.join(process.cwd(), "cover"),
  });
  return {
    cover: data.cover,
    colorSet,
  };
}
