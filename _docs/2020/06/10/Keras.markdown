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

# Keras 回归问题-预测房价

回归问题用于预测一个连续值而不是离散值，如预测明天气温或者软件完成需要的时间。

这个例子是要预测 20 世纪 70 年代中期波士顿郊区房价的中位数。

## 获取数据

```py
from keras.datasets import boston_housing

(train_data, train_targets), (test_data, test_targets) =  boston_housing.load_data()
```

得到的训练数据`train_data`是一个 404x13 张量，测试数据为 102x13 张量，这 13 项包括：

- 总犯罪率
- 超过 25000 平方英尺的住宅比例
- 非商用地比例
- charles river 变量（1 或 0）
- 氮氧化物浓度
- 公寓房间数
- 建于 1940 年前建筑的占有量
- 到五个波士顿就业中心的加权平均值
- 放射状公路可达指数
- 每 \$1000 的物业税
- 城镇学生教师比例
- 1000(Bk – 0.63)^2，城镇黑人占有率
- 低收入人群占有率

```py
train_data[0]
# array([-0.27224633, -0.48361547, -0.43576161, -0.25683275, -0.1652266 ,
#       -0.1764426 ,  0.81306188,  0.1166983 , -0.62624905, -0.59517003,
#        1.14850044,  0.44807713,  0.8252202 ])
```

`train_targets` 对应房价，单位为千美元。

```py
train_targets
# array([15.2, 42.3, 50. , 21.1, 17.7, 18.5, 11.3, 15.6, 15.6, 14.4, 12.1,...
```

## 准备数据

对于这 13 种数据，取值范围不统一，这里要做取值的标准化，简单上讲让每个特征减去其平均值并除以标准差，这样，每个特征值都会取值于 0 左右，和统一的标准差。

```py
mean = train_data.mean(axis=0)
train_data -= mean
std = train_data.std(axis=0)
train_data /= std

test_data -= mean
test_data /= std
```

这里使用训练数据的平均值，这是不对的，但是书里面就这么写，我靠。

## 创建网络

```py
from keras import models
from keras import layers

def build_model():
    model = models.Sequential()
    model.add(layers.Dense(64, activation='relu',
                          input_shape=(train_data.shape[1],)))
    model.add(layers.Dense(64, activation='relu'))
    model.add(layers.Dense(1))
    model.compile(optimizer='rmsprop', loss='mse', metrics=['mae'])
    return model
```

网络最后一层只有一个单元，没有激活，这是标量回归。最后一层的激活函数用于限定输出值的范围，如果是 sigmoid 函数，则输出 0-1 的值，如果最后一层为纯线性层，则可以预测任意范围的值。

编译网络使用 mse 损失函数，即均方误差（mean squared error），预测值和目标值差的平方。训练的指标为 mae 平均绝对误差（mean absolute error），目标值和预测值差的绝对值。如果 MAE 值为 0.5 则代表预测房价与实际房价平均相差 500 美元。

## 利用 K 折验证

因为数据集比较小，可以使用 K 折验证，即把数据分为几分区（一般 4~5 组），最终取几个分区的平均值。

```py
import numpy as np

k = 4
num_val_samples = len(train_data) // k
num_epochs = 100
all_scores = []
for i in range(k):
    print('processing fold #', i)
    # Prepare the validation data: data from partition # k
    val_data = train_data[i * num_val_samples: (i + 1) * num_val_samples]
    val_targets = train_targets[i * num_val_samples: (i + 1) * num_val_samples]

    # Prepare the training data: data from all other partitions
    partial_train_data = np.concatenate(
        [train_data[:i * num_val_samples],
         train_data[(i + 1) * num_val_samples:]],
        axis=0)
    partial_train_targets = np.concatenate(
        [train_targets[:i * num_val_samples],
         train_targets[(i + 1) * num_val_samples:]],
        axis=0)

    # Build the Keras model (already compiled)
    model = build_model()
    # Train the model (in silent mode, verbose=0)
    model.fit(partial_train_data, partial_train_targets,
              epochs=num_epochs, batch_size=1, verbose=0)
    # Evaluate the model on the validation data
    val_mse, val_mae = model.evaluate(val_data, val_targets, verbose=0)
    all_scores.append(val_mae)
```

这样获得值如下，2.1~2.6 不等。

```py
all_scores
# [2.1905605792999268,
#  2.4371392726898193,
#  2.3653202056884766,
#  2.5255486965179443]
```

如果想让数据更精确，不如让训练次数从 100 增加到 500，但是书里面最终的数据到 80 就差不多过拟合了，再加上我的笔记本跑不起来 500 次，这里就算了吧。。。

## 预测

```py
model = build_model()
model.fit(train_data, train_targets,
          epochs=80, batch_size=16, verbose=0)
test_mse_score, test_mae_score = model.evaluate(test_data, test_targets)
```

最后预测的房价和现实房价相差大概 2714 美刀（书里预测的是 2550）.
