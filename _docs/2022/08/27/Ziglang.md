---
type: post
category: tech
tag:
  - zig
---

# 试用 Zig

最近 bun 大火，带动一个语法看起来很像 JS 的语言 Zig 受到关注。听了 Devtools 播客里面的推荐，我觉得可以试用一下。

Zig 官网两个学习链接[ziglearn](https://ziglearn.org/)和[ziglings](https://github.com/ratfactor/ziglings)很有帮助，这个语言的学习曲线远没有 Rust 那么陡，甚至可以说，比 C 简单。可以说 Zig 就是披着高级语言语法外衣的 C 语言，而根据官方文档的说法，Zig 的编译器确实可以直接编译 C。

提到语言安全，比较多提的是类型安全和内存安全。类型在 Zig 中只有编译环境使用，官方介绍 Zig 没有宏语言，实际使用中其实是有的，只不过宏语言用的也是 Zig 语法，前面加上了 comptime 关键字，它的泛型写法也利用了编译时可编程的特点。个人觉得使用的时候会混淆，但是教程里面表示用习惯了就不会...

对比 Golang 的垃圾回收和 Rust 的借用机制，Zig 是完全不管内存安全的，跟 C 类似，想要操作堆内存，要新建 allocator，好在利用 defer 关键词能让回收工作在代码里面看起来不是那么难懂。

async 几乎和 JS 一模一样，用起来感觉是 JS 里面 generator 和 async 的合体版（但它不是迭代器），感觉 JS 用户体验是无缝的。

个人很推荐 Zig，是一个完全新味道的语言。
