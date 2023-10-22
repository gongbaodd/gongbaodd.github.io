---
type: post
category: fe
tag:
  - cypress
  - Windows
  - WSL2
  - MSYS
  - VcXsrv
---

# Windows 下面搞 Cypress 真心不容易

最近在忙活让网站使用 [Cypress](https://www.cypress.io/) 做测试，之前使用苹果电脑以及 Linux 下面用起来还不错，这次在 Windows 下面碰壁比较多（其实我国的网络也有一部分功劳），所以在这里记录一下。

## 尝试使用 WSL（失败）

WSL 可以使用 XServer，所以我打算在 WSL 下面搭建，需要安装 [VcXsrv](https://sourceforge.net/projects/vcxsrv/) ，启动之后一路下一步就可以了，最后将 WSL 显示映射上去（在 bashrc 里面添加下面代码）。

```shell
# Display
export DISPLAY=localhost:0
sudo /etc/init.d/dbus start &> /dev/null
```

另外需要把用户加到 sudoers 里面，否则每次启动还要输一遍密码

```shell
sudo echo "{user} ALL = (root) NOPASSWD: /etc/init.d/dbus" >> /etc/sudoers.d/dbus
```

然而，失败了，启动程序会报 GPU 渲染错误，同样的操作在 WSL2 中依然不行，可是[网络中有人成功了](https://nickymeuleman.netlify.com/blog/gui-on-wsl2-cypress/)。

我相信更多的原因在于编译的时候网络环境太差了。

## 尝试使用 MSYS

直接跑 Windows 原生应用除了运行起来会更快，还可测试如 Edge 等浏览器，[MSYS](https://www.msys2.org/) 安装起来很简单，软件仓库管理使用的是 pacman，安装源可以尝试华中科大和清华的。

```ini
# C:\msys64\etc\pacman.d\mirrorlist.mingw32
Server = http://mirrors.ustc.edu.cn/msys2/mingw/i686/
Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/mingw/i686/
```

```ini
# C:\msys64\etc\pacman.d\mirrorlist.mingw64
Server = http://mirrors.ustc.edu.cn/msys2/mingw/x86_64/
Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/mingw/x86_64/
```

```ini
# C:\msys64\etc\pacman.d\mirrorlist.msys
Server = http://mirrors.ustc.edu.cn/msys2/msys/$arch/
Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/$arch/
```

另外需要在「控制面板>系统安全>系统>高级系统设置>环境变量」中增加`MSYS2_PATH_TYPE`值为`inherit`，这样 MSYS 里面的 PATH 就是用的是系统的 PATH 了。

如果习惯使用 WWindows Terminal，可以尝试这个[issue](https://github.com/msys2/MSYS2-packages/issues/1684)，在 Windows Terminal 里面运行 MSYS。

```shell
$ cat .ms-terminal/wt-msys2.cmd
@echo off
setlocal

rem To activate windows native symlinks uncomment next line
set MSYS=winsymlinks:nativestrict

rem Shell types
if "x%~1" == "x-msys2" set MSYSTEM=MSYS
if "x%~1" == "x-mingw32" set MSYSTEM=MINGW32
if "x%~1" == "x-mingw64" set MSYSTEM=MINGW64


rem Shell types
rem set MSYSTEM=MSYS

C:\msys64\usr\bin\bash.exe --login -i

exit /b 0
```

```json
{
  "guid": "{e129fe71-3c94-40b5-8d92-961a3248f175}",
  "commandline": "C:\\\\msys64\\home\\gongb\\wt-msys2.cmd",
  "name": "MSYS2",
  "startingDirectory": "%USERPROFILE%",
  "icon": "ms-appx:///ProfileIcons/{0caa0dad-35be-5f56-a8ff-afceeeaa6101}.png",
  "useAcrylic": true,
  "acrylicOpacity": 0.75
}
```

Windows 下面的开发环境配置比较困难的原因之一就是这些链接库，比如安装一个`libpng-dev`，可以使用 Visual Studio Toolchain，也可以使用 MSYS，还可以使用微软开源的 VCPKG，然而没有一个体验能够达到极致。这导致 Gatsby 在我国的网络下永远不能部署成功。

但是，直接在官网下载下来二进制包再进行[安装](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Install-binary)也是可以的。

```shell
CYPRESS_INSTALL_BINARY=/local/path/to/cypress.zip npm install cypress
```

这样就可以运行 Cypress 了。

## 最佳实践

由此可知，其实 Cypress 可以在 Windows 下面原生执行，那么可以单独使用一个代码仓库管理测试用例，如本博客的测试用例放在[这里](https://github.com/gongbaodd/cy-blog.gongbusang.com)，在持续集成的时候将代码下载下来测试即可。
