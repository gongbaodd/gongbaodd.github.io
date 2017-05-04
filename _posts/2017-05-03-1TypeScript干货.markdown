---
type: post
category: tech
---
# TypeScript干货

## 类型化声明

        const a:string = "这是一个不可变的字符串";
        let b:string; // b只能赋字符串
        let c:any; // c可以赋任一值
        let d: () => void; // d只能赋空参数且返回为空的函数

## 接口

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

## class语法糖

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

## 装饰器

类似于@tag,@mixin的东西，
这个有点复杂，只说在class前面的装饰器吧,
是用来处理对象原型的函数，
会在构造函数执行结束后执行

## Object解构

        const obj = { a: 1 };
        const name = "name";
        const data = { ...obj, b: 2, name }; // { a: 1, b : 2, name: "name" }
        const { a:xxx } = obj; // xxx===1
        const data1 = {[xxx]: 'data1'}; // {1: 'data1'}

## 一个更好的mixin

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


## async await 处理异步流程

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

## 用TypeScript写一个Riot组件

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
            this.mixn(require('ajax1.js'));

            this.trigger('ajax1');
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
        @mixin([Ajax1])
        class PayView extends TagCore implement Ajax1 {
            onCreate(tag) {
                tag.title = opts.title;
                this.ajax1();
            }
            constructor() {
                this.submit = new PaySubmit();
                this.vcode = new PayVcode();
            }
            submit: PaySubmit;
            vcode: PayVcode;
            ajax1: () => void;
        }

        PayView.mount({});