---
type: post
category: fe
tag:
  - threejs
  - webGL
  - react
series:
  name: 细品threejs
  slug: threejs-howto
---

# 使用 react-three-fiber 体验美好的 WebGL 开发

使用 threejs 开发 webGL 应用应该是几乎每个前端工程师想要做的事儿，然而虽然对比于原生 WebGL 开发来说，threejs 已经做了很多，但是相对于现代的一些前端框架。threejs 还稍显不足。针对这些不足，微软开发了[Babylon.js](https://www.babylonjs.com/)，给 threejs 量身定制了一个节点编辑器，如果做过 blender 或者 unity 的同学，对于节点编辑器肯定不会陌生，但对我本人来说还是没有触碰到 G 点。

## 描述组件关系的重要性

本人觉得，对于前端开发来说，提供一个能够准确描述组件和组件结构关系的语言（DSL）是至关重要的，如 HTML 之于 web 开发，xml 之于安卓开发。这些 DSL 能够以最直观的方式表达页面将会展示什么，就从开发的角度上来说，或许入门不是很方便，毕竟要处理很多文件。但是维护起来却异常的轻松，就是前面提到的原因，直观。当然因为 JavaScript 跟 HTML 的交互有很大的性能缺陷。所以给很多模板语言提供了机会。比如 mustache 还有 react 的 JSX。在安卓也能看到 anko 在 kotlin 社区兴起，但是仅仅一年就没有更多人使用了，个人体验，在 Android studio 中使用 xml 和 anko 开发体验差距并不大，有时候 xml 甚至占优，也许这就是原因之一了吧。

几年前我翻查了很多框架，老实说可能更多人并没有把结构描述放在如我想的位置上，哪怕连个 JSON 的方案都没有。但是的确有[aframejs](https://aframe.io/)这种直接用 HTML 管理 canvas 中元素关系的库，可惜它更关注于 VR 开发，而我更希望 WebGL 能够成为诸如图书注解一样的工具，当然这种专注于一个方面的做法或许是正确的，毕竟能够汇聚一个小圈的开发者，也不会有很多流失。

## 用 JSX 开发 WebGL

今年运气就好多了，react-reconciler 使得我们能够直接接管组件的 render 函数，而 react-hooks 在开发体验上完美超出现有框架，[react-babylonjs](https://github.com/brianzinn/react-babylonJS) 和 [react-three-fiber](https://github.com/react-spring/react-three-fiber) 应运而生。我同时试用了这两个框架，简单来说，react-three-fiber 更加成熟些，对 tTypeScript 的支持更好，而 react-babylonjs 开发的时候往往会因为处理类型而费心，最后又不得不使用 JavaScript 开发。

## 怎么使用 react-three-fiber

react-three-fiber 的[官方文档链接](https://inspiring-wiles-b4ffe0.netlify.com/)描述很详细，建议详读。另外 threejs 官方来链接的[threejs fundamentals](https://threejsfundamentals.org/)有时间也可以拿来读读。

如果想把原来的 threejs 模块迁移到 react 模块，只需要使用一层 primitive 包装即可。每个拥有 set 和 get 的参数都可以作为 props 的成员，构造器参数则是`props.args: any[]`类型。

```js
const grid = new GridHelper(2000, 20, 0x000000, 0x0000000);
(grid.material as Material).opacity = 0.2;
(grid.material as Material).transparent = true;

const Grid = () => {
  useFrame(({ scene }) => {
    if (!scene.fog) {
      const fog = new Fog(0xa0a0a0, 200, 800);
      scene.fog = fog;
    }
  });

  return <primitive object={grid}></primitive>;
};

```

## 调试工具

这点 babylonjs 要好得多，一个节点编辑器秒杀一切，但是 threejs 还有一个「够用」的[threejs inspector](https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi?hl=en)。

使用时需要把你的 scene 和 THREE 模块暴露给 window 作用域。

```js
window.scene = scene;
window.THREE = THREE;
```

然后刷新浏览器就可以在场景添加光源，查看节点等操作了。

## 提示

因为 threejs 及其模块本身不是编译好的 ES5，在 nextjs 中一定记得使用`next-transpile-modules`编译，当然即使已经完美适配 ES5，在 IE11 的展示也不是很乐观 😅。
