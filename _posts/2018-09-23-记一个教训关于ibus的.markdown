---
type: post
category: fe
---
# 记一个关于 iBus 的教训

大概今年开始，chrome在linux里面就没办法正常看输入框，到了8月更惨，vscode和atom都完蛋了，完全看不到输入法的面板（也许我得考虑英文输入了）。

其实是个hidpi的问题，chromium对输入光标的位置处理和linux处理不同，导致输入法都跪了，没错，不只是fcitx。这次我就以为这是fcitx的bug，换了ibus，结果ibus其实也很多坑。

## 安装和配置ibus

linux 的profile其实比较混乱， 有.bashrc/.bash_profile/.profile/.xprofile/.environments等等，而且这些点文件在/etc中都有全局备份，所以要检查GTK_IM_CONFIG就要挨个文件找。

记得安装ibus-table，现在gnome和ibus的整合比fcitx好，装好之后可以在setting里面切换输入法。

但是！注意，装了ibus就没有搜狗拼音了，而且并不能解决hidpi问题。无奈我又把fcitx装回来了。

## 不过并不是没有好消息

在KDE环境下面跑的vscode还是能显示的，开心
