---
type: post
category: tech
---
# curl有一个k参数是可以不校验证书的！

可能是我后知后觉了，curl -k 可以忽略证书认证

> -k, --insecure
(SSL) This option explicitly allows curl to  perform  "insecure"
SSL connections and transfers. All SSL connections are attempted
to be made secure by using the CA certificate  bundle  installed
by  default.  This  makes  all connections considered "insecure"
fail unless -k, --insecure is used.
See this online resource for further details:
 http://curl.haxx.se/docs/sslcerts.html
