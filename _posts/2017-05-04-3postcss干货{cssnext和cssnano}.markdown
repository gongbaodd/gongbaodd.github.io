---
type: post
category: fe
---
# postcss干货

上文说过，借助extTextPlugin可以把多个组件的css抽取成一个css，但webpack做的只是简单的文件拼接。处理css的地方要交给postcss。

## cssnext

cssnext使用caniuse.com的数据判断css需要支持到哪些浏览器，并自动做出可行的css解决方案（当然让ie6支持flex还是不行的）。

    browsers: ["> 0.1% in CN", "last 2 versions"]

登入 http://browserl.ist/ 可以查看上面的语句能支持的浏览器

## cssnano

postcss也是把css代码解析成ast树，解析之后可以看到冗余代码并对它进行压缩。
