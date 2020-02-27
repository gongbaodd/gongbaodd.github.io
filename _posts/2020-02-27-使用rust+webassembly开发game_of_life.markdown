---
type : post
category: fe
---
# 使用rust+webassembly开发game of life

这是一篇翻译，原文在https://github.com/rustwasm/book.git，这可能是第一篇系统讲解rustwasm的文章了。

## 这本书适合谁？

这本书适合任何对快速编译Rust和Webassembly感兴趣的人，相关的代码已经发布在网上。你应该已经了解一些Rust的知识，对JavaScript HTML和css很熟悉，但你不需要是在这些方面的专家。

还不了解rust？请先参阅[开始使用rust语言](https://doc.rust-lang.org/book/)。
不了解JavaScript的html或者是css？请参阅[MDN](https://developer.mozilla.org/en-US/docs/Learn)

## 为什么用rust和webAssembly

### 底层支持和高效(Low-Level Control with Hign-Level Ergonomics)

Javascript的应用，纠结于如何保持高效运作。但是JavaScript的动态类型系统和垃圾回收机制，使他们不能高效。看起来很小的修改，如果不小心走出了JIT的舒适区，看起来很小的修改都会导致很严重的错误。

### .wasm文件大小

因为要通过网络下载，代码的大小就变得异常重要。Rust不需要运行环境，使得编译文件不需要包括垃圾回收器。这些文件包括的只有真正需要的函数。

### 不要重写所有的东西

现有的代码不需要被扔走，你可以把性能最严重的JavaScript函数，交给rust去执行。

### 和其他工具交互融洽

Rust和WebAssembly支持现有的工具链，它支持ecmascript模块，并且你依然可以使用现有的工具链如NPM，webpack和greenkeeper。

## 背景和相关概念

### 什么是WebAssembly

WebAssembly（wasm）是一个简单的机器模块拥有大量的[定义](https://webassembly.github.io/spec/)。它被设计得以相近于原生的速度便携紧密地执行。

作为一个开发语言，尽管是以两种方式展示的格式，wasm依然表示于同样的结构。

+ ```.wat```文本格式（叫做WebAssembly Text），使用[S-expression](https://en.wikipedia.org/wiki/S-expression)，有点类似于Lisp家族，像是Scheme和Clojure。
+ ```.wasm```二机制格式，是一个底层的目标是让wasm虚拟机使用的格式，有些类似于ELF和Mach-O。

以```.wat```书写的斐波那契数列如下：

```wasm
(module
  (func $fac (param f64) (result f64)
    get_local 0
    f64.const 1
    f64.lt
    if (result f64)
      f64.const 1
    else
      get_local 0
      get_local 0
      f64.const 1
      f64.sub
      call $fac
      f64.mul
    end)
  (export "fac" (func $fac)))
```

如果感兴趣的话，可以使用[此工具](https://webassembly.github.io/wabt/demo/wat2wasm/)执行上面的代码。

#### 线性内存

Wasm使用的[内存模式](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-mem)很简单。一个wasm模块，可以访问的一系列内存，被限制于一个字节数组中。这些内存会[增长](https://webassembly.github.io/spec/core/syntax/instructions.html#syntax-instr-memory)为多个页（64K）不会收缩。

#### Wasm是仅仅为web开发的吗？

尽管在JavaScript和web社区中有很多讨论。WASM并没有考虑过它的运用环境。所以目前只能定义它为将来可以使用的便携运行格式。但就目前而言，wasm仍然在很多方面与JavaScript有关。不仅仅是浏览器，还有Node.js。

## Conway的Game of Life

这一部分开始使用Rust和WebAssembly开发[Conway的Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)。
