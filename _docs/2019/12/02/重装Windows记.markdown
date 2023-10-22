---
type: post
category: tech
---
# 重装Windows记

![更新中](https://ws1.sinaimg.cn/mw690/89d0a2e1gy1g9jos5k3vaj23401k0hdv.jpg)

就目前来说，我有三台Windows设备，两台已经是64位，只有一台iwork8还是32位。由于一次[魔改](https://gongbaodd.github.io/tech/2019/07/24/%E5%A6%82%E4%BD%95%E9%AD%94%E6%94%B9%E4%BD%A0%E7%9A%84iwork8.html)以及为它[配置了fluent-terminal](https://gongbaodd.github.io/tech/2019/11/19/fluent-terminal%E9%80%82%E9%85%8Dgit-bash.html)，这个小本儿对我是越来越重要。

哎，其实到我这岁数，折腾装系统实在没精力，但长痛不如短痛，咬咬牙，以后就能拿64位看书了。

那么32位系统显然不足够的，这个平板的芯片是Intel Atom Z8300，是支持64位的，而且当初到手的时候是双系统，Windows+安卓，但是因为容量不足被我刷成了单一Windows系统。

官方给了两个固件，一个是32位Windows+32位UEFI，另一个是64位Windows+64位UEFI以及安卓系统。这留给我下面几个方案：

1. 用32位UEFI引导64位Windows
2. 刷双系统，删除安卓
3. 刷双系统，缩小安卓部分

## 用32位UEFI引导64位Windows

我曾经在这台机器上实现引导64位ArchLinux，只是没有触屏驱动，最终放弃。这次Windows也不是很乐观，因为Windows是闭源的，所以不知道怎么在32位机器上面编译一个64位引导，放弃。

## 双系统，删除安卓

删了安卓，发现启动还要等10秒的安卓引导...忍了。发现闲置的分区在Windows分区前面，无法扩展到现有分区里面。删了安卓重装Windows，发现没有触屏驱动，查找了一下是没有校准...找了很久也没找到校准的方法，放弃。

安装了固件里面的install.wim，发现引导搞不定（也有可能是我的u盘的质量问题，启动总提示文件损坏）。

## 缩小安卓部分

找到安卓固件里面的gpt.bin，找到000360h的d列，把它改成06，贴吧里面说是1G，经我实测是4G...
算了，最后还是给Windows省了22.5G，安装了WSL，VLC，edge，fluent-terminal，kindle，系统还剩下5G（哭，尽力了）。

好了，看书工具嘛，毕竟大部分书都放在u盘里面。话说虽说64位系统的优化对这个2G内存的机器没啥实际作用，但感觉好像快乐些呢（心理作用）。