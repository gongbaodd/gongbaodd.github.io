---
layout: post
category: tech
---

>---
>***Fun Fact***
>---
>具有550多年历史的天安门城楼，由于兵火战乱，长期失修，建筑结构已严重坏损变形，主体已严重下沉。新中国成立后虽经多次维修加固，但未能彻底解决问题。1969年河北邢台地区发生了6到7.5级强烈地震，使天安门城楼损坏变形更甚。1969年底国务院决定：彻底拆除天安门城楼，在原址、按原规格和原建筑形式重新修建天安门城楼。

# ArchLinux的护眼法宝

目前我手上有两台笔记本，公司的macbook15和自己的xps13。xps13一直是用来做自己的项目的，说实话，xps屏幕相比于mac好太多了，linux搭配上文泉驿微米黑的字体，简直完美，但由于一直没长时间用xps，所以一直没碰到屏幕颜色过于艳丽的伤——刺眼。

![f.lux icon](https://justgetflux.com/flux-icon-sm.png)

在mac上，我用的护眼工具是f.lux，可是很遗憾，下载了linux版之后并没有运行起来。所以我和所有ArchLinux的用户一样，我第一个想到的就是wiki。

# RedShift

        sudo pacman -S redshift

这样redshift就安装上去了，因为我用的是gnome，所以可以把redshift-gtk作为系统服务启动。当然更简单的，可以右键sys-tray选择开机启动。

RedShift的配置文件wiki上有详细介绍，贴一下我从网上翻到的的

```
; ==============================================================================
; redshift 配置文件
; ==============================================================================
; Create by Arondight <shell_way@foxmail.com>
; ==============================================================================

[redshift]
; 白天屏幕温度
temp-day=5800
; 夜晚屏幕温度
temp-night=4600
; 昼夜是否平滑过度(1/0)
transition=1
; 全局屏幕亮度
;brightness=0.9
; 昼夜屏幕亮度(version >= 1.8)
brightness-day=0.9
brightness-night=0.7
; 屏幕gamma
gamma=0.9
; 位置提供方式(redshift -l list)
location-provider=manual
; 调整工具(redshift -m list)
adjustment-method=randr

[manual]
; 位置提供方式设置
; 经纬度(北京)
lat=39.90
lon=116.41
; 屏幕调整工具设置
; 第1 块屏幕(0)
[randr]
screen=0
```

# 关注我

你可以在微信搜索igongbao就可以关注我哦～