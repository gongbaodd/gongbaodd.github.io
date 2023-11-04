---
type: post
category: book
tag:
  - math
series:
  name: 高等数学
  slug: math
---

# 常微分方程

形如$y'+p(x)y=q(x)$的通解公式

$$
y = e^{
    - \int p(x) \mathrm{d}x
}[
    \int e^{
        \int p(x) \mathrm{d} x
    } \cdot q(x) \mathrm{d} x
    + C
]
$$

---

形如$y'+p(x)y=q(x)y^n$的通解

伯努利方程

1. 同时除以$y^n$
2. 令$z=y^{1-n}$得$\frac{1}{1-n}\cdot\frac{\mathrm{d}z}{\mathrm{d}x}+p(x)z=q(x)$

---

求解$y''=f(x,y')$

令$y'=p(x)$

---

求解$y''=f(y, y')$

令$p=y', y''=\frac{\mathrm{d}p}{\mathrm{d}y}\cdot p$

---

求解$y''+py'+qy=0$

求特征方程$\lambda^2+p\lambda+q=0$

- $p^2-4q \gt 0, y=C_1e^{\lambda_1 x}+C_2e^{\lambda_2 x}$
- $p^2-4q = 0, y=(C_1+C_2x)e^{\lambda x}$
- $p^2-4q \lt 0,\lambda=\alpha\pm\beta i, y=e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$

---

求解$y''+py'+qy=P_n(x)e^{\alpha x}$

- 特解令$y^*=e^{\alpha x}Q_n(x)x^k$,Qn 与 Pn 同次数
- 当$\alpha$不是特征根时 k=0
- 当$\alpha$是单特征根时 k=1
- 当$\alpha$是二重根时 k=2

---

求解$y''+py'+qy=e^{\alpha x}[P_m(x)\cos\beta x + P_n(x)\sin\beta x]$

- 特解令$y^*=e^{\alpha x}[Q^{(1)}_l(x)\cos\beta x + Q^{(2)}_l(x)\sin\beta x]$,Qn 与 Pn 同次数
- l=max{m.n}
- $\alpha \pm \beta i$不是特征根 k=0
- $\alpha \pm \beta i$是特征根 k=1
