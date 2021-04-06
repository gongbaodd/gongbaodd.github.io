---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 线性方程组考研题

Q:

$$
\begin{cases}
    \lambda x_1 + x_2 + x_3 = \lambda -3 \\
    x_1 + \lambda x_2 + x_3 = -2 \\
    x_1 + x_2 + \lambda x_3 = -2 \\
\end{cases}
$$

lambda 取何值时方程组无解

A: $\lambda=-2$

Q:

$$
\begin{cases}
    \lambda x_1 + x_2 + x_3 = \lambda -3 \\
    x_1 + \lambda x_2 + x_3 = -2 \\
    x_1 + x_2 + \lambda x_3 = -2 \\
\end{cases}
$$

lambda 取何值时方程组有唯一解

A: $\lambda\ne-2,\lambda\ne1$

Q:

$$
\begin{cases}
    \lambda x_1 + x_2 + x_3 = \lambda -3 \\
    x_1 + \lambda x_2 + x_3 = -2 \\
    x_1 + x_2 + \lambda x_3 = -2 \\
\end{cases}
$$

lambda 取何值时方程组无穷解并表示全部解

A: $\lambda=1,(-2,0,0)^T+k_1(-1,1,0)+k_2(-1,0,1)$

Q:

$$
A_4=(\alpha_1, \alpha_2, \alpha_3, \alpha_4),
\alpha_1=2\alpha_2-\alpha_3,
\beta=\alpha_1+\alpha_2+\alpha_3+\alpha_4
$$

$\alpha_2,\alpha_3,\alpha_4$线性无关，求$Ax=\beta$的通解

A:

$$
k(1,-2,1,0)^T+(1,1,1,1)^T
$$

Q:

$$
\begin{pmatrix}
    a & 1 & 1 \\
    1 & a & 1 \\
    1 & 1 & a \\
\end{pmatrix}\begin{pmatrix}
    x_1 \\
    x_2 \\
    x_3 \\
\end{pmatrix}=\begin{pmatrix}
    1 \\
    1 \\
    -2 \\
\end{pmatrix}
$$

有无穷解，求 a

A: a=-2

Q:

A 为 m\*n 矩阵，Ax=0 只有零解的充分条件是

- A. A 列向量线性无关
- B. A 列向量线性相关
- C. A 行向量线性无关
- D. A 行向量线性相关

A: A

Q:

$$
\alpha=(1,2,1)^T,\beta=(1,\frac{1}{2},0)^T,\gamma=(0,0,8)^T,A=\alpha\beta^T,B=\beta^T\alpha
$$

求$2B^2A^2x=A^4x+B^4x+\gamma$

A: $x=k(1,2,1)^T+(0,0,-\frac{1}{2})^T$特解也可能是$(\frac{1}{2}, 1, 0)^T$

Q: $\alpha_1,\alpha_2,\alpha_3$是 Ax=0 的一个基础解系，则$\alpha_1+\alpha_2,\alpha_2+\alpha_3,\alpha_3+\alpha_1$也是一个基础解系

A: 正确

Q:

$$
\alpha_1=(1,2,-1,0)^T,
\alpha_2=(1,1,0,2)^T,
\alpha_3=(2,1,1,a)^T
$$

他们构成的向量空间的维数为 2，求 a

A: a=6
