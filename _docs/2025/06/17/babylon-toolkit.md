---
type: post
category: fe
tags:
    - babylonjs
---
# Babylon Editor & Babylon Toolkit

I tried two babylon tools this week, [Babylon Editor](https://editor.babylonjs.com/) and [Babylon Toolkit](https://www.babylontoolkit.com/).

## Babylon Editor

Babylon Editor is an electron packed windows scene editor for babylon.js. The editor exports the scene as `.babylon` file and use `babylonjs-editor-tools` for integrate the script to the game objects.

The editor uses webpack as bundler, so the compiling time is comparable long. It uses commonJS module in the script integration, to use vite as a bundler, `vite-plugin-require` can be used to transpile require into import but a class formed script integration is needed.

Another thing, @babylonjs/havok is not usable in vite because of an unclosed wasm support issue. Use it as a global script can work around this issue.

## Babylon Toolkit

Babylon Toolkit uses Unity as the babylon.js editor. It compiles almost all the Unity features into babylon including physics animation and AI. [Community edition](https://github.com/babylontoolkit/CommunityEdition) is free of use. There is [a video](https://youtu.be/d1spQKztIZI?si=deXXfnOfOeKXc_QD) to help you make a small project. Another [git repo](https://github.com/MackeyK24/UMD-StarterAssets) to show how to include the exported files in a JS project. I found it quite big to dig into, however compiling unity to JS is not an easy thing. I will follow up this project, but right now, I probably stick on Babylon Editor.
