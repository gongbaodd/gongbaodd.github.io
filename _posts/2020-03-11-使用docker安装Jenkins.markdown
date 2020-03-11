---
type: post
category: tech
tag: docker jenkins ci
---

# 使用 docker 安装 Jenkins

自从成功通过 docker 安装了 strapi，我一下子对安装一切产生了很大兴趣。

通过`docker-compose.yaml`可以很快安装。

```yaml
jenkins:
  restart: always
  image: jenkins/jenkins:lts
  container_name: gongbaodd-jenkins
  volumes:
    - ./docker/jenkins:/home/ubuntu/jenkins_home
  ports:
    - "50000:50000"
    - "8080:8080"
```

然后访问服务器的 8080 端口，即可安装对应插件，注意，这些插件不能走代理，所以...非常慢...国内还是用 coding.net 吧。
