---
type: post
category: book
series:
    slug: aisoft-course
    name: AIE310008
tag:
    - AI
    - LLMs
---

# Large Language Models Training, Optimization and Agents 

This is [the AI course](https://aisoft-course.github.io) from Fudan University by [徐辉](mailto://xuh@fudan.edu.cn)

## Transformer

### Attention

The core of Transformer is Attention. It includes 3 matrixes:

- Query(Q), what you are looking for
- Key(K), the query mapped into labels
- Value(V), the exact value you are looking for

The Similarity Scores

$$
Score = \frac{Q \cdot K^T}{\sqrt{d_k}} 
$$

$d_k$ is `K.shape[-1]`

The Attention Weights is the softmax normalized similarity score.

$$\text{Attention}(Q, K, V) = \text{Attention Weights} \cdot V$$

### Decoder-only Transformer

There are 3 types of Transformers. The Decoder-only transformer is to predict next word. The study shows how to tokenize shakespeare.txt and train a model base on it.

## Training

### Parameter Efficient Fine-Tuning

This study uses LoRA (Low-Rank Adaptation). It keeps origin weights unchanged and use two matrixes A and B for low rank increment. The result weights will be:

$$
W = W_0 + \frac{\alpha}{r}AB
$$

### Distributed Training

There are several ways to do distributed training.

- Distributed Data Parallel (DDP)
- Fully Sharded Data Parallel（FSDP）
- Pipeline Parallelism（PP）

They can be used as arguments when training.

### Quantization

use fixed point instead of floats

### KV Cache

Store the Keys and Values for reusing

### FlashAttention

separate computing into blocks

### Deployment

- vLLM
- SGLang

## Agent

This part is nothing new, last year, I wrote the blog [Week 48: Smart Player with Strudel REPL](/plan/2025/11/19/week-48-strudel). Which reads the tool-use block from the LLM (a JSON block) to play music.

This study did not mention agent loop, if the `while(1)` loop in main function include some checking or harness (what people likes to call it) to input for the user input, the the agent loop is implemented.