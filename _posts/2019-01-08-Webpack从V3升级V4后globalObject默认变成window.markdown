---
type: post
category: fe
---
# Webpack从v3升级到v4后默认globalObject会变成window

今天小伙伴出于安全考虑把Webpack从v3升级到v4（太可怕了直接一个大版本更新），结果导致我们node上面引用的umd包竟然就挂了，报错内容是 window is undefined.

搜了下Stack Overflow，果然很多人也有这样的问题。从v4开始，webpack默认globalObject为window。

```
module.exports = {
    ...
	output: {
		...
		globalObject: 'this'
	}
}
```

如上改动即可
