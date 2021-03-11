---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 线性空间与线性变换

Q: 若 V 是在数域 F 上的线性空间，则满足

A:

$$
\begin{cases}
    \alpha+\beta=\beta+\alpha \\
    (\alpha+\beta)+\gamma=\alpha+(\beta+\gamma) \\
    \alpha+0=\alpha \\
    \alpha+(-\alpha) = 0 \\
    1\alpha=\alpha \\
    k(l\alpha)=(kl)\alpha \\
    k(\alpha+\beta) = k\alpha + k\beta \\
    (k+l)\alpha = k\alpha + l\alpha \\
\end{cases}
$$

Q: 二次多项式，对于多项式的加法和数乘，构成实数域上的线性空间

A: 错误

Q: 线性方程组的解的全体向量，对于向量的加法和乘法构成实数域上的线性空间

$$
\begin{cases}
    x_1+2x_2-x_3=1\\
    x_2+x_3=3\\
\end{cases}
$$

A: 错误

Q: 如下二阶矩阵对于矩阵的加法和数乘构成实数域的线性空间

$$
\begin{pmatrix}
    a & b \\
    c & d \\
\end{pmatrix},a \ge d
$$

A: 错误

Q: 主对角线上的元素之和为 0 的 2 阶矩阵集合 M 对于矩阵加法和数乘构成一个线性空间

A: 正确

Q: 下列变换构成 3 维向量空间上的线性变换

$$
\sigma\begin{pmatrix}
    x \\
    y \\
    z \\
\end{pmatrix}=\begin{pmatrix}
    x+y \\
    2z \\
    x \\
\end{pmatrix}
$$

A: 正确

Q:

$$
\sigma(\alpha)=\alpha_0,\alpha \in V
$$

$\alpha_0$是一个属于 V 的固定向量，变换是 V 上的线性变换

A: 错误

Q:

$$
\sigma(A)=A^*,\forall A \in M_2(R)
$$

构成线性变换

A: 正确

Q:

$$
\sigma\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix}
    xy \\ x-y
\end{pmatrix}
$$

构成线性变换

A: 错误

Q:

$$
\begin{cases}
    \sigma\begin{pmatrix} 1 \\ 1 \end{pmatrix}=\begin{pmatrix} 2 \\ 1 \end{pmatrix}\\
    \sigma\begin{pmatrix} -1 \\ 1 \end{pmatrix}=\begin{pmatrix} 6 \\ 3 \end{pmatrix}
\end{cases}
\begin{cases}
    \sigma\begin{pmatrix} 1 \\ 0 \end{pmatrix} \\
    \sigma\begin{pmatrix} 0 \\ 1 \end{pmatrix} \\
\end{cases}
$$

求后面两个变换的值

A:

$$
\begin{cases}
    \sigma\begin{pmatrix}
        1 \\ 0
    \end{pmatrix}=\begin{pmatrix}
        -2 \\ -1
    \end{pmatrix} \\
    \sigma\begin{pmatrix}
        0 \\ 1
    \end{pmatrix}=\begin{pmatrix}
        4 \\ 2
    \end{pmatrix} \\
\end{cases}
$$

Q:

$$
\begin{cases}
    x_1+x_2-2x_4=0 \\
    x_2+x_3 = 0 \\
\end{cases}
$$

求解向量构成的 S 空间的维数以及一组基

A: 2 维$(1,-1,1,0)^T,(2,0,0,1)^T$

Q: 求实数域上二阶对称矩阵所构成的线性空间的维度和一组基

A: 3 维

$$
\begin{pmatrix}
    1 & 0 \\
    0 & 0 \\
\end{pmatrix},
\begin{pmatrix}
    0 & 1 \\
    1 & 0 \\
\end{pmatrix},
\begin{pmatrix}
    0 & 0 \\
    0 & 1 \\
\end{pmatrix}
$$

Q: 求次数小于 3 的多项式构成的所构成的线性空间的维度以及基

A: 3 维$1,x,x^2$

Q:

$$
A=\begin{pmatrix}
    0 & 1 & -1 & 0 \\
    0 & -2 & 2 & 0 \\
\end{pmatrix}
$$

与 A 的行向量正交的向量集合 V 构成一个线性空间，求 V 的维数和基

A: 3 维

$$
(1,0,0,0),(0,1,1,0),(0,0,0,1)
$$

Q:

$$
\beta_1=\alpha_1+2\alpha_2+\alpha_3,
\beta_2=2\alpha_1+3\alpha_2+3\alpha_3,
\beta_3=3\alpha_1+7\alpha_2-\alpha_3
$$

alpha 和 beta 分别是 V 的两组基，求 alpha 到 beta 的过度向量

A:

$$
C=\begin{pmatrix}
    1 & 2 & 3 \\
    2 & 3 & 7 \\
    1 & 3 & -1 \\
\end{pmatrix}
$$

Q:

$$
f_1=1+x+x^2,
f_2=1+x+2x^2,
f_3=1+2x+3x^2
$$

是次数小于 3 的多项式空间 P 的基

A: 正确

Q:

$$
f_1=1+x+x^2,
f_2=1+x+2x^2,
f_3=1+2x+3x^2
$$

是次数小于 3 的多项式空间 P 的基，求坐标

$$f=6+9x+14x^2$$

A: $(1,2,3)^T$

Q:

$$
\sigma\begin{pmatrix}
    x \\ y \\ z
\end{pmatrix} = \begin{pmatrix}
    x+y \\ x-y \\ z
\end{pmatrix},
\alpha_1=\begin{pmatrix}
    1 \\ 0 \\ 0
\end{pmatrix},
\alpha_2=\begin{pmatrix}
    1 \\ 1 \\ 0
\end{pmatrix},
\alpha_3=\begin{pmatrix}
    1 \\ 1 \\ 1
\end{pmatrix},
$$

求$\sigma$在$\alpha_1,\alpha_2,\alpha_3$下对应的矩阵

A:

$$
A=\begin{pmatrix}
     0 & 2 & 2 \\
     1 & 0 & -1 \\
     0 & 0 & 1 \\
\end{pmatrix}
$$

Q:

$$
\sigma(A)=A^*
$$

是 2 阶矩阵构成的线性空间的变换，求在以下基下对应的矩阵

$$
E_{11}=\begin{pmatrix}
    1 & 0 \\
    0 & 0 \\
\end{pmatrix},
E_{12}=\begin{pmatrix}
    0 & 1 \\
    0 & 0 \\
\end{pmatrix},
E_{13}=\begin{pmatrix}
    0 & 0 \\
    1 & 0 \\
\end{pmatrix},
E_{14}=\begin{pmatrix}
    0 & 0 \\
    0 & 1 \\
\end{pmatrix},
$$

A:

$$
A=\begin{pmatrix}
    0 & 0 & 0 & 1 \\
    0 & -1 & 0 & 0 \\
    0 & 0 & -1 & 0 \\
    1 & 0 & 0 & 0 \\
\end{pmatrix}
$$

Q:

$$
\alpha_1=\begin{pmatrix}
    -1 \\ 0 \\ 2
\end{pmatrix},
\alpha_2=\begin{pmatrix}
    0 \\ 1 \\ 1
\end{pmatrix},
\alpha_3=\begin{pmatrix}
    3 \\ -1 \\ 0
\end{pmatrix},
\sigma(\alpha_1) = \begin{pmatrix}
    -5 \\ 0 \\ 3
\end{pmatrix},
\sigma(\alpha_2) = \begin{pmatrix}
    0 \\ -1 \\ 6
\end{pmatrix},
\sigma(\alpha_3) = \begin{pmatrix}
    -5 \\ -1 \\ 9
\end{pmatrix},
$$

求线性变换在$\alpha_i$下的矩阵

A:

$$
A=\begin{pmatrix}
    2 & 3 & 5 \\
    -1 & 0 & -1 \\
    -1 & 1 & 0 \\
\end{pmatrix}
$$

Q:

$$
\sigma\begin{pmatrix}
    x_1 \\ x_2 \\ x_3
\end{pmatrix}=\begin{pmatrix}
    x_1+x_2+x_3 \\
    -x_1-2x_3 \\
    x_2-x_3
\end{pmatrix}
$$

求$Im\sigma$和$Ker\sigma$

A:

象空间$Im\sigma$是二维空间,它的基是

$$
\begin{pmatrix}
    1 \\ -1 \\ 0
\end{pmatrix}
\begin{pmatrix}
    1 \\ 0 \\ 1
\end{pmatrix}
$$

核空间$Ker \sigma$是一维空间，它的基是

$$
\begin{pmatrix}
    -2 \\ 1 \\ 1
\end{pmatrix}
$$
