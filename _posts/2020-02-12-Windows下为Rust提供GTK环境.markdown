---
type: post
category: tech
---
# Windows下为Rust提供GTK环境

Windows下面安装GTK环境有两种方法，借助msys2的linux环境，或者借助VCPKG安装Windows的GTK依赖。

尝试了一下，msys2并没有成功，只能使用VCPKG，参考[gnome编译指南](https://www.gtk.org/download/windows.php)。

```cmd
git clone https://github.com/Microsoft/vcpkg
cd vcpkg
.\bootstrap-vcpkg.bat
vcpkg install gtk:x64-windows
```

安装的时候发现不能编译成功，此时需要祭出Visual Studio大法，找到Visual Studio Installer，安装C工具链，再重新执行上面的代码即可。

然后再环境变量中增加```GTK_LIB_BASE```值为```c:\MyWorks\github\vcpkg\installed\x64-windows\lib```(就是vcpkg下载依赖包的位置)

环境变量中的PATH的第一个值也要配上```c:\MyWorks\github\vcpkg\installed\x64-windows\bin```。

如果rust项目还编译不成功，尝试将vcpkg里面的/lib/gdk-3.lib和/lib/gtk-3.lib连接到/lib/gdk-3.0.lib和/lib/gtk-3.0.lib，bin文件夹下的dll文件也一样处理。

再次运行```cargo run```即可，[相关代码](https://github.com/gongbaodd/rust_webAssembly_study/tree/master/rust_gtk)。

最初想试一下rust-gtk的原因是，想试试这个跨平台框架如何，但是在Windows下面效果并不怎么样，而且还有HIDPI的问题，Reddit里面讨论感觉gtk这边也没有很着力于rust，所以对GTK的探究就暂时到此为止了。
