---
type: post
category: tech
tag:
  - windows
series:
  name: Windows舒适指南
  slug: windows-howto
---

# Barrier 和 DeskDroid 实现苹果的 Universal Control

今天被人显摆了苹果的 Universal Control 了，作为跨屏协同用了这么久的我，为啥不显摆一下我现有的桌面配置呢？

DeskDroid 的最新版本是可以和 Barrier 集成的，需要在设置中选择集成到 barrier，会有提示提醒如何把现有机器配置到 barrier 的设置里。

由于 DeskDroid 基于 adb，可以很简单实现 adb 的无线连接

```shell
adb devices # 展示现在有线连接的设备
adb tcpip 5555 # 打开设备无线的5555端口，成功后可以断开有线了（如果有多台设备连接，需要用-s指定设备）
adb connect ${DeviceIP}:5555
```

现在就可以实现全局操控了。
