---
type: post
category: tech
---
# Windows下为Rust提供QT环境（弃）

QT的部署要比GTK容易一些，然而由于最近我的机场流量用尽，所以最大的困难就是网络。

参考[Rust-qt](https://github.com/rust-qt/examples)，有比较详细的环境配置。需要下载完整的[Qt安装包](https://www.qt.io/download)和[Visual Studio 2017](https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=Community&rel=15)（最好用2017，能少踩不少坑）。

安装成功后，在环境变量PATH里面增加```C:\Qt\Qt5.14.1\5.14.1\msvc2017_64\bin```然后找到VS2017的命令行，只有这个命令行能准确编译QT5。

虽然按照Rust-qt的做法，C++的QT可以完美运行，但是编译的时候要使用gcc，所以还是要安装msys2，而且对QT要求的版本也比较苛刻，因此我决定就此放弃QT（即使QT已经能跑在web-assembly上面了）。

## Rust相关的UI框架

其实还有一篇文章关于Rust的UI编程的，可以查看[这篇文章](https://gitlab.com/bloom42/research/rust_gui_ecosystem)。

