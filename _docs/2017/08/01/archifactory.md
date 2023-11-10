---
layout: post
category: fe
---
# Achifactory私有源的坑

公司的私有源从CNPM改成AchiFactory了，为的是更好的管理docker、maven、PyPI和npm，结果我在迁移的时候出现了问题。

npm install的时候一直报 module achifactory not found

结果是公司的私有库没有完全同步，我的一个私有包404了，但是报achifactory not found还真是。。。