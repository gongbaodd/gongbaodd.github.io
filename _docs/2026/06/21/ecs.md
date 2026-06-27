---
type: post
category: fe
tag:
    - ECS
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1782283400/HLW8w0mW8AAcuLn_wcgrsb.jpg
    alt: benchmarking
---

# Week 25: ECS in browser? Might be a hoax

[ECS](/tag/ecs) has been discussed a lot in my blogs. It is a new design pattern for coding games. The idea is to increase cache hit rate in the CPU in order to increase the rendering efficiency. It brings huge performance update, so engines like Unreal Engine and Unity DOTS both implemented the pattern. However, the pattern in some way goes against traditional OOP ideology. To develop in this pattern needs to tilt the mind.

This year, many frontend, especially three.js based engines are also starting to use ECS. Which caught my attention, as a high level programming language, it is not possible for Javascript to handle hardware resources, especially the CPU cache. 

I vibe-coded three projects, all made to be a box carrying thousands of balls. The projects are call using jolt physics. I tried Elics, bitECS(using ArrayBuffer) and pure threejs without ECS to build the three projects. With no surprise, they act the same.

![benchmarking](https://res.cloudinary.com/dmq8ipket/image/upload/v1782283400/HLW8w0mW8AAcuLn_wcgrsb.jpg)

However, bitECS supports SharedArrayBuffer in run the calculation in threads. It may bring performance improvement. But I need to change stat.js to benchmark it.

So, in conclusion, until now, in one thread Javascript environment, using ECS can bring no performance improvement.

---

Added in 2026-06-27, after reading [Aperture](https://www.linkedin.com/posts/felixtrz_webgpu-gamedev-developertools-share-7476336100039401472-RqRj/?utm_source=share&utm_medium=member_ios&rcm=ACoAABbfrvsBTcTEUXNxHWRnwteYn_q03d2U-nw)'s introduction. It is a good idea to implement ECS on CS architecture. But I have to dig deeper on it.