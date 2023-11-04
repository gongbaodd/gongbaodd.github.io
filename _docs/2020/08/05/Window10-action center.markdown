---
type: post
category: tech
---
# 解决Windows10的action center无法打开的问题

最近打开平板发现任务栏右下角的事件中心无法打开了，不仅如此，连wlan、声音大小、省电中心都不能打开了，简单的查了一下，或许是因为升级之后uwp注册出错了，需要重新注册，管理模式打开powershell输入以下命令重新注册应用。

```
Get-AppxPackage | % { Add-AppxPackage -DisableDevelopmentMode -Register “$($_.InstallLocation)\AppxManifest.xml” -verbose }
```