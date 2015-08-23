---
layout: post
category: tech
---

>这个月初，任性买了刚发布的pebble time，一直还没写个应用，这个周末抽出时间看看。

# 开头

pebble的应用可以用C和Node开发，开发工具也可以使用[cloudpebble](https://cloudpebble.net/)（墙内用户伤不起）或者下载sdk离线开发。

# 安装SDK

mac安装pebble sdk太简单了

```
brew install pebble/pebble-sdk/pebble-sdk
```

网路顺畅的话，安装就完成了。

# 建立PebbleJS工程

离线建C项目只要运行```pebble new-project xxx```就好，但是js项目需要把github上的项目https://github.com/pebble/pebblejs.git clone下来

```
git clone https://github.com/pebble/pebblejs.git
```
# 文件目录

pebble应用的配置文件在appinfo.json里面，逻辑代码都写在src下的js/app.js里

# UI module

引入ui模块

```
var ui = require('ui');
```

## Window

```
var wind = new UI.Window({
  fullscreen: true,
});
wind.show();
```

效果如图：

<img src="https://developer.getpebble.com/assets/images/getting-started/watchface-tutorial/1-blank.png">

## Card

创建一个卡片

    // Create a Card with title and subtitle
    var card = new UI.Card({
        title:'Weather',
        subtitle:'Fetching...'
        });

    // Display the Card
    card.show();

    card.on('click', 'up', function(e) {
        /*上键事件*/
        })
    card.on('click', 'select', function(e) {
        /* 中键事件*/
        })
    card.on('click', 'down', function(e) {
        /*下键事件*/
        })


效果如图

<img src="https://developer.getpebble.com/assets/images/getting-started/pebble-js-tutorial/1-fetching.png">

>Card还有body和icon属性

## Menu

    var resultsMenu = new UI.Menu({
        sections: [{
            title: 'Current Forecast',
            items: [{
                title: 'Clear',
                subtitle: '11-05 21:00'
                }]
            }]
        });

        resultsMenu.on('select', function(e)    {
            console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
            console.log('The item is titled "' + e.item.title + '"');
        });

        // Show the Menu
        resultsMenu.show();


<img src="https://developer.getpebble.com/assets/images/getting-started/pebble-js-tutorial/2-menu.png">
