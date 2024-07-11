---
type: post
category: tech
tags:
    - android 14
    - lineageOS
    - crDroid
---

# Android 14

This week I plan to flash my old phone and tablet to Android 14. They were both too old to have an official update.

## Mix2s

I am using a Galaxy Watch, meaning that I need to have an android phone to config. So I always have my Xiaomi Mix2s with me. It's android version stopped at 10. But it has a lot custom ROMs, like [lineageOS](https://lineageos.org/). With the help of lineageOS, I can upgrade Mix2s to Android 14. There are many successful cases online, I referred [this article](https://www.cnblogs.com/sindtoto/p/18103645) with its [flash tools](https://www.123pan.com/s/AVLA-vmW4h.html) and [this article](https://www.bilibili.com/read/cv27404506/) for Google Apps.

Firstly, using [the official tool](https://www.miui.com/unlock/index.html) to unlock BootLoader lock. This allows you to flash an unofficial ROM. You can follow this blog [post](https://xdaforums.com/t/guide-apply-for-permissions-to-unlock-mi-device-version-7-6-727-43.4650328/).

Then, power off the phone. While connecting the PC, press both *power on* and *volume down* to got into FASTBOOT.

In FASTBOOT mode, we can flash recovery into the phone, run the following code one by one on the PC terminal.

```shell
fastboot flash boot "boot.img"
fastboot flash recovery "recovery.img"
```

Then, press *volume Up* and run `fastboot reboot`. into recovery. In the *factory reset* menu, format every partition one by one.

Then, in *Apply update*, choose *Apply from ADB*. Flash the system from PC terminal.

```shell
adb sideload "lineage.zip"
```

Okay, now the system is ready. It's Google time. The GAPPs for LineageOS is provided in its [wiki](https://wiki.lineageos.org/gapps/).

```shell
adb sideload "MindTheGapps.zip"
```

Finally, Pair the Watch with the phone. I failed a lot, here. Eventually I reset my watch to make it work. However, I think it may because that I did not open the body tracker permission on Google Play.

Android 14 is unexpectedly fluent on this 6 years old phone. Personally, I like the material you design. It generates an unique system theme for every wallpapers. And you can choose how the icons look. Switching a theme is as easy as pressing some buttons.

## Samsung Tab A 8 (P200)

For P200, the choices can be little. I only find one ROM, which uses a remake version of crDroid called [crDroid_gsi](https://github.com/naz664/crDroid_gsi). [Here](https://www.youtube.com/watch?v=e2idVpn8dno&t=2s&ab_channel=LeeM) is a video about the ROM. After trying all the releases, I only found v10.0 is workable. Sadly, its wifi firmware constantly fail lead me to flash back to official ROM(Android 11).

Firstly, Unlock the OEM lock. This option is in the *developer options* and only work when the device is online. 

Then, power off the tablet, pressing both *volume Up* and *volume Down* to connect to the PC, the screen will go fully blue. This is extremely hard, you can follow [this youtube link](https://www.youtube.com/watch?v=Lge44OqX49c&ab_channel=HardReset.Info).

Long press *volume Up* to unlock the OEM lock, when you go back to the developer options, the *unlock OEM lock* should be grayed.

Samsung uses Odin as its flashing tool, I didn't find the link in the official site, I found it in [this blog post](https://bbs.kanxue.com/thread-276720.htm).

For the recovery, I used TWRP(TeamWin) as the recovery, there is an unofficial build version on [XDA](https://xdaforums.com/t/recovery-unofficial-twrp-for-sm-p205-tab-a-8-0-2019-exynos-model.4437071/). The source code is on [github](https://github.com/topser9/twrp_device_samsung_p205).

Use Odin to flash TWRP as an AP package. Then run `adb restart recovery` to go to TWRP, to install system image.

Android 14 runs smoothly on the tablet, except the wifi problem. crDroid add a lot custom options like reboot to bootloader, reboot to recovery. It was useful, due to the wifi problem, I still have to go back to android 11.