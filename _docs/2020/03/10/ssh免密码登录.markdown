---
type: post
category: tech
tag:
  - ssh
---

# ssh 免密码登录

总是忘，这里做个记录。

简单说就是把本地的`id_rsa.pub`存储到远端机器的`authorized_keys`里面，详细操作可参考[此文](http://www.linuxproblem.org/art_9.html)。
