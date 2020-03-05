---
type: post
category: tech
---

# Windows 下为 Rust 提供 GTK 环境

Windows 下面安装 GTK 环境有两种方法，借助 msys2 的 linux 环境，或者借助 VCPKG 安装 Windows 的 GTK 依赖。

尝试了一下，msys2 并没有成功，只能使用 VCPKG，参考[gnome 编译指南](https://www.gtk.org/download/windows.php)。

```batch
git clone https://github.com/Microsoft/vcpkg
cd vcpkg
.\bootstrap-vcpkg.bat
vcpkg install gtk:x64-windows
```

安装的时候发现不能编译成功，此时需要祭出 Visual Studio 大法，找到 Visual Studio Installer，安装 C 工具链，再重新执行上面的代码即可。

然后再环境变量中增加`GTK_LIB_BASE`值为`c:\MyWorks\github\vcpkg\installed\x64-windows\lib`(就是 vcpkg 下载依赖包的位置)

环境变量中的 PATH 的第一个值也要配上`c:\MyWorks\github\vcpkg\installed\x64-windows\bin`。

如果 rust 项目还编译不成功，尝试将 vcpkg 里面的/lib/gdk-3.lib 和/lib/gtk-3.lib 连接到/lib/gdk-3.0.lib 和/lib/gtk-3.0.lib，bin 文件夹下的 dll 文件也一样处理。

再次运行`cargo run`即可，[相关代码](https://github.com/gongbaodd/rust_webAssembly_study/tree/master/rust_gtk)。

最初想试一下 rust-gtk 的原因是，想试试这个跨平台框架如何，但是在 Windows 下面效果并不怎么样，而且还有 HIDPI 的问题，Reddit 里面讨论感觉 gtk 这边也没有很着力于 rust，所以对 GTK 的探究就暂时到此为止了。
