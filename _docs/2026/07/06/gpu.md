---
type: post
category: book
series:
    slug: aisoft-course
    name: AIE310008
tag:
    - AI
---

# GPU programming, Triton

This is [the AI course](https://aisoft-course.github.io) from Fudan University by [徐辉](mailto://xuh@fudan.edu.cn)

CUDA is based on SIMT(Single Instruction, Multiple Threads).

Tile programming, traditional programming needs to constantly access the global memory.
Makes the memory as the bottleneck of the computing.
Tile programming cut calculations into pieces, each tile access the shared memory to improve speed.

For pytorch to use GPU, it needs 3 steps:

```python

device = torch.device("cuda" if torch.cuda.is_available() else "cpu") # Test GPU
print(f"Using device: {device}")

model = LeNet5().to(device) # model to GPU

# ...

num_epochs = 5
for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0

    for batch_idx, (inputs, labels) in enumerate(train_loader):
        inputs = inputs.to(device) # Data to GPU
        labels = labels.to(device) # Data to GPU

```

## Triton

Triton is more like OpenGL, a DSL for solving GPU tile programming. You can use python to programme CUDA for different architectures.

Operator Fusion, is a method to combine operators in order to save memory I/Os.

Computation Graph Optimization. All the computing can be seen as a DAG. Pytorch provides interface to open computation graph optimization in order to save memory I/Os.

```python
model = torch.compile(model, backend="inductor", mode="default")
```

