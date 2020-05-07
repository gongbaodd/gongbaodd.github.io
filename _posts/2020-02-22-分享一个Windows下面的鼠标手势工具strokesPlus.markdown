---
type: post
category: tech
tag:
  - windows
series:
  name: Windows舒适指南
  slug: windows-howto
---

# 分享一个 Windows 下面的鼠标手势工具 StrokesPlus

我终于还是妥协了，在使用 windows 的情况下最好还是配备一个鼠标。尤其是当你在编程的时候。并不是说触摸屏不好，在很多时候，触摸屏可以在可以帮你记录一些东西。比如让你写一些算法的时候，你可以在旁边画一画。

但是不得不说，编辑器就像 VS code。他对触摸屏的交互其实是很反人类的。另外由于我现在是三台设备。所以我的键盘是同时连着三台设备。。这说明当我要操作我的笔记本的时候，身体要跨过两个键盘的距离。这个动作幅度是比较大的。

所以我在网上买了这个科大讯飞的鼠标，他有一个最大的好处就是，我可以说话打字。这样我就不需要操作键盘了。但是 windows 上面还有另外一个问题，就是鼠标，还有触摸屏和触摸板，三者都没有统一的交互体验。所以我又安装了这个鼠标手势工具。

StrokesPlus 安装很简单，依然使用的是 chocolatey。

```shell
sudo choco install strokesplus
```

其实我的需求很简单，就是需要鼠标手势来操作切换桌面。安装好 strokePlus，打开 action 菜单即可添加手势。

- @：代表"Win"键
- +：代表“Shift”键
- ^：代表“Ctrl”键
- %：代表“Alt”键

如进入右边桌面的命令为`acSendKeys("^@{RIGHT}")`。

添加

- `acSendKeys("^@{RIGHT}")` 进入右桌面
- `acSendKeys("^@{LEFT}")` 进入左桌面
- `acSendKeys("@{TAB}")` 全部桌面

配合 GestureSign，终于触摸屏，触摸板和鼠标手势统一了。
