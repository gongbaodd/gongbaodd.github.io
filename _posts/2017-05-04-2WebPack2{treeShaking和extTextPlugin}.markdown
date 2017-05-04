---
type: post
category: fe
---
# webpack2

## tree-shaking（树摇）

es6 module里面详述了树摇的的实现，但是webpack1始终没能实现，后来rollup实现了，于是大量框架转用rollup，去年webpack2发布，带来的就是这个tree-shaking功能。

### AST树

所有的代码，编译或者执行之前都会被转义成AST树，
那么AST树是啥

    let a;
    let b = 1 + 1;

* 代码
    + 声明表达式
        - let 声明
        - 变量名 a
    + 赋值表达式
        - 加法运算
            * 常量1
            * 常量1
        - 声明表达式
            - let 声明
            - 变量名 b

### module的解析

    // module a

    export function foo() {...}
    export function bar() {...}

    // js

    import { foo, bar } from a;

    foo();

webpack会将代码解析成AST树，并发现bar并没有用过，就不会被打包进去。

## extTextPlugin

这是webpack的一个插件，可以解析出代码里面的css单独打包。这样css可以和组件放在一起了。

    declare const require;
    require("./style.scss");

    @tag({
        name: "pay-toast",
        tmpl: `
        <div class="pay-toast">{content}</div>
        `,
    })
    export class PayToast extends TagCore {
        public name: string = payToastConsts.name;
        public onCreate(tag: ItoastTag, opts: ItoastRiotOpts) {
            tag.update(opts);
        }
       public appendTag() {
           const document = window.document;
           const elem = document.createElement(this.name);
           document.body.appendChild(elem);
       }
    }

