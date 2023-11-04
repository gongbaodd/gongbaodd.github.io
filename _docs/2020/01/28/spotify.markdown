---
type: post
category: tech
tag:
  - spotify
series:
  name: Windows舒适指南
  slug: windows-howto
---

# 白嫖 spotify 的方式

今年开始，我不再在家办公，这使得我的网络环境不是很稳定，无法一直在线听 spotify。最好的办法，自然是把要听的音乐缓存下来。

GitHub 里面有一个 python 项目[spotify-downloader](https://github.com/ritiek/spotify-downloader)可以下载 spotify 的音频。

利用 pip 安装

```shell
pip install spotdl
```

因为是国内使用，需要代理

```shell
env https_proxy=http://127.0.0.1:1080 spotdl --song http://open.spotify.com/xxx
```

另外，spotdl 支持列表下载

```shell
spotdl --playlist [listUrl] # to get all songs' url
spotdl --list list.txt # to download the songs
```
