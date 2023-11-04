---
type: post
category: tech
tag:
  - WxWidgets
---

# 在学习大概一周的 wxWidgets 之后，我决定放弃了

之前我冲浪的时候看到了[这篇博客](https://zetcode.com/gui/wxwidgets)，一下子勾起了我关于古早味的 UI 开发的兴趣，照着里面的教程，在 Linux 下面学习很顺利，唯一小坑就是 Ubuntu-22.04 里面的`libwxgtk3.0-dev`改名为`libwxgtk3.0-gtk3-dev`，另外还需要设置环境变量`export wxWidgets_ROOT_DIR=/usr/lib/x86_64-linux-gnu/wx`。

然而到了 Windows 下面就没有那么顺利了，当然，我个人反思一下，如果使用 MSYS2 或者 mingw，虽然慢点，但应该和 Ubuntu 下面差不多，然而，想要尝试顺滑编程体验的我最先选择 VSCode + CMake + conan + ninja 作为技术栈。

第一个坑，conan 的官方仓库没有 wxWidgets，小问题我马上找到了 bincrafters 仓库 https://bincrafters.jfrog.io/artifactory/api/conan/public-conan。配置好发现没有支持VS2019的x64二进制文件......好说，执行`conan install --build-missing`，后面发现编译不成功，少一堆依赖。

算了，编译那么大的项目比较麻烦，官网给了直接下载二进制包的方法啊，配置好`wxWidgets_ROOT_DIR`，执行 cmake 一直提醒 find_package(wxWidgets)不成功，我几乎把[文档](https://docs.wxwidgets.org/trunk/overview_cmake.html)里面的所有变量都处理了个遍，就是不行。

好吧，可能是技术栈的问题，我看大部分用 Windows 的都是 VS2019 开发，于是把技术栈改成 VS2019+vcpkg，别说各种帮助方法，如 wxPuts 都能使用了，可 GUI 编译不过。

寻思这既然 vcpkg 都能编译过去了，那我直接把源文件当成 subdirectory，用之前的技术栈不是也能成？果然也是 GUI 编译不通过。

太难过了，古早味的跨平台 GUI 开发真辛苦...
