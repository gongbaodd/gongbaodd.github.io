---
type: post
category: tech
---
# 第二块屏幕

作为一个前端程序员，13寸的屏幕显然不够工作，尤其是当你写代码的时候还想看美剧的时候。

我有一个屏幕，15寸的联想800x600 VGA屏幕，以前为了玩树莓派在旧货市场淘来的，分辨率实在太低了。如果连我家的投影的话，为了使用自由，我只会使用无线连接，但是linux下面还没有一个完备的无线连接方案。

## 拆掉我的旧电脑

年前我提到过，我把我的老电脑拆了，硬盘用来接树莓派，当然我也把屏幕拆过来了。我在淘宝上搜了一下五合一屏幕驱动板，加上电源大概100块搞定，卖家比较热心，问好型号之后整块驱动板基本上是连接好就寄过来了。

## 做一个比较好的壳

基本上只能拿垃圾做一个壳了，在北京的家里面，没有螺丝，所以我只能把驱动板缝在巧克力盒包装上。大概如图（如果我传图了）。

## linux处理第二块屏幕

其实连接好屏幕就可以玩了，但是由于我的笔记本是4K的，老屏幕虽然是14寸，但其实只能显示我现在笔记本的1/4.需要xrandr处理缩放。

    xrandr --output eDP1 --auto --scale 1x1 --output DP1 --auto --scale 1.8x1.8 --right-of eDP1

> 为什么不是 2x2 ? 其实我尝试过，可是很快就能挂掉，所以我改成 1.8x1.8 

还有一个bug，屏幕虽然能够显示了，但鼠标能够控制的地方还是1/4。ArchWiki里面说是一个bug，看了一下。貌似还没解决。。。

好吧，最后我选择了妥协，毕竟已经可以美美哒地看美剧了～

---

<p style="float:right;">
宫不上，2017/05/28【端午节】，在北京9㎡的家中。
</p>