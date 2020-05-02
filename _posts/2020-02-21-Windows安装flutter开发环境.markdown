---
type: post
category: fe
tag:
  - flutter
  - dart
---

# Windows 安装 flutter 开发环境

从 chocolatey 可以直接安装 flutter。

```shell
sudo choco install flutter
```

运行成功后可以运行`flutter doctor`检查环境是否完备，比如我会有`X Android license status unknown.`报错，可以运行以下命令检查详情。

```shell
flutter doctor --android-licenses
```

发现 SDK 管理的问题，进而发现要把 JDK 降级到 8.0，好在有 chocolatey，很快就解决了。

```shell
sudo choco install ojdkbuild8
```

然后修改.bashrc 设置代理

```shell
export HTTP_PROXY=127.0.0.1:1080
export HTTPS_PROXY=127.0.0.1:1080
export NO_PROXY=127.0.0.1,localhost
```

打开 VScode，安装 flutter，打开命令面板输入`flutter new`，就可以创建工程了（然后下载了巨多文件，感觉如果写个 hello world 都要加载这么多文件真是比较坑）。

打开模拟器，在 VSCode 里面按 F5 就能实时 debug 了。
