---
layout: post
category: tech
---


#pacman改下载器

pacman默认使用wget下载，没说wget不好，在家里面总是断，所以改成aria2了

## 移除未安装的包

    # pacman -Sc
    
## 使用aria2 代替 wget

    # pacman -S aria2
    
## 修改/etc/pacman.conf

    XferCommand = /usr/bin/aria2c --allow-overwrite=true -c --file-allocation=none --log-level=error -m2 --max-connection-per-server=6 --max-file-not-found=5 --min-split-size=5M --no-conf --remote-time=true --log=- --summary-interval=60 -t5 -d / -o %o %u
