---
type: post
category: tech
tag:
  - rust
  - qt
---

# Windows 下为 Rust 提供 QT 环境（弃）

QT 的部署要比 GTK 容易一些，然而由于最近我的机场流量用尽，所以最大的困难就是网络。

参考[Rust-qt](https://github.com/rust-qt/examples)，有比较详细的环境配置。需要下载完整的[Qt 安装包](https://www.qt.io/download)和[Visual Studio 2017](https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=Community&rel=15)（最好用 2017，能少踩不少坑）。

安装成功后，在环境变量 PATH 里面增加`C:\Qt\Qt5.14.1\5.14.1\msvc2017_64\bin`然后找到 VS2017 的命令行，只有这个命令行能准确编译 QT5。

虽然按照 Rust-qt 的做法，C++的 QT 可以完美运行，但是编译的时候要使用 gcc，所以还是要安装 msys2，而且对 QT 要求的版本也比较苛刻，因此我决定就此放弃 QT（即使 QT 已经能跑在 web-assembly 上面了）。

## Rust 相关的 UI 框架

其实还有一篇文章关于 Rust 的 UI 编程的，可以查看[这篇文章](https://gitlab.com/bloom42/research/rust_gui_ecosystem)。
