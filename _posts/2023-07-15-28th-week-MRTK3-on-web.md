---
type: post
category: plan
---
# 28th week: MRTK3 on web

## Tensorflow

This week I tried to reuse tensorflow using [the MNIST tutorial](https://codelabs.developers.google.com/codelabs/tfjs-training-classfication). It is much useful than years before. So I'm starting to watch this [freeCodeCamp](https://www.youtube.com/watch?v=tPYj3fFJGjk&t=4090s&pp=ygUTdGVuc29yZmxvdyB0dXRvcmlhbA%3D%3D) to get a structured knowledge. It will be done this week.

## Web3

I don't know too much about web3, just watched [fireship's video](https://www.youtube.com/watch?v=meTpMP0J5E8&pp=ygUMZmlyZXNoaXAgTkZU). There's [a series of videos](https://www.youtube.com/watch?v=9SzWQq2ejZ4&list=PL2fGiugrNooj0nya96-BEGnQAzZnKy04m&ab_channel=01Coder) about solidity. Maybe I will use it one day.

- [NFT Art Generator](https://nft-generator.art/) is a tool to generate NFT art.
- [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/) is a testing framework for solidity.
- [Pinata](https://www.pinata.cloud/) puts your NFT on IPFS. This is a [tutorial](https://blog.ipfs.tech/2021-07-15-building-web-3-pinata/).
- [HardHat](https://hardhat.org/) is a development environment for Ethereum. It's a replacement of Truffle.Building a bridge between JS and solidity.
- [chain-link](https://chain.link/) is a decentralized oracle network.
- [OpenZeppelin](https://www.openzeppelin.com/) is a library for smart contract development.

## Tailwind

Tailwind is a utility first CSS framework. But the templates on the site are not free. These are some free component templates:

- [float UI](https://www.floatui.com/components)
- [a17t](https://a17t.miles.land/)
- [ko Meta](https://kitwind.io/products/kometa)
- [headless UI](https://headlessui.com/)
- [tailwind UI Kit](https://tailwinduikit.com/components)
- [daisy UI](https://daisyui.com/)
- [tailwind kit](https://www.tailwind-kit.com/)
- [tailwind Starter Kit](https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation)
- [kutty](https://kutty.netlify.app/)
- [post src](https://postsrc.com/components)
- [tail blocks](https://tailblocks.cc/)
- [hyper UI](https://www.hyperui.dev/)
- [meraki UI](https://merakiui.com/)
- [mamba UI](https://mambaui.com/)

These are page templates:

- [tailwind tool box](https://www.tailwindtoolbox.com/)
- [CUIP](https://codepen.io/cruip)
- [tailwind awesome](https://www.tailwindawesome.com/)
- [tailwind components](https://tailwindcomponents.com/)
- [tReact](https://treact.owaiskhan.me/)
- [unlight tailwind components](https://github.com/unlight/tailwind-components)

## FBX files

some FBX files can not be read on Windows 3D viewer. Can use [Autodesk FBX Review](https://www.autodesk.com/products/fbx/fbx-review) to check the file.

These are some free FBX [emojis](https://3moji.org/)

## UI for webXR

UI on canvas is quiet different from UI on DOM. Babylon.js has it's own UI toolkit both 2D and 3D. And one can make the UI using the [UI editor](https://gui.babylonjs.com/). [Space.js](https://github.com/alienkitty/space.js) is a 3rd party UI for Three.js.

Babylon.js treats UI as materials, so I can's add Gizmo on it. But I can attach it to a mesh. 

With the SVG's foreignObject tag, I can insert an HTML into SVG. This is how [html-to-image](https://github.com/bubkoo/html-to-image#readme) works. I think I can implement an HTML Control for babylon.js. 

furthermore, I can use [height-map](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/height_map) to add 3D effect for a 2D GUI.

## Babylon.js

Babylon.js now supports [MRTK3](https://doc.babylonjs.com/features/featuresDeepDive/gui/mrtk) on web. But right now, only a button is supported. The full MRTK3 components can be found in [github](https://github.com/microsoft/MixedRealityToolkit-Unity/tree/mrtk3). checkout the mrtk3 branch. You can build it on Unity.

Babylon.js has an [editor](https://editor.babylonjs.com/), Three.js also has [one](https://rogueengine.io/download). I have to say babylon.js is better. But to integrate it with react-babylon still need some work. It exports scene as a `.babylon` [file](https://doc.babylonjs.com/setup/support/.babylonFileFormat). I am trying to import it to react-babylon.

Snippets is a babylon material server. You can build your own with [this](https://doc.babylonjs.com/toolsAndResources/thePlayground/yourOwnSnippetServer). Also you can use [node-editor](https://nme.babylonjs.com/) to generate one.

## WebXR

I found [a tutorial of WebXR](https://medium.com/youngsphere/1-introduction-to-webxr-53c293b4bfb5) on medium. I will check it out next week.

## Swipe keyboard

This is a [document](
https://www.fleksy.com/blog/how-swipe-typing-works/) about how swipe keyboard works.

## What to be done

- Finish the tensorflow tutorial. [freeCodeCamp](https://www.youtube.com/watch?v=tPYj3fFJGjk&t=4090s&pp=ygUTdGVuc29yZmxvdyB0dXRvcmlhbA%3D%3D)
- Integrate babylon.js editor with react-babylon.
- make an HTML Control for babylon.js.
- learn [react-babylon tutorial](https://brianzinn.github.io/react-babylonjs/)
- learn [rust on android](https://google.github.io/comprehensive-rust/)
- try to make snippets(not emergent).