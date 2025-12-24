---
type: post
category: tech
tag:
    - ml
    - 3dgs
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1766575285/1748164743855_vbaxum.jpg
    alt: selfie
---

# Apple's SHARP: Turning pictures into a 3D World

I spent some time yesterday diving into **[Apple's SHARP Model](https://github.com/apple/ml-sharp)**. If you haven't seen the buzz, SHARP is a high-resolution 3D generative model that can transform a single 2D image into a **3D Gaussian Splatting (3DGS)** representation. 📸 ✨


### 🧪 The Experiment

I put the model through its paces on my laptop, and here’s how the process went:

<iframe width="560" height="315" src="https://www.youtube.com/embed/S6YGpulJYL4?si=bGBGro8tUGL1gmJa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

### ⚙️ The Technical Reality Check

While the results are impressive, running this locally revealed some "heavyweight" challenges:

* **Model Weight:** The model sits at a chunky **2.6GB**. It caches after the first prediction, but it's a significant initial download. 📥
* **CPU Bottleneck:** On my laptop, it took several minutes to render using the CPU (I'm still hunting for a way to enable the GPU build!). 🐢
* **Fixed Asset Size:** Every output is consistently **63MB** with exactly **1,179,648 vertices**.

> **The Verdict for Developers:** If you're planning to turn this into a web service, a real-time front-end experience is currently out of reach. You'd need an **asynchronous architecture** (where the user waits for a notification) and a serious optimization pipeline to clip those vertices down to a web-friendly **~4MB**. 🛠️

---

### 🫠 The "Identity Crisis"

Like many other models I've experimented with [VTON](/plan/2025/11/05/triplydb), SHARP seems to have a specific "vision" of what I look like.

Despite my photo, the model consistently renders me as a white guy! 😂 It’s a classic reminder of the **training data gap**—there clearly isn't enough Asian representation in the dataset yet. 🌏

Check out my "new look" below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/s_egz3yi63Y?si=zUJjjPGXIfhvIQo6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
