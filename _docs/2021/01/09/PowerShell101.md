---
type: post
category: tech
tag:
  - powershell
series:
  name: Windows舒适指南
  slug: windows-howto
---

# Powershell 101

已经打算学习 Powershell 很久了，然而工作时间使用的是 Mac，所以往往觉得 bash 已经足够了，即使 Windows 下面 WSL 和 MSYS 总能解决。但是经历了这次 ReactNative 编译失败的经验之后，我马上意识到什么叫做原生的好（尤其是在网络环境极其严苛的情况之下）。

学习 Powershell 的资源相比 bash 还是比较少的，基本上也是靠社团驱动。社团驱动虽然活跃性高，出现的问题还是比较明显的，比如 bash 就有两种写法...那么 Powershell 除了本身的.Net 支持同时支持 shell 语法就更加艰难了。

「Powershell 101」是微软官网推荐的书籍，其实是一次分享的幻灯片 PDF，我在网上还没有找到分享视频，不过光看文档还能了解一二。

## Cmdlet

Cmdlet 是 Powershell 下的命令，通过「动词-名词」组成如`Get-Process`和`Get-Help`，可以通过使用`Get-Verb`获取到动词都有哪些。

## 变量

和 PHP 类似，powershell 变量使用\$做标识。

```powershell
$i = 42; $i # 控制台输出42
```

同时，和 bash 不同的是，Powershell 中的命令返回的是对象。

```powershell
$count = (ls ./).count # 控制台输出当前目录文件个数
```

## profile

和 bash 的 profile 类似，powershell 也有类似于`bashrc`的东西。每个系统有 4 个 profile 文件。

- 每个用户的单一 powershell 端
- 所有用户的单一 powershell 端
- 每个用户的所有 powershell 端
- 所有用户的所有 powershell 端

## 工具

安装`posh-git`来自动提示`git`和`oh-my-posh`来美化界面。

```powershell
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
```

修改`$profile`并且引入这两个包，并设定 oh-my-posh 的主题。

```powershell
Import-Module oh-my-posh
Import-Module posh-git
Set-Theme Robbyrussell
```

另外，系统可能禁止执行外部代码，造成上面的脚本无法执行，此时需要在管理员模式下面修改规则。

```powershell
get-executionpolicy # 可能输出 Restrictrd
set-executionpolicy remotesigned
```
