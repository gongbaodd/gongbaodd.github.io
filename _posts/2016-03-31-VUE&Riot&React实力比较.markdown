---
layout: post
categories: fe tech
---

# vue+riot+react试用报告

# 前言

***本报告不是针对哪个框架，单独说哪个框架好，撕逼的出门右拐微博谢谢***

最近迷上了组件化开发，感觉这是一种非常高效率的开发模式（说模式有点不对）。于是我第一时间找到了这仨库来做比较，下面请听我细细道来。

## 本报告拢共扯了这些蛋

* 三个库列表渲染性能比较
* 三个库的学习曲线(自己体会吧)
* 三个库静态页面动态渲染行为的方式(呵，这话说得)
* rollup、postcss、webpack
* 对ES2015使用的建议


![测试结果](http://ww1.sinaimg.cn/large/89d0a2e1gw1f2u8fh7uygj20tv0n4473.jpg)

# 关于项目

## 工具

> 1.分别使用三个库创建一个模拟native的无线滚动列表<br/>
2.体验一下三个库的开发效率、文件大小、学习曲线以及最终性能

由于时间问题，这几个项目都没有使用fekit开发，并且都用了ES6的一部分功能

* riot -> rollup
* react -> webpack
* vue -> vue-cli(webpack)

## 组件

三个项目都有基于组件化的思想，所以架构设计相同

* App
    * Scroller
        * Card
        * Card
        * Card
        * ...

## 用的ES2015功能

* 箭头函数
* 解构
* import
* JSX（算是吧）

## 文件大小

* riot
    * origin: 93k
    * uglified: 40k
    * gzip: 14k
* react
    * origin: 689k
    * uglified: 356k
    * gzip: 76k
* vue
    * origin: null
    * uglified: 79.8k
    * gzip: 27k

# 性能分析

1. 渲染一个富文本列表，项目数n

```javascript
var t1 = performance.now();
self.items = res;

setTimeout(()=>{
    var t2 = performance.now();
    console.log( "[1]渲染节点数：" + res.length + "::lastTime:" + (t2-t1) );
},1)
```

2. 列表添加内容，项目数n

```javascript
var t3 = performance.now();
self.items = self.items.concat(res);
setTimeout(()=>{
    var t4 = performance.now();
    console.log( "[2]增加节点数：" + res.length + "::lastTime:" + (t4-t3) );
},1)
```

3. 删除部分内容，项目数n

```javascript
var t5 = performance.now();
self.items = self.items.slice(0,res.length);
setTimeout(()=>{
    var t6 = performance.now();
    console.log( "[3]部分删除：" + res.length + "::lastTime:" + (t6-t5) );
},1)
```

4. 列表倒置

```javascript
var t7 = performance.now();
self.items = self.items.reverse();
setTimeout(()=>{
    var t8 = performance.now();
    console.log( "[4]数组回转：" + res.length + "::lastTime:" + (t8-t7) );
},1)
```


## n===400

* riot
    1. 300ms
    2. 38ms
    3. 15ms
    4. 150ms
* react
    1. 357ms
    2. 478ms
    3. 177ms
    4. 278ms
* vue
    1. 480ms
    2. 403ms
    3. 124ms
    4. 152ms

## n===800

* riot
    1. 477ms
    2. 287ms
    3. 261ms
    4. 273ms
* react
    1. 688ms
    2. 1167ms
    3. 531ms
    4. 625ms
* vue
    1. 750ms
    2. 775ms
    3. 256ms
    4. 270ms


## n===1600

* riot
    1. 917ms
    2. 776ms
    3. 546ms
    4. 641ms
* react
    1. 2780ms
    2. 3109ms
    3. 1612ms
    4. 1067ms
* vue
    1. 1348ms
    2. 1533ms
    3. 1167ms
    4. 712ms

## n===3200

* riot
    1. 2268ms
    2. 1816ms
    3. 2444ms
    4. 1474ms
* react
    1. 5374ms
    2. 7411ms
    3. 4107ms
    4. 2316ms
* vue
    1. 2657ms
    2. 2868ms
    3. 3113ms
    4. 1744ms

# 学习曲线（在组件化方面，自己体会）

## riot

```html
<parent-component class="parent">
    <child-component class="child" onclick="{click}"></child-component>
    <h1>{title}</h1>
    <script>
        this.on('mount',()=>{
            ...
        });
        this.click = e=>{
            this.update({ title: "clicked" });
        };
    </script>
    <style scoped>
        :scope{ }
    </style>
</parent-component>
```

## react

```javascript
React.createClass({
    getInitialState(){
        return { title: "" };
    },
    click(){
        this.setState({title: "clicked"});
    },
    componentDidMount(){
        ...
    },
    render(){
        return (
        <div className="parent">
            <div className="child" onClick={this.click}></div>
            <h1>{title}</h1>
        </div>
        );
    }
})
```

## vue

```html
<template>
    <div class="parent">
        <child class="child" @click="click"></child>
        <h1>{{title}}</h1>
    </div>
</template>
<script>
    export default {
        components: { child },
        data() { return { title: "" } },
        ready() {
            ...
        },
        methods: {
            click() {
                this.title = "clicked";
            }
        }
    }
</script>
```

# 三个库静态页面动态渲染行为的方式

## 模板渲染(Vue,riot)

两者都是模板渲染，所以你的html如果按照它们模板语法来写，渲染起来很简单

## 数据元渲染(react，咦？html不算数据元)

react相当于把渲染的内容转成类似于json的数据元，到客户端渲染的时候还需要解析一遍数据元。。。
说白了，你得用redux或者flux或者relay

# rollup、postcss还是webpack

> 实际上都是些工具上的事，汗啊，还是哪天说吧

# es2015该用啥

es2015编译主要体现在

* 语法糖编译
* pollyfill
* modules

### 语法糖编译

* class
* 解构
* 箭头符号
* decorator（争议）

### pollyfill

* Promise
* generator
* async/await(7)

### modules

* import
* export

---

## 个人感觉

* pollyfill实在太大了，如果能不用就别用
* 语法糖最好用一下，代码可读性一下提高好多
* modules我靠你连这个都不用你还好意思说你用的是es6，这玩意儿不仅要用还不要转译成AMD或者CMD，就按照es6的规范做才对，给rollup点个赞。
