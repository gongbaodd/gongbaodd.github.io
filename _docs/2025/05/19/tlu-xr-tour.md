---
type: post
category: lab
tag:
    - portfolio
    - webXR
    - babylonJS
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1757489746/1747656883140_hkuw9u.jpg
    alt: screenshot in quest 3
---

# Tallinn University XR tour

You can play this from this [link](https://jingles.vercel.app/). The shader needs long time to compile at first start.

## Plan the experience

The app is to make a campus tour of Tallinn University. The player can teleport in the school campus.

## Choose a framework

The app uses Babylon.js as the framework.

## Set up the environment

| | |
|--|--|
| Modal Scanner | Luma 3D capture |
| Panorama Camera | Google Camera |
| Modal Editor | MeshLab |
| Editor | Visual Studio Code |
| Local Web Server | vite |

## Create the 3D assets

Use Luma 3D capture to scan the campus, and use MeshLab to cut unwanted spots.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1757490461/%E5%9B%BE%E7%89%874_mwayww.png)

Use Google Camera to take a panorama photo of the campus.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1757490509/%E5%9B%BE%E7%89%875_iofit0.jpg)

## Code the experience

[Scene.tsx](https://github.com/gongbaodd/Jingles/blob/main/src/Scene.tsx)

```ts
 const scene = new Scene(engine);

    const camera = new ArcRotateCamera(...);
    const light = new HemisphericLight(...);

    const assetManager = new AssetsManager(scene);
    loadSky(scene, assetManager);
    loadPointCloud(assetManager);

    const ground = MeshBuilder.CreatePlane(...)

    const target1 = MeshBuilder.CreateText(
        "Astra",
        "ASTRA",
        …
    )!;

    const target2 = MeshBuilder.CreateText(
        "Silva",
        "SILVA",
        …
    )!;

    const experience = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-vr",
        },
        optionalFeatures: true,
        floorMeshes: [ground],
    });
    experience.teleportation.addFloorMesh(ground);

    assetManager.load();
```

## Test and debug

Desktop Testing tool: IWER

Bugs: The movement is too slow, the player's start point is inside of the mesh

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1757489756/%E5%9B%BE%E7%89%873_ewlkxo.png)

On device testing: Meta Quest 3

Bugs: The loading is slow, movement is slow but acceptable.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1757490720/%E5%9B%BE%E7%89%877_fegiv4.png)


