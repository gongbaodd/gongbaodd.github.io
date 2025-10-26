---
type: post
category: tech
series:
  name: 3D printing
  slug: 3d-printing
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1760732820/IMG_8398_uf74nj.jpg
    alt: print
---

# 🧵 Week 43: Hunyuan 3D Adventures

Two weeks ago, I mentioned that I was diving into a project involving 3D printing — and I’ve already finished [the 3D scanning part](/tech/2025/10/03/week-41-3d-scan). 🎥✨  

At the end of that blog, I left myself with 3 burning questions 🔥:

---

### ❓1. How to convert point clouds (from Luma 3D) into meshes?

Turns out, Luma 3D **does provide** mesh export! You can download a `*.glb` file with **High**, **Medium**, or **Low Poly Mesh** options.  
However… while these meshes look fine for display, they’re **not quite ready for 3D printing** — lots of moise and messy topology. 😬

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1760730419/image_17_1_m9t9vx.png)

---

### ❓2. How to correct tilted mesh scans?

That’s where **Blender** comes into play — I’ll dive into that later in this post. 🧰

---

### ❓3. How to stabilize exhibits during scanning?

Unfortunately, we couldn’t reschedule a rescan session, so this question remains... **unresolved** 😅

---

## 🧠 Hunyuan3D — AI Meets 3D Modeling

In my last blog, I briefly mentioned 3D AI generation — and here we are.  

**Hunyuan3D** is an open-source 3D AI generation model created by **Tencent**. You can find it on [Hugging Face](https://huggingface.co/spaces/tencent/Hunyuan3D-2) 🧩  
But if you just want to try it out, the official [website](https://3d.hunyuan.tencent.com/) is the easiest way to go — with **20 free generations per day**, each taking about **190 seconds** ⏱️

Just upload one or more pictures of the object you want to generate — simple as that!

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759503069/image_dafhdg.png)

And amazingly, my **first try** worked perfectly! 🥳  

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759503183/image_2_hgeoc9.png)

But… it turned out to be **beginner’s luck** 🍀  
After that, Hunyuan3D started *hallucinating* objects like it had just woken up from a weird dream. 🤯

---

## 🥾 Example: The Shoe Ornament Disaster

The first generation? **Terrible.** 👎  
![](https://res.cloudinary.com/dmq8ipket/image/upload/v1760729908/image_21_bjw99u.png)

So I tried again — this time removing the ruler, keeping only the main object. Still not ideal. 😤  
![](https://res.cloudinary.com/dmq8ipket/image/upload/v1760730050/image_22_j3rhvq.png)

The good news: You can try **20 times a day**, tweaking angles or contrasts until something decent appears.  
In this example, the decoration (orange mark) was **tilted** — better, but not perfect.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1760730633/image_23_kqoq1b.png)

---

## 🧱 Fixing the Tilt in Blender

I thought: “No problem, I’ll just fix it in Blender.”  
But the AI-generated model had **millions of disconnected vertices** — when I tried dissolving them, the entire object *fell apart like a croissant.* 🥐💥  

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1760731122/Screenshot_2025-10-17_225820_vq0r0u.png)

So I tried again, this time generating with **50k vertices** instead of **1.5 million**.  
Much better — just a bit of tilt correction needed! 🙌  

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1760731344/Screenshot_2025-10-17_230154_wktxel.png)

---

## 🔍 Matching the AI Asset with Real Scan

To ensure the new asset matches the real object, I used **MeshLab** to align the AI-generated mesh with the 3D-scanned point cloud. Perfect for validation ✅  

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1760731589/Screenshot_2025-10-15_154322_kqjbdi.png)

---

## 🐾 Bonus: The Scratcher

Using the same process, I digitalized the **scratcher** too 🐾  

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1760731978/image_25_cg9foo.png)

Then, I resized it to match the original, exported it as an `.stl`, and printed it with **PLA** using an **FDM 3D printer**. 🖨️🎨  

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1760732820/IMG_8398_uf74nj.jpg)

---

## 🎨 What’s Next

Next step: **polishing and coloring** the prints!  
That’s going to be the topic of the next blog — stay tuned! 🌈🪩  
