---
type: post
category: fe
---
# FontAwesome出5啦

Qunar的很多图片都是用iconfont实现的,
我们有一套类似于fontawesome网站的[yicon](https://yicon.ymfe.org),

然而当初构建的时候,对于使用iconfont还是svg是很受争议的.
其结果自然iconfont胜出,而那时我见识到了svg对于制作模块化图标,
甚至是动画图标的潜力(SMIL,很遗憾后来为了CSS3,这一功能基本上无人问津了)
,这些对于svg唯一的缺点就是兼容性了.

看到FontAwesome的第5个版本推荐使用svg, 马上拿过来试试.

[参考代码](http://gongbushang.com:3000/gongbushang/fontAweSome5Playground)

## 官方的React组件

当然也有Vue的, 安装 @fortawesome/fontawesome @fortawesome/fontawesome-free-solid @fortawesome/react-fontawesome 
(0.1.0-3以上有d.ts说明)

利用 create-react-app 快速建立工程

```shell
npx create-react-app awesome --scripts-version=react-scripts-ts
```

```jsx
<FontAwesomeIcon icon={faCoffee}/>
```

直接使用,非常简单

## 新功能:变形

比如放大(grow)或者缩小(shrink),
后面的数字的单位是 1/16em.

```jsx
<FontAwesomeIcon
    {...{
        icon: faCoffee,
        border: true,
        fixedWidth: true,
        transform: "shrink-8",
    }}
/>
```

上(up) 下(down) 左(left) 右(right)
垂直翻转(flip-v) 水平翻转(flip-h) 
旋转(rotate) 

## 新功能:遮罩

```jsx
<Font
    {...{
        icon: faCoffee,
        border: true,
        fixedWidth: true,
        transform: "shrink-8",
        mask: faSquare,
    }}
/>
```

## 新功能:图层

两个图标层叠

```jsx
        <span className="fa-layers fa-fw fa-border">
          <Font
            {...{
              icon: faCircle,
            }}
          />
          <Font
            {...{
              icon: faCoffee,
              transform: "shrink-7",
              style: {
                color: "#fff"
              }
            }}
          />
        </span>
```

图标添加数字角标,默认右上(指定位置: fa-layers-${bottom|top}-${left|right}).

```jsx
        <span className="fa-layers fa-fw">
          <Font
            {...{
              icon: faAlignJustify,
            }}
          />
          <span className="fa-layers-counter">1111</span>
        </span>
```

叠加文字

```jsx
        <span className="fa-layers fa-fw">
          <Font
            {...{
              icon: faSquare,
            }}
          />
          <span
            {...{
              className: "fa-layers-text",
              style: {
                color: "#fff"
              }
            }}
          >
          e
          </span>
        </span>
```

## 总结

FontAwesome 总的来看,不考虑兼容性的话的确可以使用,
而且随着emoji的推广, Material Design等各种设计模式的诞生,
彩色的可模块化的图标方案会逐渐替代现有的单色图标.
