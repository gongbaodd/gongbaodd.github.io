---
type: post
category: fe
---

# 高效你的组件化开发

组件化开发算是老生常谈了，最早听说这个理论，我还在大学，写着那些被后端称为模板的东西。所以当时的开发就是写成一堆\*p（php、jsp 等）片段然后 include 到一起。

## 为什么要做组件化

为什么要做组件化呢？因为它是什么神奇的算法，能提高代码的运行效率？不会，因为组件化会对代码进行封装，封装就会稍稍拖累运行效率。
那为什么还要组件化呢？

![理想的更新迭代](http://ww4.sinaimg.cn/mw690/89d0a2e1gw1f93dxsw0zyj215n0qvtcf.jpg)

首先，在做软件的时候，我们更希望能最开始制作一套原型，并在后期的迭代中不断地对这一套原型填充。
但是现实中，我们更有可能遇到某一工程的部分可以在以后的项目中使用，这时就可以把共有的部分封装成组建公用。

![现实中的迭代](http://ww3.sinaimg.cn/mw690/89d0a2e1gw1f93ea4gcqtj219s0js0vz.jpg)
然后，在设计一个较大的前端项目的时候，我们要对项目进行分拆，定义接口，实现多人协同开发，自然也需要组件化。

最后，如果项目产生了 bug，或者要对项目进行更新，我们可以对其进行局部的更改和回归。就像制造业，如果一辆车爆胎了，
只需要更换轮胎就好，不必更换整辆车。

## WEB 组件化的昨天今天和明天

那么既然组件化有这么多好处，聪明的程序员们自然早就在使用了

### Web 1.0 时代

![Web1.0时代的组件化](http://ww3.sinaimg.cn/mw690/89d0a2e1gw1f93ea4vx7sj21480nn44a.jpg)

在 Web1.0 的时代，前端的确还只是所谓的模板，CSS 基本上还是 inline，js 也除了基础框架也基本上写在页面里面。那会儿的组件化依靠 web server
把页面内多个碎片拼装在一起，然后一并传到客户端，当时组件化的特点是：

- 客户端必须通过刷新页面实现和服务端的交互，而页面一旦刷新，页面内的所有组件刷新。
- 每次刷新，服务端几乎每个组件都要重新计算一下，会拖累性能。
- HTML 担任组件化的主体，页面基本上由 HTML 碎片组合而成。

### Web 2.0 时代

![Web2.0时代的组件化](http://ww3.sinaimg.cn/mw690/89d0a2e1gw1f93ea5eq1oj21d90rudmu.jpg)

Web 2.0 因为 AJAX 的出现，用户可以实现不刷新页面与服务端交互。为了不拖累服务端，CSS 和 JS 都各自写在一起，作为静态资源存放在 CDN 上加速。
这时的 CSS，因为 LESS、SASS 等预编译工具的出现实现了工程文件的组件化。
而 HTML 因为其结构依然保持着 1.0 时代的组件化，只不过这回是在前端拼接了。
js 依靠选择器更新页面实现不刷新更新，这时组件化的特点是：

- JS 逐渐替代 HTML，担负起页面组件的拼接工作。
- HTML、JS 和 CSS 都各自逐渐实现组件化，但三者耦合不多。
- 有完全放弃 CSS 和 HTML，只用 JS 完成页面的方案，然而可定制性不高。

### SPA 时代

![厉害了我大JS](http://ww2.sinaimg.cn/mw690/89d0a2e1gw1f93ea62d3bj21770jbq65.jpg)

后来，为了应付更复杂的交互，前端出现了很多如 Angular、React 之类的框架，这些框架基本上就是以服务端返回的数据作为 Model，
用 Cotroller 的处理产生 View 并渲染到页面上。

![SPA时代开始](http://ww1.sinaimg.cn/mw690/89d0a2e1gw1f93ea6msqgj21670oetdw.jpg)

有了这种框架，页面就可以处理更多逻辑，以前后端的路由功能也复制到了前端。
这时 JS 已经完全接管了组件化的工作，可惜问题是，
随着页面逻辑的复杂程度，单一 Controller 下要处理的绑定也变多了，
工程也逐渐复杂难懂。

### Web Components

![Web Components](http://ww4.sinaimg.cn/mw690/89d0a2e1gw1f93ea7hxopj21d80ld11e.jpg)

> 天下大事，分久必合，合久必分。

Web Components 的出现，一定程度把 HTML、CSS 和 JS 又耦合在一起，
只不过都有了一个作用域的概念，完整的组件化已经形成，然而这一方案
还在试验中，变数还有很多。好在现在很多框架都已经相对模仿并实现了这一方案。

## 设计组件的思想

用了能实现组件化思维的框架并不代表已经用组件化开发了，
还需要一套思想，那么如何设计组件呢？

> 任何一个组件都是一个有限状态机。 ——沃·滋基硕德

![有限状态机](http://ww1.sinaimg.cn/mw690/89d0a2e1gw1f93ea7muo1j20u6054q38.jpg)

组件的状态是有限的，状态转变是因为受到了某一个事件。

![举个例子](http://ww2.sinaimg.cn/mw690/89d0a2e1gw1f93ewntvqsj20ci0a13yp.jpg)

比如一个输入框，初始状态为无光标、值为空。

![输入框](http://ww3.sinaimg.cn/mw690/89d0a2e1gw1f93ea82j7kj20ca02ra9y.jpg)

```javascript
M.state = {
  curser: false,
  value: "",
};
```

输入框被聚焦之后，显示光标，值为之前的值。

![输入框被聚焦](http://ww1.sinaimg.cn/mw690/89d0a2e1gw1f93ea8dlpbj20ca02r3yf.jpg)

```javascript
M.state = M.on('focus', ()=>{
    curser: true,
    value: M.state.value
})
```

输入值之后，每一个字符都触发一次 input 事件。

![输入框被输入值](http://ww2.sinaimg.cn/mw690/89d0a2e1gw1f93ea8qr4pj20ca02rdft.jpg)

```javascript
M.state = M.on('input', (c)=>{
    curser: true,
    value: M.state.value + c
})
```

![输入框状态变化图](http://ww1.sinaimg.cn/mw690/89d0a2e1gw1f93ea929zzj20x50d3dh7.jpg)

由此可以得出，组件的新状态都要由旧状态和受到的事件产生，
再经过渲染成 View 层展示

![公式](http://ww4.sinaimg.cn/mw690/89d0a2e1gw1f93eaa6y5hj20rb06gjs5.jpg)

## 构造和使用组件

### 原子化你的组件

![一个组件要是什么样的](http://ww4.sinaimg.cn/mw690/89d0a2e1gw1f93ea9et4cj21220ebjsl.jpg)

一个组件应该做成什么样的？是一个页面还是一个弹窗还是什么样子？
比如下面这个页面，就说输入框吧，每个输入框有三个状态，
那么整个页面就有了 12 种状态，维护起来真是复杂；
如果这些输入框用一个迭代器处理，的确就只有三个状态了，
可是这些迭代的输入框对事件的处理又不同
（比如手机号要加掩码），又会把每个事件弄复杂了。

![示例页面](http://ww3.sinaimg.cn/mw690/89d0a2e1gw1f93ea9uu5qj20ol0w3dil.jpg)

其实，如果一个组件的状态很多，管理起来也很麻烦，
莫不如把这个组件拆开，比如一个输入框可以由
普通输入框混淆掩码实现，则上图输入框的处理可以变成如下

![组件化后](http://ww1.sinaimg.cn/mw690/89d0a2e1gw1f93eaavbbkj21gi0vyn28.jpg)

### 组件怎样交互

通过原子化组件能够很好解决复杂的状态管理，
但是需要组件间进行交互。

其实很简单，页面和用户交互是监控人的事件，
和后端交互是监控 XMLHttpRequest 的事件，
那么组件间的交互自然是监控组件的事件，
而组件内部交互是监控自己的事件。

![组件交互](http://ww1.sinaimg.cn/mw690/89d0a2e1gw1f93eix7uspj20rb0gsjtg.jpg)

比如下图的输入框，输入框可以找到清除按钮并监控其点击事件来
判断自己是否需要清空，按钮监控输入框的输入事件来判断自己是否可点。

http://ww1.sinaimg.cn/mw690/89d0a2e1gw1f93eix7uspj20rb0gsjtg.jpg
![又是输入框](http://ww3.sinaimg.cn/mw690/89d0a2e1gw1f93eabffgxj219x0he0yg.jpg)
这样组件化的又一难题就解决了。

## 写在最后

web 前端的组件化还在一个发展中的状态，
本文对组件化的想法可以刚好适应移动端页面的需求。
技术在日新月异地发展中，
也许今天看似高效的做法明天就不是了，
写本文为的是能够分享一下我的想法，希望能够给人一定启发。

## 参考

[Web 应用的组件化开发（一）——基本思路](http://www.ituring.com.cn/article/63549)

[The Sam Pattern](http://sam.js.org)

[Shadow DOM 201](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/)
