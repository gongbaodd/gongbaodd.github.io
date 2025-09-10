---
type: post
category: lab
cover:
    url: https://img.itch.zone/aW1nLzIxMjU3OTg5LmpwZw==/original/c3SN0%2B.jpg
    alt: game screenshot
tag:
    - Unity
    - HandTracking
    - MediaPipe
    - WebSocket
    - portfolio
---

# 🍳 Baltic Kitchen Chaos  

<iframe width="560" height="315" src="https://www.youtube.com/embed/wx0j_Wm60Mw?si=7mpn_URL6sHQ4mvd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This is a game I built at **Tallinn University** 🎓 for the course *Design and Integration of Game Assets*.  
It was a group project: I handled the programming 👨‍💻, while two awesome teammates worked on narrative, sound, and design.  

---

## 🎮 Where & How to Play  

We made two versions:  

- 🖱️ [Mouse version](https://gongbaodd.itch.io/baltic-kitchen-chaos) – the official final submission  
- ✋ [Hand tracking version](https://gongbaodd.itch.io/ghostly-paws) – more experimental and fun  

👉 In the hand-tracking build, you can swipe **top-right with your mouse** to trigger the hand-tracking mode.  

![game screenshot](https://img.itch.zone/aW1nLzIxMjU3OTg5LmpwZw==/original/c3SN0%2B.jpg)  
![menu](https://img.itch.zone/aW1nLzIxMjU3OTc5LmpwZw==/original/ae5%2FdD.jpg)  
![play scene](https://img.itch.zone/aW1nLzIxMTY5NjYyLmpwZw==/original/rkjTAD.jpg)  

---

## 🥘 How I Cooked Up the Gameplay  

The gameplay is pretty simple:  

- 🍲 I used **Scriptable Objects** to store dish info  
- 🥦 Ingredients spawn randomly during the game  
- ⚖️ The balance of “ideal” vs. “not-so-ideal” ingredients is managed by another config Scriptable Object  

---

## ✋ How I Experimented with Hand Tracking  

For the hand-tracking version:  

- 🛠️ I used **Google’s MediaPipe** – small, fast, and Unity-friendly (but sadly not directly on web).  
- 🌐 To make it work, I used the **web version of MediaPipe** and sent the data to Unity through a **JS plugin**.  

Here’s the tricky part:  

- ⚡ In development mode, JS plugins don’t work — so I had to set up a **WebSocket server** as a bridge.  
- 🖥️ That caused noticeable delay during dev, making fine-tuning harder.  

But in the **final build**, the JS plugin works directly 🎉. On many high-end devices with good lighting 💡, the tracking feels smooth, though performance still depends on the setup.  

We kept the **mouse version** as the official submission ✅, but I’m keeping the hand-tracking one alive too — maybe one day I’ll polish it even more ✨.  
