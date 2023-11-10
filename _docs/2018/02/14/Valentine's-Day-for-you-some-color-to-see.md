---
type: post
category: fe
---
# 情人节给你点颜色看看

![示例代码](http://gongbushang.com:3000/gongbushang/pixijsPlayground/src/master/src/12-hsl_hsv.ts)

CMYK用于打印, RGB用于显示屏, 然而二者都不能直观的展示颜色, 于是有了 HSL 和 HSV 坐标系.

## 简介

今天看看HSL和HSV转化RGB, [维基地址](https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4).

![HSL与HSV](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/HSL_HSV_cylinder_color_solid_comparison.png/800px-HSL_HSV_cylinder_color_solid_comparison.png)

* H 指的是 hue 色相 [0-360]
* S 指的是 saturation 饱和度 [0-1]
* V 指的是 value 明度 [0-1]
* L 指的是 light 亮度 [0-1]

## HSV转换RGB

HSL转换RGB有点烦(我认为是这样的), 维基里面有详细的解释, HSV到比较简单

```typescript
/**
 * hsv2rgb
 * @param {number} h hue 色相 [0, 360]
 * @param {number} s saturation 饱和度 [0, 1]
 * @param {number} v value 明度 [0, 1]
 * @returns [r, g, b] 分别取值 [0, 255]
 */
function hsv2rgb(
    h: number,
    s: number,
    v: number,
) {
    // 色相
    while(h < 0) {
        h += 360;
    }
    h = h % 360;
    // 饱和度
    s = s < 0? 0: s > 1? 1: s;
    // 明度
    v = (v < 0? 0: v > 1? 1: v)*255;

    let hi = (h/60|0)%6;
    let f = h/60 - hi;
    let p = v*(1-s) | 0;
    let q = v*(1-f*s) | 0;
    let t = v*(1-(1-f)*s) | 0;
    v |= 0;
    switch (hi) {
        case 0: return [v, t, p];
        case 1: return [q, v, p];
        case 2: return [p, v, t];
        case 3: return [p, q, v];
        case 4: return [t, p, v];
        case 5: return [v, p, q];
    }
}
```

