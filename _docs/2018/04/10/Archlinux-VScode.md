---
type: post
category: fe
---
# ArchLinux 修改 VScode 可监视文件大小

https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers

```shell
echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl --system
```
