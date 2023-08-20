---
type: post
category: plan
---

# 25th week - BabylonJS

This week is all about BabylonJS. I was trying to refactor [Summer Festival](https://github.com/BabylonJS/SummerFestival) using [react-babylonjs](https://github.com/brianzinn/react-babylonjs) and [@preact/signals-react](https://www.npmjs.com/package/@preact/signals-react).

Game developing is little different with UI developing. Since the canvas repaints in every frame. I don't need to care too much about the reactive system. In every frame, there is a pre-render function to pull state from the store.

Unity can be used to export BabylonJS App. Using [Scene exporter](https://doc.babylonjs.com/communityExtensions/Unity/Exporter), it is a paid tool, can find a free alpha version on github. After using it, I found it can export gltf file, the code part is not helpful. Same situation in [needle engine](https://engine.needle.tools/docs/getting-started). (BTW, needle engine only works on node v16)

[cannon](https://schteppe.github.io/cannon.js/) is deprecated now, it's been rewritten to [cannon.es](https://github.com/pmndrs/cannon-es). I strongly suggest to read these [code](https://github.com/brianzinn/react-babylonjs/blob/master/packages/static/content/examples/physics/BouncySphere.tsx
http://grideasy.github.io/tutorials/Using_The_Physics_Engine
) to use a physical engine in react-babylonjs.

## Custom Resolution on Mac

[betterdisplay](https://github.com/waydabber/BetterDisplay) is a paid extension to make dummy screens on Mac OS with a 7 days free trail.

## WebXR

There are some CSS specs like `transform-style: detached;` is used in MR environment. [DOM-overlays](https://github.com/immersive-web/dom-overlays), I am not sure if it can show DOM in dual screen. If it can't, maybe using [html2canvas](https://github.com/niklasvh/html2canvas) can help? Then canvas UI framework like Flutter can have better performance, I guess.

In react-babylonjs, attach an HTML element to a mesh is simple, just use `Html` tag.

## Faas

I was thinking about run serverless functions on a local machine. I found [knative](https://cloud.google.com/knative/) and [openfaas](https://docs.openfaas.com/cli/build/ ). I didn't dig further.

## FydeOS

This Friday, I tried FydeOS on my Cube tablet. rotation not working, camera was off. The camera can not work on Ubuntu either. It's an Intel AV Camera 2500, I found a surface [repository](https://github.com/linux-surface/linux-surface) trying to crack it. I think I will try Ubuntu on my machines this weekend, running Windows is too hot in this summer.
