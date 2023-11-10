---
type: post
category: tech
---

#ArchLinux升级搜狗输入法有bug的解决方案

>不久前升级了搜狗输入法，因为据说这次升级性能提高了不少，更新了之后，确实啊！但是没意识到的是，出来了一堆bug。

升级AtomEditor到0.177竟然不能使用中文了T.T还以为是个bug[#5447](https://github.com/atom/atom/issues/5447#issuecomment-74660587)，因为当时觉着chrome也没问题啊（其实有问题，地址栏输入太快的时候会发生错乱>.<，比如输baidu.com会变成badiu.cmo，奇葩啊）。

##出问题的特征：
* AtomEditor不能输入中文
* SublimeText（打了补丁之后）不能输入中文
* Chrome/Chromium地址栏输入有时会发生错乱

##解决方案：
实际上也是自己粗心，运行下面，马上就知道问题在哪了。

    $ fcitx-diagnose
    
升级sogou的时候，输入法环境变量被改成Xim了，不知道在别的系统上面咋样，但这些变量在Arch上得是fctix，所以修改一下~/.xprofile。

    export GTK_IM_MODULE=fcitx
    export QT_IM_MODULE=fcitx
    
没问题啦～

##后记
编辑器不好使的那段时候，我改用了Brackets，很棒的编辑器，做整个项目的时候很好使，而且速度比atom、sublime都快。

