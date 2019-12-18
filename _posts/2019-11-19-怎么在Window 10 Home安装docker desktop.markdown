---
type: post
category: tech
---
# 怎么在Windows 10 Home安装docker desktop

先说一下，在Windows上面安装docker可比Mac上面难多了，首先官网有两种docker tool，推荐的Docker Desktop竟然要求Windows Professional以上（what？）。要知道大陆没有微软官方授权的Windows Professional... 给我的选择，要么删除我的win10 home安装个破解版，或者某宝上面找了个密钥。

简单搜了一下某宝，大概可以整理出以下几个版本：

1. 英文官方密钥，有点贵

2. 不提供密钥，提供破解方法（这种人怎么不去死）

3. OEM密钥，不知道能不能用来升级

4. 批量安装密钥，这个比较坑，你当时激活成功几个月后可能会被revoke

最后决定...算了，用我的正版Home好得不得了。其实docker需要win10 pro的Hyper V来虚拟化Windows container，早说嘛，我又不用Windows container。那么问题就是要欺骗docker安装包我的机器是win pro就好了呗。

将以下命令保存为*.cmd文件并执行可以安装Hyper V。

```bash
pushd "%~dp0"

dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt

for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"

del hyper-v.txt

Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```

安装成功会提醒重启计算机，启动成功后不要着急安装，还要修改一处注册表。

```
REG ADD "HKEY_LOCAL_MACHINE\software\Microsoft\Windows NT\CurrentVersion" /v EditionId /T REG_EXPAND_SZ /d Professional /F
```

好了起码对于docker来说，这就是台win10机器了，接下来正常安装一直下一步，如果你的机器支持docker的话（虽然这句话有点多余，但是我有三台机器，只有一台跑起来docker了），每次启动机器会带起来docker。
