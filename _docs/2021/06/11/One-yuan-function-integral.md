---
type: post
category: book
tag:
  - math
series:
  name: 高等数学
  slug: math
---

# 一元函数积分

费马定理，$f(x)$在$x_0$处可导，且在$x_0$取得极值，必有$f'(x_0)=0$

$x_0$处取极大值的充分条件，$f^{(n)}(x_0)<0$,n 为偶数

$x_0$处取极小值的充分条件，$f^{(n)}(x_0)>0$,n 为偶数

$(x_0,f(x_0))$为拐点的充分条件，二阶导为零，三阶导不为零（大于等于 3 的奇数阶导数不为零偶数阶为 0）

洛必达公式，属于$\frac{x \to A}{x \to A}$或者$\frac{x \to \infty}{x \to \infty}$的极限之比等于它们导数的比

存在铅锤渐近线则，$\lim_{x \to x_0^+} f(x) = \infty$, x_0 一般是无定义点

存在水平渐近线则，寻找无穷点的值是否趋近一值

存在斜渐近线，$\lim_{x \to \infty}\frac{f(x)}{x}=k$不为零，$b=\lim (f(x) - kx)$

罗尔定理，$f(a)=f(b) \rightarrow f'(\xi)=0$

拉格朗日中值定理, $f'(\xi)=\frac{f(b)-f(a)}{b-a}$

柯西中值定理，$\frac{f(b)-f(a)}{g(b)-g(a)}=\frac{f'(\xi)}{g'(\xi)}$

定积分精确定义，$\int^1_0f(x)dx=\lim_{n \to \infty}\sum_{i=1}^nf(\frac{i}{n})\frac{1}{n}$

积分中值定理,$\int_a^bf(x)dx=f(\xi)(b-a)$

变限积分求导公式 $(\int_{\phi_1(x)}^{\phi_2(x)}f(t)dt)'=f[\phi_2(x)]\phi_2'(x)-f[\phi_1(x)]\phi_1'(x)$

积分换元法,$\sqrt{a^2-x^2}$,令$x=a\sin t$

积分换元法,$\sqrt{a^2+x^2}$,令$x=a\tan t$(tan^2 + 1 = sec^2)

积分换元法,$\sqrt{x^2-a^2}$,令$x=a\sec t$

分部积分法$\int u \mathrm{d} v = uv - \int v \mathrm{d}u$

两曲线围成的面积$\int_a^b |y_1(x) - y_2(x)|dx$

极坐标两射线围成面积$\frac{1}{2}\int_\alpha^\beta|r_1^2(\theta) - r_2^2(\theta)| \mathrm{d} \theta$

y 围绕 x 轴旋转的体积$\int_a^b\pi y^2(x) \mathrm{d} x$

两曲线围绕 x 轴旋转的体积$\pi\int_a^b|y_1^2(x) - y_2^2(x)| \mathrm{d} x$

曲线围绕 y 轴旋转的体积$2\pi\int_a^bx|y(x)| \mathrm{d} x$
