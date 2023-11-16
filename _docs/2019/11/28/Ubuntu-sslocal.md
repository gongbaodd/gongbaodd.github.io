---
type: post
category: tech
---

# 树莓派 Ubuntu 实现 sslocal 负载匀衡

由于某些原因，我配置了多个 ssserver，windows 客户端可以简单配置负载匀衡，而在 linux 上面需要借助 haproxy。

首先，因为我的服务是 aes-255-gcm 加密方式，需要升级 ss 客户端。

```shell
pip install https://github.com/shadowsocks/shadowsocks/archive/master.zip -U
```

修改 sslocal 配置，server 连接的是本地 haproxy 端口，增加/etc/shadowsocks/default.json

```json
{
    "server": "127.0.0.1",
    "server_port": 8888,
    "local_address": "127.0.0.1",
    "local_port": 1234,
    "password": "password",
    "timeout": 50,
    "method": "aes-256-gcm",
    "fast_open": true,
    "workers": 2
}
```

为 sslocal 增加 service，增加/etc/systemd/system/sslocal.service

```ini
[Unit]
Description=Shadowsocks
After=network.target

[Service]
ExecStart=/usr/local/bin/sslocal -c /etc/shadowsocks/default.json
Restart=on-abort

[Install]
WantedBy=multi-user.target
```

好了，sslocal 的部分说完了，接下来 apt 安装 haproxy，修改/etc/haproxy/haproxy.cfg，增加以下行。

```ini
listen status
    bind *:1111
    mode  http
    stats refresh 30s
    stats uri /status
    stats realm Haproxy
    stats auth admin:admin

frontend ss-in
    mode tcp
    bind *:8888
    default_backend ss-out

backend ss-out
    mode tcp
    option tcp-check
    balance roundrobin
    server xxx <server>:<port> check
    server yyy <server>:<port> check
    server zzz <server>:<port> check
```

配置完成还要改一下 systemd，/etc/systemd/system/haproxy.service，修改 After 和 Wants 字段，用 network-online.target 替换 network.target。

最后用 systemd 启动 haproxy 和 sslocal。

```shell
sudo systemd enable haproxy
sudo systemd enable sslocal
```

**_参考链接_**

[求教如何让 ss 客户端支持 aes-256-gcm 加密方式](https://www.ubuntukylin.com/ukylin/forum.php?mod=viewthread&tid=188059)

[guyskk/shadowsocks-server.service](https://gist.github.com/guyskk/a9665bc6b2a89b73fae34678b1f6dc6b)

[多 Shadowsocks 服务器负载均衡](https://www.solarck.com/haproxy-shadowsocks-balance.html)

[解决 Haproxy 用 Systemd 启动失败的问题](https://www.solarck.com/systemd-wait-network-online.html)
