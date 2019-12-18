---
type: post
category: tech
---
# DevTools 调试 Node 项目

## 使用 DevTools

```shell
node --inspect-brk index.js
```

要求 node 版本 8 以上，打开 chrome://inspect 之后可以点开 debugger 了， 默认断点是点开的（因为指定了brk）

## 使用 0x 生成火焰图

```shell
0x index.js
```

生成的火焰图

y轴表示调用栈位置，在上面表示正在执行，x表示抽样数，大致可以理解为时间。

## 参考

[How do I debug Node.js applications?](https://stackoverflow.com/questions/1911015/how-do-i-debug-node-js-applications/16512303#16512303)

[如何读懂火焰图？](http://www.ruanyifeng.com/blog/2017/09/flame-graph.html)
