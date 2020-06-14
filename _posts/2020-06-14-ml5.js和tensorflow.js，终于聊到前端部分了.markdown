---
type: post
category: fe
tag:
  - tensorflow
  - keras
  - wsl2
  - python
series:
  name: 张量麻辣烫
  slug: learn-tensorflow
---

# ml5.js 和 tensorflow.js，终于聊到前端部分了

既然在浏览器中也可以计算多维数组，拿浏览器做深度学习也可以理解了。Google 给浏览器中设计了 [tensorflow.js](https://www.tensorflow.org/js)，跟 python 下面的 tensorflow 是同一套 API。又有一群人在 tensorflow 的基础上封装了一套[ml5.js](https://ml5js.org/)。对比 tensorflow.js，ml5.js 去掉了很多张量计算的部分（说实话，这些东西真不是人学的，我这一周都在研究这些计算...）。所以本文会以 ml5.js 开始。

## ml5.js

这是[Daniel Shiffman](http://www.shiffman.net/)主导的 JS 深度学习库，我特喜欢看他的视频睡觉。这个库的[使用教程](https://learn.ml5js.org/docs/#/reference/index)不能更详细了！

官网的简介，是使用 MobileNet 了`imageClassifier`，这是我的[笔记](https://observablehq.com/@gongbaodd/untitled)，可以用来判断图片、视频中的物体是什么。

另外也可以使用`neuralNetwork`，这是[笔记](https://observablehq.com/@gongbaodd/ml5-js-neural-network)，基本上前面两篇关于 tensorflow 的文章都可以使用它来跑。

使用 ML5.js 很大的简化了 tensorflow 的 API，然而并不是你可以不了解 tensorflow，因为期间会有很多参数难以理解，又不得不回头看它。

## tensorflow.js

基本上会了 python 版本，js 版本就算是个子集了，基本上很多需要的包都有替代。[这里](https://www.tensorflow.org/js/guide/layers_for_keras_users?hl=zh-cn)是一个给 keras 用户使用的 tensorflow.js 指南。另外去强烈建议看看[tensorflow.js 指南](https://www.tensorflow.org/js/guide?hl=zh-cn)。

- `tf.layers` => Keras
- `@tensorflow/tfjs-vis`原生支持 tensorflow 的数据可视化库（那敢情好啊）
