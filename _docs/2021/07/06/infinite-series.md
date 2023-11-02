---
type: post
category: book
tag:
  - math
series:
  name: 高等数学
  slug: math
---

# 无穷级数

达朗贝尔判别法

$$
\lim_{n \to \infty} \frac{u_{n+1}}{u_n} = \rho
$$

1. $\rho \lt 1$ 收敛
2. $\rho \gt 1$ 发散

---

柯西判别法

$$
\lim_{n \to \infty} \sqrt[n]{u_n} = \rho
$$

1. $\rho \lt 1$ 收敛
2. $\rho \gt 1$ 发散

---

阿贝尔定理求收敛域

$$
\lim_{n \to \infty} \frac{|u_{n+1}|}{|u_n|} = \rho
$$

或者

$$
\lim_{n \to \infty} \sqrt[n]{u_{n}} = \rho
$$

解出 x 得值域，并判断端点是否收敛

---

$$
e^x=\sum^\infty_{m=0}\frac{x^n}{n!}, -\infty \lt x \lt +\infty
$$

$$
\frac{1}{1+x} = \sum^\infty_{n=0}(-1)^nx^n,-1 \lt x \lt 1
$$

$$
\frac{1}{1-x} = \sum^\infty_{n=0}x^n, -1 \lt x \lt 1
$$

$$
\ln(1+x) = \sum^{\infty}_{n=1}(-1)^{n-1}\frac{x^n}{n}, -1 < x \le 1
$$

$$
\sin x = \sum^\infty_{n=0}(-1)^n\frac{x^{2n+1}}{(2n+1)!}, -\infty \lt x \lt +\infty
$$

$$
\cos x = \sum^\infty_{x=0}(-1)^n\frac{x^{2n}}{(2n)!}, -\infty \lt x \lt +\infty
$$
