---
type: post
category: fe
tag:
    - babylonjs
cover:
    url: https://editor.babylonjs.com/documentation/composing-scene/adding-objects.png
    alt: image from editor.babylonjs.com
---

# Babylon Editor & Babylon Toolkit

This week I tried two Babylon.js tools: [Babylon Editor](https://editor.babylonjs.com/) 🖥️ and [Babylon Toolkit](https://www.babylontoolkit.com/) 🧰.

## 🖌️ Babylon Editor

Babylon Editor is an Electron-based Windows scene editor for Babylon.js.  
It exports scenes as `.babylon` files 📦 and uses `babylonjs-editor-tools` to integrate scripts with game objects.

⚡ The editor uses Webpack as the bundler, so compile times can be relatively long.  
📜 It uses CommonJS modules for script integration. If you want to use Vite instead, you can use `vite-plugin-require` to transpile `require` into `import`—but you’ll need to structure your script integration as a class.

⚠️ Note: `@babylonjs/havok` currently doesn’t work in Vite due to an unresolved WASM support issue. A workaround is to load it as a global script.

## 🏗️ Babylon Toolkit

Babylon Toolkit uses Unity as the editor for Babylon.js, compiling nearly all Unity features—physics ⚙️, animation 🎬, AI 🧠—into Babylon.  
The [Community Edition](https://github.com/babylontoolkit/CommunityEdition) is free to use.  
🎥 There’s also a [video tutorial](https://youtu.be/d1spQKztIZI?si=deXXfnOfOeKXc_QD) for making a small project and a [starter repo](https://github.com/MackeyK24/UMD-StarterAssets) showing how to include exported files in a JS project.

It’s quite a big system to dive into, and compiling Unity to JS isn’t trivial. I’ll keep an eye on it 👀, but for now I’ll probably stick with Babylon Editor.
