title: Riot类似React的微型UI库
speaker: jian.gong
url: https://github.com/ksky521/nodePPT
transition: kontext
files: /js/demo.js,/css/demo.css
theme: light
date: 2016年1月15日

[slide]
---
![Riot](/asset/image/riot.png)
---
<p>
    <span>自定义标签</span>·
    <span>虚拟DOM</span>·
    <span>小体积</span>·
    <span>全栈</span>·
    <span>简单的语法</span>
</p>

# 类似React的微型UI库
## 演讲者：jian.gong

[note]
首先说一下，riot有三个版本，服务器版、自编译版和预编译版，
服务器版和自编译版API相同，语法比预编译简单，但是都是编译成预编译版
自编译版得在浏览器里面加编译器，性能很低
所以这次只介绍预编译版
[/note]

-----------------------

[slide]
# 自定义标签
## 关于组件化设计的思考

![用frameset来做web页面](/asset/image/1_1.jpg)

| javascript |   stylesheet  | HTML | Flash |
|------------|---------------|------|-------|
| jQuery     |    Bootstrap  | WTF? |  AIR  |
| Ext        |    Foundation |      |  Flex |
| ... | ... | | ..|

[note]
很早的时候，我们用frameset做网页布局，这有一个很大的优势，就是组件和组件间的作用空间互相隔绝，开发迭代起来也很方便，比方说做好了menu根本不用担心其他部分的代码会对menu造成影响，但是frameset存在很多局限性，所以最终这个方案被css+div取代了。
后来js、html、css哥仨突然就分开了，html里面除了div就剩下一些表单元素了，css除了加上个圆角基本上没变化，js基本上就撇开css、html单飞了。但是随着html5的推广，sass、less这一类的预处理器的出现，当然，最主要的还要归功于node的出现。
[/note]

-----------------------

[slide]
# 自定义标签
## 理想的组件

* 它是一个集合，包括HTML结构、样式还有行为三点
* 它不会轻易受到外界影响（它有一个属于自己的作用域）
* 它可以移植到其它系统中
* 它存在对外交互接口

---

[slide]
# 自定义标签
## riot里面对于自定义标签的API
```javascript
riot.tag(
    'yo-header',//标签名（必须）
    '<span>{name}</span>',//模板(必须)
    'yo-header{display:block;}yo-header > span{position:absolute;}',//标签样式
    'class="yo-header" id="yoHeader"',//标签属性
    function(opt) {
        //初始化函数（必须）
        this.name = "哟，海德"
    });
```

```HTML
<style>
    yo-header{display:block;} yo-header > span{position:absolute;}
</style>
<yo-header class="yo-header" id="yoHeader">
    <span>哟，海德</span>
</yo-header>
```
---

[slide]
# 虚拟DOM
![虚拟DOM](/asset/image/2_0.png)

<http://www.tuicool.com/articles/Bjuiaav>

[note]
虚拟DOM是react提出的，但并不是首创，最早angular的双向绑定就用了类似的实现，
就是在内存中生成一个用对象建造的DOM树（可能不符合W3C）标准，每次发生DOM变化的时候先看这个树有没有变化再对现实中的DOM树做处理。
[/note]
---

[slide]
# 虚拟DOM
## Riot中的虚拟DOM

![Riot的虚拟DOM](/asset/image/2_1.png)

---

[slide]
# 小体积
## Riot项目结构

```
Riot/
    global-variables.js
    index.js
    tag/
        each.js
        mkdom.js
        parse.js
        tag.js
        update.js
        util.js

Riot-observable/
    index.js

Riot-router/
    index.js

tocca/
    tocca.js
```

[note]
说一下，riot同时兼容浏览器和服务器端，浏览器端还分为预编译版和自编译版，这次分享只说预编译版。
riot代码行数为2364相比于很多库确实小了好多,才115个函数
这里面的tocca.js不是riot的一个组件，riot没有重写浏览器默认事件，引入tocca是为了加入ontap，onswipe，onondbtap事件，代码也不多，只有100多行。
[/note]

---

[slide]
# 为全栈使用
## 模板的使用
```HTML
<ul if="{list}">
    <li each="{item,index in list}" >
        {index+1},{item}
    </li>
</ul>
<button onclick="{clickMe}" __disabled="{true}"><img riot-src="{imgsrc}"></button>
<yield/>
```

```javascript
Tag(yo-frag) :{
    list: ['hehe','haha'],
    clickMe: function() {
        return true;//false == 默认 == preventDefault
    },
    imgsrc: "http://....."
}
```

```
<yo-frag>你总能看到我~</yo-frag>
```

---

[slide]
# 简单的语法
## demo

<iframe src="../asset/demo/index.html"></iframe>
---
[slide]
```javascript
riot.tag(
    'timer',
    '<h1>{opts.count}</h1><button onclick="{reset}">重置</button><yield/>',
    'timer{color:red;}timer>button{color:blue;}',
    'class="timer" data-store="123"',
  function() {
      var self = this;
      this.on('mount',function() {
          setTimeout(function() {
              self.trigger('go');
          },1000);
      });

      this.on('go',function() {
          this.opts.count++;
          setTimeout(function() {
              self.update();
              self.trigger('go');
          },1000);
      });

      this.reset = function() {
          this.opts.count = 0;
      };
  }
);

```

[slide]
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Riot Timer</title>
</head>
<body>
    <timer>
        <h2>这是一个计时器</h2>
    </timer>
    <button class="outter">作用域外面重置</button>
    这是作用域外的文字
    <script src="./riot.js"></script>
    <script src="./timer.js"></script>
    <script>
        var timer = riot.mount('timer',{count: 0})[0];
        document.querySelector('.outter').onclick = function () {
            timer.update({ opts: { count:0}});
            // timer.opts.count = 0;
        };
    </script>
</body>
</html>
```

[slide]
# 请容许我照着网页讲讲API

<http://riotjs.com/zh/api/>

[slide]
# 轮子君

##riot
<https://github.com/riot>

## react-lite
<https://github.com/Lucifier129/react-lite>
