---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 行列式典型例题

## 计算三阶行列式

$$
D =
\begin{vmatrix}
    2  &  0 &  1 \\
    1  & -4 & -1 \\
    -1 &  8 &  3 \\
\end{vmatrix}
$$

> $D = -4$

$$
D =
\begin{vmatrix}
    1 & 1 & 1 \\
    a & b & c \\
    a^2 & b^2 & c^2 \\
\end{vmatrix}
$$

> $D = (b-a)(c-b)(c-a)$

## 逆序数

求下列排列的逆序数

1. $\tau(4,1,3,2)$
2. $\tau(2,5,6,3,4,1)$
3. $\tau(1,3,5,\cdots,(2n-1),2,4,6,\cdots,(2n))$

> $4, 9, \frac{1}{2}n(n-1)$

已知$a_{3j} a_{12} a_{41} a_{2k}$在 4 阶行列式带负号，那$j$和$k$分别为？

> $j=4, k=3$

四阶行列式中含有因子$a_{11}a_{23}$的项是？

> $-a_{11}a_{23}a_{32}a_{44},a_{11}a_{23}a_{34}a_{42}$

$$
f(x) =
\begin{vmatrix}
    2x & x & x & 2 \\
    1  & x & 1 & -1 \\
    3  & 2 & x & 1  \\
    1  & 1 & 0 & x \\
\end{vmatrix}
$$

其中$x^4$和$x^3$的系数分别是？

> 2, -4

## n 阶行列式的计算

$$
D =
\begin{vmatrix}
    2 & -1 & 1 & 6 \\
    4 & -1 & 5 & 0 \\
    -1 & 2 & 0 & -5 \\
    1 & 4 & -2 & -2 \\
\end{vmatrix}
$$

> D = 120

$$
D =
\begin{vmatrix}
    4 & 1 & 2 & 4 \\
    1 & 2 & 0 &2 \\
    10 & 5 & 2 & 0 \\
    0 & 1 & 1 & 7 \\
\end{vmatrix}
$$

> D = 0

$$
\begin{vmatrix}
    x+1 & 2 & -1 \\
    2 & x+1 & 1 \\
    -1 & 1 & x+1 \\
\end{vmatrix}
= 0
$$

> $x_1=-3,x_2=\sqrt{3},x_3=-\sqrt{3}$

$$
D =
\begin{vmatrix}
    1 & \frac{1}{2} & \frac{1}{2} & \frac{1}{2} \\
    \frac{1}{2} & 1 & \frac{1}{2} & \frac{1}{2} \\
    \frac{1}{2} & \frac{1}{2} & 1 & \frac{1}{2} \\
    \frac{1}{2} & \frac{1}{2} & \frac{1}{2} & 1 \\
\end{vmatrix}
$$

> $D = \frac{5}{16}$

$$
D =
\begin{vmatrix}
    1 & b_1 & 0 & 0 \\
    -1 & 1-b_1 & b_2 & 0 \\
    0 & -1 & 1-b_2 & b_3 \\
    0 & 0 & -1 & 1-b_3 \\
\end{vmatrix}
$$

> $D = 1$

$$
D =
\begin{vmatrix}
    1 & -1 & 1 & x-1 \\
    1 & -1 & x+1 & -1 \\
    1 & x-1 & 1 & -1 \\
    x+1 & -1 & 1 & -1 \\
\end{vmatrix}
$$

> $D=x^4$

$D_n=\text{det}(a_{ij})$，其中$a_{ij}=|i-j|$，求 D。

> $D=(-1)^{n-1}(n-1)2^{n-2}$

$$
D =
\begin{vmatrix}
    b+c & c+a & a+b \\
    a & b & c \\
    a^2 & b^2 & c^2 \\
\end{vmatrix}
$$

> $D=(a+b+c)(b-a)(c-a)(c-b)$

$$
D =
\begin{vmatrix}
    1 & 1 & 1 & 1 \\
    a & b & c & d \\
    a^2 & b^2 & c^2 & d^2 \\
    a^4 & b^4 & c^4 & d^4 \\
\end{vmatrix}
$$

> $D=(a-b)(a-c)(a-d)(b-c)(b-d)(c-d)(a+b+c+d)$

$$
D =
\begin{vmatrix}
    a_1 & 0 & a_2 & 0 \\
    0 & b_1 & 0 & b_2 \\
    c_1 & 0 & c_2 & 0 \\
    0 & d_1 & 0 & d_2 \\
\end{vmatrix}
$$

> $D = (a_1c_2 - a_2c_1)(b_1d_2 - b_2d_1)$

$$
D_{2n} =
\begin{vmatrix}
    a_n &        &     &     &  & b_n \\
        & \ddots &     &     & \ddots \\
        &        & a_1 & b_1 &  & \\
        &        & c_1 & d_1 &  & \\
        & \ddots &     &     & \ddots & \\
    c_n &        &     &    &          & d_n
\end{vmatrix}
$$

> $D = \prod_{i=1}^n(a_id_i - b_ic_i)$

## 三对角线行列式

$$
D_5 =
\begin{vmatrix}
    3 & 2 & 0 & 0 & 0 \\
    1 & 3 & 2 & 0 & 0 \\
    0 & 1 & 3 & 2 & 0 \\
    0 & 0 & 1 & 3 & 2 \\
    0 & 0 & 0 & 1 & 3 \\
\end{vmatrix}
$$

> $D=63$

证明

$$
\begin{vmatrix}
    x & -1 & 0 & 0 \\
    0 & x & -1 & 0 \\
    0 & 0 & x & -1 \\
    a_0 & a_1 & a_2 & a_3 \\
\end{vmatrix}
= a_3x^3 + a_2x^2 + a_1x + a_0
$$

$$
D_n =
\begin{vmatrix}
    x & a & \cdots & a \\
    a & x & \cdots & a \\
    \vdots & \vdots & & \vdots \\
    a & a & \cdots & x \\
\end{vmatrix}
$$

> $D = [x + (n-1)a](x-a)^{n-1}$

$$
D_n =
\begin{vmatrix}
    1+a_1 & 1 & \cdots & 1 \\
    1 & 1+a_2 & \cdots & 1 \\
    \vdots & \vdots &  & \vdots \\
    1 & 1 & \cdots & 1+a_n
\end{vmatrix}
$$

> $D_n=\prod_{i=1}^n a_i (1 + \sum_{i=1}^n\frac{1}{a_i})$

$$
D =
\begin{vmatrix}
    3 & 1 & -1 & 2 \\
    -5 & 1 & 3 & -4 \\
    2 & 0 & 1 & -1 \\
    1 & -5 & 3 & -3 \\
\end{vmatrix}
$$

$D$ 的 $(i,j)$ 元的代数余子式记作 $A_{ij}$,
求$A_{31} + 3A_{32} - 2A_{33} + 2A_{34}$

> 24

$$
\begin{vmatrix}
    0 & a & b & 0 \\
    a & 0 & 0 & b \\
    0 & c & d & 0 \\
    c & 0 & 0 & d \\
\end{vmatrix}
$$

> $-(ad-bc)^2$

$$
\begin{vmatrix}
    \lambda & -1 & 0 & 0 \\
    0 & \lambda & -1 & 0 \\
    0 & 0 & \lambda & -1 \\
    4 & 3 & 2 & \lambda + 1 \\
\end{vmatrix}
$$

> $\lambda^4 + \lambda^3 + 2\lambda^2 + 3\lambda + 4$

$$
A =
\begin{pmatrix}
    0 & 1 & 1 & \cdots & 1 & 1 \\
    1 & 0 & 1 & \cdots & 1 & 1 \\
    \vdots & \vdots & \vdots & & \vdots & \vdots \\
    1 & 1 & 1 & \cdots & 0 & 1 \\
    1 & 1 & 1 & \cdots & 1 & 0 \\
\end{pmatrix}
$$

$|A|$ = ?.

> $(-1)^{n-1}(n-1)$

$$
D =
\begin{vmatrix}
    3 & 0 & 4 & 0 \\
    2 & 2 & 2 & 2 \\
    0 & -7 & 0 & 0 \\
    5 & 3 & -2 & 2 \\
\end{vmatrix}
$$

求第四行各元素余子式之和

> -28
