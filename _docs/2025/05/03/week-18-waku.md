---
type: post
category: plan
---

# Week 18: Waku

This week. I was basically collecting all the tech trash I made lately. The mediapipe unity controller has a memory leak. And since I was deploying that on itch.io. The static files were placed in a relative folder not on a local folder. I currently can not find a better way to fix that on Waku. However, I changed my framework to Astro. Which need a third party library [astro-relative-links](https://github.com/ixkaito/astro-relative-links) to solve the problem.

Waku is a react framework which uses vite and supports SRC. It bundles the server rendered component into js and and component list txt file. The file is used to load these components at start.

Another thing, I was trying Unreal Engine on Web. I got stuck on applying the permission.