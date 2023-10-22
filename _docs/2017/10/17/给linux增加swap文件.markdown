---
type: post
category: tech
---
# 给 linux 增加 swap 文件

> 上周末，自己写的公司的服务挂了，心疼自己几分钟。。。

事发之后看了眼服务器，好多配置被当白鼠了，比如机器都没有 SWAP，
以前都是装机器的时候习惯性分配 SWAP，还没有现挂载的经验，在此记录一下。

1. 创建分页文件（3GB）

        dd if=/dev/zero of=/opt/swapfile bs=1M count=3000

2. 格式化为 SWAP 分区

        mkswap /opt/swapfile 

3. 挂载分区

        swapon /opt/swapfile

4. 保证以后重启后自动挂载（在 /etc/fstab 增加信息）

         /opt/swapfile    swap   swap defaults 0 0

5. 重新挂载

        mount -a

> 关于执行 free -m 的提示

内存中的 buffered 和 cached 分别表示可以用来 写入/写出 磁盘的内存