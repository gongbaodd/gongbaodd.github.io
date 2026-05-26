---
type: post
category: tech
tag:
    - xr
    - x11
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1778172300/vr_uzatx9.webp
    alt: wivrn
---

# Develop XR in Linux

As I have partially migrated my workflow to **Linux** 🐧, I wanted to explore whether the ecosystem is ready for **XR development** 🥽. Here is a summary of my findings.

## 🛠 System APIs & Sandboxing

In Linux, **OpenXR APIs** function as system-level APIs. This means if your development tools or apps are running in a sandbox (e.g., **Flatpak** 📦), you will likely encounter additional configuration hurdles.

## 🎮 SteamVR

I installed **Steam** via `pacman` on **CachyOS** 🔵. 

* **Setup:** Requires a system restart after installation to function correctly.
* **Performance:** The SteamVR interface feels consistent with the Windows experience, though I haven't performed deep stress tests yet.

## 🔗 WiVRn: The Lightweight Alternative

I tested [WiVRn](https://github.com/WiVRn/WiVRn), which acts as a lightweight equivalent to Oculus Link for Linux ⚡. 

* **Result:** It successfully connects with **Godot** 🤖.
* **Configuration:** You must set the following environment variable to point to the correct runtime:
    `XR_RUNTIME_JSON=/usr/share/openxr/1/openxr_wivrn.json`

## 🏗 Game Engines: Unity & Godot

* **Godot:** Works well and feels more stable on Linux than on other platforms 🟢. 
* **Unity:** Currently a "no-go" ❌. I attempted to use [this solution](https://github.com/Stridemann/Unity-XR-on-Linux-for-Meta-Quest), but it failed. The issue appears from Unity's specific dependencies, it used an Android version not a common Linux version.
* **Unreal Engine (UE):** Not yet tested ⏳.

## 🖥 Screen Mirroring

I looked for ways to mirror my desktop to the headset:

* **WayVR:** I attempted to use [WayVR](https://github.com/wayvr-org/wayvr) alongside WiVRn. While there were no error logs, the headset remained blank 🌑.
* **Workaround:** For now, using an **HDMI capture card** 🔌 is a more reliable solution for monitoring.
* **X11 (Working Workaround):** To fix this, I reverted to an Xorg session by installing the X11 packages:

```shell
sudo pacman -S plasma-x11-session kwin-x11 xorg-server
```

Logging into the Xorg environment allows WayVR to run correctly. Once inside the headset, look at your left wrist while holding the controller, and click the DP1 button to view and select the desired desktop window.

## 📝 Conclusion

Yes, **XR development on Linux** is possible, specifically with **Godot** 🛠️. However, the overall experience is not as seamless as on Windows. If you are committed to the Godot ecosystem, Linux is a viable host environment.

<iframe width="315" height="560" 
        src="https://www.youtube.com/embed/3sBtgYangI4" 
        title="Developing VR in Linux #godot #gamedev #cachyos #antigravity" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
</iframe>
