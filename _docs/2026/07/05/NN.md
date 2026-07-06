---
type: post
category: book
series:
    slug: aisoft-course
    name: AIE310008
tag:
    - AI
---

# Make a Neural Network (FNN)

This is [the AI course](https://aisoft-course.github.io) from Fudan University by [徐辉](mailto://xuh@fudan.edu.cn)

## Using Neural Network to predict factorial numbers

$$
x! = \prod_{i=1}^{x} i.
$$

In case of overflow, the study changed to the log value.

$$
log(x!)= log(\prod_{i=1}^{x} i)=\sum^{x}_{i=1}log(i)
$$

The study uses feed-forward neural network(FNN) to predict the numbers.
It introduces 2 activation functions, sigmoid function and ReLU(Rectified Linear Unit).

$$
\sigma(z_{\text{sigmoid}}) = \frac{1}{1+e^{-z}}
$$

$$
\sigma(z_{\text{ReLU}}) = max(0, z)
$$

Every neurons is represented as:

$$
h_i = \sigma(w1_{i} \cdot x + b1_i)
$$

The predicted result is:

$$
\^{y} = \sum_{i=1}^nw2_{i} \cdot h_i + b2
$$

```python
import random
import numpy as np
import math


class FactorialNN:
    def __init__(self, hidden_size=10):
        self.hidden_size = hidden_size
        self.w1 = [random.uniform(-1, 1) for _ in range(hidden_size)]
        self.b1 = [random.uniform(-1, 1) for _ in range(hidden_size)]
        self.w2 = [random.uniform(-1, 1) for _ in range(hidden_size)]
        self.b2 = random.uniform(-1, 1)

    def forward(self, x):
        z = []
        h = []

        for i in range(self.hidden_size):
            zi = self.w1[i] * x + self.b1[i]
            z.append(zi)
            h.append(self.sigmoid(zi))

        y = sum(self.w2[i] * h[i] for i in range(self.hidden_size)) + self.b2

        return z, h , y

    def sigmoid(self, z):
        if z >= 0:
            return 1.0 / (1.0 + math.exp(-z))
        ez = math.exp(z)
        return ez / (1.0 + ez)
    
    def sigmoid_derivative(self, h):
        return h * (1-h)
    
    def train(self, x, target, lr=0.01):
        z, h, y = self.forward(x)
        dy = y - target
        mse = dy ** 2

        dh = []
        for i in range(self.hidden_size):
            grad = dy * self.w2[i] * self.sigmoid_derivative(h[i])
            dh.append(grad)

        for i in range(self.hidden_size):
            self.w2[i] -= lr * dy * h[i]
        self.b2 -= lr * dy


        for i in range(self.hidden_size):
            self.w1[i] -= lr * dh[i] * x
            self.b1[i] -= lr * dh[i]

        return mse
    
MAX_N = 10

def log_factorial(n):
    return math.log(math.factorial(n))

training_data = [
    (n/MAX_N, log_factorial(n))
    for n in range(1, MAX_N + 1)
]

nn = FactorialNN(hidden_size=10)

for epoch in range(20000):
        total_loss = 0.0
        for x, y in training_data:
            total_loss += nn.train(x, y)

        if epoch % 2000 == 0:
            print(f"Epoch {epoch}, Loss = {total_loss: .4f}")

print("\nPrediction Results:")

for n in range(1, MAX_N + 1):
    x = n/MAX_N
    _, _, y_pred = nn.forward(x)
    fact_pred = math.exp(y_pred)

    print(f"{n}! = {fact_pred:.1f} (true: {math.factorial(n)})")
```

The result

```txt
Epoch 0, Loss =  554.7173
Epoch 2000, Loss =  0.0899
Epoch 4000, Loss =  0.0820
Epoch 6000, Loss =  0.0763
Epoch 8000, Loss =  0.0713
Epoch 10000, Loss =  0.0670
Epoch 12000, Loss =  0.0633
Epoch 14000, Loss =  0.0601
Epoch 16000, Loss =  0.0571
Epoch 18000, Loss =  0.0544

Prediction Results:
1! = 0.9 (true: 1)
2! = 2.2 (true: 2)
3! = 6.5 (true: 6)
4! = 24.2 (true: 24)
5! = 113.3 (true: 120)
6! = 674.6 (true: 720)
7! = 4956.8 (true: 5040)
8! = 42390.3 (true: 40320)
9! = 387966.6 (true: 362880)
10! = 3439981.9 (true: 3628800)
```