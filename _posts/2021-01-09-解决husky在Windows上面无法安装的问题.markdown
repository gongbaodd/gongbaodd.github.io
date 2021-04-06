---
type: post
category: tech
tag:
  - husky
  - Windows
  - npm
  - yarn
---

# 解决 husky 在 Windows 上面无法安装的问题

其实问题在于，在执行`yarn`安装依赖并处理 git hooks 的时候，Windows 的控制台会打印内容反馈，并被理解为安装失败使得整个安装过程失败了。其实已经过去了很久，但是小版本还没有解决，可以先执行`yarn --silent`忽略 husky 上面的问题。
