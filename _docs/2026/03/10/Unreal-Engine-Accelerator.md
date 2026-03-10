---
type: post
category: tech
tag:
 - UE
---

# Unreal Build Accelerator

This blog is about things that go wrong with UE 🤦‍♂️. Honestly, a lot of info online just doesn’t work, and this time was no different. So here’s what **not** to do.

I needed to do a **Unreal Engine project for Oculus**. Since UE 5.1, the engine stopped supporting the OculusXR plugin and switched to OpenXR. So I had to compile an [Oculus version of UE](https://github.com/Oculus-VR/UnrealEngine). Spoiler: I **never** managed to successfully compile [UE engine](/tech/2025/05/13/building-unreal-engine), including this time 😅.

I decided to try a **remote server**. [Hetzner](https://www.hetzner.com/) offers servers you can rent by the hour. At first, Gemini & ChatGPT suggested using **Fastbuilder**. After setting it up, the build system ignored it and used **Unreal Build Accelerator (UBA)** instead 🤷‍♂️.

Then I learned that UBA **needs a Windows server**, even though Gemini and ChatGPT both said it is made for Ubuntu to compile. Lesson learned: not everything online is true 😬.

But it’s not all lost! `%AppData%\Unreal Engine\UnrealBuildTool\BuildConfiguration.xml` saves your build settings. You can tweak things like how many cores to use. Paid 30 cents to learn this little tip… still no successful build 😭. Looks like I’ll just switch to the **OpenXR plugin**.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<Configuration xmlns="https://www.unrealengine.com/BuildConfiguration">
    <BuildConfiguration>
        <MaxParallelEntities>6</MaxParallelEntities>
        <MemoryPerActionGB>8</MemoryPerActionGB>
        <bAllowLowPriorityWorkerThreads>true</bAllowLowPriorityWorkerThreads>
    </BuildConfiguration>
    <ParallelExecutor>
        <MaxProcessorCount>6</MaxProcessorCount>
    </ParallelExecutor>
</Configuration>
```

Sad, paid 30 cents and no progress.