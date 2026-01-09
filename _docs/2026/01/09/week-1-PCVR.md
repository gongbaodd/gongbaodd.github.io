---
type: post
category: tech
tag:
    - RT-RP
    - gnirehtet
    - virtual-desktop
    - PCVR
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1767957551/Home_2x_lmfsvh.png
    alt: Steam VR
---

# Week 1: Wired PCVR

It is only the first week of 2026, but it already feels like a lifetime has passed! 🌍 Between the whirlwind of global news and finishing my **German AI exam**, it’s been intense. I walked away with a **C**—and honestly, I’ll take it. I worked incredibly hard, and I’ve realized there are so many more technical resources available in German compared to Russian or Estonian. 📚🤖

### The Quest for a Better Link 🔗

This week, I focused on optimizing my **Virtual Desktop** setup for wired PCVR. Over the last year, I’ve noticed the official **Meta Link App** becoming painfully slow. I’m not sure if it’s a memory leak in the Meta software, Windows, or somewhere else, but the performance hit is massive. It’s reached a point where I can’t run anything else while Link is streaming—which is a total nightmare when you’re trying to develop in **Unity**. 🛠️🔋


### Finding the Workaround: Gnirehtet & RT-RP

**Virtual Desktop** was the very first app I bought on the Horizon Store. Back then, I didn't have the hardware to handle official streaming, and while it works great, it usually requires a robust Wi-Fi network. 📶

I recently stumbled upon a Reddit thread about using **adb** to build a reverse proxy for a wired connection. I first tried [Gnirehtet](https://github.com/Genymobile/gnirehtet), but the Rust version was a bit buggy for me—the stream would drop connection intermittently. 🐛

However, I found a wrapper called [RT-RP](https://github.com/Kuijen/RT-RP). It utilizes the Java version of Gnirehtet, and it actually works! ✅


### ⚠️ The "Unity Workaround"

I did encounter one specific quirk: the **Unity Editor** tends to kill the connection if you don't follow a specific sequence. If you want to develop without crashes, follow this order:

1. **Open the Unity Editor** first. 💻
2. **Open Virtual Desktop** on your headset. 🥽
3. **Start the RT-RP service.** ⚡
4. Ensure **SteamVR** is set as your default OpenXR environment.

It’s a bit of a "jank" setup, but once it's running, the stability is so much better than the official Link app! 🎮✨


