---
type: post
category: fe
---
# Isomophic App

如果你已经了解过前后端同构的话，你一定知道如下的方案

    if (isServer) {
        doServer();
    } else {
        doClient();
    }

那你看的文档应该都转发自同一个人。

这种做法很有局限性

* 你引用的module必须是umd打包的
* 你引用的module必须不存在二进制包

这回你知道为啥react要用全家桶了吧？

## 换一种想法

首先看一下node层和client层的不同点

* node

    接到用户Get请求 =>
    node-fetch异步获取后端数据 =>
    初始化Riot标签 =>
    渲染页面为html =>
    返回给用户 =>
    收到接口元数据 =>
    将元数据处理成state =>
    以script标签形式返回用户 =>
    res.end

* client

    收到渲染好的html并进行渲染 =>
    加载js代码 =>
    初始化Riot标签 =>
    收到并运行script标签 =>
    更新state =>
    页面渲染完成

可见，涉及到node像后端取数据并处理成state这部分逻辑是没必要加到client里面的，
那么可以做两个文件实现node和client不同状态的处理。

* server.js

        class RouteStore extends Store {
            constructor(control) {
                super()
                this.on('apiFetched', () => ...)
                this.on('serverStarted', () => ...)
                ...
            }
        }

        const control = new Control();
        const routeStore = new RouteStroe(control);// 前后端不同的状态机
        const someStore = new SomeStore(control);// 前后端一样的状态机

        control.addStore(routeStore);
        control.addStore(someStore);

        const app = new App(control);

* client.js

        class ClientStore extends Store {
            constructor(control) {
                super()
                this.on('DOMonLoad', () => ...)
                ...
            }
        }

        const control = new Control();
        const clientStore = new ClientStore(control);// 前后端不同的状态机
        const someStore = new SomeStore(control);// 前后端一样的状态机

        control.addStore(clientStore);
        control.addStore(someStore);

        const app = new App(control);

这样App、someStore这部分可以同构，clientStore和routeStore分别针对运行环境处理就可以了