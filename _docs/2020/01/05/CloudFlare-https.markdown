---
type: post
category: tech
---
# 利用CloudFlare实现网站https访问

## 配置DNS指向CloudFlare

首先登入CloudFlare的时候，会被要求更改网站的DNS为cloudflare中。需要登入到自己网站的域名配置中修改DNS到CloudFlare下。

配置成功后，收到CloudFlare的确认邮件，打开DNS，将Proxy status都打开。

## 配置https-only

打开CloudFlare的TLS选项，选择encryption mode为flexible，就是服务器到cloudflare不加密（只要cloudflare不作恶，我就OK），在Edge Certificates里面选择Always use https即可。

## 配置防火墙只允许cloudflare的IP

这里没配置成功，留个坑以后补全。

安装firewalld

```
sudo apt install firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld
```

接下来执行以下脚本为cloudflare增加至白名单

```shell
!#/bin/bash

for i in $(curl "https://www.cloudflare.com/ips-v4");
do
sudo firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="'$i'" port port=80 protocol=tcp accept';
sudo firewall-cmd --permanent --zone=public --add-source=$i;
done

for i in $(curl "https://www.cloudflare.com/ips-v6");
do
sudo firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv6" source address="'$i'" port port=80 protocol=tcp accept';
sudo firewall-cmd --permanent --zone=public --add-source=$i;
done

sudo firewall-cmd --permanent --change-zone=eth0 --zone=public

sudo firewall-cmd --reload

firewall-cmd --zone=public --list-all
```