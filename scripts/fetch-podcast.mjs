import fs from "fs/promises";
import path from "path";
import { parseStringPromise } from "xml2js";
import { getColorSet } from "./lib/image-metadata.mjs";

const PODCAST_RSS_URL = "https://anchor.fm/s/f483db10/podcast/rss";
const OUTPUT_FILE = "./podcast.json";
const TRACE_DIR = "./podcast";

/**
 * Extract episode slug from a URL
 * @param {string} url - Episode URL
 * @returns {string} Last segment of URL path
 */
function getEpisodeSlug(url) {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || "unknown";
  } catch {
    return "unknown";
  }
}

/**
 * Parse ISO 8601 duration to human-readable format
 * @param {string} duration - ISO 8601 duration (e.g., PT1H23M45S)
 * @returns {string} Formatted duration (e.g., "1h 23m 45s")
 */
function parseDuration(duration) {
  if (!duration) return "";
  
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;

  const [, hours, minutes, seconds] = match;
  const parts = [];
  
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds) parts.push(`${seconds}s`);
  
  return parts.join(" ");
}

/**
 * Fetch and parse RSS feed
 */
async function fetchRssFeed() {
  console.log(`📡 Fetching RSS from ${PODCAST_RSS_URL}...`);
  const response = await fetch(PODCAST_RSS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch RSS: ${response.status}`);
  }
  
  const xml = await response.text();
  const data = await parseStringPromise(xml);
  
  return data.rss.channel[0];
}

/**
 * Extract episode data from RSS item
 */
function parseEpisode(item, index) {
  const title = item.title?.[0] || "Untitled";
  const link = item.link?.[0] || item.guid?.[0] || "";
  const pubDate = item.pubDate?.[0] || new Date().toISOString();
  const description = item.description?.[0] || item.summary?.[0] || "";
  const summary = description.replace(/<[^>]*>/g, "").substring(0, 200);
  
  // Extract duration from iTunes namespace
  const duration = item["itunes:duration"]?.[0] 
    ? parseDuration(item["itunes:duration"][0])
    : "";
  
  // Extract image URL
  const image = item["itunes:image"]?.[0]?.["$"]?.href 
    || item.image?.[0]?.url?.[0]
    || "";
  
  // Extract audio URL
  const audioUrl = item.enclosure?.[0]?.["$"]?.url || "";
  
  // Generate unique ID based on link or index
  const id = link ? getEpisodeSlug(link) : `ep-${index}`;
  
  return {
    id,
    title,
    link,
    pubDate,
    description: description.trim(),
    summary: summary.trim(),
    duration,
    audioUrl,
    image,
  };
}

/**
 * Enrich episodes with color metadata
 */
async function enrichEpisodesWithColors(episodes) {
  const enrichedEpisodes = [];
  
  for (const episode of episodes) {
    try {
      if (episode.image) {
        console.log(`🎨 Processing colors for: ${episode.title}`);
        const colorSet = await getColorSet(episode.image, {
          baseDir: process.cwd(),
          relPath: episode.id,
          saveTraceToDir: TRACE_DIR,
        });
        enrichedEpisodes.push({ ...episode, colorSet });
      } else {
        enrichedEpisodes.push(episode);
      }
    } catch (err) {
      console.warn(`⚠️  Could not process colors for "${episode.title}": ${err.message}`);
      enrichedEpisodes.push(episode);
    }
  }
  
  return enrichedEpisodes;
}

/**
 * Main fetch and process function
 */
async function fetchAndProcessPodcast() {
  try {
    const channel = await fetchRssFeed();
    
    // Parse channel metadata
    const channelData = {
      title: channel.title?.[0] || "Podcast",
      description: channel.description?.[0] || "",
      link: channel.link?.[0] || "",
      image: channel.image?.[0]?.url?.[0] 
        || channel["itunes:image"]?.[0]?.["$"]?.href 
        || "",
    };
    
    console.log(`✅ Channel: ${channelData.title}`);
    
    // Parse episodes
    const items = channel.item || [];
    const episodes = items.map((item, idx) => parseEpisode(item, idx));
    console.log(`📻 Found ${episodes.length} episodes`);
    
    // Enrich with color metadata
    const enrichedEpisodes = await enrichEpisodesWithColors(episodes);
    
    // Write to file
    const output = {
      channel: channelData,
      episodes: enrichedEpisodes,
      lastUpdated: new Date().toISOString(),
    };
    
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2), "utf-8");
    console.log(`\n✨ Podcast data saved to ${OUTPUT_FILE}`);
    console.log(`📁 Trace SVGs saved to ${TRACE_DIR}/`);
    
  } catch (err) {
    console.error("❌ Error fetching podcast:", err.message);
    process.exit(1);
  }
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchAndProcessPodcast();
}

export { fetchAndProcessPodcast };
