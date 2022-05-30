---
type: post
category: tech
tag:
  - windows
series:
  name: Windows舒适指南
  slug: windows-howto
---

# WSL2加载虚拟硬盘

在最新版的Windows11中，WSL2新增了[mount参数](https://docs.microsoft.com/zh-cn/windows/wsl/wsl2-mount-disk
)可以加载虚拟硬盘了。

依过去的经验WSL经常会更新崩溃，所以开发的时候我会把代码仓库和系统放在两个分区里，然而在Linux中操作NTFS是非常慢的，最好是新建一个Ext4的虚拟硬盘，再挂载到Linux中。

在Windows的磁盘管理可以新建`.vhdx`文件（默认新建好会自动挂载，以后双击文件也可加载硬盘），然后使用Diskgen将这个磁盘分区并格式化成Ext4格式。

接着在Powershell执行`GET-CimInstance -query "SELECT * from Win32_DiskDrive"`查看挂载的硬盘DiskPath，紧接着管理员执行`sudo wsl --mount <DiskPath> --bare`将硬盘挂载到WSL中。

进入Linux里面，执行`lsblk`查看新加载的分区如sda3，新建文件夹`work`，并把这个分区挂在上去`sudo mount /dev/sda3 work`，完成。

Ext4的磁盘格式比NTFS快得不是一星半点，只可惜这些都只能在Windows11中实现，而且目前还没有更好的自动化实现方案。