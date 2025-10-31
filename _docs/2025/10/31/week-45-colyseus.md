---
type: post
category: plan
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1761924996/unnamed_1_nusckr.jpg
    alt: missile command
tag:
    - colyseus
    - multiplayer
    - edge-detection
---

# 🚀 Week 45: Colyseus Multiplayer & SVG Edge Detection

This week, I wrapped up two major things:  
1️⃣ Finished my [**Missile Command 3D Multiplayer**](/plan/2025/10/08/remake-of-missile-command) game 🎯  
2️⃣ Optimized my blog’s SVG thumbnails using **edge detection** ✏️  

Let’s dive into both 👇

---

## 🎮 Part 1 — Colyseus Multiplayer Journey

After many experiments, the real-time multiplayer feature is now live — powered by [**Colyseus**](https://colyseus.io/). It’s surprisingly easy to set up, but there are a few important lessons I learned along the way 💡

### 🧭 Key Takeaways

- 🏠 **`defineRoom` limitation:** It can only create one room instance. If you want multiple replicated rooms (like `room/1`, `room/2`...), you’ll need to handle that manually.  
- 📦 **Schema matters:** Colyseus requires a **predefined data schema** for all state transfers. I initially wanted to stream the computed Babylon.js scene directly to clients — but hit a wall due to schema constraints.  
- ⚙️ **Monorepo caveat:** Some Colyseus packages don’t play nicely inside a **monorepo** setup, so you might face build or dependency issues there.

Overall, it’s been a fun challenge combining **Babylon.js** for visuals and **Colyseus** for networking. 

---

## 🧩 Part 2 — Blog Post Card SVG Optimization

I also spent time optimizing my blog’s performance 🖥️.  
When loading the homepage, each blog post card first shows an **SVG vector preview** before loading the full image.  

Originally, I stored all SVGs in a single `metadata.json` file — but it grew to **50 MB**, exceeding GitHub’s upload limits 🚫.  
I then split them into individual files, but each SVG could be **up to 1 MB**, still too large for thumbnails 😅.

To solve this, I implemented an **edge detection filter** using [`@musical-sniffle/sobel-edge-detection`](https://www.npmjs.com/package/@musical-sniffle/sobel-edge-detection).  
The result: beautiful **sketch-style thumbnails** ✏️, with sizes reduced to just **10–100 KB** ⚡

---

### 🧠 Code Snippet: Sharp + Sobel Edge Detection

```ts
async function sharpSobel(inputBuffer) {
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

  // 🌓 Invert colors for better contrast
  for (let i = 0; i < detected.length; i += 4) {
    detected[i] = 255 - detected[i];         // R
    detected[i + 1] = 255 - detected[i + 1]; // G
    detected[i + 2] = 255 - detected[i + 2]; // B
  }

  return await sharp(detected, { raw: { channels: 4, height, width } })
    .normalize()
    .png()
    .toBuffer();
}
````

---

In the end, both projects turned out great — the **multiplayer system** runs smoothly ⚔️ and my **blog loads faster** than ever ⚡
On to the next experiment! 🚀
