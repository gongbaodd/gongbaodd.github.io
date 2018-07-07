---
type: post
category: fe
---

# Gulp v4 之后 task 必须传函数

https://fettblog.eu/gulp-4-parallel-and-series/

如链接所说，为实现并行操作，原来的

```javascript
gulp.task("default", ["css", "html", "js"]);
```

已经改为

```javascript
gulp.task("default", gulp.parallel(["css", "html", "js"]));
```

而如果想串行执行的话可以用`gulp.series`
