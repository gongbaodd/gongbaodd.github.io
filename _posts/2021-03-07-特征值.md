---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 特征值

Q:

$$
\begin{pmatrix}
    3 & -1 & 1 \\
    2 & 0 & 1 \\
    1 & -1 & 2 \\
\end{pmatrix}
$$

求特征值和特征向量

A:

$$
\begin{cases}
    \lambda_1=1, k_1(0,1,1)^T, k_1\ne0 \\
    \lambda_2=\lambda_3=2, k_2(1,1,0)^T, k_2\ne=0  \\
\end{cases}
$$

Q:

$$
\begin{pmatrix}
    1 & -1 & 0 \\
    1 & 3 & 0 \\
    1 & 1 & 2 \\
\end{pmatrix}
$$

求特征值和特征向量

A:

$$
\lambda=2,k_1(-1,1,0)^T+k_2(0,0,1)^T
$$

Q:

$$
\begin{pmatrix}
    1 & 2 & 3 \\
    2 & 1 & 3 \\
    3 & 3 & 6 \\
\end{pmatrix}
$$

求特征值和特征向量

A:

$$
\begin{cases}
    \lambda_1 = 9, k_1(1,1,2)^T, k_1\ne0 \\
    \lambda_2 = 0, k_2(-1,-1,1)^T, k_2\ne0 \\
    \lambda_3 = -1, k_3(-1,1,0)^T, k_3\ne0 \\
\end{cases}
$$

Q: A 与 A^T 有相同特征值

A: 正确

Q: lambda 是 A 的特征值，alpha 属于 lambda 的特征向量，求 A+kE 的特征值特征向量

A: $\lambda+k,\alpha$

Q: lambda 是 A 的特征值，alpha 属于 lambda 的特征向量，求$A^2$的特征值特征向量

A: $\lambda^2, \alpha$

Q: A 可逆，则 A 的特征值不为 0

A: 正确

Q: Ax=0 有非零解，求|A|

A: 0

Q: $\lambda$是 A 的特征值，则$\frac{1}{\lambda}$是$A^{-1}$的特征值，若 X 是 A 属于$\lambda$的特征向量，则 X 也是$A^{-1}$属于$\frac{1}{\lambda}$的特征向量

A: 正确

Q: A 可逆，A\*的特征值是$\frac{|A|}{\lambda}$

A: 正确

Q: $A^2=E$则 A 的特征值只能是 1 或者-1

A: 正确

Q:

$$
\alpha_1=(1,1,0)^T,\alpha_2=(1,0,1)^T,
\beta=\alpha_1-2\alpha_2
$$

$\alpha_1,\alpha_2$ 都是 A 属于特征值$\lambda$=2 的特征向量,求$A\beta$

A: $(-2,2,-4)^T$

Q:

$$
A=\begin{pmatrix}
    2 & 1 & 1 \\
    1 & 2 & 1 \\
    1 & 1 & 2 \\
\end{pmatrix},
\alpha=\begin{pmatrix}
    1 \\
    k \\
    1 \\
\end{pmatrix}
$$

是 $A^{-1}$的特征向量，求 k 及$\alpha$所属特征值

A:

$$
\begin{cases}
    k = 1 \\
    \lambda = \frac{1}{4} \\
\end{cases},
\begin{cases}
    k = -2 \\
    \lambda = 1 \\
\end{cases}
$$

Q: A 为 n 阶矩阵，各行元素之和为 0，求 A 的特征值和特征向量

A: $\lambda=0,(1,1,\cdots,1)^T$

Q: 3 阶方阵 A 的特征值为-1, 0, 1,$B=A^2-2A^2+E$，求|B+E|

A: -2

Q: A,B 是 n 阶矩阵，则 AB 和 BA 特征值相同

A: 正确
