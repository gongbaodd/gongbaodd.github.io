---
type: post
category: tech
tag:
  - powershell
---

# 用 Powershell 更新 Windows

发现已经半个月没有被 Windows 更新打扰了，原来是一个累积更新挂了，我发现在图形界面下面怎么更新都失败，于是寻思在命令行执行。

在 powershell 中有一个包 PSUpdateWindows 可以派上用场。

```powershell
Install-Module PSUpdateWindow

Get-WindowsUpdate #下载更新

Install-WindowsUpdate #安装更新
```
