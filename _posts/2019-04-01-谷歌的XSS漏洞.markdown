---
type: post
category: fe
---
# Google 的 XSS 漏洞

视频地址： [An actual XSS on google.com by Masato Kinugawa. ](https://youtu.be/lG7U3fuNw3A)

## 简单的背景

首先正常浏览器在控制台执行以下代码是会弹窗的，也就是说如果一个输入框输入了`<img src="" onerror="alert(1)"/>`，同时前端在回显的时候并没有处理它，页面就会弹窗。

```javascript
const a = document.createElement('div');
a.innerHTML = '<img src="" onerror="alert(1)"/>';
```

很简单，只要把里面的标签都给替换成纯文字不就行了？问题又来了，如果我们需要的就是富文本呢？
好在，现在已经有很多`sanitize`的包用来把可能注入代码的地方做转义处理了。

## 在深入一点

但是，假设用户输入的不是标准HTML呢？

如果用户输入的是下面的代码

```html
<script><p title="</script>">
```

浏览器会解析成两个节点

```html
<script><p title="</script>
"&gt;
```

如果换成DIV标签

```html
<div><p title="</div>">
```

则会解析成一个节点

```html
<div><p title="</div>"></p></div>
```

script标签在执行innerHTML的时候并不解析，可见，浏览器对不同标签的处理是不同的，那么，干脆让浏览器来做标签标准化如何？借助template标签就可以。

```javascript
const a = document.createElement('template');
a.innerHTML = '<div><p title="</div>">';
console.log(a.innerHTML); // 输出 <div><p title="</div>"></p></div>
```

## 问题出现

问题出现了，假设用户输入的是如下代码呢？

```html
<noscript><p title="</noscript><img src='' onerror='alert(1)'/>">
```

在`template`的输出如下

```html
<noscript>
    <p title="</noscript><img src='' onerror='alert(1)'/>"></p>
</noscript>
```

可浏览器的解析却如下

```html
<noscript>
    <p title="
</noscript>
    <img src="" onerror="alert(1)">
"&gt;
```

怎么会这样？？？原因在于noscript是在不支持script的环境下作为script标签的兼容标签，在template环境下是不支持script的，此时noscript被解析了，而在开了script功能的浏览器却不解析noscript。

## 修复

这个问题很快就被Google回滚修复了，bug源于2月的一个功能性提交。