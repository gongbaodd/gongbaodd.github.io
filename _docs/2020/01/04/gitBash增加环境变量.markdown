---
type: post
category: tech
tag:
  - git
---

# GitBash 增加环境变量

WSL 的运行速度比较慢，所以我在 windows 下面的开发很大一部分还是在 GitBash 下面，GitBash 基于 mingw 开发，所以直接修改.bashrc 即可

```
PATH=$PATH:/c/Program\ Files/nodejs
alias python='winpty python.exe'
alias ubuntu='winpty ubuntu.exe'
```

这里注意下，因为 python 和 Ubuntu 是从应用商店安装的，直接修改 PATH 变量会有权限问题，只能利用 winpty 调用。
