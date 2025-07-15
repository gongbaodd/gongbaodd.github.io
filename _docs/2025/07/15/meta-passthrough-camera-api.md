---
type: post
category: tech
tags:
    - passthrough
    - XR
---
# Meta Passthrough Camera API

[This](https://www.linkedin.com/posts/jian-gong-27762aa8_xr-ai-unity-activity-7350859290649260032-w7Ve?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAABbfrvsBTcTEUXNxHWRnwteYn_q03d2U-nw) is me trying Meta's Passthrough Camera API.

You can find the code [here](https://github.com/oculus-samples/Unity-PassthroughCameraApiSamples.git). It uses [Unity Sentis](https://unity.com/products/sentis) to run a YOLOv8 model for object detection.

The API is also available for spatial SDK. [Meta Spatial Scanner](https://github.com/meta-quest/Meta-Spatial-SDK-Samples/tree/main/Showcases/meta_spatial_scanner) uses ML kit as Object Detection API, and you have to build an AWS server to run a LLama model for vision invocation.