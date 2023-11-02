---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 特征值二次型考研题

Q:

$\lambda=2$是非奇异矩阵 A 的一个特征值，则$(\frac{1}{3}A^2)^{-1}$的特征值是

A: $\frac{3}{4}$

Q: A 是 n 阶实对称矩阵，P 是 n 阶可逆矩阵，已知 n 维列向量$\alpha$是 A 属于$\lambda$的特征向量，则$(P^{-1}AP)^T$属于$\lambda$的特征向量是

A: $P^T\alpha$

Q:

$$
B=\begin{pmatrix}
    0 & 0 & 1 \\
    0 & 1 & 0 \\
    1 & 0 & 0 \\
\end{pmatrix},
A \sim B
$$

求 r(A-2E)+r(A-E)

A:4

Q: 判断 A 可对角化的三个条件

A:

- $A^T=A$
- A 不是对称矩阵，求 A 是否有 n 个特征值
- 比如 A 有两个特征值相等，则属于特征值的特征向量必有 2 个线性无关

Q:

$$
\xi=(1,1,-1)^T,
A=\begin{pmatrix}
    2 & -1 & 2 \\
    5 & a & 3 \\
    -1 & b & -2 \\
\end{pmatrix}
$$

求 a、b 和$\xi$所对应的特征值，并求 A 的对角矩阵

A:

$$
a=-3,b=0,\lambda=-1
$$

A 不能对角化

Q:

$$
A=\begin{pmatrix}
    3 & 2 & -2 \\
    -k & 1 & k \\
    4 & 2 & -3 \\
\end{pmatrix}
$$

k 为何值时 A 可对角化，并求出 A 的对角矩阵$\Lambda$和使得$P^{-1}AP=\Lambda$的可逆矩阵 P

A:

$$
k=0,P=\begin{pmatrix}
    1 & -1 & 0 \\
    0 & 2 & 1 \\
    1 & 0 & 1 \\
\end{pmatrix},\Lambda=\begin{pmatrix}
    1 \\
    & -1 \\
    && -1 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    1 & 1 & a \\
    1 & a & 1 \\
    a & 1 & 1 \\
\end{pmatrix},
\beta=\begin{pmatrix}
    1 \\ 1 \\ -2 \\
\end{pmatrix},
Ax=\beta
$$

线性方程组有解且不唯一，求 a 以及正交矩阵 Q 使得$Q^TAQ$

A:

$$
a=-2,Q=\begin{pmatrix}
    \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{3}} & \frac{1}{\sqrt{6}} \\
    0 & \frac{1}{\sqrt{3}} & -\frac{2}{\sqrt{6}} \\
    -\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{3}} & \frac{1}{\sqrt{6}} \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    1 & 0 & 1 \\
    0 & 2 & 0 \\
    1 & 0 & 1 \\
\end{pmatrix},
B=(kE+A)^2,
B \sim \Lambda
$$

求 k 为何值 B 为正定矩阵

A: $k \ne -2, k \ne 0$
