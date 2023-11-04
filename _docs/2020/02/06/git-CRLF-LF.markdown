---
type: post
category: tech
tag:
  - git
---

# Git 中的 CRLF 和 LF

跨平台开发的时候，如果是在 Windows 下面上传代码，git 会提醒部分文本文件的 CRLF 会改为 LF。

原因是在 Windows 下面，文本文件会以 CRLF（回车换行）结尾，而 Linux 和 Mac 会以 LF（换行）结尾。其实想想打字机，回车换行是一个正确的做法，但是为了保持兼容性，git 会把 Windows 上传的 CRLF 都改成 LF。

如果只在 Windows 下面开发，可以关掉这个功能。

```shell
git config --global core.autocrlf false
```
