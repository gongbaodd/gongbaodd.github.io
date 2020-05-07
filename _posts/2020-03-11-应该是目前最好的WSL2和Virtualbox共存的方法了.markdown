---
type: post
category: tech
tag:
  - WSL2
  - virtualbox
  - hyper-v
series:
  name: Windows舒适指南
  slug: windows-howto
---

# 应该是目前最好的 WSL2 和 Virtualbox 共存的方法了

因为 WSL2 使用的是 Hyper-V（看来微软爸爸并不是完全拥抱开源了），所以其它虚拟化软件都不能和它共存，所以目前最好的办法就是在开机的时候做一个切换。

```batch
bcdedit /copy {current} /d "Disable Hyper-V"
```

上面操作会生成一个 GUID，它对应开机目录上一个选项，接下来把他的 hyper-v 选项关掉

```batch
bcdedit /set {<GUID>} hypervisorlaunchtype off
```

如果本地已经关闭了 hyper-v，可以执行下面的命令打开。

```batch
bcdedit /set {<GUID>} hypervisorlaunchtype auto
```

重启的时候长按 shift 键就可以唤起启动目录了。
