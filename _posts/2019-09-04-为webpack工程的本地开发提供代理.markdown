---
type: post
category: fe
---
# 为webpack工程的本地开发提供代理

首先，我绝对反对线上和本地环境有这种不同配置，但是如果代理是必选项的时候，选择工程化的配置要比每个人维护一套更有效。

需要在webpack.dev.server.config中增加setProxy文件

```
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/api', {
            target: 'https://xxx.api.com',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/api': '/',
            },
        })
    );
};

```

这样，每个请求`localhost/api`的请求就被代理到`https://xxx.api.com`下了。