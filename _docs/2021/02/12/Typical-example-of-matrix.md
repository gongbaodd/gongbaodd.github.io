---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 矩阵典型例题

$$
\begin{pmatrix}
    1 & 3 & 2 \\
    0 & 1 & -1 \\
    -2 & 4 & 5 \\
\end{pmatrix}
\begin{pmatrix}
    2 \\
    -1 \\
    3 \\
\end{pmatrix}
$$

A:

$$
\begin{pmatrix}
    5 \\ -4 \\ 7
\end{pmatrix}
$$

Q:

$$
\begin{pmatrix}
    2 & 1 \\
    3 & 2 \\
\end{pmatrix}
\begin{pmatrix}
    1 & -1 \\
    0 & 1 \\
\end{pmatrix}
$$

A:

$$
\begin{pmatrix}
    2 & -1 \\
    3 & -1 \\
\end{pmatrix}
$$

Q:

$$
\begin{pmatrix}
    1 & 2 \\
    2 & 4 \\
\end{pmatrix}
\begin{pmatrix}
    2 & -4 \\
    -1 & 2 \\
\end{pmatrix}
$$

A:

$$
\begin{pmatrix}
    0 & 0 \\
    0 & 0 \\
\end{pmatrix}
$$

Q:

$$
\begin{pmatrix}
    1 \\ 3 \\ -2
\end{pmatrix}

\begin{pmatrix}
    2 & 1 & 3
\end{pmatrix}
$$

A:

$$
\begin{pmatrix}
    2 & 1 & 3 \\
    6 & 3 & 9 \\
    -4 & -2 & -6 \\
\end{pmatrix}
$$

Q:

$$
\begin{pmatrix}
    2 & 1 &3
\end{pmatrix}

\begin{pmatrix}
    1 \\ 3 \\ -2
\end{pmatrix}
$$

A:
-1

Q:

$$
\begin{pmatrix}
    1 & -1 & 3 \\
    4 & 3 & 2 \\
    1 & 5 & -2 \\
\end{pmatrix}

\begin{pmatrix}
    x_1 \\ x_2 \\ x_3
\end{pmatrix}
$$

A:

$$
\begin{pmatrix}
    x_1-x_2+3x_3 \\
    4x_1+3x_2+2x_3 \\
    x_1 + 5x_2 - 2x_3 \\
\end{pmatrix}
$$

Q:

$\alpha=(1, 2, 3)$,
$\beta=(1,-1,2)$,
$A = \alpha^T\beta$,
$B = \beta\alpha^T$
求$A, B,A^4$

A:

$$
A =
\begin{pmatrix}
    1 & -1 & 2 \\
    2 & -2 & 4 \\
    3 & -3 & 6 \\
\end{pmatrix};
B = 5;
A^4=5^3A
$$

Q:

$$
A=
\begin{pmatrix}
    a_{11} & a_{12} & a_{13} \\
    a_{21} & a_{22} & a_{23} \\
    a_{31} & a_{32} & a_{33} \\
\end{pmatrix},
X =
\begin{pmatrix}
    \frac{1}{2} \\
    0 \\
    \frac{1}{2} \\
\end{pmatrix},
Y =
\begin{pmatrix}
    \frac{1}{2} \\
    0 \\
    -\frac{1}{2} \\
\end{pmatrix},
$$

求$X^TAX+X^TAY-Y^TAX-Y^TAY$

A:

$$
a_{31}
$$

Q:A 是 n 阶矩阵，则(A-E)(A+E)=(A+E)(A-E)

A:正确

Q: A、B 是 n\*1 矩阵，则$A^TB=B^TA$

A: 正确

Q: A、B 为 n 阶矩阵，AB=O 则$(A+B)^2=A^2+B^2$

A：错误

Q: A 是 n 阶矩阵，$A^mA^k=A^kA^m$

A: 正确

Q：企业脱产培训，每年抽调 30%人，其中有 60%会结业回岗，假设现有 800 人，参与培训人员 200 人，两年后在岗和培训职工多少人(职工人数不变)。

A：在岗 668，培训 332

Q:

$$
A=
\begin{pmatrix}
    2 & 4 & 2 \\
    1 & 2 & 1 \\
    3 & 6 & 3 \\
\end{pmatrix},
A^n = ?
$$

A:

$7^{n-1}A$

Q:

$$
A=
\begin{pmatrix}
    0 & 2 & 4 \\
    0 & 0 & 3 \\
    0 & 0 & 0 \\
\end{pmatrix},
A^n = ?
$$

A:

$$
A^n =
\begin{cases}
    \begin{pmatrix}
        0 & 2 & 4 \\
        0 & 0 & 3 \\
        0 & 0 & 0 \\
    \end{pmatrix}, if \ n=1, \\
    \begin{pmatrix}
        0 & 0 & 6 \\
        0 & 0 & 0 \\
        0 & 0 & 0 \\
    \end{pmatrix}, if \ n=2, \\
    O, if \ n \ge 3,
\end{cases}
$$

Q:

$$
\begin{pmatrix}
    1 & 1 & 1 \\
    0 & 1 & 1 \\
    0 & 0 & 1 \\
\end{pmatrix},
A^n = ?
$$

A:

$$
\begin{pmatrix}
    1 & n & \frac{n(n-1)}{2} \\
    0 & 1 & n \\
    0 & 0 & 1 \\
\end{pmatrix}
$$

Q:

$$
A=
\begin{pmatrix}
    \lambda & 1 & 0 \\
    0 & \lambda & 1 \\
    0 & 0 & \lambda \\
\end{pmatrix},
A^n = ?
$$

A:

$$
\begin{pmatrix}
    \lambda^n & C^1_n\lambda^{n-1} & C^2_n\lambda^{n-2} \\
    0 & \lambda^n & C^1_n\lambda^{n-1} \\
    0 & 0 & \lambda^n
\end{pmatrix}
$$

Q:

$$
A=
\begin{pmatrix}
    1 & 2 \\
    3 & 4 \\
\end{pmatrix},
A^*=?
$$

A:

$$
\begin{pmatrix}
    4 & -2 \\
    -3 & 1 \\
\end{pmatrix}
$$

Q:

$$
A=
\begin{pmatrix}
    a & b \\
    c & d \\
\end{pmatrix},
A^*=?
$$

A:

$$
A=
\begin{pmatrix}
    d & -b \\
    -c & d \\
\end{pmatrix}
$$

Q: 2 阶矩阵求伴随矩阵

A: 主对角线对换，副对角线变号

Q:

$$
A=
\begin{pmatrix}
    1 & 2 & -1 \\
    2 & 4 & 2 \\
    0 & -1 & 3 \\
\end{pmatrix},
A^*=?
$$

A:

$$
A=
\begin{pmatrix}
    14 & -5 & 8 \\
    -6 & 3 & -4 \\
    -2 & 1 & 0 \\
\end{pmatrix}
$$

Q:

$$
A=
\begin{pmatrix}
    1 & 3 \\
    -1 & 2 \\
\end{pmatrix},
A^{-1}=?
$$

A:

$$
\frac{1}{5}
\begin{pmatrix}
    2 & -3 \\
    1 & 1 \\
\end{pmatrix}
$$

Q:

$$
A =
\begin{pmatrix}
    2 & 1 & 2 \\
    3 & 2 & 2 \\
    1 & 2 & 3 \\
\end{pmatrix},
A^{-1}=?
$$

A:

$$
\frac{1}{5}
\begin{pmatrix}
    2 & 1 & -2 \\
    -7 & 4 & 2 \\
    4 & -3 & 1 \\
\end{pmatrix}
$$

Q: $A^*=$

A: $|A|A^{-1}$

Q: $AA^*$

A: $|A|E$

Q:

$$
A^{-1}=
\begin{pmatrix}
    1 & 1 & 1 \\
    1 & 2 & -1 \\
    1 & 1 & 3 \\
\end{pmatrix},
(A^*)^{-1}=?
$$

A:

$$
\begin{pmatrix}
    7 & -2 & -3 \\
    -4 & 2 & 2 \\
    -1 & 0 & 1 \\
\end{pmatrix}
$$

Q:

$$
\begin{pmatrix}
    1 & 1 & 1 \\
    1 & 2 & -1 \\
    1 & 1 & 3 \\
\end{pmatrix},
(A^*)^{-1} = ?
$$

A:

$$
\frac{1}{2}
\begin{pmatrix}
    1 & 1 & 1 \\
    1 & 2 & -1 \\
    1 & 1 & 3 \\
\end{pmatrix}
$$

Q:

$$
A^2-3A-10E=O, A^{-1}=?,\ (A-4E)^{-1}=?
$$

A:

$$
A^{-1} = \frac{1}{10}(A-3E),
\ (A-4E)^{-1} = \frac{1}{6}(A+E)
$$

Q:

$$
A^m=O,(E-A)^{-1} = ?
$$

A:

$$
(E-A)^{-1} = E+A + A^2 + \cdots + A^{m-1}
$$

Q:

$$
A=\begin{pmatrix}
    1 & 1 & 1 \\
    1 & 1 & 1 \\
    1 & 1 & 1 \\
\end{pmatrix},
则 (E-A)^{-1} = E-\frac{1}{2}A吗
$$

A:正确

Q: $(A^{-1})^{-1}$

A: A

Q: $(kA)^*$

A: $k^{n-1}A^*$

Q: $(A+B)^T$

A: $A^T + B^T$

Q: $(AB)^T$

A: $B^TA^T$

Q: $(A^T)^*$

A: $(A^*)^T$

Q: $(AB)^{-1}$

A: $B^{-1}A^{-1}$

Q: $(kA)^{-1}$

A: $\frac{1}{k}A^{-1}$

Q:

$$
AA^{-1} = E,
(A+B)^2 = E,
(E + BA^{-1})^{-1}=?
$$

A:

$$
A(A+B)
$$

Q:

$$
\begin{cases}
    x_1 + 2x_2 + 3x_3 = 1 \\
    2x_1+ 2x_2 + 5x_3 = 2 \\
    3x_1+ 5x_2 + x_3 = 3 \\
\end{cases}
$$

A:

$$
\begin{cases}
    x_1 = 1 \\
    x_2 = 0 \\
    x_3 = 0 \\
\end{cases}
$$

Q: 矩阵可逆

A: 矩阵对应的行列式不为 0

Q:

$$
\begin{pmatrix}
    1 & 3 \\
    2 & 5 \\
\end{pmatrix}
X
\begin{pmatrix}
    1 & 0 \\
    -1 & 1 \\
\end{pmatrix}
=
\begin{pmatrix}
    3 & 4 \\
    5 & 6 \\
\end{pmatrix}
$$

A:

$$
\begin{pmatrix}
    -2 & -2 \\
    3 & 2 \\
\end{pmatrix}
$$

Q: $A^{-1}=$

A: $\frac{A^*}{|A|}$

Q:

$$
X\begin{pmatrix}
     1 & 1 & 1 \\
     0 & 1 & 1 \\
     0 & 0 & 1 \\
\end{pmatrix}
=\begin{pmatrix}
    1 & 2 & 3 \\
    4 & 5 & 6 \\
\end{pmatrix}
$$

A:

$$
\begin{pmatrix}
    1 & 1 & 1 \\
    4 & 1 & 1 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    3 & 2 & 3 \\
    1 & 0 & 0 \\
    -1 & 2 & 2 \\
\end{pmatrix},
B=\begin{pmatrix}
    5 & -1 & 0 \\
    -1 & 2 & 2 \\
    2 & 1 & -1 \\
\end{pmatrix},
AX+2E=X+B
$$

A:

$$
X = \begin{pmatrix}
    1 & -4 & 1 \\
    2 & -4 & -1 \\
    -1 & 5 & 0 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    0 & 0 & 0 \\
    0 & 0 & -1 \\
    0 & 0 & 0 \\
\end{pmatrix},
B=\begin{pmatrix}
    1 & 2 & 3 \\
    4 & 5 & 6 \\
    7 & 8 & 9 \\
\end{pmatrix},
AB=
$$

A:

$$
AB=\begin{pmatrix}
    0 & 0 & 0 \\
    -7 & -8 & -9 \\
    0 & 0 & 0 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    1 & 2 & 3 \\
    4 & 5 & 6 \\
    7 & 8 & 9 \\
\end{pmatrix},
B = \begin{pmatrix}
    0 & 0 & 0 \\
    0 & 0 & 1 \\
    0 & 1 & 0 \\
\end{pmatrix},
AB=
$$

A:

$$
AB=\begin{pmatrix}
    0 & 3 & 2 \\
    0 & 6 & 5 \\
    0 & 9 & 8 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    1 & 0 & 0 & 0 \\
    0 & 1 & 0 & 0 \\
    -1 & 1 & 2 & 0 \\
    2 & 3 & -1 & 3 \\
\end{pmatrix},
B=\begin{pmatrix}
    3 & 0 & 0 & 0 \\
    1 & 2 & 0 & 0 \\
    2 & -1 & 1 & 0 \\
    -1 & 3 & 0 & 1 \\
\end{pmatrix},
AB=
$$

A:

$$
AB=\begin{pmatrix}
    3 & 0 & 0 & 0 \\
    1 & 2 & 0 & 0 \\
    2 & 0 & 2 & 0 \\
    4 & 16 & -1 & 3 \\
\end{pmatrix}
$$

Q:

$$
A=\begin{pmatrix}
    3 & 1 & 0 & 0 \\
    0 & 3 & 0 & 0 \\
    0 & 0 & 3 & -1 \\
    0 & 0 & -9 & 3 \\
\end{pmatrix},

A^n
$$

A:

$$
A^n = \begin{pmatrix}
    3^n & C^1_n·3^{n-1} & 0 & 0 \\
    0 & 3^n & 0 & 0 \\
    0 & 0 & 3·6^{n-1} & -6^{n-1} \\
    0 & 0 & -9·6^{n-1} & 3·6^{n-1} \\
\end{pmatrix}
$$

Q:

$$
A= \begin{pmatrix}
    1 & 1 & 0 & 0 & 0 \\
    1 & 2 & 0 & 0 & 0 \\
    0 & 0 & 1 & 2 & 3 \\
    0 & 0 & 0 & 1 & 2 \\
    0 & 0 & 0 & 0 & 1 \\
\end{pmatrix}, A^{-1}
$$

A:

$$
A= \begin{pmatrix}
    2 & -1 & 0 & 0 & 0 \\
    -1 & 1 & 0 & 0 & 0 \\
    0 & 0 & 1 & -2 & 1 \\
    0 & 0 & 0 & 1 & -2 \\
    0 & 0 & 0 & 0 & 1 \\
\end{pmatrix}
$$
