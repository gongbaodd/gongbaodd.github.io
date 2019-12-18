---
type: post
category: fe
---
# 阿里深圳node地下铁

## 渲染服务化，egg.js北斗

最早同机部署，利用热更新，减少node发布频率。

使用node做页面渲染，渲染好的html给java层，最终分发还是给java。

资源争抢，linux [cgroup](https://wiki.archlinux.org/index.php/Cgroups)，但是没实现。

静态资源分发系统，使用推送的方式（其实我没听懂那面拉取说的是啥。。。），基于阿里的[DragonFly](https://alibaba.github.io/Dragonfly)。

## node devops

[sandbox](https://github.com/midwayjs/sandbox)

代码治理，哎呀就是linting啊typechecking啊。

包治理，到底是大厂，包有问题还能查出来。居然还知道那些应用用过哪些包。

数据治理，错误日志分析。

链路分析

远程调试，可以在办公区调试服务机器。

故障演练，内部平台不给人看啊。[QCon](http://www.infoq.com/cn/presentations/ali-electricity-supplier-fault-management-and-fault-drills-practice) 找到了视频，有机会看下。

另外可以看下[pandora.js](https://github.com/midwayjs/pandora)

## Node-FFI

牛逼你深圳，上哪儿听js的分享能谈到IoT啊。

应用背景是想要用JS去调用C的动态链接库。毕竟JS写起来容易些。

原来多语言交互，通过共享内存、RPC调用或者外部函数调用（FFI）。

[mJS](https://github.com/cesanta/mjs)比较感兴趣，是[mongoose os](https://mongoose-os.com/)的js运行语言。

## Tarsjs

[tars](http://tars.tencent.com/base/tars_index/en/index.html)听起来巨牛逼，没听懂。。。

话说阿里的投屏系统是什么，还带录屏功能，貌似我在mac上没用过投屏系统啊。

tarjs提供了一套高性能的RPC协议，可以用 @tar/stream 获取。

太多了，听不懂啊。

进程管理，进程重启，无损重启，数据监控。

### node监控指标：

memUsage、 cpuUsage、 eventLoopLag：队列延迟， libuv

### LongStackTrace组件的实现

[问题背景](https://www.ctolib.com/topics-134009.html)

[具体代码](https://github.com/medns/longstack)

