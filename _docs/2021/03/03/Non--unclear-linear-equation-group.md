---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 非齐次线性方程组

Q:

$$
\begin{cases}
    x_1 + 2x_3 + 2x_4 = 6 \\
    2x_1 + x_2 + 3x_3 + 7x_4 = 0 \\
    3x_1+7x_3+5x_4 = 24 \\
\end{cases}
$$

A:

$$
x=(-6, -6, 6, 0)^T + k(-4, -2, 1, 1)^T
$$

Q:

$$
\begin{cases}
    x_1 + x_2 + x_3 + x_4 = -1 \\
    4x_1 + 3x_2+5x_3-x_4 = -1 \\
    2x_1 + x_2 + 3x_3-3x_4 = 1 \\
\end{cases}
$$

A:

$$
x=(2,-1,0,0)^T+k_1(-2,1,1,0)^T + k_2(4,-5,0, 1)^T
$$

Q:

$$
\begin{cases}
    2x_1+x_2-x_3+x_4 = 1 \\
    3x_1-2x_2+x_3-3x_4 = 4 \\
    x_1 + 4x_2 - 3x_3 + 5x_4 = -2
\end{cases}
$$

A:

$$
x=(\frac{6}{7},-\frac{5}{7}, 0, 0)^T +
k_1(\frac{1}{7}, \frac{5}{7}, 1, 0)^T +
k_2(\frac{1}{7}, -\frac{9}{7}, 0, 1)^T
$$

Q:

$$
\begin{cases}
    x_1 + x_2 + x_3 + x_4 + x_5 = 1 \\
    3x_1 + 2x_2 + x_3 + x_4 - 3x_5 = 0 \\
    5x_1 + 4x_2 + 3x_3 + 3x_4 - x_5 = 2 \\
\end{cases}
$$

A:

$$
x=(-2,3,0,0,0)^T +
k_1(1, -2, 1, 0, 0)^T +
k_2(1, -2, 0, 1, 0)^T +
k_3(5, -6, 0, 0, 1)^T
$$

Q:

$$
\begin{cases}
    -2x_1 + x_2 + x_3 = -2 \\
    x_1 - 2x_2 + x_3 = -2 \\
    x_1 + x_2 - 2x_3 = 4 \\
\end{cases}
$$

A:

$$
(2,2,0)^T + k(1,1,1)
$$

Q:

$$
\begin{cases}
    2x_1 + 7x_2 + 3x_3 + x_4 = 6 \\
    3x_1 + 5x_2 + 2x_3 + 2x_4 = 4 \\
    9x_1 + 4x_2 + x_3 + 7x_4 = 2 \\
\end{cases}
$$

A:

$$
(8,0,0,-10)^T +
k_1(-9,1,0,11)^T +
k_2(-4,0,1,5)^T
$$

Q:

$$
\begin{cases}
    x_1+ ax_2 + x_3 = 2 \\
    x_1+ x_2 + 2x_3 = 3 \\
    x_1 + x_2 + bx_3 = 4 \\
\end{cases}
$$

ab 取何值方程组解唯一

A: $a\ne1,b\ne2$

Q:

$$
\begin{cases}
    x_1+ ax_2 + x_3 = 2 \\
    x_1+ x_2 + 2x_3 = 3 \\
    x_1 + x_2 + bx_3 = 4 \\
\end{cases}
$$

ab 取何值方程组无解

A:

$$
\begin{cases}
    b=2\\
    a=1,b\ne3\\
\end{cases}
$$

Q:

$$
\begin{cases}
    x_1+ ax_2 + x_3 = 2 \\
    x_1+ x_2 + 2x_3 = 3 \\
    x_1 + x_2 + bx_3 = 4 \\
\end{cases}
$$

ab 取何值方程组无穷多解，并求通解

A:

$$
a=1,b=3,x=(1,0,1)^T+k(-1,1,0)^T
$$

Q:

$$
\begin{cases}
    x_1 + x_2 + x_3 + 3x_4 = 0 \\
    2x_1 + x_2 + 3x_3 + 5x_4 = 1 \\
    3x_1 + 2x_2 + ax_3 + 7x_4 = 1 \\
    x_1 - x_2 + 3x_3 - x_4 = b \\
\end{cases}
$$

ab 取何值无解

A: $a=4,b\ne2$

Q:

$$
\begin{cases}
    x_1 + x_2 + x_3 + 3x_4 = 0 \\
    2x_1 + x_2 + 3x_3 + 5x_4 = 1 \\
    3x_1 + 2x_2 + ax_3 + 7x_4 = 1 \\
    x_1 - x_2 + 3x_3 - x_4 = b \\
\end{cases}
$$

ab 取何值有唯一解

A: $a\ne4,\forall b$

Q:

$$
\begin{cases}
    x_1 + x_2 + x_3 + 3x_4 = 0 \\
    2x_1 + x_2 + 3x_3 + 5x_4 = 1 \\
    3x_1 + 2x_2 + ax_3 + 7x_4 = 1 \\
    x_1 - x_2 + 3x_3 - x_4 = b \\
\end{cases}
$$

ab 取何值有无穷解，求通解

A:

$$
a=4,b=2,x=(1,-1,0,0)^T + k(-2,1,1,0)^T
$$

Q:

4 元非齐次线性方程组 Ax=b，r(A)=3,又三个解向量的关系如下，求 Ax=b 的通解

$$
\alpha_1=(2,3,4,5)^T,\alpha_2+\alpha_3=(1,2,3,4)^T
$$

A:

$$
(2,3,4,5)^T+k(3,4,5,6)^T
$$

Q:

4 元方程组 Ax=b 的三个线性无关的解如下，r(A) = 2，求方程组通解

$$
\alpha_1=(-1,1,0,0)^T,
\alpha_2=(2,-3,1,1)^T,
\alpha_3=(0,3,0,1)^T
$$

A:

$$
(-1,1,0,0)^T + k_1(3,-4,1,1)^T + k_2(1,2,0,1)^T
$$

Q:

$\beta_1,\beta_2$是 Ax=b 的两个不同的解，
$\alpha_1,\alpha_2$是 Ax=0 的基础解系，
$k_1,k_2$为任意实数，则 Ax=b 的通解是

$$
\begin{cases}
    A, k_1\alpha_1 + k_2(\alpha_1+\alpha_2) + \frac{\beta_1-\beta_2}{2} \\
    B, k_1\alpha_1 + k_2(\alpha_1-\alpha_2) + \frac{\beta_1+\beta_2}{2} \\
    C, k_1\alpha_1 + k_2(\beta_1-\beta_2) + \frac{\beta_1-\beta_2}{2} \\
    D, k_1\alpha_1 + k_2(\beta_1-\beta_2) + \frac{\beta_1+\beta_2}{2} \\
\end{cases}
$$

A: B

Q:

A 为 n 阶矩阵, r(A) = n-1,$\alpha_1,\alpha_2$是方程组 Ax=0 的两个解向量，求 Ax=0 的通解是

$$
\begin{cases}
    A, \alpha_1 + \alpha_2 \\
    B, k\alpha_1 \\
    C, k(\alpha_1 + \alpha_2) \\
    D, k(\alpha_1 - \alpha_2) \\
\end{cases}
$$

A: D

Q:

$$
\begin{cases}
    x_1 - 2x_2 + 3x_3 - 4x_4 = 0 \\
    x_1 -4x_2 + 3x_3 -2x_4 = 0 \\
\end{cases},
\begin{cases}
    x_1 + 3x_3 -3x_4 = 0 \\
    x_2 - x_3 + x_4 = 0 \\
\end{cases}
$$

求公共解

A:

$$
k(0,1,2,1)^T
$$

Q:

$$
\begin{cases}
    \xi_1=(1,1,0,0)^T,
    \xi_2=(1,0,1,0)^T,
    \xi_3=(1,0,0,1)^T \\
    \mu_1=(0,0,1,1)^T,
    \mu_2=(0,1,0,1)^T \\
\end{cases}
$$

分别是两个齐次线性方程组的基础解系，求两方程组的非零公共解

A: $(0, k, -k, 0)^T,k\ne0$

Q:

$$
\begin{cases}
    x_1 + x_2 = 0 \\
    x_2 - x_4 = 0 \\
\end{cases}
$$

求基础解系

A:

$$
(0,0,1,0)^T, (-1,1,0,1)^T
$$

Q:

$$
\begin{cases}
    x_1 + x_2 = 0 \\
    x_2 - x_4 = 0 \\
\end{cases}
$$

另一组齐次方程组的通解为

$$
k_1(0,1,1,0)^T + k_2(-1,2,2,1)^T
$$

求两方程组的非零公共解。

A: $k(1,-1,-1,-1)^T$

Q: A 是 m\*n 的实矩阵，$Ax=0,A^TAx=0$是同解方程组

A: 正确

Q: Ax=0,Bx=0 都是 n 元齐次线性方程组，r(A)=r(B),Ax=0 的解全为 Bx=0 的解，则 Ax=0 和 Bx=0 同解。

A: 正确

Q: $\mu_1,\mu_2$是 Ax=0 的解,$k_1\mu_1+k_2\mu_2$也是其解

A: 正确

Q: $\alpha_1,\alpha_2$是 Ax=b 的解，$\alpha_1-\alpha_2$是 Ax=0 的解

A: 正确

Q: $\alpha$是 Ax=b 的解，$\mu$是 Ax=0 的解，则$\alpha+\mu$是 Ax=b 的解

A: 正确
