---
type: post
category: book
tag:
  - math
---

# 矩阵的秩

Q: rank(A)=3，A 中有 2 阶子式不为 0 吗？

A: 必有 2 阶子式不为 0

Q: rank(A)=3，A 中有 2 阶子式为 0 吗？

A: 可以有

Q: Q: rank(A)=3，A 中有 3 阶子式为 0 吗？

A: 可以有

Q: rank(A)=3，A 中有 4 阶子式不为 0 吗？

A: 不能有

Q:

$$
r(A)=3, A=\begin{pmatrix}
    1 & 0 & 2 & 3 \\
    0 & 1 & a & a-1 \\
    0 & 0 & a+1 & a-3 \\
\end{pmatrix}
$$

A:

$$
\forall a
$$

Q:

$$
r(A)=3,A=\begin{pmatrix}
    1 & 0 & 2 & 3 \\
    0 & a & -3 & a-1 \\
    0 & 0 & a^2-9 & a-3 \\
\end{pmatrix}
$$

A:

$$
a\ne3, a\ne0
$$

Q:

$$
A=\begin{pmatrix}
    1 & -1 & 3 & 0 \\
    -2 & 1 & -2 & 1 \\
    -1 & -1 & 5 & 2 \\
\end{pmatrix},
r(A)
$$

A: r(A) = 2

Q:

$$
A=\begin{pmatrix}
    1 & 2 & a & -1 \\
    2 & 5 & -1 & a \\
    1 & 1 & 10 & -6 \\
\end{pmatrix},
r(A)
$$

A:

$$
\begin{cases}
    r(A)=2, a=3\\
    r(A)=3, a\ne3
\end{cases}
$$

Q: A 是 n 阶可逆矩阵，B 是 m\*n 矩阵，r(AB)=

A: r(B)

Q: A 是 m*n 矩阵，r(A)=n,B 是 n*s 矩阵，若 AB=C,求 r(B)

A: r(C)
