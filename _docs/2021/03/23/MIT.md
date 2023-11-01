---
type: post
category: tv
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# MIT 线性代数笔记

AX=b 的最小误差解必是$A^TAX=A^Tb$的解

投影矩阵$P=A(AA^T)^{-1}A^T$

## 特征值解决斐波那契数列问题

$$
U_{n} =
\begin{cases}
  F_{n+2} = F_{n+1} + F_n \\
  F_{n+1} = F_{n+1} + 0
\end{cases} = \begin{pmatrix}
  1 & 1 \\
  1 & 0 \\
\end{pmatrix}\begin{pmatrix}
  F_{n+1} \\
  F_n \\
\end{pmatrix} = \begin{pmatrix}
  1 & 1 \\
  1 & 0 \\
\end{pmatrix}U_{n-1}
$$

求出矩阵特征值

$$
\begin{cases}
  \lambda_1=\frac{1+\sqrt{5}}{2}, x_1=(\lambda_1,1)^T \\
  \lambda_2=\frac{1-\sqrt{5}}{2}, x_2=(\lambda_2,1)^T \\
\end{cases}
$$

令 A=$\begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$

$$
A^n=S\Lambda^nS^{-1}
$$

S 为 A 的特征向量矩阵

$$
S=(x_1,x_2)=\begin{pmatrix}
  \lambda_1 & \lambda_2 \\
  1 & 1
\end{pmatrix}
$$

$$
U_n=A^nU_0=S\Lambda^n S^{-1}U_0
$$

令$U_0=c_1x_1+c_2x_2=S(c_1,c_2)^T$

$$
U_0 = \begin{pmatrix}
  c_1\lambda_1 + c_2\lambda_2 \\
  c_1 + c_2
\end{pmatrix} = \begin{pmatrix}
  F_1 + F_0 \\
  F_0
\end{pmatrix}
$$

$$
U_n = S\Lambda^n \begin{pmatrix}
  c_1 \\ c_2
\end{pmatrix} = c_1\lambda_1^nx_1 + c_2\lambda_2^nx_2
$$
