---
type: post
category: fe
---
# lego系统一岁啦

![logo](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqer3a0s0pj20sg0bk0wr.jpg)

大概看了下去年的博客，我大概在五月初，对lego的第一次上线做了总结，那么现在大概就是lego的一周岁生日了。

## lego 的定义

![lego云图](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqemomvxyqj20sg0lcdo4.jpg)

支付lego平台是一个支持多维度线上配置的web组件化前后端同构渲染平台，覆盖从服务端到web前端再到数据监控的整体解决方案，目前服务于去哪儿网会员的【我的钱包】【我的银行卡】【绑卡服务】【实名认证】等服务。

## lego 搭建背景

![ykit](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqem7mt787j20jc0fit9k.jpg)

* 公司内部正在要求使用 ykit 代替 fekit 打包前端代码，对 fe/member-mobile 来说这种改动相当于全项目重构。

```shell
busiTypeId=WLHotelHD&
couponAmount=300& bannerLink=http%3A%2F%2Fwww.qunar.com%2F& HMAC=362b0da8eb2f95cb33608cf4584c7700&
agreement=&
did=865630020132708&
pid=10010&
extraJson=&
cardType=ALL& 
version=20140808& title=%E7%BB%91%E5%8D%A1%E9%A2%86%E7%BA%A2%E5%8C%85&
isObtainCoupon=1& 
couponSource=pay_test& 
userId=1444548113& 
successURL=http%3A%2F%2Ftcbeta2.qunar.com%2Factivity%2Fspringgift%3Ftpl%3Dredirect%26couponId%3Dundefined& 
gid=8438932D-5548-D769-1AF7-22274CDE88E4&
bindCardRule=%5B%22%E9%A6%96%E6%AC%A1%E7%BB%91%E5%8D%A1%E6%88%90%E5%8A%9F%EF%BC%8C%E4%B8%94%E8%AF%A5%E9%93%B6%E8%A1%8C%E5%8D%A1%E6%9C%AA%E5%9C%A8%E5%8E%BB%E5%93%AA%E5%84%BF%E7%BD%91%E7%BB%91%E5%AE%9A%E8%BF%87%E7%9A%84%E7%94%A8%E6%88%B7%EF%BC%8C%E5%8D%B3%E5%8F%AF%E8%8E%B7%E5%BE%97%E4%BC%9A%E5%91%98%E7%BA%A2%E5%8C%85%E3%80%82%22%2C%22%E6%AF%8F%E4%B8%AA%E7%94%A8%E6%88%B7%E5%8F%AA%E5%8F%AF%E7%BB%91%E5%8D%A1%E9%A2%86%E5%8F%96%E4%B8%80%E6%AC%A1%E4%BC%9A%E5%91%98%E7%BA%A2%E5%8C%85%E3%80%82%22%2C%22%E6%B4%BB%E5%8A%A8%E4%B8%AD%EF%BC%8C%E5%A6%82%E6%9E%9C%E5%87%BA%E7%8E%B0%E4%BD%9C%E5%BC%8A%E8%A1%8C%E4%B8%BA%EF%BC%88%E5%A6%82%E6%89%B9%E9%87%8F%E6%B3%A8%E5%86%8C%E3%80%81%E6%81%B6%E6%84%8F%E8%B4%AD%E4%B9%B0%E3%80%81%E8%99%9A%E5%81%87%E4%BA%A4%E6%98%93%E7%AD%89%EF%BC%89%EF%BC%8C%E5%8E%BB%E5%93%AA%E5%84%BF%E7%BD%91%E5%B0%86%E8%87%AA%E5%8A%A8%E5%8F%96%E6%B6%88%E6%82%A8%E6%9C%AC%E6%AC%A1%E6%B4%BB%E5%8A%A8%E8%AE%A2%E5%8D%95%EF%BC%8C%E5%B9%B6%E6%9C%89%E6%9D%83%E5%86%BB%E7%BB%93%E8%B4%A6%E5%8F%B7%E5%B9%B6%E5%8F%96%E6%B6%88%E6%82%A8%E5%90%8E%E7%BB%AD%E5%8F%82%E4%B8%8E%E5%8E%BB%E5%93%AA%E5%84%BF%E7%BD%91%E4%BB%BB%E6%84%8F%E6%B4%BB%E5%8A%A8%E7%9A%84%E6%9D%83%E5%88%A9%EF%BC%8C%E5%BF%85%E8%A6%81%E6%97%B6%E8%BF%BD%E7%A9%B6%E6%B3%95%E5%BE%8B%E8%B4%A3%E4%BB%BB%E3%80%82%22%5D& 
vid=60001092&
merchantCode=WLHotelHDJK001&
returnURL=https%3A%2F%2Fmembermobilebetak.qunar.com%2Fm%2Fmember%2Fasset%2Fcoupon%2Fdetail.html& bindCardSource=coupon_bind& banner=https%3A%2F%2Fsource.qunarzz.com%2Fsite%2Fimages%2Fzhuanti%2Fhuodong%2Fflight_free_banner.jpg
```

* member-mobile 内部已经有根据传递参数配置页面展示的方法，但是很多参数相对于来源是静态的，同时如果需要增加新参数或者新来源的时候需要前后端介入开发，大概会需要 2~3pd。

![使用的工具](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqeqvbrmjvj20sg0lc77v.jpg)

* 前端以及node的一系列框架工具逐渐成熟，足以制作类似于lego的渲染系统。

* 公司的 QConfig 支持 JSON 类型的配置文件，并且已经可以在 node 端使用。

## 编程语言的选择

![Typescript](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqeowo5o6jj20gx0gxwf6.jpg)

member-mobile 为了保证浏览器兼容性用的是 ES5，然而更多的代码库使用的是 ES6 编写，使用的时候再编译成 ES5。但是，无论 ES5 还是 ES6 都是动态类型 JS，无法对代码进行类型检查。

至于关于 typescript 的好处，我不在此多余阐述，可以参考我过去的记次分享 

[typescript干货](http://gongbaodd.github.io/fe/2017/05/04/1TypeScript%E5%B9%B2%E8%B4%A7.html) 

[Typescript sucks but long live the types
](http://gongbaodd.github.io/fe/2017/09/18/Typescript-sucks-but-long-live-the-types.html) 。

[TypeScript编译抽象语法树](http://gongbaodd.github.io/fe/2018/01/03/typescript%E7%BC%96%E8%AF%91AST%E8%AE%AD%E7%BB%83.html)

## 架构设计

![架构设计](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqeqvsivq4j20sg0lcaee.jpg)

lego 参考了公司内普遍使用的增加一层 node 层作为渲染层的方案，然而工程上利用 webpack 可以分别打包以及 js 可以在双端运行的特性，实现了前后端同构方案，这样再开放上无需在 node 层增加开发人员，具体的实现请参考[【erʌpt】一个前后端同构的设计思想](http://gongbaodd.github.io/fe/2017/08/15/Er%CA%8Cpt-%E4%B8%80%E4%B8%AA%E5%89%8D%E5%90%8E%E7%AB%AF%E5%90%8C%E6%9E%84%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%80%9D%E6%83%B3.html)。

### Qxf 作为 node 服务框架

Qxf 是 Qunar 的 node 服务框架，基于 Express，Express 也是目前被最广泛使用的框架。

* q-version QZZ版本管理
* q-logger 日志系统
* q-exception 异常捕获
* q-monitor 监控系统
* q-healthcheck 响应Ngix请求

Qxf 包含的模块使得 lego 在搭建初期不需要重建轮子，节省了很多时间。同时因为其基于 Express,　更有利于搭建　restfull 接口。

### Preact 作为同构渲染框架

![Preact logo](https://opencollective-production.s3-us-west-1.amazonaws.com/3fd44c50-b42b-11e6-8e7e-5955bbcb143d.png)

lego 使用 preact 作为前后端的渲染框架，preact 的包大小是 react 的 1/20，同时 preact 对 typescript 的支持是目前除 angular 外最好的框架。

### 统一路由地址

lego 在 node 端使用　preact-router 渲染路由路径，而在客户端结合　HashHistory 使得客户端无需刷新页面更新路由。

```shell
# node

/bindCard/default/index

# client

/bindCard/defaut/index#/index/auth
```

### HTTP 连接

起初 lego 使用的是 fetch 作为前后端接口交互框架，然而实际使用后我们全部改用了 Axios，主要原因有下。

* Axios 双端完全兼容，只有部分参数不同。
* Axios 支持超时，超时后可以 abort 不多于占用 socket。
* Axios 可以配置中间件用来处理登录情况。

## QConfig 配置

在 QConfig 中，每一个项目都有自己的配置文件（JSON类型）

![QConfig配置](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqer9g1ivej20lg0y0gnu.jpg)

每个 JSON 文件都有一个 solutions 字段，里面是按照来源存放的配置文件，每次使用的时候配置文件会和 default 混合一次确保配置的完整性。

![JSON](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqerbb3zwqj20ia0d6dgr.jpg)

## Hybrid 桥

用于 Qunar 端的 HYSDK 并没有完全适配公司的客户端，我们开发了 PayDevice 来补足短板

```typescript
class PayDevice {
    static readonly NAME_IOS_FIX: string;
    static readonly NAME_IPX_FIX: string;
    static readonly QUNAR_IPHONE: string;
    static readonly QUNAR_APHONE: string;
    static readonly GONGLUE: string;
    static readonly FIX_NAV_IOS_HEIGHT: number;
    static readonly FIX_NAV_IPX_HEIGHT: number;
    static readonly FIX_STATUS_IOS_HEIGHT: number;
    static readonly FIX_STATUS_IPX_HEIGHT: number;
    static readonly FIX_BOTTOM_IPX_PAD: number;
    private static readonly regularExp;
    private static getLowerUA;
    private static getMatchArray;
    static getAppProtocol: typeof getAppProtocol;
    static sniff: typeof sniff;
    static isIPad: typeof isIPad;
    static isIPod: typeof isIPod;
    static isIPhone: typeof isIPhone;
    static isCtripApp: typeof isCtripApp;
    static isApp: typeof isApp;
    static isAppIPhoneX: typeof isAppIPhoneX;
    static isCtripAppIPhoneX: typeof isCtripAppIPhoneX;
    static trim: typeof trim;
    static getCookie: typeof getCookie;
    static getQN270: typeof getQN270;
    static getBodyFixClass: typeof getBodyFixClass;
    static sniffmiddleware: typeof sniffmiddleware;
}
```

## 监控系统

我们修改了 Qxf 的 logger 和 monitor 以适配支付中心的鹰眼系统，更新　member-mobile 的 payGa 以接收前端埋点。

## 支付组件库

### PayUI

我们经过和 UE 协调，利用 Yo 制作了一套 PayUI.css，可以直接作为支付中心样式使用。

![PayUI](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqesxkdjt7j20c80a074u.jpg)

### TS PAY COMS

利用 payUI 制作的组件库，使用 rollup commonJS 打包，提供工厂方法构建。

![TS PAY COMS](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqet3rrs2yj217c0uwwjt.jpg)

```javascript
export const FormID = Factory.input(
    Component, h, { CheckUtil, PayInput, PayList, MemICO },
);

export const FormIDTlist = Factory.list(
    Component, h, { FormID, CheckItem, PayPopup, PayList },
);
```

## 打包系统优化

![打包系统](http://ww1.sinaimg.cn/large/89d0a2e1ly1fqes6t5852j21k60uy1kx.jpg)

### typescript编译优化

使用 HappyPack 分别使用３个线程处理前后端编译，利用 ForkTsCheckerWebpackPlugin 使用一个线程做类型检查，使用 cache-loder 缓存已编译的内容，减少重复编译时间。

经过优化，ts 的编译时间减少到原来的 1/2。

### CSS的优化

#### 使用 PostCSS 逐步代替 Yo

Yo 的缺点

* 使用 SASS 逐文件单线程编译，效率慢

* 使用的是 SASS 语法，不是原生 CSS 语法，并只会对使用 Yo 语法的地方做浏览器兼容处理,没有编辑器支持

```css
/*** Yo 源代码 ***/
.foo {
    @include yoflex();
}

.bar {
    display: flex;
}
```

```css
/*** 生成代码 ***/
.foo {
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
}

.bar {
    display: flex;
}
```

#### 使用 CSS-modules 避免全局类名覆盖

CSS 一直存在很严重的类名覆盖问题，由于 CSS 的类名都存在于一个全局域中，当两个组件中存在重名类名，其中一个会被覆盖。

```css
/**a-button.css**/
.button {
    background: red;
    background: blue;
}
/**b-button.css**/
.button {
    background: blue;
}
```

使用 CSS-modules 后，编译好的 CSS 文件会处理掉重名类名。

```css
.button-a {
    background: red;
}
.button-b {
    background: blue;
}
```

### 发布使用 node_cache_share 缓存 node_modules

### 异步处理生成文件

使用了以上优化，我们最终将编译速度由初期的五分钟优化到现在的26秒。

## 过去一年遇到的问题

* 大部分开发人员的水平仍然停留在13年左右，知道的优化方案相对过时，对于“枚举”、“泛型”、“私有成员”等定义都比较模糊。
* 公司内部前端解决方案不统一，平台部门的解决方案往往在重复造轮子，到我们这里必须要修改后才能使用。
* 很多人抵触学习新技术，往往是需要用的时候再去学习，当然对应的前端发展速度也前所未有的快。
* 因为lego放弃了最初微服务的方案，杂糅很多业务逻辑后，现在功能比较臃肿，新功能的推广只能循序渐进。
* 每次修改需要等待编译，开发起来比较慢。
* restful API只是一个思想，还没有所谓的最佳实践，推广至开发人员后，一个接口的定义会跟开发人员的能力而显得参差不齐。

## 解决方案

* 【开发能力】增加技术分享，补足技术瓶颈
* 【重复造轮子】我们建立了qtalk群，互相分享各部门的使用经验
* 【强制代码规范】修改编译配置项阻止不规范的代码上线
* 【减少冗余业务】和产品讨论，把没必要的业务逻辑删除
* 【加快编译速度】打开多线程、缓存，使用 webpack-server 和 nodemon 处理本地开发环境
* 【考虑新的传输协议】考虑使用 object-validator 或者 apollo + graphQL 实现。
