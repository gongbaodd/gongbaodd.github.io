---
layout: post
category: fe
---
# ![](http://i2.muimg.com/588926/aebd6aa03c07833d.png) 弃坑Riot转投Preact

![换个坑继续趟](http://i4.buimg.com/588926/431151959544ded0.jpg)

## 回顾一下为什么用Riot

### 1. 对ES5最友好的组件化MVP框架

> 吐槽一下现在的前端，gulp + webpack + rollup +　babel + ... 用gcc的同学都看哭了好么

riot.js虽然官网上给出的语法是ES6的，但是可以直接使用ES5的语法，虽然react也可以，但是没人会想用ES5写JSX吧。

相比于其它框架，使用ES5的riot.js不用写gulpfile，不用谢webpack.config.js，不用写babelrc，想想，直接上去就开始写逻辑还是件挺爽的事情哈。

当时公司大量使用Fekit作为发布工具，因为Fekit只是简单地commonjs实现，所以使用Riot.js就是件理所当然的事情了。

### 2. 十分轻量的框架

riot.js的源码70+KB，混淆之后是10+KB，大概一个handlebars或者是大一点的arctemplate的大小，里面包括组件化、observable的事件机制、路由器、SSR这些功能。

用riot.js开发之后的逻辑代码（移动端）大小也没有比vue的核心代码库大。

所以如果有一个项目想要快速开发，代码量又不想太大，riot.js会是我推荐的，而且不必担心性能问题（可以参考我之前vue、react和riot的对比，分明react是性能最差的）。

之前写过riot.js的最佳实践，没在公众号里面推，后面补上哈～

----
<center>
    <h3>蛋是</h3>
    <h2>你还是一个好<s>人</s>框架</h2>
    <h3>而我已经不是那个骚年了</h3>
</center>

---

## Preact的出现

去年我录制了一个Riot.js的分享视频（在youku可以搜到哦），Preact大概在那时出现在了hackernews的首页，我记得当时hackernews下面的回复都是很轻蔑的“呵呵，又一个“。

等了大概一年，这个项目居然没死，要知道这一年很多类react的项目过得可不是那么好啊。这个项目的Twitter帐号都发会议邀请函了。

## 那么引入Preact是为什么

### 1. Typescript对JSX的支持好过template

typescript能够做静态类型检查，简单地说，如果我的代码里面有什么拼写错误或者什么包没引入，编译器都能查出来。

蛋是，如果我写的代码在模板里面，编译器就无能为力了，毕竟模板就只是字符串啊。而jsx不同，它是一种DSL，编译器自然会检查里面的代码。

### 2. Preact真的太TM小了

当时使用riotjs的原因很大的比重在减负，在我的哲学里面，一个框架只需要完成我需要它完成的东西，其他的不要多。preact相比riot减负了大概50k（源代码），当然功能上也少了（observable，router）。

## 所以我会用Preact吗？

我会在最近的一次优化把我的项目进行优化改造，最后我在根据它的性能（ssr+browser）、最终的业务代码大小、是否可以多人合作开发等多方面分析考虑是否切换。

当然，也有别的可能，毕竟当初说好用vim的我现在竟用着vscode。

