---
type: post
category: tech
tag:
  - haproxy
  - shadowsocks
---

# Haproxy 和 nginx 做 SS 中继

隔离在家最痛苦的莫过于家中网络连接 SS 总是断线，参考网上的[方案](https://sjq597.github.io/2018/05/22/ShadowSocks-Haproxy%E4%B8%AD%E7%BB%A7/)，使用国内云服务作为 TCP 转发即可。

## Haproxy 配置

```
global
    ulimit-n  51200

defaults
    log     global
    mode    tcp
    option  dontlognull
    timeout connect 5000
    timeout client  50000
    timeout server  50000

frontend ss-in
    bind *: 国内云服务的端口
    default_backend ss-out

backend ss-out
    server sserver_name SS的IP:SS的端口 maxconn 20480

```

haproxy 可以运行在 docker 容器里

```
docker pull haproxy:latest
sudo docker run -d --name haproxy_6 -v 配置文件目录:/usr/local/etc/haproxy/haproxy.cfg --restart=always -p 云服务端口:配置中的端口 haproxy:latest
```

接下来在国内的云服务安全组里面打开上面的端口即可，实测大部分应用可用，但是推特上面不能显示图片，google play 也没法更新，vmess 协议目前还不支持，这些就看我以后跟进了。

## nginx 配置

相比之下 nginx 更加简单，在 nginx.conf 里面增加如下内容。

```
stream {
    server {
        listen 云服务端口;
        proxy_pass SS的IP:SS的端口;
    }
}
```

这样连 Vmess 都可以使用了，不过混淆加密功能还不好使，唉，涉及到 TLS 我就跪了。

测试之后 PC 端都没问题，但是移动端配置都用不了。
