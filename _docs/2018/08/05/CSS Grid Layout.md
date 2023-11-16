---
type: post
category: fe
---
# CSS Grid Layout 使用总结

最近被猎头催的实在不行了（真的，感觉他们更担心我找不到工作），于是我写了份简历给他们。当然了，既然最后要的是PDF，这种机会不试试新的CSS布局还真说不过去。

##　实现圣杯布局

提到CSS布局，自然想到了圣杯，一行header，中间是sidebar和content，底下是footer。

```css
.grid {
    display: grid;
    grid-template-area: "header header  header"
                        "left   content right"
                        "footer footer  footer";
}

.item1 {
    grid-area: header;
}

.item2 {
    grid-area: left;
}

.item3 {
    grid-area: content;
}

.item4 {
    grid-area: right;
}

.item5 {
    grid-area: footer;
}
```

很简单，使用 Grid Layout 的最大好处是页面布局由CSS全部接管，意味着想把```.item5```改成header只需要修改```grid-area```即可，```grid-template-area```结合 media query　可以实现适配不同设备，如打印机布局相比于屏幕来说界面比较窄。

```css
@media print {
    .grid {
        grid-template-area: "header"
                            "left"
                            "content"
                            "right"
                            "footer";
    }
}
```

## 实现无大小限制瀑布流

前端瀑布流在网格布局之下，结合``` grid-auto-flow: row dense;```可以实现大小不一的网格元素按照最合理的形式行填充。

```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: 100px;
}

.size-1 {
    grid-column: span 1;
    grid-row: span 1;
}

.size-2 {
    grid-column: span 2;
    grid-row: span 2;
}

.size-3 {
    grid-column: span 3;
    grid-row: span 3;
}

```

## 兼容性

并没有测试IE11，从caniuse可以看到，主流浏览器除了IE11都是不需要家前缀的，IE11需要加-ms前缀（道听途说autoprefixer不会补grid，所以最好手改）。

国产浏览器兼容性就不理想了，除了UC，百度、QQ浏览器都不支持，汗啊，看来浏览器这行业真的是不挣钱了，所以如果要支持这些浏览器还需要再等等。
