---
type: post
category: fe
tag: docker tencent strapi
---

# 腾讯云 docker 安装 strapi

## Docker engine

如下是[官网的安装过程](https://docs.docker.com/install/linux/docker-ce/ubuntu/)，首先移出 Ubuntu 原有的 docker（如果有的话）

```shell
 sudo apt-get remove docker docker-engine docker.io containerd runc
 sudo apt-get update
```

安装相关依赖

```
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

增加 docker 的安装源

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

开始安装（我的架构是 x86_64）

```shell
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

## Docker compose

安装新版本`docker-compose`，因为文件存储在 github 上面，这里直接从 DaoCloud 下载。

```
sudo curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 解决 ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running？

需要增加自己用户到 docker 组，然后重新进入即可

```shell
sudo gpasswd -a ${USER} docker
```

## Strapi

按照[strapi 官方文档](https://strapi.io/documentation/3.0.0-beta.x/installation/docker.html)执行如下操作。

新建文件夹，并增加`docker-compose.yaml`

```yaml
version: "3"
services:
  strapi:
    image: strapi/strapi
    environment:
      DATABASE_CLIENT: mongo
      DATABASE_NAME: strapi
      DATABASE_HOST: mongo
      DATABASE_PORT: 27017
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: strapi
    links:
      - mongo:mongo
    volumes:
      - ./app:/srv/app
    ports:
      - "1337:1337"

  mongo:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: strapi
      MONGO_INITDB_ROOT_PASSWORD: strapi
    volumes:
      - ./data/db:/data/db
    ports:
      - "27017:27017"
```

修改 docker 镜像选择[腾讯加速器](https://cloud.tencent.com/document/product/457/9113)。

```json
//  /etc/docker/daemon.json
{
  "registry-mirrors": ["https://mirror.ccs.tencentyun.com"]
}
```

重启服务

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

下载镜像。

```shell
docker-compose pull
```

启动镜像

```shell
docker-compose up -d
```

现在你的 1337 端口已经交给 strapi 了。
