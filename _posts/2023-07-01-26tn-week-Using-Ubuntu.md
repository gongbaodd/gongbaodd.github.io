---
type: post
category: plan
---
# 26th week: Using Ubuntu

## Babylon tutorial plan

This week，I've finished the [babylon tutorial](https://doc.babylonjs.com/guidedLearning/createAGame). Collected a lot courses.

- About using a physical engine, can read [this document](https://doc.babylonjs.com/legacy/physics/usingPhysicsEngine).

- About using HDR image, can read [this document](https://doc.babylonjs.com/features/featuresDeepDive/materials/using/HDREnvironment).

- About playing music, can read [this document](https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic).

- How to make a game into 60 fps, can read [this document](https://spector.babylonjs.com/#thirdpartydemossection).

- [Royal Skies](https://www.youtube.com/watch?v=f6vgICNCVxQ&list=PLZpDYt0cyiuu-sxJKbuYh8OjtgmXNacCV&ab_channel=RoyalSkies) provides a series of tutorial about blender 2.8.

- [Grant Abbitt](https://www.youtube.com/user/mediagabbitt) also provides a blender 2.8 course.

- [3D Animation Hub](https://www.youtube.com/watch?v=VvTEovuTCgA&ab_channel=3DAnimationHub) provides a series of making 3D player animation.

- [Jayanam](https://www.youtube.com/watch?v=0PkBq9NW7K8&ab_channel=Jayanam) also provides an animation tutorial.

- [MortMort](https://www.youtube.com/watch?v=uOyiZaioX1U&t=19s&ab_channel=MortMort) provides a pixel art tutorial.

The following links are about game resources.

- [open game art](https://opengameart.org/), including models and audios.

- [freesound](https://freesound.org/), provides free audios.

- [earslap](https://earslap.com/page/circuli.html), provides music game ideas.

- [a nice 3D Chinese art](https://sketchfab.com/3d-models/the-vast-land-733b802f5a4743ef99ad574279d49920)

## Ubuntu

This week I went back from PC to linux, because the weather is getting hotter, causing my PC to overheat.

ImmersedVR is compitable with Linux, just need to install libfuse2, and 
[v4l2loopback-dkms](https://installati.one/install-v4l2loopback-dkms-ubuntu-20-04/) for virtual camera. This is an [article](https://linux.how2shout.com/how-to-create-desktop-shortcut-for-an-appimage/) about add AppImage pacakge to favorite bar.

The input method, iBus, needs restart after installed.

Can use piper to config logitech mouse.

Keep using Xorg as display server is a good choice, most Apps, like xrandr are based on Xorg. Only Waydroid is not compitable with Xorg.

## ultra-copier

When copying files, some devices can be overheat.[ultra-copier](https://ultracopier.herman-brule.com/) can be used as a stable and fast copy tool.

## Text to speech

I'm using [OtterAI](https://otter.ai/home) to transpile podcasts to content. Using these scripts to practice English.

## Nx

I'm starting learning [react-babylon](https://brianzinn.github.io/react-babylonjs/) in a deep dive. Using Nx as a monorepo utility. I suggest this [tutorial](https://nx.dev/core-tutorial/01-create-blog).

keep remembering to add `package.json` and a name a version to the lib.

## JS animation library

[react spring](https://www.react-spring.dev/) supports react and threejs.

[framer motion](https://www.framer.com/motion/) seems only support react.

Babylon has it's own animation system.

## ORM

[Drizzle](https://orm.drizzle.team/), suggested by Syntax FM. Haven't tried.