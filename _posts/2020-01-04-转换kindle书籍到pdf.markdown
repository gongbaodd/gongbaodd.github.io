---
type: post
category: tech
tag:
  - kindle
---

# 转换 kindle 书籍到 pdf

自从习惯用讯飞听书之后，我就很少看书了。如果是 pdf 的话，就在 Windows 上面拿 edge 读给我听，可问题是 kindle 上面很多书加了设备锁，只能在 kindle 上面看，而 kindle 的 TTS 功能实在太差，查了一下，Calibre 是有[DeDRM 插件](https://github.com/apprenticeharper/DeDRM_tools)的。

解压缩插件，在 Calibre 中点击首选项->插件->从文件加载插件，选中解压好的 zip 文件。

之后在插件中找到 DeDRM，把自己的产品序列号输入进去（在亚马逊我的设备中可以找到），之后转换 azw 文件就不会有问题了。
