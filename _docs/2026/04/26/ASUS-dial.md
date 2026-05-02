---
type: post
category: tech
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1777273746/Screenshot_20260427_100750_d9eqxu.png
    alt: screen shot
---

# ASUS Dial on Linux

One reason I bought ASUS StudioBook Pro 16 is that it has a dial. And it was my major reason to stick on Windows. However, recently I turned to Linux and I found [openwheel](https://github.com/fredaime/openwheel) which is an open source driver for ASUS dial. 

It has no system daemon for it to run at startup. so I added these two systemd services to run it at startup. 

```ini
# cat ~/.config/systemd/user/asus_wheel.service
[Unit]
Description=OpenWheel Daemon - HID to D-Bus

[Service]
Type=simple
ExecStart=/usr/local/bin/asus_wheel
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=default.target
```

```ini
# cat ~/.config/systemd/user/openwheel-gadget.service
[Unit]
Description=OpenWheel Gadget Overlay
After=asus_wheel.service

[Service]
Type=simple
ExecStart=/usr/local/bin/openwheel-gadget
Restart=on-failure

[Install]
WantedBy=default.target
```

Give them `udev` permissions, edit `/etc/udev/rules.d/99-asus-wheel.rules`

```ini
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="0b05", MODE="0666"
```

Apply the rules with:

```bash
sudo udevadm control --reload-rules && sudo udevadm trigger
```

Enable them with:

```bash
systemctl --user daemon-reload
systemctl --user enable --now asus_wheel openwheel-gadget
```