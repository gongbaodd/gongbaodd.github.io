---
type: post
category: book
series:
    slug: aisoft-course
    name: AIE310008
tag:
    - AI
---

# Use Pytorch to build Neural Networks

This is [the AI course](https://aisoft-course.github.io) from Fudan University by [徐辉](mailto://xuh@fudan.edu.cn)

## CNN

This is LeCun's MNIST

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
import torch.optim as optim


class LeNet5(nn.Module):
    def __init__(self):
        super(LeNet5, self).__init__()

        self.conv1 = nn.Conv2d(1, 6, kernel_size = 5)
        self.conv2 = nn.Conv2d(6, 16, kernel_size = 5)
        self.conv3 = nn.Conv2d(16, 120, kernel_size = 5)
        self.fc1 = nn.Linear(120, 84)
        self.fc2 = nn.Linear(84, 10)

    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = F.avg_pool2d(x, 2)

        x = F.relu(self.conv2(x))
        x = F.avg_pool2d(x, 2)

        x = F.relu(self.conv3(x))
        x = x.view(x.size(0), -1)

        x = F.relu(self.fc1(x))
        x = self.fc2(x)

        return x

transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])


train_dataset = datasets.MNIST(
    root="./data",
    train=True,
    download=True,
    transform= transform
)

test_dataset = datasets.MNIST(
    root = "./data",
    train = False,
    download = True,
    transform = transform
)

train_loader = DataLoader(
    train_dataset,
    batch_size = 64,
    shuffle = True
)

test_loader = DataLoader(
    test_dataset,
    batch_size = 4,
    shuffle=False
)

model = LeNet5()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr = 0.001)

num_epoch = 5
for epoch in range(num_epoch):
    model.train()
    running_loss = 0.0

    for batch_idx, (inputs, labels) in enumerate(train_loader):
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()
        if batch_idx % 100 == 99:
            print(
                f"Epoch [{epoch+1}/{num_epoch}]",
                f"Batch [{batch_idx + 1}]",
                f"Loss: {running_loss/100: .4f}"
            )
            running_loss = 0.0

print("Done !")
torch.save(model.state_dict(), "lenet5_mnist.pth")
```

the evaluation

```python
import torch
from cnn import LeNet5, test_loader

model = LeNet5()
model.load_state_dict(torch.load("lenet5_mnist.pth"))
model.eval()

for batch_idx, (input_batch, lable_batch) in enumerate(test_loader):
    output_batch = model(input_batch)
    predicted_classes = torch.argmax(output_batch, dim=1)

    print(f"Batch {batch_idx+1}")
    print("Output logits:", output_batch)
    print("Output shape:", output_batch.shape)
    print("predict type:", predicted_classes)
    print("label", lable_batch)
    print("-"*40)
```

Result of last batch

```txt
Batch 2500
Output logits: tensor([[ -8.9938,  -0.2688,  -4.2024,  11.4873,  -6.4614,   0.7035, -16.0143,
          -0.3115,  -2.5308,   0.7617],
        [-11.4945,  -2.8106,  -7.6547, -14.6582,  13.9564,  -6.6485,  -4.2778,
          -3.8979,   1.5796,  -1.4722],
        [ -7.1160,  -6.9228,  -7.2192,   0.9188,  -8.1712,   9.9586,  -1.1530,
          -4.5453,   5.3953,  -2.4253],
        [ -0.1725,  -7.3120,  -1.9278,  -3.9099,  -0.6916,   0.7356,   9.8386,
         -10.0977,  -1.8354,  -2.3376]], grad_fn=<AddmmBackward0>)
Output shape: torch.Size([4, 10])
predict type: tensor([3, 4, 5, 6])
label tensor([3, 4, 5, 6])
----------------------------------------

```

## RNN