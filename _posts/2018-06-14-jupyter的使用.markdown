---
type: post
category: tech
---

# Jupyter 的使用

## 配置 Docker

安装很容易，记住每次使用 docker 的时候要启动 deamon 服务，其实不建议默认打开，因为 docker 会常驻 8888 端口，这样 charles 就不好抓包了。

还需要把本地用户加到 docker 组里

```shell
gpasswd -a $USER docker
```

加速服务可以用阿里云的，相关帮助已经很清楚了。

## 安装并运行 jupyter

```shell

    docker pull jupyter/base-notebook

    docker run -P jupyter/base-notebook

```

运行 Docker run 之后会有一大堆 http://xxxx:8888/?token=xxxx 的日志。

执行`docker ps`查看哪个端口被映射了，替换地址为 localhost:【端口】即可。

## 使用 jupyter

直接新建 python3 文件，可以直接运行代码了，使用`Ctrl+Enter`组合执行代码。

- `a`插入行
- `b`在行后插入
- `x`删除行

## 安装 tensorflow

哈哈官方版本有[tensorflow-notebook](https://hub.docker.com/r/jupyter/tensorflow-notebook/)

这样就可以直接学习 tensorFlow 啦
