---
type: post
category: tech
---

# VSCode 作为 C 语言 IDE

很简单，只需要添加微软的"C/C++"和"Code Runner"两个插件，本地再安装 MinGw（如果安装了 MSYS2 也可以），把 bin 文件夹添加到系统的 PATH 环境变量里面（一定是系统的不是本地的）。

然后在 VSCode 设置中，给 Code Runner 添加 run in terminal，以实现输入功能。
