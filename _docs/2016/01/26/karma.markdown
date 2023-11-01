---
layout: post
category: fe
---

# 使用 karma 来做单元测试

> 最近一直在搞 riot，想弄一个单测，正好官网提供了 karma 组件，搞起来吧

# 安装

```shell
cnpm install --save-dev karma-riot
```

# 配置

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ["mocha", "riot"],
    plugins: [
      "karma-mocha",
      "karma-mocha-reporter",
      "karma-phantomjs-launcher",
      "karma-riot",
    ],
    files: ["**/*.tag", "test/**/*.js"],
    preprocessors: {
      "**/*.tag": ["riot"],
    },
    browsers: ["PhantomJS"],
    reporters: ["mocha"],
  });
};
```

# 运行

```shell
karma run
```
