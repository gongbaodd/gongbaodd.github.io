---
type: post
category: book
tag:
  - math
series:
  name: 高等数学
  slug: math
---

# 泰勒公式及余项

## 拉格朗日余项

$$
f(x) = f(x_0) + f'(x_0)(x-x_0) + \cdots  + \frac{1}{n!}f^{(n)}(x_0)(x-x_0)^n  + \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}, \xi \in (x, x_0)
$$

## 佩亚诺余项(x 无穷趋近于 x_0)

$$
f(x) = f(x_0) + f'(x_0)(x-x_0) + \frac{1}{2!}f''(x_0)(x-x_0) + \cdots + \frac{1}{n!}f^{(n)}(x_0)(x-x_0)^n + o(x-x_0)^n
$$

## 麦克劳林公式(x0 = 0)

- 拉格朗日余项

$$
f(x)=f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \cdots + \frac{f^{(n)}(0)}{n!}x^n+\frac{f^{(n+1)}(\xi)}{(n+1)!}x^{n+1}
$$

- 佩亚诺余项

$$
f(x)=f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \cdots + \frac{f^{(n)}(0)}{n!}x^n + o(x^n)
$$
