---
type: post
category: fe
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1779451397/Screenshot_20260522_150144-1_cv61p1.png
    alt: screenshot
---

# Week 20: AngelScript

## Moving to Linux & Blueprint Testing 🐧

After switching my primary OS to Linux, I can now develop in Unreal Engine.

For Blueprint users, UE 5.7 offers an excellent [1st Hour Tutorial](https://dev.epicgames.com/documentation/unreal-engine/first-hour-in-unreal-engine). This guide is also perfect for testing the stability of the Unreal Editor on Linux. During my test, the editor only crashed twice—a highly satisfactory result compared to Windows, where my hardware fans would constantly run at maximum speed.

## Current Limitations on Linux ⚠️

I have encountered two main drawbacks with UE on Linux:

* **Platform Restrictions:** You can only compile for Linux and Android. While unofficial workarounds use Wine for cross-compiling to Windows, no official solution exists.
* **Toolchain Issues:** I cannot get the Clang toolchain to work properly with the project, which prevents C++ development.

## Why AngelScript? 📜

My primary goal for using UE on Linux is to try **AngelScript**.

When using C++ on Windows, I constantly had to compile code and restart the editor. AngelScript solves this by running a virtual machine directly inside Unreal, eliminating the compilation bottleneck.

Compared to Blueprints, AngelScript offers clear advantages:

* Better compatibility with version control systems (Git).
* Improved stability, as the Linux editor crashes frequently when editing Blueprints. I can focus entirely on coding and then test directly in the editor.

## Installation & Documentation 🛠️

There is no prebuilt version of UE with AngelScript. You must build it from the source following the [Official Installation Guide](https://angelscript.hazelight.se/getting-started/installation/).

```shell
./Setup.sh
./GenerateProjectFiles.sh
./Engine/Build/BatchFiles/RunUAT.sh BuildTarget -Target=UnrealEditor -Platform=Linux -Configuration=Development
```

* **Build Time:** The local compilation took 3 hours.
* **Stability:** The custom-built version is less stable than official prebuilt binaries. Note that projects created with this version cannot be opened using standard UE prebuilt editors.

To get started with coding, refer to the [AngelScript Introduction](https://angelscript.hazelight.se/getting-started/introduction/). The syntax is nearly identical to C++, making it easy to adopt.

## Next Steps 🖥️

I am currently building this setup on my Mac mini. Given the larger macOS developer base, I expect the environment to be more stable than Linux.