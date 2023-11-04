---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 矩阵的初等变换

Q:

$$
A=\begin{pmatrix}
    0 & 1 & 0 & 1 \\
    0 & 0 & 1 & 2 \\
    0 & 0 & 0 & 0 \\
\end{pmatrix}
$$

是行最简形

A: 正确

Q:

$$
A=\begin{pmatrix}
    1 & 1 & 0 & 1 \\
    0 & 1 & 1 & 1 \\
    0 & 0 & 0 & 0 \\
\end{pmatrix}
$$

是行最简形

A:错

Q:

$$
A=\begin{pmatrix}
    1 & 0 & 0 & 3 \\
    0 & 1 & 0 & 1 \\
    0 & 0 & -1 & 1 \\
\end{pmatrix}
$$

是行最简形

A:错

Q:

$$
A=\begin{pmatrix}
    1 & 2 & 0 & 0 \\
    0 & 0 & 1 & 1 \\
    0 & 0 & 0 & 0 \\
\end{pmatrix}
$$

是行最简形

A: 正确

Q: 行阶梯矩阵

A: 如果矩阵中有零行，则零行都在底部；每个非零行主元下面元素都是 0

Q: 行最简矩阵

A: 非零行主元都是 1 且主元所在列其他元素都是 0

Q:

$$
A=\begin{pmatrix}
    2 & -4 & 5 & 3\\
    3 & -6 & 4 & 2 \\
    4 & -8 & 17 & 11 \\
\end{pmatrix}
$$

求 A 的行最简形以及标准形

A:

$$
\begin{pmatrix}
    1 & -2 & 0 & -\frac{2}{7} \\
    0 & 0 & 1 & \frac{5}{7} \\
    0 & 0 & 0 & 0 \\
\end{pmatrix};
\begin{pmatrix}
    E_2 & O \\
    O & O \\
\end{pmatrix}
$$

Q:

$$
A = \begin{pmatrix}
    2 & 2 & 3 \\
    1 & -1 & 0 \\
    -1 & 2 & 1 \\
\end{pmatrix},
A^{-1}
$$

A:

$$
A^{-1}=\begin{pmatrix}
    1 & -4 & -3 \\
    1 & -5 & -3 \\
    -1 & 6 & 4 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    1 & 2 & 2 \\
    2 & 1 & -2 \\
    2 & -2 & 1 \\
\end{pmatrix},
A^{-1}
$$

A:

$$
A^{-1}=\frac{1}{9}\begin{pmatrix}
    1 & 2 & 2 \\
    2 & 1 & -2 \\
    2 & -2 & 1 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    2 & 1 & 0 & 0 \\
    3 & 2 & 0 & 0 \\
    1 & 1 & 4 & 3 \\
    2 & -1 & 3 & 2 \\
\end{pmatrix},
A^{-1}
$$

A:

$$
A^{-1}=\begin{pmatrix}
    2 & -1 & 0 & 0 \\
    -3 & 2 & 0 & 0 \\
    -23 & 14 & -2 & 3 \\
    31 & -19 & 3 & -4 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    A & O \\
    C & B \\
\end{pmatrix};
A^{-1}
$$

A:

$$
\begin{pmatrix}
    A^{-1} & O \\
    -B^{-1}CA^{-1} & B^{-1} \\
\end{pmatrix}
$$

Q: 单位阵第二行或第二列乘 k 的初等矩阵

A:

$$
E(2(k))=\begin{pmatrix}
    1 & 0 & 0 \\
    0 & k & 0 \\
    0 & 0 & 1 \\
\end{pmatrix}
$$

Q: 表示单位阵 1、2 行互换的初等矩阵

A:

$$
E(1,2)=\begin{pmatrix}
     0 & 1 & 0 \\
     1 & 0 & 0 \\
     0 & 0 & 1 \\
\end{pmatrix}
$$

Q:表示单位阵第一行的 k 倍加到第三行的矩阵

A:

$$
E(13(k)) = \begin{pmatrix}
    1 & 0 & 0 \\
    0 & 1 & 0 \\
    k & 0 & 1 \\
\end{pmatrix}
$$

Q:A 是三阶方阵，A 的第一列和第二列互换，之后再把第 2 列加到第三列得 C，满足 AQ=C，则可逆矩阵 Q 为。

$$
Q = \begin{pmatrix}
    0 & 1 & 1 \\
    1 & 0 & 0 \\
    0 & 0 & 1 \\
\end{pmatrix}
$$

Q:A 为 3 阶矩阵，将 A 的第二行加到第一行，之后再把第一列的-1 倍加到第二列得 C，已知 P=$\begin{pmatrix} 1 & 1 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \\ \end{pmatrix}$，则

$$
(A) C=P^{-1}AP;
(B) C=PAP^{-1};
(C) C=P^TAP;
(D) C=PAP^T;
$$

A:B

Q:

$$
A=\begin{pmatrix}
    a_{11} & a_{12} & a_{13} \\
    a_{21} & a_{22} & a_{23} \\
    a_{31} & a_{32} & a_{33} \\
\end{pmatrix},
B=\begin{pmatrix}
    a_{21} & a_{22} & a_{23} \\
    a_{11} & a_{12} & a_{13} \\
    a_{31} + a_{11} & a_{32} + a_{12} & a_{33} + a_{13} \\
\end{pmatrix},
P_1=\begin{pmatrix}
    0 & 1 & 0 \\
    1 & 0 & 0 \\
    0 & 0 & 1 \\
\end{pmatrix},
P_2=\begin{pmatrix}
    1 & 0 & 0 \\
    0 & 1 & 0 \\
    1 & 0 & 1 \\
\end{pmatrix}
$$

则必有:

$$
(A)\ AP_1P_2 = B;
\ (B)\ AP_2P_1 = B;
\ (C)\ P_1P_2A = B;
\ (D)\ P_2P_1A = B;
$$

A: C

Q: 左乘初等矩阵为什么变换

A: 行变换

Q: 右乘初等矩阵为什么变换

A: 列变换

Q:

$$
A=\begin{pmatrix}
    1 & 2 & 3 & 4 \\
    2 & 3 & 4 & 5 \\
    5 & 4 & 3 & 2 \\
\end{pmatrix}
$$

求可逆矩阵 P，使 PA 为最简行矩阵。

A:

$$
P=\begin{pmatrix}
    -3 & 2 & 0 \\
    2 & -1 & 0 \\
    7 & -6 & 1 \\
\end{pmatrix},
PA=\begin{pmatrix}
    1 & 0 & -1 & -2 \\
    0 & 1 & 2 & 3 \\
    0 & 0 & 0 & 0 \\
\end{pmatrix}
$$

Q: 已知 A 是 n 阶非零矩阵，A\*是 A 的伴随矩阵，证明$|A^*|=|A|^{n-1}$

Q: 已知 AB 均为 3 阶可逆矩阵，|A|=a, |B|=b 求$|2AB^T|$

A: 8ab

Q: 已知 AB 均为 3 阶可逆矩阵，|A|=a, |B|=b 求$|A^{-1}B^*|$

A: $\frac{b^2}{a}$

Q: 已知 AB 均为 3 阶可逆矩阵，|A|=a, |B|=b 求$||A^*|B|$

A: $a^6b$

Q: |A\*|

A: $|A|^{n-1}$

Q: $|A^{-1}|$

A: $|A|^{-1}$

Q: 已知 A 是三阶矩阵，|A|=2 求$|(\frac{1}{2}A)^{-1}-3A^*|$

A: -32
