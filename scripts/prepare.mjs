// scripts/collectMetadata.mjs
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import fg from "fast-glob";
import sharp from "sharp";
import { Vibrant } from "node-vibrant/node";
import chroma from "chroma-js";
import potrace from "potrace";
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
      console.log(didChange ? `✅ Processed: ${relPath}` : `⏭️ Skipped: ${relPath}`);
    } catch (err) {
      console.error(`❌ Error parsing ${file}:`, err.message);
    }
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\n📦 Metadata updated in ${OUTPUT_FILE}`);
}

// ---- helpers ----
function isRemote(u) {
  return /^https?:\/\//i.test(u);
}

function stripQuery(u) {
  return u.replace(/[?#].*$/, "");
}

async function getColorSet(imagePathOrUrl, mdDirAbs, relPath) {
  let buffer;

  if (isRemote(imagePathOrUrl)) {
    const res = await fetch(imagePathOrUrl);
    if (!res.ok)
      throw new Error(`Failed to fetch ${imagePathOrUrl}: ${res.status}`);
    buffer = Buffer.from(await res.arrayBuffer());
    buffer = await sharp(buffer).png().toBuffer();
  } else {
    let p = imagePathOrUrl;
    if (p.startsWith("/@fs/")) p = p.slice("/@fs/".length);
    p = stripQuery(p);
    let abs = path.isAbsolute(p) ? p : path.resolve(mdDirAbs, p);
    buffer = await fs.readFile(abs);
    buffer = await sharp(buffer).png().toBuffer();
  }

  const palette = await Vibrant.from(buffer).getPalette();

  const trace = await new Promise((res, rej) => {
    potrace.trace(
      buffer,
      { turdSize: 100, optCurve: true, optTolerance: 0.4 },
      (err, svg) => (err ? rej(err) : res(svg))
    );
  });

  // Save trace as SVG file
  if (relPath) {
    const coverDir = path.join(process.cwd(), "cover");
    await fs.mkdir(coverDir, { recursive: true });
    const svgFileName = relPath.replace(/\//g, "-") + ".svg";
    const svgPath = path.join(coverDir, svgFileName);
    await fs.writeFile(svgPath, trace, "utf-8");
  }

  return {
    get bgColor() {
      return palette.Muted?.hex ?? "";
    },
    get titleColor() {
      const hex = palette.Vibrant?.hex;
      return hex ? findNearestTitleColor(hex) : "";
    },
  };
}

// ---- color helpers ----
const prefix = "--mantine-color-";
export const TITLE_COLOR_MAP = Object.entries({
  "pink-2": "#fcc2d7",
  "indigo-2": "#bac8ff",
  "yellow-2": "#ffec99",
  "green-4": "#69db7c",
  "orange-2": "#ffd8a8",
  "teal-2": "#96f2d7",
  "violet-2": "#d0bfff",
  "cyan-2": "#99e9f2",
  "grape-3": "#e599f7",
  "blue-2": "#a5d8ff",
  "lime-2": "#d8f5a2",
  "dark-8": "#1f1f1f",
  "red-3": "#ffa8a8",
  "gray-2": "#e9ecef",
}).reduce((sum, [name, value]) => ({ ...sum, [prefix + name]: value }), {});

function findNearestTitleColor(color) {
  let distance = Infinity;
  let nearestColor = "";
  for (const [name, value] of Object.entries(TITLE_COLOR_MAP)) {
    const dis = chroma.deltaE(color, value);
    if (dis < distance) {
      distance = dis;
      nearestColor = name;
    }
  }
  return nearestColor;
}

// ---- processors ----
async function processLocation(data, old) {
  if (!data?.city || !GOOGLE_API_KEY) return undefined;

  if (old && old.city && JSON.stringify(old.city) === JSON.stringify(data.city)) {
    return { city: old.city, locations: old.locations };
  }

  const locations = [];
  for (let i = 0; i < data.city.length; i++) {
    const searchData = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${data.city[i]}&key=${GOOGLE_API_KEY}`
    );
    const searchDataJson = await searchData.json();
    const location = searchDataJson.results?.[0]?.geometry?.location;
    if (location) {
      locations.push({ latitude: location.lat, longitude: location.lng });
    }
  }

  return { city: data.city, locations };
}

async function processCover(data, old, file, relPath) {
  if (!data?.cover?.url) return undefined;

  if (old && old.cover?.url === data.cover.url) {
    return undefined;
  }

  const colorSet = await getColorSet(data.cover.url, path.dirname(file), relPath);
  return {
    cover: data.cover,
    colorSet,
  };
}
