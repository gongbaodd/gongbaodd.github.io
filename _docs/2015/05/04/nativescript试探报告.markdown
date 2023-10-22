---
layout: post
category: fe
---

#nativescript试探报告
>上一周得流感，再加上react-native只支持iOS，头脑一热，除了研究了ionic，还看了nativescript。感觉吧，nativescript比起QML之类的语言，最大的优点就是不必再去学习一门新的语言，因为它不是js的超集，而是完全的js，并且支持双向绑定，完全迎合现在的web开发。<br>
用完nativescript有这么几个感受：<br>
1. 用telerik platform ide感觉还是不错的，在安卓安装app可以同步更新软件，可惜这个ide只能使用30day。
2. 官方给的文档经过证实已经部分过期。。。我只能拿现成的project当例子。
3. css使能够用的，但是和react-native一样，都是真正的css的子集。
4. 安卓上的性能不比hybrid好，等更新吧～
5. 不用像QML一样，的确是mvvm，顶多需要学学安卓里面的xml就好了。
6. cli需要<font color=red>翻墙！！！</font>

***
1. 安装nativescript,安卓需要r17

        npm install -g nativescript
        
2. 创建工程

        tns create app
        
3. 添加安卓支持

        tns platform add android
        
4. 编译及调试

        tns build android
        tns run android