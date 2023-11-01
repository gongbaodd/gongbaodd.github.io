---
type: post
category: tech
---
# 树莓派Ubuntu重启音频

前一阵子重新拿起来我的树莓派用来放一些学习视频，然而发现ubuntu mate对音频处理有问题，一旦占用结束后有新的应用来占用就会有杂音，感觉ubuntu这个问题出N久了。目前我没找到更好的解决方案，只好重启一下了。

```shell
#!/bin/bash
pulseaudio -k && sudo alsa force-reload
```