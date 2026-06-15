---
type: post
category: tech
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1781522948/Screenshot_20260615_142813_sa5nze.png
    alt: math demo
---

# Deep Knowledge Tracing

Knowledge tracing is a quantitative method for teachers to know how much a student handles skills. Deep Knowledge Tracing (DKT) is to use RNN to solve this problem.

Simply explanation of usage of this technology, imagine a student was offered a series of questions of one kind of skill. Let's say 5 questions. And you got results:

|1|2|3|4|5|
|-|-|-|-|-|
|O|X|O|O|X|

So, when he answers the 6th question, what would he answer?

[Here](https://dkt-math-demo.growgen.xyz) is a simple implementation to show case DKT.

When the student answering the questions, the model will match the student with its trained data, and then calculate the possible correctness of one's answer, even before answering.

## The Implementation

First, get the data. Here I used random generated students' data. Green means correct, grey means wrong.

![generated data](https://res.cloudinary.com/dmq8ipket/image/upload/v1781522091/math_msn77r.png)

The algorithm uses LSTM(Long Short Term Memory) to build RNN. Use binary cross entropy for loss function.Trained in 30 epochs.

The model is exported through pytorch and save in ONNX format.

## Attention

The model's original data is randomly generated, not the real data. That makes the model's decision is not correct. The model is only simplyfied for demostrating inside browsers.

