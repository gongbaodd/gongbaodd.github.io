---
type: post
category: fe
---
# 用CSS制作3D动画

![](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqi1sjijteg20np0dce82.gif)

直到前几天，我需要做一个简单的3D动画时候，我才意识到其实我还没有用CSS做过3D动画。

很多人其实认为只要写下

```CSS
.3d-Object {
    transform: rotateY(180deg);
}
```

但最终效果并不是三维的旋转，原因是它的父元素必须是一个有深度的盒子。

```CSS
.box {
    perspective: 800px;
}

.box .3d-Object {
    transform: rotateY(180deg);
}
```

如果是希望旋转180度后不展示背面可以添加 backface-visibility。

```CSS
.box .3d-Object {
    transform: rotateY(180deg);
    backface-visibility: hidden;
}
```
