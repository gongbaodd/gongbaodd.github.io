---
type: post
category: fe
---
# 【Erʌpt】一个前后端同构的设计思想

<img src="http://ww1.sinaimg.cn/large/89d0a2e1ly1fikrpw68t9j208c08cdfx.jpg" alt="logo" width="150px">

> 最近一直没有更新博客，其实脑子里面已经装了很多东西了，略微分享一下。

[精美PPT~（花了十多分钟呢](http://gongbushang.com/ng/ERUPT/)

## 前提

2017年前端看起来是风平浪静的，其实不然，今年WASM终于定稿了，那意味着用任何语言编译web应用得到了官方支持。由于采纳的是Mozilla的asm.js方案，兼容性上面要好得多。很多人关注的是性能上的提升，而我觉得最先活起来的应该是前后端同构。因为大批的后端程序员可以避开javascript的各种坑去使用自己的开发语言开发前端应用了。

### 最近出现了很多诸如RustWeb和Golymer的框架

<table>
<tr>
<td>
<img src="http://ww1.sinaimg.cn/mw690/89d0a2e1ly1fir7gp7j3ej20r40k6abz.jpg"/>
</td>
<td>
<img src="http://ww1.sinaimg.cn/mw690/89d0a2e1ly1fir7nz5t8qj21040qcabg.jpg"/>
</td>
</tr>
</table>

### CS架构解决的问题

![现有的CS架构](http://ww1.sinaimg.cn/thumbnail/89d0a2e1ly1fir7ta8jaij20a90a9437.jpg)

* 我是谁
* 我从哪里来
* 要到哪里去

### 照以前前后端分离的方案

| server | client |
|--------|--------|
| 返回html | 发出请求 |
| 空闲  | 获取css、js等资源 |
| 空闲  | 发出ajax请求 |
| 返回数据 | 空闲 |
| 空闲 | 渲染数据 |

### 前后端同构的做法

| server | client |
|--------|--------|
| 返回html头部 | 发出请求 |
| 返回html碎片 | 获取css、js |
| 返回html碎片 | 渲染碎片 |
| 返回end | 结束页面渲染 |

### 小结一

前后端同构是在“我是谁？”这一部分做了优化。

### 前后端同构的优势

1. SEO，不多说了；
2. 减少http请求数；
3. 减少用户初次访问页面的白页时间；
4. 减少因前后端分离造成的技术障碍。

### 前后端同构的策略

1. 精确渲染
2. 结构渲染
3. 模板渲染

#### 精确渲染

把页面首屏的内容都渲染出来。

![精确渲染](http://ww1.sinaimg.cn/mw690/89d0a2e1ly1fiylzsf71jj20hs0b4mxf.jpg)

#### 精确渲染的评价

优点

* 渲染出来的页面就是用户看到的

缺点

* 部分后端请求会阻塞页面的渲染

#### 结构渲染

把初始状态的首屏渲染出来然后在同一请求中把应该展示的状态展示出来。

![结构渲染](http://ww1.sinaimg.cn/mw690/89d0a2e1ly1fiym4385dfj20hs0b4jro.jpg)

#### 框架渲染的评价

优点

* 解决了精确渲染会阻塞的问题

缺点

* 对于新闻类型的页面，框架渲染不利于SEO

#### 模板渲染

把模板直接作为html传到客户端。

![模板渲染](http://ww1.sinaimg.cn/mw690/89d0a2e1ly1fiynhe7jenj20hs0b43ys.jpg)

#### 模板渲染的评价

优点

* 字符串渲染，计算开销最小

缺点

* 用户会看到未渲染的模板变量

### 小结二

应该结合精确渲染和框架渲染

## 介绍Erʌpt

| | Erʌpt |  |
|--|---|---|
| E | Express | 这都不知道？退下吧  |
| R | React | 这也不知道？别看了 |
| ʌ | Values | 基于Redux的异步数据管理 |
| P | Pipe | HTML渲染器 |
| T | Tunnel | 同步数据管理 |

## Values异步数据管理

### 单向数据流

react的render函数是会不断轮询页面上绑定的数据来进行页面更新的。

| value==="bud" | value==="bloom" |
|--|--|
|![](http://ww1.sinaimg.cn/mw690/89d0a2e1ly1fiyoot1ss4j20m80gojsi.jpg)|![](http://ww1.sinaimg.cn/mw690/89d0a2e1ly1fiyotbnajvj20m80godgz.jpg)|

### Values的写法

```typescript
class TestValues extends Values {
    public getReducer() {
        return combineReducers({
            flower: TestValues.FlowerValue(),
        });
    }
    public static FlowerValue = () => {
        return ( value = "bud", action ) => {
            if ( action.type === "开花" ) return "bloom";
            if ( action.type === "被狗踩了" ) return "baiduLogo";
            return value;
        }
    }
}
```

### 怎么使用Values

```typescript
const v = new TestValues();
const store = createStore(v.getReducer());
store.getState(); // { flower: "bud" }
```

### Pipe HTML渲染器

用于利用React renderToString 生成HTML。

### Pipe的写法

```typescript
class TestPipe extends Pipe<Request, Response> {
    constructor(request, response) {
        super( request, response, minifyParams);
    }
    public renderPage(tunnel) {
        this.html(`
        <!doctype html>
        <html>
            <body>
            ${this.JSX2HTML(
                <Provider store={store}>
                    <Page></Page>
                </Provider>
            )}
            </body>
        </html>
        `);
        this.response.end();
    }
}
```

### Tunnel同步数据管理

#### Tunnel的设计

前后端同构的意思是要在后端完成一部分工作，当前端getState的时候，获取的是后端生成并注入到前端作用域的state，也就是说这个对象在后端完成set工作，而在前端完成get工作。

![Tunnel设计](http://ww1.sinaimg.cn/mw690/89d0a2e1ly1fiypthxr4jj20m80goq4f.jpg)

#### Tunnel的使用

Server

```typescript
const t = new Tunnel("QNR_GLOBAL", {}, value);
Pipe.renderPage(t)
```

Client

```typescript
const t = new Tunnel();
t.$state // { flower: "bud" }
window.QNR_GLOBAL // { $state: { flower: "bud" } }
```

## 结论

Ervpt是VPT在react+express上面的实现，能够很好地实现前后端同构中的精确渲染和结构渲染，基于这套思想我相信它能带来一场新的前后端分离的革命，也就是前端能够主导全部的页面逻辑，后端专注于接口的优化。