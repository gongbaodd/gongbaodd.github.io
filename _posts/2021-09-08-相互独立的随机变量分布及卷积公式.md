---
type: post
category: book
tag:
  - math
series:
  name: 概率论
  slug: probability
---

# 相互独立的随机变量分布及卷积公式

$$
(X,Y) \sim f(x,y), Z=X+Y, f_Z(z)=\int_{-\infty}^{+\infty}f_X(x)f_Y(z-x)dx = \int_{-\infty}^{+\infty}f_X(z-y)f_Y(y)dy
$$

$$
(X,Y) \sim f(x,y), Z=X-Y, f_Z(z)=\int_{-\infty}^{+\infty}f(x,x-z)dx = \int_{-\infty}^{+\infty}f_X(z+y)f_Y(y)dy
$$

$$
(X,Y) \sim f(x,y), Z=XY, f_Z(z)=\int_{-\infty}^{+\infty} \frac{1}{|x|} f(x, \frac{z}{x}) dx = \int_{-\infty}^{+\infty} \frac{1}{|y|} f(\frac{z}{y}, y) dy
$$

$$
(X,Y) \sim f(x,y), Z=\frac{X}{Y}, f_Z(z) = \int_{-\infty}^{+\infty} |y| f(yz, y) dy
$$
