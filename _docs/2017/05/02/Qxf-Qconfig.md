---
type: post
category: fe
---
# 结合Qxf和Qconfig解决前端热发布

或许篇文章写得有些晚了，如果这篇文章是写koa的话，估计受欢迎程度会很高。

最近正巧有一个前后同构的项目，其实是利用node作渲染层。至于为什么用node作渲染层就不做详述了，节约后端资源，释放前端约束，可能方案并不是通用的，正好我的项目需要。

## Qxf 介绍

Qxf是基于express的node服务方案，也就是说很多express的API可以直接使用。确切说并不完全是这样，response.write就被改写了，但并不影响使用。

其实Qxf的出现是给node做了一层兼容于原有去哪儿前后端分离模式的node后端。同时为开发者做了一层脚手架封装，集成包括cluster、logger、handlebars等开源的中间件以及去哪儿私有的异常处理、日志处理、埋点统计以及静态资源版本号的管理中间件。

## QConfig

QConfig是去哪儿内部解决后端热发的方案，简单地说它会依照版本存储```*.properties```或者```*.json```文件，并按需将这些配置文件推送到各个机器，推送之后也可以回滚。

## 解决的问题

前端有很多需求是文案修改、图标修改，相对来说算是比较安全，但每次修改的时候还要测试回归上线，这样流程拖得太长，如果前端也可以利用QConfig实现热发，那自然是很受欢迎的。

## Qxf怎么用

针对Qxf怎么去创建一个工程在此就不多余介绍了，讲一下工作原理吧。

    qxf dev

这个命令会启动Qxf的测试环境，其实就是执行了以下代码

    NODE_ENV=development node ./bin/start.js --l .logs

也就是说，包括server的启动配置都写在这里面了。整个服务都会在```multiprocess.listen(app, opts)```之后执行（注意一个坑点，multiprocess没有暴露server对象，所以用不了reload.js，开发的时候只能手动刷新页面了）。

## QConfig怎么用

讲完Qxf说说QConfig，按照qConfig的文档在Qxf的config.js里面配置好要取的配置，QConfig要在Qxf启动之前执行，也就是还要修改start.js里面的

    multiprocess.listen(app, opts);

为

    qConfigClient.init().then(()=> multiprocess.listen(app, opts));

之后如果需要获取某一个属性文件，则需要执行

    const configs = qConfigClient.getConfig('*.json');
    const value = configs.get('key');

如果你的配置是json的，获取到的值会直接parse成对象。

***需要注意一点,Qconfig是异步的，也就是说getConfig的执行必须放到某个可抵达的回调里面***

## 结束

执行一下```qxf dev```，服务器访问```localhost:3000```到对应的router下面就可以看到效果了。

