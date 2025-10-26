---
type: post
category: plan
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1761513320/IMG_8514_rwjb9o.jpg
    alt: selfie
---

# Week 44: TipiLan and Tech Deep Dive 💻

This week was **supposed to be a resting week**, but I ended up being super busy! 😅

It kicked off with the **[cursor meetup](/life/2025/10/20/cursor-meetup)**. Then, a new job interview landed, which included a coding assignment. All of this was on top of my part-time job commitments. The highlight of the weekend was checking out **[TipiLan](https://tipilan.ee/en/stream)** at Taltech! 🎮

---

## TipiLan: A Gaming Expo Adventure 🕹️

TipiLan is a fantastic game expo where many **local studios** showcase their games. It was great to see the Estonian game development scene!

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1761513337/IMG_8521_n79wxb.jpg)

I particularly enjoyed this game—it had a great **90s retro vibe**.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1761513330/IMG_8517_a6mhi0.jpg)

There were also some cool **VR games** to try out.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1761513327/IMG_8512_gasvad.jpg)

A small **game history exhibit** showcased the evolution of games through different eras...

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1761513324/IMG_8515_kumvse.jpg)

...and a variety of different **gaming devices**.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1761513337/IMG_8527_u1gp6o.jpg)

The event also hosted various **tournaments**, though I wasn't familiar with many of the competitive scenes.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1761513322/IMG_8520_ds1b3v.jpg)

The absolute **best part**? Taltech offers a **free campus ice cream machine!** 🍦 This was a delightful surprise.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1761513307/EF14208B-9953-4E59-8240-8A2027E6AA99_czjwkw.jpg)

---

## PixiJS Toolchain Deep Dive 🔧

The interview assignment involved **PixiJS**, which gave me a great opportunity to explore its modern toolchain and ecosystem.

### Bundling with Rsbuild & Unit Testing with Rstest

For the bundler, I chose **Rsbuild** to avoid issues I previously encountered with WASM modules in Vite. For unit testing, I used **`@rstest/core`**. The tests themselves felt similar to what I'd write in Jest or Vitest.

A tricky area I hit was with **CSS background URLs**. Rsbuild, by default, bundles the image referenced in CSS:

```css
#root {
  background: url("/gameplay/bg.jpg") no-repeat center / 160%;
}
```

To prevent this automatic bundling for certain paths, the `rsbuild.config.ts` needed a filter:

```ts
import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  tools: {
    cssLoader: {
      url: {
        filter: (url) => {
          if (/^\/gameplay\//.test(url)) {
            return false;
          }
          return true;
        },
      },
    },
  },
});
```

### Devtools and Layout

### @pixi/devtools

This is the official [devtool for PixiJS](https://pixijs.io/devtools/) and is great for layout adjustments. Unfortunately, I found it only worked correctly for me in Chrome, and wouldn't inject properly in Edge.

### @pixi/layout

This package provides a [Flexbox layout engine for PixiJS](https://layout.pixijs.io/docs/guides/core/overview), utilizing Facebook's [yoga engine](https://www.yogalayout.dev/) under the hood. Initially, I aimed for a fully responsive design, but I later simplified my approach. Crucially, the layout engine cannot be debugged using the standard PixiJS devtool, so I only used it partially.

### BDD with Playwright

For End-to-End (E2E) BDD testing, I used cucumber.js alongside Playwright. Honestly, without the help of AI, I think I would have gotten stuck in the initial configuration! 🤯 Playwright is a powerful tool, but definitely has a steeper learning curve than Cypress.

I leveraged Playwright's screenshot feature. However, I couldn't immediately find a straightforward way to configure screenshot difference (diff) testing, so I'm still not sure if a dedicated plugin exists for that. 🤔