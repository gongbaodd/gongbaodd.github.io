---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 矩阵考研例题

Q:

$$
\alpha=\begin{pmatrix} \frac{1}{2}, 0, \cdots, 0, \frac{1}{2} \end{pmatrix}_{1xn},
A=E-\alpha^T\alpha, B=E+2\alpha^T\alpha,AB=
$$

A: E

Q:

A、B 是 n 阶矩阵,求 C 的伴随矩阵

$$
C=\begin{pmatrix}
    A & O \\
    O & B \\
\end{pmatrix}
$$

A:

$$
C^*=\begin{pmatrix}
    |B|A^* & O \\
    O & |A|B^* \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    1 & -1 \\
    2 & 3 \\
\end{pmatrix},
B=A^2-3A+2E,
B^{-1}
$$

A:

$$
B^{-1} =\begin{pmatrix}
    0 & \frac{1}{2} \\
    -1 & -1 \\
\end{pmatrix}
$$

Q: 一元二次方程的十字相乘法

A: $x^2+(a+b)x+ab$

Q:
A、B 为三阶方阵

$$
A^{-1}B=6E+B,A=\begin{pmatrix}
    \frac{1}{3} & 0 & 0 \\
    0 & \frac{1}{4} & 0 \\
    0 & 0 & \frac{1}{7} \\
\end{pmatrix},
B
$$

A:

$$
B=\begin{pmatrix}
    3 & 0 & 0 \\
    0 & 2 & 0 \\
    0 & 0 & 1 \\
\end{pmatrix}
$$

Q:

$A,B,A+B,A^{-1}+B^{-1}$均为 n 阶可逆矩阵，则$(A^{-1}+B^{-1})^{-1}$

- (A) $A^{-1}+B^{-1}$
- (B) $A+B$
- (C) $A(A+B)^{-1}B$
- (D) $(A+B)^{-1}$

A: C

Q:

$$
\begin{pmatrix}
    B & O \\
    O & C \\
\end{pmatrix}^n
$$

A:

$$
\begin{pmatrix}
    B^n & O \\
    O & C^n \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    1 & 0 & 0 \\
    1 & 1 & 0 \\
    1 & 1 & 1 \\
\end{pmatrix},
B=\begin{pmatrix}
    0 & 1 & 1 \\
    1 & 0 & 1 \\
    1 & 1 & 0 \\
\end{pmatrix},
AXA+BXB=AXB+BXA+E,
$$

A:

$$
X=\begin{pmatrix}
     1 & 2 & 5 \\
     0 & 1 & 2 \\
     0 & 0 & 1 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    k & 1 & 1 & 1 \\
    1 & k & 1 & 1 \\
    1 & 1 & k & 1 \\
    1 & 1 & 1 & k \\
\end{pmatrix},
r(A)=3,
k
$$

A:

$$
k=-3
$$
