---
type: post
category: fe
---
# jest 报警 exceedsMaxOf500KB

已经工作快半年了，做个小记录，jest测试的时候偶尔会报lodash exceeds the max of 500KB错误。

查了很多配置，应该是coverage哪里的问题，在coveragePathIgnorePatterns里面忽略```<rootDir>/node_modules/```即可。 