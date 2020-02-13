---
type: post
category: tech
---
# Windows下为Rust提供QT环境

QT的部署要比GTK容易一些，然而由于最近我的机场流量用尽，所以最大的困难就是网络。

参考[Rust-qt](https://github.com/rust-qt/examples)，有比较详细的环境配置。需要下载完整的[Qt安装包](https://www.qt.io/download)和[Visual Studio 2017](https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=Community&rel=15)（最好用2017，能少踩不少坑）。

安装成功后，在环境变量PATH里面增加```C:\Qt\Qt5.14.1\5.14.1\msvc2017_64\bin```然后找到VS2017的命令行，只有这个命令行能准确编译QT5。