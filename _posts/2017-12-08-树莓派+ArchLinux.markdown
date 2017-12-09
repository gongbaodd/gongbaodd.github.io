---
type: post
category: tech
---
# 树莓派+ArchLinux

大概是今年五月份吧,我的树莓派2又一次吃灰了,
之前用来当AP, 可是 Tenda U1 的驱动(RTL8192EU)需要配合新内核编译,
毫无意外的编译失败了, 反正也不想折腾了, 就让它吃灰了.

最近收拾东西, 发现了在吃灰的树莓派, 想想干脆拿出来刷上 Arch,
就当 rust 的编译环境吧.

wlan就用水星的吧, 起码不用编译驱动了.

安装方法很简单, 照这个链接做就好

https://github.com/phortx/Raspberry-Pi-Setup-Guide

ArchLinuxARM 不是像 Raspbian 那样烧录的,
所以要下载好 tar 包, 解压到 SD 卡里.

个人经验, 因为国内读卡器真的不咋地,
最好先解压到本地在复制过去.

另外 aliyun 没有 ArchLinuxARM 的源,
但是可以使用清华的源.