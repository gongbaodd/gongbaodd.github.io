---
type: post
category: plan
tag:
    - Unity
    - OVR
    - Meta-SDK
    - SPAR3D
    - Gen-AI-3D
---
# Week 6: Unity VR

## Unity VR

This week, I went back to finish my Unity pathway. Now, it is VR part. Funny thing, during trying the unityVR, my headset driver updated from v72 to v74. My headset was still v72. It caused a severe problem. I cannot debug my game until I update the headset to v74. However, v74 is a beta version. I have to stay in the waitlist to get the update.

After update, I got a new idea of using meta building blocks to speed up. But meta building blocks is not built for Unity VR. It was built for OVR. I found this Youtube account [Game5D](https://www.youtube.com/@Game5DOfficial/videos). He made a series of Meta SDK tutorials and they are very useful.

## Unity AR

Then I started Unity Facial AR with ARcore. However, because ARcore provides less functions than ARkit. Many effects like winking and opening mouth were not working. I am thinking to combine mediapipe with it.

## Stable Point Aware 3D

Few weeks ago, I mentioned LumaAI can generate 3D with content. This week I found this [SPAR3D](https://huggingface.co/spaces/stabilityai/stable-point-aware-3d), made by StabilityAI. Using this can make 3D object base a 2D image, and it is opensourced can be build offline.