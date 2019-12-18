---
layout: post
category: tech
---
# sinopia搭建你的私人NPM

今天本来想边刷CodeWars边看《纸牌屋》的，显然两件烧脑的事情还是不要放到一起做比较好。

简评一下《纸牌屋》第五季，编剧能写五季不错了，赶紧完结吧，剧情开始走下坡路咯。

## 进入正题

为什么要搭建私人NPM？我靠，这还用问。。。（你自己猜吧）

    npm install -g sinopia

安装好sinopia之后，执行sinopia就好了，默认端口4873，只能本地访问。

## 配置

往往我会新建一个用户

    useradd -G users sinopia -d

然后用户这个用户执行sinopia，sinopia执行的根目录需要三个文件，config.yaml，storage，htpasswd

只配置config.yaml就好了，示例在https://github.com/rlidwka/sinopia/tree/master/conf

## 执行

用PM2执行，默认sinopia会在执行目录寻找config。本地访问成功后大工造成。

***注意***

1. 因为我用的是Linux，自从安装了node8+npm5之后，可能涉及到Darwin的包会报警，不过忽略就好。

2. 注册的时候报错crypt3找不到，貌似安装的时候gyp出错被忽略掉了，我到sinopia目录里重装了crypt3解决。