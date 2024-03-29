---
type: post
category: fe
tag:
  - svelte
  - sapper
  - JavaScript
  - rollup
---

# Svelte 让人眼前一亮的前端框架

我觉得必须要介绍一下 [svelte](https://svelte.dev/) 这个框架，确切的说是 svelte v3，这应该是继 [riotjs](http://riot.js.org/)、[typescript](https://www.typescriptlang.org/) 和 [rust](https://www.rust-lang.org/) 之后又一个能给我眼前一亮的感觉的产品了。

## 关于 Svelte

不得不提到他的作者 [Rich Harris](https://github.com/Rich-Harris)，提到他的另一个作品就是大名鼎鼎的 [rollup](http://rollupjs.org/)，这可是第一个提出 tree-shaking 的前端打包器（说实话，这导致我有更多的担忧，svelte 可能会变成像 rollup 一样的小众狂欢）。

回到 svelte，他从 v1 的时候目标就是简单，只不过 v1 版本看起来太像 zepto 了（那我为什么不用原生 JavaScript）。不过 v3 版本这个框架换了个方向，从框架变成了编译器，类似于 riotjs 和 vuejs，组件的 html、css 和 js 可以写在一起，其实我并不是特别推崇这种做法，往往有时候我更倾向于 angularJS 的做法，但是 svelte 的处理真的太完美。

```html
<script>
  const hello = "world";
</script>

<h1>{hello}</h1>

<style>
  h1 {
    color: black;
  }
</style>
```

看到了吗？没有多出来的 `Vue.extend()`，HTML 和 JavaScript 部分的交互竟然这儿么完美！要是 CSS 再加把力就更好了（不过如果是 CSS in JS 的话...那还是用某个 preprocessor 勉强一下好了）。HTML 模板类似比较简单的 handlebars 语法，甚至支持异步模板。

另外 svelte 没有虚拟 DOM，这一点我有一些相见恨晚，我之前就写过[文章](/fe/2016/03/31/VUE&Riot&React实力比较.html)质疑虚拟 DOM 是不是真的能带来性能提高（结果是性能很差），但是最终被人喷了，导致一年后不得不[弃坑 riotjs 改用 preact](/fe/2017/05/15/弃坑Riot转向Preact.html)。但我始终认为虚拟 DOM 更是一个范式而不是能带来性能提升的神器。所以你代码差，换什么范式，性能都差，喷别人之前先称称自己几斤几两好么？

svelte 符合响应式模式，这一点和 riotjs 很类似，借助 svelte 这个编译器，写好的组件会被编译成响应式函数。也许拿 riotjs 做比方会比较难，这里拿 react 做比方，在 react 中实现响应式需要使用`setState()`。

```js
const Com = () => {
    const [state, setState] = useState(1);
    useEffect(() => setState(state + 1), [])
    const stateX2 = state*2;

    return (
    <>
        <div>{state*2}</div>
        <div>{stateX2}</div>
    </>
    );
}
/* 输出
 * <div>2</div>
 * <div>2</div>
*/
```

而由于 svelte 是个编译器，svelte 里面不仅代码更少，而且正确的输出了`stateX2`的值。

```html
<script>
import { onMount } from "svelte";

let state = 1;

onMount(() =>  state += 1);

$: let stateX2 = state * 2;
</script>

<div>{state}</div>
<div>{stateX2}</div>

<!--
    输出
    <div>2</div>
    <div>4</div>
-->
```

没错，完全没有多余的代码（其实 svelte 编译器会默默地给`state`增加一个`observable`的配置，但是这都是编译器自己做的，开发者完全不需要考虑）。这里发现`stateX2`前面有一个`$`标识，表明后面的语句是响应式的。这一点真的很巧妙，因为这个语法是 JavaScript 标准里百年不遇的`goto`语句，svelte 高明的使用 JavaScript 原有的语法实现了新的功能，不像某框架愣是加了一个 JSX 语法（不是鄙视 JSX，JSX 也很牛逼的说）。

在 n 多个框架都在模仿 react 的主流下，这个框架还能别出心裁，不得不赞，如果你感兴趣，我强烈推荐浏览他们的[例子](https://svelte.dev/examples#hello-world)。store 和 context 都非常有启发。

最大的缺点就是目前还没有官方的 TypeScript 支持，这一点很有尴尬，因为 svelte 本身就是 TypeScript 写的。不过现在有第三方的[svelte-preprocess](https://github.com/kaisermann/svelte-preprocess)对 TypeScript 提供支持，不知道啥时候转正。

## Sapper

riotjs 同样没有虚拟 DOM，这使得它在 SSR 方面会[有一些问题](https://riot.js.org/documentation/#riot-dom-caveats)，但是 Svelte 提供了一套 SSR 解决方案，[sapper](https://sapper.svelte.dev/) 同时支持 node 渲染和静态发布。

Sapper 受 next.js 启发，使用`src/route`文件夹下的文件做路由。

```
src/routes
    _layout.svelte -- 布局文件
    _error.svelte  -- 404目录
    index.svelte   -- /或者/index
    posts.json.js  -- /post.json，可以使用类似express路由的方式写接口
```

想要在 index 里面实现 server 端的预加载，可以使用 sapper 的 preload API。

```html
<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch("posts.json");
    const { posts } = await res.json();

    return { posts };
  }
</script>
```

这样会在`window`上面注入一个`__SAPPER__`变量把 server 端预加载的值赋上去。

因为 sapper 还在 beta 阶段，我也不敢拿来开发什么大项目，但真心想写写 svelte，因为它在很多地方非常有新意，历史包袱也不大，暂时写个 [CSS playground](https://css.gongbushang.com/) 来做 [CSS Secrets](http://shop.oreilly.com/product/0636920031123.do) 的笔记好了。

## 单元测试

[testing-library](https://testing-library.com/docs/svelte-testing-library/intro) 提供单元测试支持，配置起来绝对比 react 和 vue 简单，只是因为比较新，所以没有类似的 create react app 这种官方脚手架，当然如果 sapper 出正式版了就算有了。
