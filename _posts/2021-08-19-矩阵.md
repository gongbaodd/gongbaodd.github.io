---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 矩阵

$$
|kA| = k^n|A|
$$

$$
(kA)^T = kA^T
$$

$$
(A+B)^T = A^T + B^T
$$

$$
AA^*=A^*A
$$

$$
A^* = |A|A^{-1}
$$

$$
AA^*=|A|E
$$

$$
|A^*|=|A|^{n-1}
$$

$$
A^{-1}=\frac{1}{|A|}A^*
$$

$$
A=|A|(A^*)^{-1}
$$

$$
(kA)(kA)^*=|kA|E
$$

$$
A^T(A^T)^*=|A^T|E
$$

$$
A^{-1}(A^{-1})^* = |A^{-1}|E
$$

$$
A^*(A^*)^*=|A^*|E
$$

$$
(A^T)^*=(A^*)^T
$$

$$
(A^{-1})^*=(A^*)^{-1}
$$

$$
(AB)^*=B^*A^*
$$

$$
(A^*)^*=|A|^{n-2}A
$$

$$
||A||=|A|
$$

$$
(A^T)^T=A
$$

$$
(A^{-1})^{-1}=A
$$

$$
(A^*)^*=|A|^{n-2}A
$$

$$
(kA)^{-1}=\frac{1}{k}A^{-1}
$$

$$
(kA)^*=k^{n-1}A^*
$$

$$
|AB|=|A||B|
$$

$$
(AB)^T=B^TA^T
$$

$$
(AB)^{-1}=B^{-1}A^{-1}
$$

$$
(AB)^*=B^*A^*
$$

$$
((A^{-1}))^T=(A^T)^{-1}
$$

$$
(A^{-1})^*=(A^*)^{-1}
$$

$$
(A^*)^T=(A^T)^*
$$

$$
|A^T|=|A|
$$

$$
|A^{-1}|=|A|^{-1}
$$

$$
|A^*|=|A|^{n-1}
$$

$$
|A+B| \ne |A| + |B|
$$

$$
(A+B)^T=A^T+B^T
$$

$$
A=\begin{pmatrix}
 B & O \\
 D & C \\
\end{pmatrix}
,
A^{-1}= \begin{pmatrix}
 B^{-1} & O \\
 -CDB^{-1} & C^{-1} \\
\end{pmatrix}
$$

$$
A=\begin{pmatrix}
 B & D \\
 O & C \\
\end{pmatrix}
,
A^{-1}= \begin{pmatrix}
 B^{-1} & -B^{-1}DC^{-1} \\
 O & C^{-1} \\
\end{pmatrix}
$$

$$
A=\begin{pmatrix}
 O & B \\
 C & D \\
\end{pmatrix}
,
A^{-1}= \begin{pmatrix}
 -C^{-1}DB^{-1} & c^{-1} \\
 B^{-1} & O \\
\end{pmatrix}
$$

$$
A=\begin{pmatrix}
 D & B \\
 C & O \\
\end{pmatrix}
,
A^{-1}= \begin{pmatrix}
 O & c^{-1} \\
 B^{-1} & -B^{-1}DC^{-1} \\
\end{pmatrix}
$$

$$
0 \le r(A) \le \mathrm{min}\{m,n\}
$$

$$
r(AB) = \mathrm{min} \{r(A),r(B)\}
$$

$$
r(A+B) \le r(A) + r(B)
$$

$$
r(A^*)=\begin{cases}
  n, r(A)=n \\
  1, r(A)=n-1 \\
  0, r(A) \lt n-1 \\
\end{cases}
$$
