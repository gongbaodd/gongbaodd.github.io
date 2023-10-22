---
type: post
category: book
tag:
  - tensorflow
  - keras
  - wsl2
  - python
series:
  name: 张量麻辣烫
  slug: learn-tensorflow
---

# Keras 分类问题-电影评论分类

> 「Python 深度学习」的例子在[GitHub](https://github.com/fchollet/deep-learning-with-python-notebooks)上。
> 别问我为啥不写在 notebook 上，等我心情好就给网站加一下这给你功能吧

本文的 notebook 在[这个连接](https://github.com/gongbaodd/keras_study/blob/master/3.5%20movie%20reviews.ipynb)。

将 IMDB 上的 50000 条两极分化的评论，一般用于训练，一半用于测试。这些数据中 data 是词索引组成的二维数组，每一行对应每条评论，label 为 0\1 数组，0 表示负面评论，1 表示积极评论。

## 处理数据

```py
import keras
from keras.datasets import imdb

(train_data, train_labels), (test_data, test_labels) = imdb.load_data(num_words = 1000)
```

数据集里面的数字可以解析成评论，每一个`data`都是如`[0, 14, 32, 56...]`的数组。

```py
word_index = imdb.get_word_index()
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])
decoded_review = ' '.join([reverse_word_index.get(i-3, '?') for i in train_data[0]])
```

使用以下方法即可以把训练数据处理成 0/1 二维张量。

```py
import numpy as np

def vectorize_sequences(sequences, dimension=10000):
    results = np.zeros((len(sequences), dimension))
    for i, sequence in enumerate(sequences):
        results[i, sequence] = 1
    return results

x_train = vectorize_sequences(train_data)
x_test = vectorize_sequesnces(test_data)

y_train = np.array(train_labels).astype('float32')
y_test = np.array(test_labels).astype('float32')
```

简单地说，x 值为 25000\*10000 的二维数组，某个单词出现则在它所在的评论序号和对应的单词索引的位置上赋值 1，而 y 对应每个 x 行评论的正负反馈。

## 构建网络

使用 rlu 激活（线性整流函数 `max(0, input)`）的全链接层(Dense)就能很好处理这种输入值为标量和向量的情况，如`Dense(16, activation='relu')`。前面的 16 是一个隐藏单元，表示会将数据表示在一个 16 维的表示空间中，隐藏单元越高，能够学到的网络越复杂，计算代价也越大，但并不是越高越好，往往高了会学到不正确的模式。

两个中间网络，第三层使用 sigmoid 激活（s 函数）以输出 0~1 的值

![S函数](https://wikimedia.org/api/rest_v1/media/math/render/svg/a26a3fa3cbb41a3abfe4c7ff88d47f0181489d13)

```py
from keras import models
from keras import layers
from keras import optimizers
from keras import losses
from keras import metrics

model = models.Sequential()
model.add(layers.Dense(16, activation='relu', input_shape=(10000,)))
model.add(layers.Dense(16, activation='relu'))
model.add(layers.Dense(1, activation='sigmoid'))

model.compile(optimizer=optimizers.RMSprop(lr=0.001),
              loss=losses.binary_crossentropy,
              metrics=[metrics.binary_accuracy])
```

编译网络需要选择损失函数和优化器，这里是个二分类问题，网络最终输出一个概率值，所以最好使用 binary_crossentropy（二元交叉熵），优化器在这里选择 rmsprop。

## 验证模型

现在取训练数据的前 10000 条作为训练，并取后 10000 条做验证数据，20 个轮次，每次使用 512 个样本训练。

```py
x_val = x_train[:10000]
partial_x_train = x_train[10000:]

y_val = y_train[:10000]
partial_y_train = y_train[10000:]

history = model.fit(
  partial_x_train,
  partial_y_train,
  epochs=20,
  batch_size=512,
  validation_data=(x_val, y_val)
)
```

我们可以使用 history 这个变量绘制每次训练的精确度以及损失值变化。训练的损失会随着轮次减少，而验证则不然，大概训练到第 4 次能够拿到理想的结果。

## 预测结果

```py
model = models.Sequential()
model.add(layers.Dense(16, activation='relu', input_shape=(10000,)))
model.add(layers.Dense(16, activation='relu'))
model.add(layers.Dense(1,  activation='sigmoid'))

model.compile(
    optimizer='rmsprop',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

model.fit(
    x_train,
    y_train,
    epochs=4,
    batch_size=512
)
results = model.evaluate(x_test, y_test) # [0.3345052400302887, 0.8581200242042542]

model.predict(x_test)
```

使用`predict`既可预测测试数据的正负反馈了。

```py
array([[0.3796336 ],
       [0.996838  ],
       [0.667047  ],
       ...,
       [0.11539856],
       [0.14184406],
       [0.47513008]], dtype=float32)
```

## 多分类问题

书中还介绍了路透社新闻分类，不同点是构建网络时选用单元比较多（书中选择 64 维，因为有 46 个分类），最后一层激活函数选择`softmax`函数，它能保证这 46 个类的概率和为 1.

最终编译时应选择`categorical_crossentropy`做损失函数。
