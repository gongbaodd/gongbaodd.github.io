---
type: post
category: fe
series:
    name: Grandpa's bee Haven
    slug: grandpa-bee
tag:
    - Unity
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1791055906/Screenshot_20261003_222923_b8j5ww.png
    alt: lights
---

# Lights in Pixel Art Games

The story is, I was watching some Youtuber introducing how to add Light2D in Unity. I thought it was easy (It was not). 

At the same time, there is a problem in [Grandpa's Bee Haven](https://store.steampowered.com/app/3209160/Grandpas_Bee_Haven/). Players are not playing on the two unlocked maps. Our team made a decision to add two signals to lead player build new game with new maps.And I decide to add a light effect in it.


![Before](https://res.cloudinary.com/dmq8ipket/image/upload/v1791055906/Screenshot_20261003_222940_a1vi9a.png)


![After](https://res.cloudinary.com/dmq8ipket/image/upload/v1791055906/Screenshot_20261003_222923_b8j5ww.png)

## Lights 2D

I added a point [Lights 2D](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@7.1/manual/Lights-2D-intro.html) in the child of the sign. When hovering on it, it will active the child. 

But only the [Sprite-Lit-Default](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@7.1/manual/PrepShader.html) can show the highlight effect.

But only highlights, no shadows... wow, 2D is obviously harder than 3D in this circumstance.

## Shadow

![Shadow version 1](https://res.cloudinary.com/dmq8ipket/image/upload/v1791057160/image_y2nllf.webp)

The shadows, in version 1, they were triangles, calculated base on the light source position, mouse position, the Game Object's height. put together into one gameObject.

Then I added curve endings and fade out, so the triangles are not very obviously.

## Sun rays

![beam v2](https://res.cloudinary.com/dmq8ipket/image/upload/v1791057121/f35a8cd4-758f-4259-8cc7-8af8c0708a27_hktbfj.png)

I almost gave up the beam. What you see is the 2nd version sun rays, which is vibe coded with some shader. I was thinking too much. I asked the agent to allow trees to obstruct the rays. Eventually, the result is not as expected.

![beam](https://res.cloudinary.com/dmq8ipket/image/upload/v1791055906/Screenshot_20261003_222923_b8j5ww.png)

What you see in the final result, is a png, that covers the scene.

## Conclusion

It is a great learning experience to know how to make lights in 2D pixel games. And if you are playing [Grandpa's Bee Haven](https://store.steampowered.com/app/3209160/Grandpas_Bee_Haven/). You can try to find this easter egg.