---
type: post
category: fe
---

#ionic的安装配置的坑
>前一阵子react-native很火，甚是嫉妒啊，目前只支持iOS。。。T_T<br>
不必要一直追求native，（虽然我还是试验了nativescript），在安卓上面还是可以尝试写写hybrid应用。

---
1. 安装ionic，安装android-sdk-r22（可以用hx.gy:1080代理）

        npm install -g cordova ionic
        
2. 创建一个空/标签/侧边栏工程

        ionic start myApp blank/tabs/sidemenu
        
3. 运行

        cd myApp
        chmod 777 * -R
        ionic platform add android
        ionic build android
        ionic run android
        
4. 用浏览器测试

        ionic serve