---
type: post
category: fe
tag:
    - XR
    - Unity
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1777044079/Screenshot_20260424_181754_elhesj.png
    alt: screen shot
---

# AR: Environment Blend

There are three types of blend mode, Opaque(true VR), Addtive(Video passthrough), Alpha(Optical passthrough) in OpenXR.

This time I will talk about AR, Augumented Reality. As the former blog I mentioned that OVR and XRI handles differently.

In OVR, new meta provides building blocks which you can one click to build video passthrough. But sadly it can only work with ISDK meaning that it shows no effect on Unity's XRI although it adds "OVR Passthrough Layer" on XR origin. 

If you are using Unity's XRI, which is the most people's choice. You need to add AR foundation package. Then add the AR session into the scene, also add AR Raycast manager into the XR Origin. And add "AR Camera Manager" and "AR Camera background" on the MainCamera.