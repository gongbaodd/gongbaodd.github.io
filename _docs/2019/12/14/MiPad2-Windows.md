---
type: post
category: tech
---
# 小米平板二代安装Windows

因为我手上的iwork8被我玩坏了，当务之急我需要一款8寸左右的小平板来看书。

市面上的平板8寸的已经不多，即使是有也大多是安卓板子。老实说，安卓做平板其实还是只能做玩具。自从灵动推出个人移动领域，用在移动端的i3886/amd64芯片就只有酷睿m系列了（而且价格不菲，这样的平板都得过千了）。

连续看了几款，包括iwork8、EZpad mini和小米平板2（注意小米只有这一款平板是Intel的），还是选择了小米平板2.

闲鱼上的小米平板2基本上由16G和64G组成，16G价格区间在250~500，64G在350~700，为了装amd64的Windows，我买了个64G版的，卖家用户密码忘了，自己不会解锁就卖出去了。

刷Windows很简单，只要一个大于6GB以及type-c的优盘，格式化成FAT32，将下面链接里面的压缩包解压到优盘，插入平板重启，系统就会自动刷Windows，刷机完成的时候记得拔出U盘，否则会重装。

```
链接: https://pan.baidu.com/s/1We2GU0JGKkeocuRbhKFw1g 
提取码: hmjf
```

安装的Windows版本比较低，需要下载Windows更新助手更新到19年11月版本，然后就会发现，网卡挂了...

不知道为什么，最新版的网卡驱动有故障，要降级，下面的链接是老版本的驱动备份，用设备管理器安装即可。

```
链接: https://pan.baidu.com/s/1GFfa_bEt4xjXDKc8ogKKLw 提取码: gpq2 
```