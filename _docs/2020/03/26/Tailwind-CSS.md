---
type: post
category: fe
tag:
  - css
  - tailwind
  - postcss
---

# [Tailwind](https://tailwindcss.com/) 一个像宏语言的 CSS 解决方案

先把刀放下，我知道，现在已经有 n 种 CSS 的解决方案，而且基本上没有一个用着顺心的。

我记得曾有一段时间，好像是使用 YUI 那会儿，CSS 的 class 往往会命名成布局规则，比如希望一个 div 有 10 像素的留白，就给他添加一个 class，`.margin-10px`，然后对这个 class 的描述为。

```css
.margin-10px {
    margin: 10px;
}
```

当然，这种方式在我入职一段时间后马上消失了，大家都更倾向于使用组件语义化的 class，如显示头像，则把 class 命名为`.avatar`而不是`.margin-10px.padding-5px.radius-50`这种怎么看都不知道是干什么的命名。

于是 CSS 开始和组件越来越近，自从有了 scope CSS， React 和 Vue 的组件库逐渐成形，更多的方案逐渐青睐[CSS in JS](https://cssinjs.org/?v=v10.1.1)，单纯的 CSS 解决方案除了 [bulma](https://bulma.io/) 剩下的就不多了。设计的时候往往要先考虑使用的这个组件库的设计语言能给改造预留出多大的空间，然后再设计。

## 回头想一想

其实把几个 CSS 语句合起来作为一个集合使用并不是错的，现有的 SASS 框架也会用 utils 库专门存储封装好的`@mixins`。想到以前使用[Yo](https://github.com/doyoe/Yo)做前端样式时常会用`@yo-flex('.box'){}`这样的函数，这个函数其实就是将 flex 布局的以及它的降级 box 布局，甚至是优雅降级到不支持 box 布局的样式集合到一起。

如果你认同上面这段话，那么 tailwind 一定是个适合你的工具，个人比较喜欢的是这个工具仅仅基于 postcss，这意味着你不需要使用 SASS（并不是 SASS 不好，只是国内用起来太悲剧，即使已经有 sass dart，但是因为普遍还没支持，每次使用的时候神经都要紧绷一下），它和 SASS 也不冲突。你还可以使用 config 文件来自定义样式（这很像很多 CSS in JS 的样式库，这应该是我喜欢那些库的唯一一点了）。

## 操练起来

[官网安装方式](https://tailwindcss.com/docs/installation)很详细，基本上能提到的工具都提过了。

就拿前面的`.avatar`来举例，使用 tailwind 的代码应如下（注意 tailwind 单位不是 px 而是 rem，这里假定 html 的字体大小为 10px）。

```css
.avatar {
    @apply m-4;
    @apply p-2;
    @apply rounded-full;
}
```

这样既满足了，类名的语义化，还能使用 config 文件来统一自己的设计语言，最重要的，如果你拿 houdini 写个什么奇葩的 polyfill，就算预编译器读不懂，他也会容错，毕竟这就是原生 CSS。

至于官网的示例，我个人很不支持，感觉是一种开倒车的方式，但萝卜白菜各有所爱，如果有公司会因为我写那样的代码而给我钱的话，我当然无所谓。
