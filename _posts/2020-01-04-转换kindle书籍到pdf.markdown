---
type: post
category: tech
---
# 转换kindle书籍到pdf

自从习惯用讯飞听书之后，我就很少看书了。如果是pdf的话，就在Windows上面拿edge读给我听，可问题是kindle上面很多书加了设备锁，只能在kindle上面看，而kindle的TTS功能实在太差，查了一下，Calibre是有[DeDRM插件](https://github.com/apprenticeharper/DeDRM_tools)的。

解压缩插件，在Calibre中点击首选项->插件->从文件加载插件，选中解压好的zip文件。

之后在插件中找到DeDRM，把自己的产品序列号输入进去（在亚马逊我的设备中可以找到），之后转换azw文件就不会有问题了。