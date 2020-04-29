---
type: post
category: fe
tag:
  - CSS
---

# CSS Secret 有感

虽然维多利亚的秘密没有了，但是 CSS 的秘密还是可以考虑考虑的，这本书是 2015 年出版的，相比于现在，显然里面的很多属性已经可以做到多平台兼容了，当然里面还没有涉及 grid 布局，强烈推荐 [wesbos 的 grid 课程](https://cssgrid.io/)，虽然看完也是忘 😅。

要说编程算法难学，跟 CSS 比起来还是个弟弟，不仅仅要了解一些拓扑的知识，编出来的图形还得好看。

书中的实现都放在[这里](http://play.csssecrets.io/)，同时我也挑了一些喜欢的[自己实现了一下](http://css.gongbushang.com/)。

书里面涉及到的有

- outline
- box-shadow
- background-image（里面提到了一个纯 CSS 实现北京图案的[网站](https://leaverou.github.io/css3patterns/)，值得拥有）
- background-origin
- border-image
- path-clip
- transform
- filter
- font-variable
- keyframe

目前个人比较感兴趣然而未被涉及的是

- grid
- css variables

当然这些那会儿都还没有，所以闲着没事儿干的时候还要多逛逛[css-tricks](https://css-tricks.com/)。

还有，在写[svelte](/fe/2020/03/27/svelte一个让人眼前一亮的的前端框架.html)曾经提过如果有一个比较好的 CSS 和 JavaScript 以及 HTML 交互的方法就好了，细想之下 css variables 或许可以。试想如下结构。

```html
// Back.svelte
<div class="bg">
  <slot></slot>
</div>

<style>
  .bg {
    --color: red;
  }
</style>
```

```html
// Menu.svelte
<ul>
  <li>Menu</li>
</ul>

<style>
  ul > li {
    color: var(--color, blue);
  }
</style>
```

```html
// App.svelte
<script>
  import Back from "Back.svelte";
  import Menu from "Menu.svelte";
</script>

<Back>
  <menu></menu>
</Back>
```

此时的 Menu 应该是 Back 里面设置好的红色（我自己没尝试，只是写这个博文的时候临时起意）。这最大的好处显而易见，类似于 react 里面的 theme，`<Back/>`组件给`<Menu/>`组件提供了配合的样式，而不仅仅局限于 JavaScript 传入的数据。

只可惜 CSS variables 需要做向下兼容，而且就算是 postcss 的[postcss-css-variables](https://www.npmjs.com/package/postcss-css-variables)也只能兼容放到`:root`下的变量（那要你有何用囧），不过就[caniuse](https://caniuse.com/#feat=css-variables)的数据，不考虑中国用户的话，确实可以大胆使用 CSS variables，就算是降级估计也没那么难看吧。
