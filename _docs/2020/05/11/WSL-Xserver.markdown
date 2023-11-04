---
type: post
category: tech
tag:
  - windows
  - wsl
  - vcxsrv
series:
  name: Windows舒适指南
  slug: windows-howto
---

# WSL 下运行 Xserver 鼠标太小

不太清楚是不是 HIDPI 造成的，在 VcXsrv 下面的鼠标指针及其小。解决方法只能是换一个看起来大一些的鼠标。

```shell
sudo apt-get install big-cursor
```

接下来，重命名 VcXsrv 下面的`font/misc`（比如`C:\Program Files\VcXsrv\fonts\misc)`）的`cursor.pcf.gz`为`cursor-small.pcf.gz`。

然后将刚才安装在 wsl 中的`/usr/share/fonts/X11/misc/big-cursor.pcf.gz`拷贝到上面的目录下，并重命名为`cursor.pcf.gz`。

重启 VcXsrv 即可。
