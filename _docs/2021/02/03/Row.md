---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 行列式

二阶行列式计算，对角线相剪, `D = a*b-b*c`

```
| a b |
| c d |
```

下三角行列式 `D = a*c*f`

```
| a 0 0 |
| b c 0 |
| d e f |
```

上三角行列式 `D = a*d*f`

```
| a b c |
| 0 d e |
| 0 0 f |
```

对角线对称 `D = ((x-y)^(3-1))*(x + (3-1)*y)`

```
| x y y |
| y x y |
| y y x |
```

范德蒙行列式 `D = (b-a)*(c-a)*(c-b)`

```
| a^0 b^0 c^0 |
| a^1 b^1 c^1 |
| a^2 b^2 c^2 |
```

余子式：删掉元素的横纵行得到的行列式 `M<ij>`

代数余子式：`A<ij> = (-1)^(i+j)\*M<ij>`

n 阶行列式等于某一行或者某一列的代数余子式的和。

某元素纵向代数余子式和 = 某元素横向代数余子式和。

行列式转置之后值不变, `|A<T>| = |A|`。

```
| a b c | | a d h |
| d e f | | b e i |
| h i j | | c f j |
```

行列式拆解

```
| a+x b+x c+x |   | a b c |   | x x x |
| d   e   f   | = | d e f | + | d e f |
| h   i   j   |   | h i j |   | h i j |
```

某行或者某列加倍并加到另一行值不变。

```
| a b c |   | a+d*k b+e*k c+f*k |
| d e f | = | d     e     f     |
| h i j |   | h     i     j     |
```

副对角线行列式 `D = ((-1)^(3*(3-1)/2))*a*b*d`

```
| 0 0 a |
| 0 b c |
| d e f |
```

特殊的拉普拉斯展开式 `|A|·|B|`

```
| A C |
| 0 B |
```

```
| A 0 |
| C B |
```

另一个特殊的拉普拉斯展开式`((-1)^(m*n))|A|·|B|`

```
| 0 A |
| B C |
```

```
| C A |
| B 0 |
```