import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { Vibrant } from "node-vibrant/node";
import chroma from "chroma-js";
import potrace from "potrace";
import { SobelService } from '@musical-sniffle/sobel-edge-detection';

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
}).reduce((sum, [name, value]) => ({ ...sum, [`--mantine-color-${name}`]: value }), {});

export function isRemote(u) {
  return /^https?:\/\//i.test(u);
}

export function stripQuery(u) {
  return u.replace(/[?#].*$/, "");
}

export async function sharpSobel(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .greyscale()
    .resize({ width: 500 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const sobelService = new SobelService();
  const { width, channels, height } = info;
  const { imageData: detected } = sobelService.applySobel(
    new Uint8ClampedArray(data.buffer),
    width,
    height,
    channels
  );

  // Invert colors
  for (let i = 0; i < detected.length; i += 4) {
    detected[i] = 255 - detected[i];     // R
    detected[i + 1] = 255 - detected[i + 1]; // G
    detected[i + 2] = 255 - detected[i + 2]; // B
    // Alpha channel (i + 3) remains unchanged
  }

  return await sharp(detected, { raw: { channels: 4, height, width } })
    .normalize()
    .png()
    .toBuffer();
}

export function findNearestTitleColor(color) {
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

/**
 * Extract color metadata from an image
 * @param {string} imagePathOrUrl - Local file path or remote URL
 * @param {Object} options - Configuration options
 * @param {string} options.baseDir - Base directory for relative paths (default: cwd)
 * @param {string} options.relPath - Relative path for trace SVG filename
 * @param {string} options.saveTraceToDir - Directory to save trace SVG (if relPath provided)
 * @returns {Promise<{ bgColor: string; titleColor: string; trace?: string }>}
 */
export async function getColorSet(imagePathOrUrl, options = {}) {
  const { baseDir = process.cwd(), relPath, saveTraceToDir } = options;
  
  let bufferForColor;
  let buffer;

  if (isRemote(imagePathOrUrl)) {
    const res = await fetch(imagePathOrUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${imagePathOrUrl}: ${res.status}`);
    }
    buffer = Buffer.from(await res.arrayBuffer());
    bufferForColor = await sharp(buffer).png().toBuffer();
    buffer = await sharpSobel(bufferForColor);
  } else {
    let p = imagePathOrUrl;
    if (p.startsWith("/@fs/")) p = p.slice("/@fs/".length);
    p = stripQuery(p);
    let abs = path.isAbsolute(p) ? p : path.resolve(baseDir, p);
    buffer = await fs.readFile(abs);
    bufferForColor = await sharp(buffer).png().toBuffer();
    buffer = await sharpSobel(bufferForColor);
  }

  const palette = await Vibrant.from(bufferForColor).getPalette();

  const trace = await new Promise((res, rej) => {
    potrace.trace(
      buffer,
      { turdSize: 100, optCurve: true, optTolerance: 0.4 },
      (err, svg) => (err ? rej(err) : res(svg))
    );
  });

  // Save trace as SVG file if requested
  if (relPath && saveTraceToDir) {
    await fs.mkdir(saveTraceToDir, { recursive: true });
    const svgFileName = relPath.replace(/\//g, "-") + ".svg";
    const svgPath = path.join(saveTraceToDir, svgFileName);
    await fs.writeFile(svgPath, trace, "utf-8");
  }

  return {
    bgColor: palette.Muted?.hex ?? "",
    titleColor: palette.Vibrant?.hex ? findNearestTitleColor(palette.Vibrant.hex) : "",
  };
}
