---
type: post
category: tech
cover:
  url: https://res.cloudinary.com/dmq8ipket/image/upload/v1775471593/Screenshot_2026-04-06_133228_nbcg6m.png
  alt: behavior graph
tag:
  - Unity
---
# Rethinking about Behavior Graph

Last year, when I first tried [**Behavior Graph**](/plan/2025/04/26/week-17-behavior-graph) in Unity, I honestly thought it was a bit of overkill—doing way too much extra work for simple tasks. 😅 I figured Unity was just pushing it to feed their **Muse AI** ecosystem. 🤖

But recently, while working on *Grandpa's Bee Heaven* 🐝✨, I hit a wall. Since most of the contributors to the codebase were "vibe coding" (we’ve all been there...), the logic started becoming totally unreadable. I was staring at several classes with **1000+ lines** of code and logic leaks everywhere. 📉

I decided to give Behavior Graph another shot to clean up the mess. I used the AI purely for building the nodes, then moved the core logic over. 🛠️

![Behavior Graph in Grandpa's bee Heaven](https://res.cloudinary.com/dmq8ipket/image/upload/v1775471593/Screenshot_2026-04-06_133228_nbcg6m.png)

**The results? It actually works\!** 🎉

  * **Small Classes:** Using nodes cut the code scale of a single class down significantly. ✂️
  * **Clarity:** It’s much easier to verify if the logic is sound, which means fewer "hallucinations" in the implementation. 🔍
  * **Visual Debugging:** I can still edit the main logic within the graph and, best of all, I can see exactly how the graph executes in real-time during game previews. 🏎️💨
