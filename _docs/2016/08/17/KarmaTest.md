---
type: post
category: fe
---

# 跑一下前端的单元测试

## 什么是单元测试

指对软件中的最小可测试单元进行检查和验证。

<center><img alt="举个栗子" src="http://i0.hdslb.com/video/05/050dcbac6717c4e1c99c6f0c0a61c4b9.jpg"/></center>

**_老代码_**

```javascript
// getProtocol.js
getProtocol: function() {
    // 这里列举出了所有的scheme，导致缺失了扩展性。
     var e = ["scheme1","scheme2","scheme3"];
     // 获取userAgent
     var t = navigator.userAgent;
     for (var n = 0; n < e.length; n++) {
         if (t.indexOf(e[n]) !== -1)
             return e[n].toLowerCase()
     }
     return "http";
 }
```

**_新代码_**

```javascript
// getProtocol.js
getProtocol: function() {
     var e = (function() {
         var res = navigator.userAgent.toLowerCase().match(/(^|\s)(scheme[^\/]+)\/([\d\.]+)/),
    scheme = res && res[2],
    version = res && res[3];
        return [scheme];
     })();
     // 获取userAgent
     var t = navigator.userAgent;
     for (var n = 0; n < e.length; n++) {
         if (t.indexOf(e[n]) !== -1)
             return e[n].toLowerCase()
     }
     return "http";
 }
```

这里需要对**_输入(navigator.userAgent)_**
进行处理来查看函数的
**_输出(scheme1,scheme2,scheme3,schemeXX,http)_**
是否发生改变

## 什么工程要单元测试

1. 存在大量调用的工程
   **_(√)_**
2. 代码量少的工程（每次修改后自测都能完全覆盖用例）
   **_(X)_**

> 代码可以加 jshint

```javascript
// .jshintrc
{
  "undef": true, "unused": true, "curly": true, "freeze": true, "funcscope": true, "nocomma": true, "notypeof": true, "shadow": true, "debug": true, "indent": true,
  "predef": [
      "require", "document", "window", "QApp", "module", "setTimeout", "setInterval", "encodeURI", "encodeURIComponent", "clearTimeout", "clearInterval", "navigator", "describe", "beforeEach", "it", "jasmine", "____MODULES", "spyOn", "expect"
   ]
}

```

## 什么代码可以测试

不是所有代码都可以单元测试，需要测试的代码需要给 runner 留有接口。

但是，因为 js 没有真的对象（多年从事找对象工作的笔者哭晕在厕所），所以大家实现私有函数的方法真是天花乱坠。

可是宝宝要单测的代码都是私有方法啊！！！！！！

<center><img alt="哭" src="http://img2.imgtn.bdimg.com/it/u=2304895309,1301584123&fm=21&gp=0.jpg" /></center>

### case A

```javascript
var _utils = function() {
  /*do something*/
};
_utils.prototype.add = function(a, b) {
  return a + b;
};
module.exports = _utils;
```

```javascript
describe("utils", () => {
  it("add", () => {
    var a = new (require("utils.js"))();
    expect(a.add(1, 1)).toBe(2);
  });
});
```

### case B

```javascript
var _add = function(a, b) {
  return a + b;
};
module.exports = { add: _add };
```

```javascript
describe("utils", () => {
  it("add", () => {
    var a = require("utils.js").add;
    expect(a.add(1, 1)).toBe(2);
  });
});
```

### case D

```javascript
var _add = function(a, b) {
  return a + b;
};
module.exports = function() {
  return _add(1, 1);
};
```

只能把用例写到代码里面了。。。

所以当我们写代码的时候要留好单元测试的接口，不管你写的代码多牛逼，
如果你的代码不可测试，那宝宝就认为你的代码是不可读的。

<center><img alt="白眼" src="http://www.people.com.cn/mediafile/pic/20150203/21/15475877261822907269.jpg" /></center>

## 拿什么测试

fekit 自带测试功能，在 test 文件夹下面执行`fekit test`就可以运行，用例语法遵循 mocha.js，可惜运行时是当前的 node 环境。

angular 的测试 runner 时 karma，可以拿来跑用例，并且可以指定环境，所以使用 karma 跑用例还不错。

那么，用例拿什么写呢？

- QUnit
- mocha.js
- jasmine
- ava
- tape

实际上 ava 和 tape 是我强推的，可惜这俩 node 环境还不错，到了 browser 还是用老牌的好一点。

## 怎么配置 karma

需要安装的 npm modules 在下面的 devDependencies 里面

```javascript
{
 "scripts": {
    "test": "karma start"
  },
  "devDependencies": {
    "bower": "^1.7.9",
    "jasmine-core": "^2.4.1",
    "karma": "^1.1.2",
    "karma-chrome-launcher": "^1.0.1",
    "karma-jasmine": "^1.0.2"
  }
}
```

执行

```shell
npm i
```

下面的代码会自动生成 karma 的配置文件

```shell
karma init
```

工程根目录里面会多一个 karma.conf.js 文件

```javascript
// Karma configuration
// Generated on Mon Aug 08 2016 17:25:40 GMT+0800 (CST)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine"],

    hostname: "localhost",

    // list of files / patterns to load in the browser
    files: [
      "bower_components/jquery/dist/jquery.js",
      "bower_components/jasmine-jquery/lib/jasmine-jquery.js",
      "bower_components/jasmine-ajax/lib/mock-ajax.js",
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome", "Chrome_without_security"],
    customLaunchers: {
      Chrome_without_security: {
        base: "Chrome",
        flags: ["--disable-web-security", "--args"],
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
```

可以看到 files 里面我又加上了一些文件，那些还不是测试用例，因为要测试一些 dom 以及 ajax 的情况，加了一些代码。

```javascript
// bower.json
{
  "dependencies": {
    "jquery": "^3.1.0",
    "jasmine-ajax": "^3.2.0",
    "jasmine-jquery": "^2.1.1"
  }
}
```

## 说说这些 karma 的原理吧

用过 QUnit 和 mocha 的人都知道，如果写测试用例要把 js 和用例放在一个 html 环境下，再引进来 QUnit.js 和 mocha.js 就行了，
其实 Karma 差不多，只不过把手工的部分换成机器了，这样你不用新建一个 html 文件，发布之前也不需要先删除测试代码了。

## jasmine 的语法

懒得写了，可以看一下下面的文章

> [JavaScript 单元测试框架——Jasmine 入门](http://ued.fanxing.com/javascriptdan-yuan-ce-shi-kuang-jia-jasmine/)<br/> >[jasmine-ajax - Faking Ajax responses in your Jasmine suite.](https://github.com/jasmine/jasmine-ajax/blob/master/README.markdown)<br/> >[jasmine-jquery](https://github.com/velesin/jasmine-jquery/blob/master/README.md)

<center>![举个栗子](http://i0.hdslb.com/video/05/050dcbac6717c4e1c99c6f0c0a61c4b9.jpg)</center>

如果你有一个 Dialog 对象，你想看看它的 show 函数执行后页面是否有类名`.dialog`的 dom 节点。

```JavaScript
describe('Dialog', ()=>{
    var _d = new Dialog();
    it('show', ()=>{
        _d.show();
        expect($('.dialog')[0]).toBeInDOM();
    });
})
```

再如，Dialog 有一个 sendVcode 函数，执行的时候会发起 Ajax 请求，你要 Mock 一个 Ajax 请求

```JavaScript
describe('Mock AJAX', ()=>{
    var mock = JSON.stringify({
        status: 200,
        data: {
            message: "blahblah"
        }
    }),_d = new Dialog(),request;

    beforeEach(()=>{
        jasmine.Ajax.install();
        _d.sendVcode();
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({ status: 200, responseText: mock});
    });

    it('sendVcode', ()=>{
        expect(request.url).toBe("xxx.htm");
        expect(request.method).toBe("POST");
        expect(request.data()).toEqual({"source":"xxxx"});
    });
});
```

另外，Dialog 执行 sendVcode 的时候，会执行`Dialog.timer`的 start 函数

```javascript
describe("Timer", () => {
  var _d = new Dialog();

  beforeEach(() => {
    spyOn(_d.timer, "start");
    _d.sendVcode();
  });

  it("timer.start", () => {
    expect(_d.timer).toHaveBeenCalled();
  });
});
```

如果说要做接口测试

```javascript
describe("interface", () => {
  var _d = new Dialog(),
    onSuccess,
    onFailure;

  beforeEach(() => {
    jasmine.Ajax.install();
    (onSuccess = jasmine.createSpy("onSuccess")),
      (onFailure = jasmine.createSpy("onFailure"));
    _d.init({
      success: res => {
        onSuccess(res);
      },
      error: () => {
        onFailure(res);
      },
    });
    request = jasmine.Ajax.requests.mostRecent();
  });

  it("init", () => {
    expect(onSuccess).toHaveBeenCalledWith("{xxxx}");
  });
});
```

说下 Cookie 和 UA 的 hack，用[karma-phantomjs-launcher](https://github.com/karma-runner/karma-phantomjs-launcher/blob/master/README.md)可以改配置

```javascript
document.__defineGetter__("cookie", function() {
  return "BlahBlah";
});

navigator.__defineGetter__("userAgent", function() {
  return "Schema1";
});
```

CSS 的测试

```javascript
describe("addStyle:", function() {
  it("body{background:red;}", function() {
    main.addStyle("body{background:red;}");
    expect(window.getComputedStyle(document.body).backgroundColor).toEqual(
      "rgb(255, 0, 0)"
    );
  });
});
```

最后说一下，如果 karma 要支持 commonJS 需要加入 preCompiler，如 webpack 或者 browserfy，否则不支持 require。
好在 fekit 是在 window 下注入\_\_\_\_MODULES 解决模块化，所以只需要知道模块的 md5 值就好。
如刚才的 Dialog 的引入

```javascript
var Dialog = ____MODULES["babf80335465996414cd682baf25de10"];
```

## 关于自动生成测试用例

写安卓的时候，AS 会自动生成用例，所以想让 Atom 也支持这一功能，找了一下 plugin，基本上没有。。。<br/>
如果我写一个的话。。。我得估一下它的必要性。。。

<center><img alt="来打我呀" src="http://img2.imgtn.bdimg.com/it/u=3823151670,1751373648&fm=21&gp=0.jpg" /></center>
