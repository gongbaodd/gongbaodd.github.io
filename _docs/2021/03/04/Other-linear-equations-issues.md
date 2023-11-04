---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 其他线性方程组问题

Q:

$$
A=\begin{pmatrix}
    1 & 1 \\
    0 & 1 \\
\end{pmatrix}
$$

与 A 可交换的全体二阶矩阵

A:

$$
\begin{pmatrix}
    k_1 & k_2 \\
    0 & k_1 \\
\end{pmatrix}
$$

Q:

$$
\begin{pmatrix}
    1 & 2 \\
    2 & 4 \\
\end{pmatrix}X=\begin{pmatrix}
    3 & 5 \\
    6 & 10 \\
\end{pmatrix}
$$

A:

$$
X=\begin{pmatrix}
    3-2t & 5-2u \\
    t & u \\
\end{pmatrix}
$$

Q:

$$
\begin{pmatrix}
    1 & 3 & 2 \\
    2 & 6 & 5 \\
    -1 & -3 & 1 \\
\end{pmatrix}X=\begin{pmatrix}
    3 & 4 \\
    8 & 8 \\
    3 & -4 \\
\end{pmatrix}
$$

A:

$$
X=\begin{pmatrix}
    -1-3t & 4-3u \\
    t & u \\
    2 & 0 \\
\end{pmatrix}
$$

Q:

$$
\alpha_1=(1,-1,1)^T,
\alpha_2=(1,2,0)^T,
\alpha_3=(1,0,3)^T
$$

是否线性相关

A: 线性无关

Q:

$$
\begin{cases}
    \alpha_1=(1,-1,1)^T,
    \alpha_2=(1,2,0)^T,
    \alpha_3=(1,0,3)^T \\
    \beta=(2,-3,7)^T
\end{cases}
$$

用 alpha 线性表示 beta

A: $\beta=\alpha_1-\alpha_2+2\alpha_3$

Q:

$$
\begin{cases}
    \alpha_1=(1,1,1)^T \\
    \alpha_2=(a,1,1)^T \\
    \alpha_3=(1,2,b)^T \\
    \beta=(2,3,4)^T \\
\end{cases}
$$

a,b 取何值时 beta 可由 alpha 唯一线性表示

A: $a\ne1,b\ne2$

Q:

$$
\begin{cases}
    \alpha_1=(1,1,1)^T \\
    \alpha_2=(a,1,1)^T \\
    \alpha_3=(1,2,b)^T \\
    \beta=(2,3,4)^T \\
\end{cases}
$$

a,b 取何值时 beta 不能由 alpha 线性表示

A:

$$
\begin{cases}
    b=2,\forall a \\
    a=1,b\ne3 \\
\end{cases}
$$

Q:

$$
\begin{cases}
    \alpha_1=(1,1,1)^T \\
    \alpha_2=(a,1,1)^T \\
    \alpha_3=(1,2,b)^T \\
    \beta=(2,3,4)^T \\
\end{cases}
$$

a,b 取何值时 beta 可由不唯一 alpha 线性表示，并写出表达式

A:

$$
a=1,b=3,\beta=(1-k)\alpha_1+k\alpha_2+\alpha_3
$$

Q:

$$
\begin{cases}
    \alpha_1=(1,2,1)^T \\
    \alpha_2=(2,3,a)^T \\
    \alpha_3=(1,a+2,-2)^T \\
    \beta_1=(1,3,4)^T \\
    \beta_2=(0,1,-1)^T \\
\end{cases}
$$

beta1 可由 alpha 线性表示
beta2 不能由 alpha 线性表示
求 a，并写出 beta1 的表达式

A:

$$
a=-1,\beta_1=(3+k)\alpha_1-(1+k)\alpha_2+k\alpha_3
$$

Q: A 是 m\*n 矩阵，B 是 n\*s 矩阵，且 AB=O，则$r(A)+r(B)\le n$

A: 正确

Q: $A^2=E$则 A 可逆

A: 正确

Q: $A^2=E$则$r(A-E)+r(A+E)=n$

A: 正确

Q: A 是 m\*n 矩阵，B 是 n\*s 矩阵，则$r(AB)\le r(B)$

A: 正确

Q:

$$
V=\{x=(x_1,x_2,x_3) | x_1=x_2, x\in R\}
$$

构成 R 的子空间

A: 正确

Q:

$$
V=\{x=(x_1,x_2,x_3) | x_1x_2 = 0, x\in R\}
$$

构成 R 的子空间

A: 错误

Q:

$$
V=\{x=(x_1,x_2,x_3) | x_1+x_2-3x_3=0, 2x_2-x_3=0, x\in R\}
$$

构成 R 的子空间

A: 正确

Q:

$$
V=\{x=(x_1,x_2,x_3) | x_1+x_2-2x_2=1, x\in R\}
$$

构成 R 的子空间

A: 错误

Q:

$$
V=\{x=(0,1,x_3) | x_3 \in R\}
$$

构成 R 的子空间

A: 错误

Q:

$$
\begin{cases}
    \beta=(1,2,3)^T \\
    \alpha_1=(2,1,1)^T \\
    \alpha_2=(-3,2,0)^T \\
\end{cases} \rightarrow
\beta \in L(\alpha_1, \alpha_2)
$$

A: 错误

Q:

$$
\begin{cases}
    \beta=(1,-2,0)^T \\
    \alpha_1=(1,2,2)^T \\
    \alpha_3=(1,4,3)^T \\
\end{cases} \rightarrow
\beta \in L(\alpha_1, \alpha_2)
$$

A: 正确

Q:

$$
\begin{cases}
    \alpha_1=(1,2,-1,-2)^T \\
    \alpha_2=(2,3,0,-1)^T \\
    \alpha_3=(1,3,-1,0)^T \\
    \alpha_4=(1,2,1,4)^T \\
    \beta = (7,14,-1,2)^T \\
\end{cases}
$$

求 beta 在 alpha 下的坐标

A:

$$
(0,2,2,1)^T
$$

Q:

$$
\begin{cases}
    \alpha_1 = (1,0)^T \\
    \alpha_2 = (1,1)^T \\
    \beta_1 = (3, 2)^T \\
    \beta_2 = (5, -3)^T \\
\end{cases}
$$

求 alpha 到 beta 的过度矩阵

A:

$$
\begin{pmatrix}
    1 & 8 \\
    2 & -3 \\
\end{pmatrix}
$$

Q:

$$
\begin{cases}
    \alpha_1=(1,1,1)^T \\
    \alpha_2=(0,1,1)^T \\
    \alpha_3=(0,0,1)^T \\
    \beta_1=(1,0,-1)^T \\
    \beta_2=(1,1,0)^T \\
    \beta_3=(0,-1,1)^T \\
\end{cases}
$$

求两个基下的变换公式

A:

$$
\begin{pmatrix}
    x_1 \\
    x_2 \\
    x_3 \\
\end{pmatrix}=\begin{pmatrix}
    1 & 1 & 0 \\
    -1 & 0 & -1 \\
    -1 & -1 & 2 \\
\end{pmatrix}\begin{pmatrix}
    y_1 \\
    y_2 \\
    y_3 \\
\end{pmatrix}
$$

Q:

$$
\begin{cases}
    \alpha_1=(1,0,-1)^T \\
    \alpha_2=(2,1,1)^T \\
    \alpha_3=(1,1,1)^T \\
    \beta_1=(0,1,1)^T \\
    \beta_2=(-1,1,0)^T \\
    \beta_3=(1,2,1)^T \\
\end{cases}
$$

求从 alpha 到 beta 的过度矩阵

A:

$$
\begin{pmatrix}
    0 & 1 & 1 \\
    -1 & -3 & -2 \\
    2 & 4 & 4 \\
\end{pmatrix}
$$

Q:

$$
\begin{cases}
    \alpha_1=(1,0,-1)^T \\
    \alpha_2=(2,1,1)^T \\
    \alpha_3=(1,1,1)^T \\
    \beta_1=(0,1,1)^T \\
    \beta_2=(-1,1,0)^T \\
    \beta_3=(1,2,1)^T \\
    \gamma=(9,6,5)^T \\
\end{cases}
$$

求 gamma 在 alpha 和 beta 下的坐标

A:

$$
(1,2,4)^T,
(0,-4,5)^T
$$
