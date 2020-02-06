---
type: post
category: tech
---
# Git中的CRLF和LF

跨平台开发的时候，如果是在Windows下面上传代码，git会提醒部分文本文件的CRLF会改为LF。

原因是在Windows下面，文本文件会以CRLF（回车换行）结尾，而Linux和Mac会以LF（换行）结尾。其实想想打字机，回车换行是一个正确的做法，但是为了保持兼容性，git会把Windows上传的CRLF都改成LF。

如果只在Windows下面开发，可以关掉这个功能。

```shell
git config --global core.autocrlf false
```