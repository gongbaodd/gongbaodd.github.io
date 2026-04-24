---
type: post
category: tech
tag:
    - linux
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1777048975/1080x360_culme4.jpg
    alt: cachyos
---

# Week 16: CachyOS

After three years of stable Windows usage, I have decided to return to Linux. 🐧

### The Backstory

I originally moved to Windows because of the efficiency of **WSL2**. At that time, I abandoned the Linux desktop because the transition from **X11 to Wayland** caused severe software compatibility issues. Additionally, my laptop hardware had better driver support on Windows. 💻

### The Breaking Point

Recently, Windows has become increasingly buggy. While previous versions introduced useful features like Android app support, recent updates seem to bring only bugs. My laptop's fan noise became unbearable, forcing me to wear noise-canceling headphones just to work. 🎧 After using a **Mac Mini** for two months, I realized how much I missed a quiet working environment. 🔇

### The Journey Through Distros

1.  **Nobara / Fedora**: I previously used Nobara 38 (Fedora-based) for macOS VM development. However, attempting to install Nobara 43 or Fedora 43 resulted in "out of memory" errors. ❌

2.  **Pop!_OS**: Based on Ubuntu 24.04, I enjoyed the **COSMIC** desktop's tiling functionality. However, since it uses Wayland, X11-based apps like Unity and Discord suffered from massive font scaling issues. 🔎

### Discovering CachyOS

I eventually found [CachyOS](https://wiki.cachyos.org/), which is based on **Arch Linux**. 🏔️ 

* **Niri Desktop**: My first attempt used the Niri scrollable panel. Like COSMIC, it faced Wayland-related scaling issues.

* **KDE Plasma**: I switched to KDE for its flexibility. Although my GPU no longer supports X11 natively, I managed X11 app scaling using environment variables: `GDK_BACKEND=x11 GDK_SCALE=2`. It is not perfect (fonts are often either too large or too small), but it is functional. ⚖️

I used [BTRfs](/plan/2024/02/04/week-5-expo-go) but I never knew that it takes snapshots, so that if the system crashed, I can go back to one snapshot. 

### Hardware & Performance

For my ASUS laptop, the community-developed `asusctl` and `ROG Control Center` allow me to manage hardware features, though the **ASUS Dial** remains unsupported for now. 🛠️ 

CachyOS simplifies GPU management with the `prime-run` command. While I still have to manually trigger the GPU for specific apps rather than relying on automatic switching (e.g., for browser video playback), the trade-off is worth it. 🔋

### Conclusion

I still have a lot to configure, but for now, I am prioritizing my Master's thesis. Most importantly: my laptop is finally **fan-free and quiet**. 🍃