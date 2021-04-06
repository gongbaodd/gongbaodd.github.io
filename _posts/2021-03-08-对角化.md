---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 对角化

Q: A~B,则$A^2\sim B^2$

A: 正确

Q:

$$
A_1 \sim A_2, B_1 \sim B_2 \rightarrow \begin{pmatrix}
    A_1 & O \\
    O & B_1 \\
\end{pmatrix} \sim \begin{pmatrix}
    A_2 & O \\
    O & B_2 \\
\end{pmatrix}
$$

A: 正确

Q: A、B 是 n 阶可逆矩阵，若 A 可逆，则 AB 与 BA 有相同特征值

A: 正确

Q:

$$
A \sim \Lambda = \begin{pmatrix}
    2 &   \\
      & 3 \\
\end{pmatrix},
|A+E|
$$

A: 12

Q:

$$
\begin{pmatrix}
    1 & 1 & -1 \\
    1 & -2 & -1 \\
    -3 & 1 & 3 \\
\end{pmatrix}
$$

求可逆矩阵 P 与对角矩阵

A:

$$
P=\begin{pmatrix}
    7 & 1 & 1 \\
    4 & -2 & 0 \\
    -17 & 1 & 1 \\
\end{pmatrix},
\Lambda=\begin{pmatrix}
    4 & \\
      & -2 \\
      &    & 0 \\
\end{pmatrix}
$$

Q:

$$
\begin{pmatrix}
    1 & 1 & -1 \\
    1 & 0 & -1 \\
    -3 & 1 & 3 \\
\end{pmatrix}
$$

求可逆矩阵 P 与对角矩阵

A: 不能对角化

Q:

$$
\begin{pmatrix}
    1 & 1 & -1 \\
    1 & 1 & -1 \\
    -3 & -3 & 3 \\
\end{pmatrix}
$$

求可逆矩阵 P 与对角矩阵

A:

$$
P=\begin{pmatrix}
    -11 & -1 & 1 \\
    -5 & 1 & 0 \\
    9 & 0 & 1 \\
\end{pmatrix},\Lambda=\begin{pmatrix}
    5 \\
        & 0 \\
        &   & 0 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    2 & 0 & 1 \\
    3 & 1 & x \\
    4 & 0 & 5 \\
\end{pmatrix}
$$

可对角化，求 x

A: x=3

Q:

$$
A=\begin{pmatrix}
    1 & -1 & 2 \\
    0 & 2 & -2 \\
    -1 & -1 & 0 \\
\end{pmatrix},A^n
$$

A:

$$
A^n=\begin{pmatrix}
    3-2^n & 3-2^{n+1} & 2^n \\
    -2+2^n & -2+2^{n+1} & -2^n \\
    -1 & -1 & 0 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    -2 & 1 & 1 \\
    0 & 2 & 0 \\
    -4 & 1 & 3 \\
\end{pmatrix},\beta=\begin{pmatrix}
    2 \\ 2 \\ 3 \\
\end{pmatrix},
A^{10}\beta
$$

A:

$$
A^{10}\beta = \begin{pmatrix}
    2^{10} + 1 \\
    2^{11} \\
    2^{11} + 1 \\
\end{pmatrix}
$$

Q:

$$
\begin{cases}
    \lambda_1 = 1, \alpha_1 = (1,1,0)^T \\
    \lambda_2 = 2, \alpha_2 = (-1,0,1)^T \\
    \lambda_3 = -1, \alpha_3 = (1,1,2)^T \\
\end{cases},
A
$$

A:

$$
A=\begin{pmatrix}
    1 & 0 & -1 \\
    -1 & 2 & -1 \\
    -3 & 3 & -1 \\
\end{pmatrix}
$$

Q:

$$
\begin{cases}
    \lambda_1 = 1, \alpha_1 = (1,1,0)^T \\
    \lambda_2 = 2, \alpha_2 = (-1,0,1)^T \\
    \lambda_3 = -1, \alpha_3 = (1,1,2)^T \\
\end{cases},
A^{100}
$$

A:

$$
A^{100} = \begin{pmatrix}
    2^{100} & 1-2^{100} & 0 \\
    0 & 1 & 0 \\
    1-2^{100} & 2^{100}-1 & 1 \\
\end{pmatrix}
$$
