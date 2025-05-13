---
type: post
category: tech
tag:
    - UE
---

# Building Unreal Engine

I always wanted to use Unreal Engine on web. But I heard that it stopped supporting web after 4.23. However, there is a community project [UnrealEngine-HTML5-ES3](https://github.com/SpeculativeCoder/UnrealEngine-HTML5-ES3). This project provides support until 4.27. And they are still working on 5.5 base on the log.

There is also a Chinese one, [UE4.27PackingH5DDoc](https://github.com/Xi3Chen/UE4.27PackingH5DDoc). The Unreal Engine source code is so big, really curious how he download it in China net condition...

However, to build this project, you need the permission of Unreal Engine source code. It is easy just connect your GitHub account to Epic Games account. I waited almost 1 week to get the permission. Then you can clone the source code. It is 8GB. And you can compile base on the README. just remember to keep a copy of any step. because every step may fail and you have to go back to the last step. The finally build product will be over 100GB.

However, I finally go back to 4.23, because the build one is so unstable on my computer. I suppose I will study first then go back to try it. Maybe 5.5 will support WebGPU in the future.