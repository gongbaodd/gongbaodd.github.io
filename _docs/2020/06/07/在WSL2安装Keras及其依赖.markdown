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

# 在 WSL2 安装 Keras 及其依赖

## 安装 python

首先安装 python3 和 pip3，并且使用 USTC 源。

```shell
sudo apt install python3 python3-pip python3-dev
pip3 install -i https://mirrors.ustc.edu.cn/pypi/web/simple pip -U
pip3 config set global.index-url https://mirrors.ustc.edu.cn/pypi/web/simple
```

## 安装 python 科学套件

1. 安装 BLAS 库（OpenBLAS），确保可以在 CPU 上面做张量运算。

   ```shell
   sudo apt install build-essential cmake git unzip pkg-config libopenblas-dev liblapack-dev
   ```

2. 安装 Python 科学套件：Numpy、SciPy 和 Matplotlib。这是做科学计算必须的。

   ```shell
    sudo apt install python3-numpy python3-scipy python3-matplotlib python3-yaml
   ```

3. 安装 HDF5，最初由 NASA 开发，用于保存数值数据的大文件。它可以帮助 Keras 模型快速高效保存到磁盘。

   ```shell
    sudo apt install libhdf5-serial-dev python3-h5py
   ```

4. 安装 Graphviz 和 pydot-ng，这两个包用于可视化 Keras 模型。并不是必须的。

   ```shell
    sudo apt install graphviz
    pip3 install pydot-ng
   ```

5. 安装 tensorflow

   ```shell
   pip3 install tensorflow
   pip3 install tensorflow-gpu
   ```

## 安装 Keras

使用 pip3 安装 Keras。

```shell
pip3 install keras
```

可以从 GitHub 中下载 Keras 的例子

```shell
git clone https://github.com/keras-team/keras.git
```

测试一个例子

```shell
python3 mnist_cnn.py
```

执行成功后会在`~/.keras/keras.json`生成配置文件。
