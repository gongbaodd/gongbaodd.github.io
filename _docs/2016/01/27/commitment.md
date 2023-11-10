---
type: post
category: fe
---

# 写最正规的 commitment

需要一个工具 Commitizen

```shell
cnpm install -g commitizen
```

在工程目录里面使用 angular 的 message 格式

```shell
commitizen init cz-conventinl-changelog --save --save-exact
```

以后写 commit 的时候不用`git commit`改用`git cz`
