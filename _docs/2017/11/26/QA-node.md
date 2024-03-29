---
type: post
category: tech
---
# 给 QA 同学看的 node 科普

## 目录

* 什么是 Node.js
* 什么是 NPM
* 什么是 QXF
* 什么是 webpack
* 什么是 postcss
* 什么是 sass
* 什么是 babel
* 什么是 TypeScript
* node时代下的前端发布流程
* 单元测试
* 端对端测试

## 什么是 Node.js

![](http://click-labs.com/wp-content/uploads/2014/05/nodejs_logo_green.jpg)

Node.js 是一个开源的跨平台 javascript 运行时. 
初期是由 Ryan Dahl 在 2009 年设计开发.

设计 Node.js 的灵感来自于一套向 Flicker 上传进度条的实现. 

![](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Ryan_Dahl.jpg/440px-Ryan_Dahl.jpg)

## Node.js 的技术细节

* 基于谷歌 Chrome 的 V8 JavaScript 即时编译器
* 单线程无阻塞 I/O
* 基于 CommonJS 的模块机制
* 一元化的 API
* 事件轮询

### 单线程无阻塞 I/O

Web 请求,对于即时性要求并不高,
服务器需要处理一堆的异步事件,
照以往的逻辑,
我们会通过新建线程来处理这套逻辑,
而这种方式往往是浪费资源的.

在 Node.js 里面程序是单线程的,
每一个异步事件通过事件轮询的方式解决.
代码被要求以回调形式编写.

```javascript
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### CommonJS

因为 JavaScript 的模块标准是在 2016 年才被定义的,
所以 Node.js 使用的是另外一套模块机制 CommonJS.

CommonJS 包括 require 函数和 module 对象.

```javascript
var a = require("path/to/a.js");
module.exports = {...};
```

### 一元化的API

使用 JavaScript 做服务器语言的框架其实很多,
但是 Nodejs 最吸引人的一点就是一元化API.

比如日志API:

```javascript
var a = "浏览器下打印日志";
console.log(a);
```

```js
var a = ".Net下打印日志";
print(a);
```

```js
var a = "Node.js下打印日志";
console.log(a);
```

### 事件轮询

事件轮询是计算机系统的一种机制,
JavaScript 用的是这种机制来解决单线程运行带来的问题.

![](http://image.beekka.com/blog/201310/2013102001.png)

## Node.js 小结

![](https://img3.doubanio.com/lpic/s27269296.jpg)

## 什么是 NPM

![](http://playnode.io/2012/img/profile/aa.jpg)

NPM 是 2010年由 Isaac Z. Schlueter 开发,
用于 JavaScript 的模块管理.

NPM 包括一个命令行的前端和一个远端资源库默认是 https://registry.npmjs.org/

npmjs.org 默认免费, 但是提交者的代码必须面向全网使用,
也可以购买私有源, 私有模块往往如

```shell
@xxx/name
```

由于 NPM 本身开源,
所以也有很多公司为了省钱单独搭建资源库,
并定期和NPM同步.

### NPM 在客户端的用途

#### 本地安装 NPM 代码包

```shell
npm install <package_name><?:@version>
```

执行以上代码之后,
本地文件夹下会增加一个 node_modules 文件夹,
里面放的是新安装的 NPM 代码包.

代码包会首先按照指定的 version 安装,
其次会按照本地 npm-shrinkwrap.json 安装,
再次会按照本地 package.json 按装,
最后会安装最新版.

#### pacakge.json

```
npm init
```

每一个 NPM 模块必须有一个 package.json,
一下简单介绍几个重要字段.

* name　代码包的名字
* version 代码版本
* main 包的入口文件
* scripts 自定义命令
* dependencies 本包需要安装的依赖包
* devDependencies 本包开发时需要安装的依赖包

#### npm-shrinkwrap.json

package.json 里面只记录了依赖包的版本信息,
会导致多端执行 npm install 之后生成的 node_modules 不一致.

```shell
npm shrinkwrap
```

执行上述命令, 本地根目录会新建 npm-shrinkwrap.json,
文件会记录本地安装的每一个依赖包的确切版本信息以及资源库地址.

#### run-script

package.json 里面的 script 字段是可以写 shell 命令的.

```javascript
{
    "script": {
        "test": "node test.js",
        "dev": "NODE_ENV=dev && node index.js",
        "prd": "NODE_ENV=prd && node index.js",
        "hello": "echo \"hello\""
    }
}
```

执行命令也很简单

```shell
npm run test
```

## 什么是 Express

![](http://img.kuqin.com/upimg/allimg/140806/2330395116-1.jpg)

Express 是 TJ Holowaychuk 于 2009年开发的, 基于 Node.js 平台，快速、开放、极简的 web 开发框架。

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```

### Connect 中间件

Connect是一个node中间件（middleware）框架。如果把一个http处理过程比作是污水处理，中间件就像是一层层的过滤网。每个中间件在http处理过程中通过改写request或（和）response的数据、状态，实现了特定的功能。

```javascript
app.use(middleware);
```

### 路由器

Express 路由器在我看来算是一种特殊的中间件,
只不过路由结束之后整个请求就结束了.

```javascript
app.use('/calendar', router);
```

### QXF

QXF 是去哪儿基于 Express 修改的 web 框架,
在 Express 的基础上增加了面向去哪儿内部的监控等服务SDK.

## 什么是 webpack

webpack 是一个模块的打包工具, 支持打包 CommonJs, AMD, ES6 modules, CSS, Images, JSON, Coffeescript, LESS, ...

### 什么是 FEkit

FEkit 是去哪儿之前一直使用的前端打包工具,能够打包 CSS 和 CommonJS, 现在已经不进行维护.

### 什么是 ykit

ykit 基于 webpack, 是去哪儿目前大部分使用的打包工具.

## 什么是 postcss

postcss 是一个类似于 node-sass 的预编译期器,
只不过编译的是 CSS. 它可以把更高级的 CSS 代码进行降级处理以适配兼容更古老的浏览器.

## 什么是 SASS

SASS 是 CSS 的扩展语言,
node-sass 是 SASS 的编译器,
SASS 编译之后会生成 CSS.

由于去哪儿内部大量使用的 Yo 框架基于 SASS,
所以 node-sass 编译是一个必选项.

## 什么是 babel

babel 可以对更高级的 JavaScript 代码进行降级处理,
以适配兼容更古老的浏览器.

## 什么是 TypeScript

TypeScript 是对 JavaScript 的功能扩展之后的语言,
增加了类型检查和代码编译以适应更复杂的开发需求.
它编译后生成代码是 JavaScript.

## node时代下的前端发布流程

### 代码检查

检查JS,TS,SASS,CSS...等文件是否有语法错误

### 资源分拣

* 分离前后端JS
* 分离CSS
* 分离大图片
* 小图片 base64 编码

### 编译检查

* 编译 TypeScript
* 编译 SASS

### 向下编译

* babel 向下兼容处理
* postcss 向下兼容处理

### 打包

分别打包前后端代码

### 客户端代码混淆压缩

* JS 使用 Uglify 混淆
* CSS 使用 cssnano 混淆

### 客户端代码上传 CDN

### Node 代码上传服务器

### 重启服务

## 单元测试

JavaScript 目前已经有多套单元测试框架,
如 Jest, Jasmine, Tape, AVA...

```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

## 端对端测试

superagent 可以对 http 请求进行断言处理.

```javascript
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
```