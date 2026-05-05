---
type: post
category: tech
---

# Steam Segmentfault on CachyOS

It is because in Nvidia 500 driver uses GSP (GPU System Processor). It moves driver logic to GPU. While Steam reads from the old logic and hangs out.

Just close that feature.

``` ini
# sudo nano /etc/modprobe.d/nvidia-gsp.conf
options nvidia NVreg_EnableGpuFirmware=0
```

Update kernel and reboot.

```
sudo update-initramfs -u
sudo reboot
```