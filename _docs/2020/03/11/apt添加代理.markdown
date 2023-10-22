---
type: post
category: tech
tag:
  - apt
  - proxy
---

# 为 apt 添加代理

我的上帝啊，这两天都在忙活代理（翻译腔）。

系统全局下的`http_proxy`似乎对 apt 无效，需要单独设置。

```shell
sudo nano /etc/apt/apt.conf.d/proxy.conf
```

增加代理

```shell
Acquire {
  HTTP::proxy "http://127.0.0.1:8080";
  HTTPS::proxy "http://127.0.0.1:8080";
}
```
