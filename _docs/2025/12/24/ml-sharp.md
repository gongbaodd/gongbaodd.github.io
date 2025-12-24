---
type: post
category: tech
tag:
    - ml
    - 3dgs
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1766575285/1748164743855_vbaxum.jpg
    alt: selfie
---

# Apple's 2D to 3D model: Sharp

Yesterday, I tried [Apple's Sharp Model](https://github.com/apple/ml-sharp). It transfers a picture into 3D guassian splatting.

<iframe width="560" height="315" src="https://www.youtube.com/embed/S6YGpulJYL4?si=bGBGro8tUGL1gmJa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The model is 2.6GB it will be cached in the first prediction, it needs several minutes to render on my laptop with CPU(I do not find way to turn on GPU build). The assets are always 63MB with 1179648 vertices. So if I am to build a service with it, it has to be an asynchronized service. Or if I use these assets, they can not be used on front end web service as they are too big, awkward... So if I were to make a service, I have to find a way to clip down the vertices into around 4MB, and think about automation.

And the model, like many other models I tried [before](/plan/2025/11/05/triplydb). It will cast me into a white guy. There are not enough asian data to train, haha.

<iframe width="560" height="315" src="https://www.youtube.com/embed/s_egz3yi63Y?si=zUJjjPGXIfhvIQo6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>