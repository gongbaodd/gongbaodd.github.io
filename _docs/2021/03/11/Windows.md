---
type: post
category: tech
tag:
  - windows
series:
  name: Windows舒适指南
  slug: windows-howto
---

# 让 Windows 更加频繁的同步系统时间

最近发现我的平板时钟不对，第一反应是主板电池没电了，可是拆开也没找到电池在哪，算了，干脆价格定时任务更新时间。

Windows 下面有一个 task scheduler 可以新建定时任务，在 microsoft>Windows>Time Synchronization,需要新建两个任务`%windir%\system32\sc.exe start w32time task_started`和`%windir%\system32\w32tm.exe /resync`[参考文章](https://www.pretentiousname.com/timesync/)
