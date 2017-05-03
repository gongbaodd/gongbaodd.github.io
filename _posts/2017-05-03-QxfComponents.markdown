---
layout: post
post: fe
---
# 写啥题目呢

## 回顾一下

去年三月，我分享了一个用riotjs开发前端的方案，既然已经有一年的时间了，就先回顾一下。

这套方案出自2015年，之前一直使用的是公司的QApp解决方案，后来发现使用上存在问题，
并在试图寻找一套可行的替代方案。

### 组件化方案

QApp的最小单位是View(大概可以理解为页面)，
View里面大到一个轮播图小到一个按钮的操作逻辑都和view耦合，
假设我想使用某一个View里面的某一个组件，想直接拆出来是不太可能的。

* 以前的写法

        QApp.defineView({
            html: `
            <div node-type="vcode">
                <input action-type="input">
                <button action-type="vcode">发送短信</button>
            </div>
            <button action-type="submit">提交</button>
           `
            actions: {
                // 这里的this指向整个view
                "input:input": () => this.doInput(),
                "submit": () => this.doSubmit(),
                "vcode": () => this.doVcode(),
            },
            init: {
                doInput() {},
                doSubmit() {},
                doVcode() {},
            }
        });
        QApp.config({...});

* 新的写法

        riot.tag('pay-input',`
            <input oninput="oninput">
        `, ()=> {
            // 这里的this指向整个pay-input
        });
        riot.tag('pay-submit', `
            <submit ontap="onsubmit">
                <yield/>
            </submit>
        `, ()=> {
            // 这里的this指向整个pay-submit
        });
        riot.tag('pay-vcode', `
            <pay-input></pay-input>
            <pay-submit>发送短信</pay-submit>
        `, ()=> {
            // 这里的this指向整个pay-vcode
        });
        riot.tag('pay-view',`
            <pay-vcode></pay-vcode>
            <pay-submit>提交</pay-submit>
        `, ()=>{
            // 这里的this指向整个pay-view
        });
        riot.mount('pay-view');

### 基于发布订阅的统一事件管理模式

有很多时候，我们要处以理一些“这些东西，我们不要了”之类的需求，
当我们回头去翻代码的时候，惊奇的发现它被封装了，
那么后面的故事就是要和“xxx function is undefined”做长期斗争了。

* 之前的调用方式

        QApp.defineView({
            init: {
                doSomething: ()=> {}// 删我貌似很困难
                doSomethingElse: ()=>this.doSomething()
            },
            ready() {
                this.doSomething();
            }
        });

* 之后的调用方式

        riot.tag('pay-view',`...`, ()=>{
            this.on('doSomething', ()=> doSomething()); // 不要就删掉吧

            this.doSomethingElse = () => this.trigger('doSomething');
            this.on('mount', () => {
                this.trigger('doSomething')
            });
        });

### 基于状态基的异步流程处理

其实2015年，是异步流程处理比较混乱的一年，Promise刚出来，没多少人敢用，
更别提generator还有async之类的东西了，
这套方案正好利用了发布订阅的优点，
只要在异步事件触发之前订阅上就没问题了

* 之前

        QApp.defineView({
            ...,
            ready() {
                this.ajax({
                    ...,
                    success() {
                        foo(..., () => {
                            bar( ..., () => {
                                ...
                            });
                        })
                    }
                });
            }
        });

* 之后

        riot.tag('pay-view', '...', () => {
            this.on('ajaxDone', () => {
                ...
                this.trigger('foo');
            });

            this.on('fooDone', () => {
               ...
               this.trigger('bar');
            });

            this.on('barDone', () => {
               ...
            });

            this.on('mount', () => this.trigger('ajax'));
        });

### 利用组件树检索组件

项目组件化（Component）+ 事件化（Reactive）之后，
一个页面的运行方式就成为某一个组件监控某一个组件的某一事件并对其造成的处理。
那么需要利用祖组件树解决一下检索问题。

    require("pay-input");
    require("pay-submit");

    riot.tag('pay-vcode', `
        <pay-input></pay-input>
        <pay-submit>发送短信</pay-submit>
    `, ()=> this.tags["pay-submit"].on('subimit', () => {
        this.trigger('vcodeSent');
    }) );

    riot.tag('pay-view', `
        <pay-vcode></pay-vcode>
        <pay-submit></pay-submit>
    `, () => this.tags['pay-vcode'].on('vcodeSent', ()=> {
        this.tags['pay-submit'].trigger('enabled');
    }));


* pay-view
  * parent: null
  * tags
    * pay-vcode
      * parent: pay-view
      * tags
        * pay-input
        * pay-submit
        * parent: pay-vcode
      * pay-submit
        * parent: pay-view


### 利用mixin实现继承

ecmascript2015之前，js一直都没有一个像样的类的表达方式，
所以我们其实也没有一个像样的继承方式，
混淆是目前用的最多的一种继承，大概是源自$.extend吧。

* ajaxApi1

        module.exports = {
            init: {
                this.on('ajaxApi1', () => ajax(...) );
                this.on('ajaxApi1Done', ()　=> ... );
            }
        };

* ajaxApi2

        module.exports = {
            init: {
                this.on('ajaxApi2', () => ajax(...) );
                this.on('ajaxApi2Done', () => ... );
            }
        };

* pay-view

        riot.tag('pay-view', '...', () => {
            this.mixin(require('ajaxApi1.js'));
            this.mixin(require('ajaxApi2.js'));

            this.on('mount', () => this.trigger('ajaxApi1 ajaxApi2') );
        });

### 结合velocity和yield实现首屏渲染

首屏渲染，SPA一直有这个问题。
因为在html加载到js加载完成（甚至是一些ajax返回）之前，
页面都是白屏，其实vm可以完成一部分后端的渲染，并替代第一个ajax。

* vm之中

        #set($description = "这里会代替<yield/>")
        <pay-view>
            <span if="$!description">$description</span>
        </pay-view>
        <script>
            window.vmData = "$!vmData";
        </script>

* js里面

        riot.tag('pay-view', `
            <pay-vcode></pay-vcode>
            <pay-submit></pay-submit>
            <yield/>
        `, () => {
            const vmData = window.vmData;
        });

### SPA的路由（这部分本文不涉及，忽略）

## 希望优化的点

### 发布订阅解决函数调用问题是存在缺陷的

这套方案会产生冗余代码，其实最好使用typescript编写代码，
这样在编译环境下就能查出哪个函数调用了删除的方法。

* util.ts

            export const a = {
                    // foo() { 假设我删除了foo }
                    ...
            };

* xxx.ts

            import { a } from "util"

            class xxx {
                constructor() {
                    a.foo(); // 编译时会报错foo这个方法不存在，终止编译
                }
            }

### 使用面向对象的语法

* html

        <body>
            <pay-view></pay-view>
        </body>

* ES5

        require("pay-input");
        require("pay-submit");
        require("pay-vcode);

        riot.tag("pay-view", '<span>{ title }</span><pay-vcode></pay-vcode><pay-submit>提交</pay-submit>', function(opts) {
            this.title = opts.title;
        });

        riot.mount("pay-view", {});

* TypeScript

        import {PaySubmit} from "pay-submit";
        import {PayVcode} from "pay-vcode";

        @tag({
            name: "pay-view",
            tmpl: `
            <span>{ title }</span>
            <pay-vcode></pay-vcode>
            <pay-submit>提交</pay-submit>
            `
        })
        class PayView extends TagCore {
            onCreate(tag) {
                tag.title = opts.title;
            }
            constructor() {
                this.submit = new PaySubmit();
                this.vcode = new PayVcode();
            }
            submit: PaySubmit;
            vcode: PayVcode;
        }

        PayView.mount({});

### 利用发布订阅模式控制流程并不是最好的流程控制

目前来说原生的Promise支持已经很不错了，
async虽然是个实验特性，
但发明C#的微软明显推荐用这个特性。

* 发布订阅

        riot.tag('pay-view', '...', () => {
            this.on('fooDone', ()=> this.bar());
            this.on('barDone', ()=> this.blah());
            this.bar = () => {
                ...
                this.trigger('barDone');
            };
            this.blah = () => xxx;
            this.on('mount', () => this.trigger('fooDone'));
        });

* Promise

        @tag({
            name: "pay-view",
            tmpl: "...",
        });
        class PayView extends TagCore {
            onCreate(tag, opts) {
                tag.on('mount', () => this.foo.then(()=> {
                    return this.bar()
                }).then(()=> {
                    this.blah();
                }));
            }
            foo = ()=> new Promise(resolve => resolve());
            bar = ()=> new Promise (resolve => resolve())
            blah = () => {...}
            ...
        }

* async & await

        @tag({
            name: "pay-view",
            tmpl: "...",
        });
        class PayView extends TagCore {
            onCreate(tag, opts) {
                tag.on('mount', async () => {
                    await this.foo();
                    await this.bar();
                    this.blah();
                });
            }
            foo = ()=> new Promise(resolve => resolve());
            bar = ()=> new Promise (resolve => resolve())
            blah = () => {...}
            ...
        }

### 没有完善的广播机制

其实之前的方案是可以广播的，但需要选中需要的组件，如

    [tagA,tagB,tagC].forEach(tag => tag.trigger('foobar'));

但是我希望的广播是每一个页面里面的tag无需选中就可以接收到。
其实在每个tag加载之后都会传进一个opts对象，
这个对象或者是执行mount函数传入的值，或者是模板标签上的变量

    XXX.mount({ aaa: 1 });
    // opts == {aaa: 1}

    <xxx aaa=1 ></xxx>
    // opts == {aaa：１}

所以只要把一个obersable的对象传到opts里面就行了，
但是，随之而来的就是因为事件名是字符串，重名了咋办？
请看后面细述。

### 需要一个更好的mixin

typescript对mixin支持很好，
配合vscode的输入提醒代码体验十分完美，
所以几乎可以放弃riot的mixin了

* riot.mixin

        // ajaxApi.js
        {
            init() {
                this.on('ajaxApi', ()=> ...);
            }
        }
        // xxxtag
        riot.tag('xxx', '...', ()=> {
            this.mixin(require('ajaxApi.js'));
            this.trigger("ajaxApi");
        });

* @mixin(any[])

        class AjaxApi {
            ajaxApi() {
                ...
            }
        }

        @tag({ name: "xxx", tmpl: "..." });
        @mixin([AjaxApi])
        class XxxTag extends TagCore implement AjaxApi {
            onCreate( tag, opts ) {
                this.ajaxApi();
            }
            ajaxApi: () => void;
        }

### velocity模板语法太次了

改用node渲染，Qxf使用的是handlebars，riot自身也支持后端渲染。

## 介绍点儿常识

### typescript的语法

* 类型化声明

        const a:string = "这是一个不可变的字符串";
        let b:string; // b只能赋字符串
        let c:any; // c可以赋任一值
        let d: () => void; // d只能赋空参数且返回为空的函数

* class语法糖

        class a extends b {
            constructor() {
                super();//执行b的构造函数
            }
            public foo() {
                super.foo();//执行b的原型上的foo函数
                console.log(`
                    我在ａ的prototype上
                    this指向context
                `);
            }
            public bar =　() => {
                cosnole.log(`
                    我在a的实例里,
                    this指向a的实例
                `)
            }
            public blaha = function() {
                cosnole.log(`
                    tslint默认禁止使用
                    我在a的实例里,
                    this指向context
                `)
            }
        }

* async await 上面提过了

* Object解构

        const obj = { a: 1 };
        const name = "name";
        const data = { ...obj, b: 2, name }; // { a: 1, b : 2, name: "name" }
        const { a:xxx } = obj; // xxx===1
        const data1 = {[xxx]: 'data1'}; // {1: 'data1'}

* 接口

        interface Ia { foo: () => void; }
        interface Ib { bar: () => string; }
        interface Ic { name: string; }
        class D { doSomeThing() { .... } }
        class E implements Ia,Ib,D {
            doSomeThing: () => any;// 如果实现的是类内元素，可以只声明，不实现
            foo = () => {...} // 如果实现的是接口内元素，必须按照类型定义
            bar = () => {...} // 必须把要实现的所有接口内的元素声明
            constructor(param: Ic) {
                const { name } = param;// param 必须是只含有name的对象
            }
        }
