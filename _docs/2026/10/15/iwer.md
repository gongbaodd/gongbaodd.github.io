---
type: post
category: fe
tag:
    - ECS
    - XR
---

# Immersive Web SDK

After the [digiconf 2026](/tech/2026/10/09/digi/), I caught cold. So I stayed home reading Domain Driven Development and Immersive Web SDK.

The author of Immersive Web SDK, is also the author of Immersive Web Emulator Runtime(IWER), I used it to debug the [TLU campus tour](/fe/2025/05/19/tlu-xr-tour/). This SDK, includes many concepts like ECS I mentioned [before](/fe/2026/06/21/ecs/).  And UIKitML for XR layout directives, which uses react yoga layout to let the canvas UI rendering supports CSS flexboxes. It uses threeJS as the core rendering engine.

Immersive Web SDK [start project](https://developers.meta.com/vr/documentation/iwsdk/guides/01-project-setup/) includes many skills for agents to allocate and also a graphical editor allows  me to fine tune.

Here is a [video](https://youtu.be/D04z9PYUSao?si=Z8amtBEgh8Rs-g76) showing how to use this SDK with Claude Code. I believe Muse maybe better, as Muse can support 3D assets generation, while Claude can only do geometies. In this video, Felix mentioned that [drawcall market](https://market.drawcall.ai) can be used for free assets. I did not dig deep, but drawcall seems a nice platform