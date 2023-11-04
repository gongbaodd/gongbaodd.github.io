---
type: post
category: tech
---
# 解析outline协议

今天是小三节，祝各位小三都能打倒原配，走上人生巅峰（误）。

谷歌的Outline，如何在linux下面使用呢？

Outline是基于ShadowSocket的，协议是```ss://<base64>@<server>:<port>```所以如果你用的是安卓的客户端，直接把协议转成二维码，用ShadowSocks就能扫码使用了。

上面已经能看出来```server```和```server_port```了，那么一个shadowsocks的配置文件，还差```password```和```method```，解译base64部分，便可以得出```<method>:<password>```。
