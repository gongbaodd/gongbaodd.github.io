---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 齐次线性方程组

Q:

$$
\begin{cases}
    6x_1+2x_2-2x_3+x_4=0 \\
    x_1-x_3+x_4 = 0 \\
    2x_1+x_2+3x_4 = 0 \\
\end{cases}
$$

求基础解系

A:

$$
\mu=(1,-2,1,0)^T
$$

Q:

$$
\begin{cases}
    x_1+2x_2+x_3-x_4 = 0 \\
    3x_1+6x_2-x_3-3x_4 = 0 \\
    5x_1+10x_2+x_3-5x_4 = 0 \\
\end{cases}
$$

求基础解系

A:

$$
\mu_1=(-2,1,0,0)^T,
\mu_2=(1,0,0,1)^T
$$

Q:

$$
\begin{cases}
    2x_1-x_2+3x_3+2x_4 = 0\\
    3x_1+2x_2+5x_3-4x_4 = 0 \\
    4x_1+5x_2+7x_3-10x_4 = 0 \\
\end{cases}
$$

求基础解系

A:

$$
\mu_1=(-\frac{11}{7}, -\frac{1}{7}, 1, 0)^T,
\mu_2=(0,2,0,1)^T
$$

Q:

$$
\begin{cases}
    x_1+x_2+2x_3+3x_4=0 \\
    3x_1+3x_2+6x_3+12x_4+x_5 = 0 \\
    4x_1+4x_2+8x_3+15x_4+x_5 = 0 \\
\end{cases}
$$

求基础解系

A:

$$
\mu_1=(-1,1,0,0,0)^T,
\mu_2=(-2,0,1,0,0)^T,
\mu_3=(1,0,0,-\frac{1}{3},1)^T
$$

Q:

Ax=0 的基础解系是$\mu_1,\mu_2,\mu_3$，则其基础解系还可能是

$$
\begin{cases}
    A, \mu_1-\mu_2,\mu_2-\mu_3,\mu_3-\mu_1 \\
    B,\mu_1+\mu_2,\mu_1+\mu_3 \\
    C, \mu_1+2\mu_2,\mu_2+2\mu_3,\mu_3+2\mu_1 \\
    D, \mu_1+2\mu_2, \mu_1-\mu_2+\mu_3,2\mu_1+\mu_2+\mu_3
\end{cases}
$$

A: C

Q:

$$
\begin{cases}
    x_1+2x_2+x_3 = 0 \\
    2x_1+3x_2+ax_3 = 0 \\
    x_1-x_2-2x_3 = 0 \\
\end{cases}
$$

有非零解，求 a 的值并求其通解。

A:

$$
a=1,k(1,-1,1)^T
$$

Q:

$$
A=\begin{pmatrix}
    1 & 2 & 1 & 2 \\
    0 & 1 & t & 1 \\
    1 & t & 4 & -1 \\
\end{pmatrix}
$$

Ax=0 的基础解系由两个线性无关的解向量构成，求 t 并求 Ax=0 的通解。

A:

$$
t=-1,k_1(-3,1,1,0)^T+k_2(0,-1,0,1)^T
$$

Q:

$$
A=\begin{pmatrix}
    2 & -2 & 1 & 3 \\
    9 & -5 & 2 & 8 \\
\end{pmatrix}
$$

求 4\*2 的矩阵 B，使得 AB=O，且 r(B)=2

A:

$$
B=\begin{pmatrix}
    1 & -1 \\
    5 & 11 \\
    8 & 0 \\
    0 & 8 \\
\end{pmatrix}
$$

Q:

求齐次方程组基础解系为

$$
\mu_1=(0,1,2,3)^T,
\mu_2=(3,2,1,0)^T
$$

A:

$$
\begin{cases}
    x_1-2x_2+x_3 = 0 \\
    2x_1-3x_2+x_4 = 0 \\
\end{cases}
$$

Q:

A 是 3 阶非零矩阵 a1,a2,a3 是非齐次线性方程组 Ax=b 的三个线性无关的解，则 a1-a2,a1-a3 是 Ax=0 的基础解系。

A: 正确
