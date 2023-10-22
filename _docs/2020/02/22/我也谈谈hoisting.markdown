---
type: post
category: fe
tag:
  - JavaScript
---

# 我也谈谈 hoisting

最近在看 getify 的[You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)，第二版里面相对于第一版增加了很多个人认为比较硬核的东西。第二版貌似对 var 关键字进行了洗白，就目前来看还是比较争议的，毕竟这几年来我基本上已经用 let 完全替代 var 了。

最近我正好是在学习 Rust，首先说明一下 Rust 的确是一个不太好学习的语言，但是学会了之后就会对编译原理有更高更深一层次的认识（同样学会了 typescript，也会有类似的感觉）。

那也许是时代的问题。人们发现面向对象并不是万能的，面向函数逐渐的从原来不受人注意，变的受人理解。尤其是最近我还跟一些人在讨论到一些面向对象的继承属性。以后的以后的继承，将逐渐被组合所替代。甚至是 rust，里面已经没有了继承关系。而最受欢迎的前端框架 react 框架也逐渐的使用函数来替代对象。

那么我们现在回顾一下，2015 年，那年 TC39 发布了 ECMA2015，包括块级作用域，let，class 等关键字。当时 JavaScript 的作者，Brendan Eich 就说他不赞成这个对象的设计，但是显然很多人没有理解，当然后来还发生了关于 class 成员是否跟分号的 bug。

那么现在我们把当年的事情再拿出来看一看。Hoisting 这个 JavaScript 独有的特性，是不是一个鸡肋的 bug。

参考 BrendanEich 老爷子自己的[话](https://twitter.com/brendaneich/status/562313394431078400)

> function declaration hoisting is for mutual recursion & generally to avoid painful bottom-up ML-like order

> `var` hoisting was an implementation artifact. `function` hoisting was better motivated.

首先是 ML 这个语言呢也是一个基于函数的语言。但是跟 js 不太一样的是，这个语言就没有 hoisting，所以呢，看代码就只能是一行一行的看下去，比较麻烦。

至于 var 的提升，则是实现 function 带来的人工产物。

想一想 2015 年之前我们写前端 js 代码的时候，往往会把依赖的 function 放到最底下。

```javascript
function foo() {
  bar1();
  bar2();
  bar3();

  return;

  function bar1() {}

  function bar2() {}

  function bar3() {}
}
```

其实就像你现在这个角度来观察这个代码，也会觉得。这个语言的确有它的独到之处。这样的写法，直接通过 return 关键字，把一个函数分成了构造函数部分和他的私有成员。如果想要了解这个函数的功能的话，大可不必把所有的函数都看一遍。

自从有了块级作用域，JavaScript 就必须要考虑，同时存在块级作用域和函数作用域的情况，就出现了 TDZ 的情况。简单讲就是说，就是块级作用域，变量不能被重复声明，即使是使用函数声明，而以前的 var 关键字是可以重新定义的（当然重新定义的时候没有重新赋值，因为提升的关系重新定义，并不存在）。

```javascript
{
  let foo = "foo";
  var foo; // wrong
}
```

```javascript
{
  var foo = "foo";
  let foo; // wrong
}
```

那么块级作用域有没有提升呢？那肯定是有的，因为如果你想判断这个作用域下面的变量是不是被重新定义了，还是要预先申请内存的。只不过在他声明之前被使用的话，相比于函数变量返回未定义的值，块级作用域会报错。

所以我们一般会把块级作用域变量定义放在这个块儿的最上面，来消除 TDZ。

但是把定义放在最上面的话，就如之前所说的失去了 JavaScript 初衷的优雅。所以 function 和 var 关键字并不一定被宣判死刑，而是在特定的情况下还能被拿出来使用。

不过，话说回来，优雅的东西不一定就是所有人喜欢的。块级作用域对 C 语言使用者来说没有学习障碍，工程上还是少数服从多数，选择最简单的而不是选择最对也存在合理性，所以即使现在面向对象逐渐失宠也不一定将来也会被摒弃。

另外，Eich 和 Crockford 还有一篇访谈，可以看一下。

[Eich and Crockford on the Future of JavaScript: Insight from the Creators of JavaScript and JSON](https://www.infoq.com/news/2018/07/eich-crockford-js-future/)
