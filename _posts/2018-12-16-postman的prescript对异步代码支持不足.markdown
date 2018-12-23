---
type: post
category: fe
---
# postman的prescript对异步代码支持不足

用过postman做集成测试的话，有个prescript功能很不错，就是在执行发送请求之前要执行的脚本。

我曾经以为这个prescript是直接运行的一个js脚本，执行完之后发送请求。但是貌似postman里面处理异步逻辑与v8有所不同。如果你想先发送一个POST请求，然后执行postman的PATCH请求，中间在加一个大概1s的delay，如下代码竟然能实现！

```javascript
// prescript
pm.sendRequest({...});
setTimeout(() => {}, 1000);
```

这个prescript其实是会对异步代码进行超时处理。无论是多层callback还是promise还是async，但唯独对setTimeout无效。

```javascript
// callbacks
pm.sendRequest({}, () => {
    pm.sendRequest({}, () => { ... }); // 这一步回调可能会超时中断
})；
```

```javascript
// promise
const req = () => new Promise(res => {
    pm.sendRequest({}, () => res());
});

Promise.resolve()
    .then(req({ ... }))
    .then(req({ ... }));// 这一步可能会超时中断
```

```javascript
// async - await
const req = () => new Promise(res => {
    pm.sendRequest({}, () => res());
});
~ async function() {
    await req({ ... });
    await req({ ... });// 这一步可能会超时中断
} ();
```

因为只要setTimeout的timer不释放prescript就不会被超时中断，可以借助这一点防止prescript超时。

```javascript
const TIME_OUT = 200;
function stop() {
    if (stop.done) {
        return clearTimeout(stop.timer);
    }
    stop.timer = setTimeout(arguments.callee, TIME_OUT);
}
stop.done = false;
stop.timer = setTimeout(stop, TIME_OUT);
```

想要停止代码的话，只需把stop.done设置为true就可以了。
