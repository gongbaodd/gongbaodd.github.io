---
type: post
category: fe
tag:
  - jekyll
  - gatsby
---

# 从 Jekyll 迁移博客到 Gatsby

很久以前就想迁移了，但是一直没下手，原因很简单，就是 ruby 不太熟悉，而使用 node 工具链比较趁手。

当然了，Gatsby 的主题对比 Jekyll 就少太多了，没关系，大不了自己设计（又是一个大坑）。

[Gatsby 官网](https://www.gatsbyjs.org/)的 tutorial 已经很详细了，这里只提简单的几个注意。

- 所谓的 TypeScript 项目仅仅指的是前端，后端部分（因为是静态服务，应该说成编译的钩子`gatsby-node.js`）还是用的是 JavaScript，但是可以通过引入`ts-node`实现引用 TypeScript 文件。

- 不确定是不是 WSL 或者 Windows 的锅，执行`gatsby develop`或者`gatsby build`的时候会偶尔出现权限无法访问并在根目录创建`reduxcache*`文件，挺烦人的其实，回头还得执行`sudo rm -Rf reduxcahce*`删除。

- 无论`components`还是`pages`，其实都做了一层隐式封装，所以只有`default`暴露的组件参能使用 Gatsby 里面诸如`useStaticQuery`的钩子函数。

- Gatsby 默认的 URL 格式和 Jekyll 不一样，为了保持持续性，我修改了`server/onCreateNode`来修改文件的 URL。

- 修改 Travis 上传到`gh-pages`分支后，服务竟然挂了，查看 setting 说我只能在`master`分支上面放编译后的文件（莫非政策有变化？）。无所谓了，把`gatsby`分支改成默认分支，设置`master`分支为部署分支即可。
