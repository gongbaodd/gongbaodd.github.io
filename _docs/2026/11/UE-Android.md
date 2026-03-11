---
type: post
category: fe
tag:
    - UE
---
# Android Packaging in UE 5.7

As I mentioned yesterday, I was working on a Unreal Engine game for Quest 3. 🎮 I used to package Unity and Godot games for Quest 3, but I haven't kept up with it. Most of the old toolchains are no longer usable, so I had to redo them. It is still a new experience since it is my first time using UE. 🆕

I was basically following [this](https://youtu.be/Wgh_-yA-Dp8?si=X-Ce_vaZKT0Xn7S7) video, although some of the content is also outdated. 📺

First, make sure there are no redundant Android Studio versions installed on your device. 💻

In `Project Settings -> Android SDK -> NDK-API`, I entered `android-32`. For the SDK API, I tried `matchndk`, but it caused a crash. 💥 I tried `android-32` and it works fine. ✅

The latest Android command line tool is packaged as a zip file, but Android Studio only reads gzip (you will see an error when installing it). You can manually unzip the file in the SDK folder. 📂

The Android SDK has to be 34. This is the current Horizon OS Android version. Use the following command to check the Android SDK version: 🔍

```shell
adb shell getprop ro.build.version.sdk
```