---
layout: post
category: tech
---

```javascript
var http = require("http");

var server = http.createServer(function(req, res) {
    var clientIP = req.headers['x-forwarded-for'] ||
                   req.connection.remoteAddress ||
                   req.socket.remoteAddress ||
                   req.connection.socket.remoteAddress,
        ServerDate = new Date();
    console.log('['+ ServerDate +']' + clientIP);
    res.writeHead( 302, { 'Location': 'http://www.baidu.com/' });
    res.end();
});

server.listen(80);
```

然后将脚本作为守护进程启动

```bash
nohup node app.js > app.log &
```