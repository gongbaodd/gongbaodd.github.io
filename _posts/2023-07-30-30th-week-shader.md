---
type: post
category: plan
---
# 30th week shader

## CSS in JS is back

[Kuma UI](https://www.kuma-ui.com/) is a compiler time CSS in JS library. It is a better alternative to Tailwind CSS. It can be used with [Panda CSS](https://panda-css.com/)

## NextJS & Remix

Compared NextJS and Remix. Remix is fully server rendered.

## Use Preact with react-babylonjs

[preact-reconciler](https://github.com/CodyJasonBennett/preact-reconciler) is an adapter for Preact to work with react-babylonjs or R3F.

## WebXR

[Mixed Reality Resources](https://github.com/Yonet/MixedRealityResources) collects the datas about XR resources. Can download some library on it.

This is an XR input [playground](https://playground.babylonjs.com/#X7Y4H8) for BabylonJS.

Using WebXR on phone is hard. It is only supported on Chrome Canary. It is not working on Safari even opened the experimental features.

Testing the web on mobile need a cable connect. But there is a JS console [Eruda](https://github.com/liriliri/eruda) can help.

Another choice is to use [Babylon React Native](https://github.com/BabylonJS/BabylonReactNativeSample), which uses React Native as a bridge to use ARcore or ARkit. Sadly Oculus dose not support ARcore. However, it seems Oculus uses React Native on it's [Home Launcher](https://reactnative.dev/blog/2021/08/26/many-platform-vision). And they are working on supporting Vision OS.

[This](https://www.callstack.com/campaigns/download-the-ultimate-guide-to-react-native-optimization) is a book about React Native.

## BabylonJS

To make an orthographic camera in BabylonJS, can refer to this [link](https://forum.babylonjs.com/t/how-to-use-orthographic-view-in/29733).

[CYOS](https://cyos.babylonjs.com/) is a BabylonJS shader editor.

[BabylonJS Viewer](https://doc.babylonjs.com/features/featuresDeepDive/babylonViewer) uses web component to build a 3D viewer.

Can use [Poly Pizza](https://poly.pizza/) to download mesh models.

Can download free shaders on [ShaderToy](https://www.shadertoy.com/).

## AI generated SVGs

Using [Craft AI](https://www.recraft.ai/), can make AI generated SVGs for free. [This](https://www.nan.fyi/) is a blog about SVG paths, maintainer is a vercel employee.

## Crash an SVG path on WebGL

[This](https://css-tricks.com/rendering-svg-paths-in-webgl/) is a threeJS example to render SVG path on WebGL with shaders. I am trying to make it work on BabylonJS and learn how to write shaders.

[This](https://www.youtube.com/watch?v=oKbCaj1J6EI&ab_channel=Visionary3D) is a crash course about shaders.

To make vertex change without shader, can refer to this [link](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/custom/updatingVertices).

About how to use a node editor can refer to [this](https://doc.babylonjs.com/features/featuresDeepDive/materials/node_material/nodeMaterial)

This is an [example](https://playground.babylonjs.com/#026IT4#1) to send attribute data to shader using instanceBuffer.

This is a nice [tutorial](https://www.smashingmagazine.com/2016/11/building-shaders-with-babylon-js/) about how to write shaders in BabylonJS.

[This](https://playground.babylonjs.com/#1OH09K#1672) is a firework effect using shader.

[A fancy Babylon Effect](https://codepen.io/daledesilva/pen/ZEmrrYX) I want to figure out.

## run JS in compiling time

Since React Server Component runs component on server, I was thinking to run a component on compiling time. [This plugin](https://github.com/egoist/vite-plugin-compile-time) can do that.

Also there is [a plugin](https://github.com/unjs/unplugin) to help build a universal plugin for Vite, Rollup, Webpack and more.

