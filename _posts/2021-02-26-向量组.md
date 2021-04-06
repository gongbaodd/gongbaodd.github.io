---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 向量组

Q:

$$
\alpha_1=(1,2,2)^T,\alpha_2=(2,-2,1)^T,\alpha=(0, 6, 3)^T
$$

$\alpha$是$\alpha_1$、$\alpha_2$的线性组合

A:

正确

Q:

$$
\alpha_1=(1,2,2)^T,\alpha_2=(2,-2,1)^T,\alpha=(2,1,-2)^T
$$

$\alpha$是$\alpha_1$、$\alpha_2$的线性组合

A:

错误

Q:

$$
A=\begin{pmatrix}
    1 & 2 & -1 \\
    2 & 3 & 4 \\
    3 & 5 & 3 \\
\end{pmatrix},
\beta=\begin{pmatrix}
    2 \\ 9 \\ 11 \\
\end{pmatrix}
$$

$\beta$能否用 A 的列向量线性表示

A:

$$
\beta = \alpha_1 + \alpha_2 + \alpha_3
$$

Q:

$$
A=\begin{pmatrix}
    1 & 2 & -1 \\
    2 & 3 & 4 \\
    3 & 5 & 3 \\
\end{pmatrix},
\beta=\begin{pmatrix}
    2 \\ 9 \\ 11 \\
\end{pmatrix}
$$

$\beta^T$能否用 A 的行向量线性表示

A:

不能

Q:

$$
\alpha_1=(1,2,3)^T,
\alpha_2=(1,3,4)^T,
\alpha_3=(2,-1,1)^T,
\beta=(2,5,a+3)^T,
$$

求 a 使得$\beta$可由$\alpha_1,\alpha_2,\alpha_3$线性表示，并写出表达式。

A:

$$
a=4,\beta = (1-7t)\alpha_1+(1+5t)\alpha_2+t\alpha_3
$$

Q:

$\alpha$可由$\beta_1,\beta_2$线性表示，$\beta_1,\beta_2$可由$\gamma_1,\gamma_2,\gamma_3$线性表示，证明$\alpha$可由$\gamma_1,\gamma_2,\gamma_3$线性表示

A:

$$
\alpha = (b_1c_{11} + b_2c_{12})\gamma_1
+ (b_1c_{21}+b_2c_{22})\gamma_2
+ (b_1c_{31} + b_2c_{32})\gamma_3
$$

Q:

$$
(\alpha_1, \alpha_2, \alpha_3)=\begin{pmatrix}
    1 & 1 & 1 \\
    0 & 1 & -1 \\
    2 & 3 & 1 \\
\end{pmatrix},
(\beta_1,\beta_2,\beta_3)=\begin{pmatrix}
    1 & 2 & 2 \\
    2 & 1 & 1 \\
    2 & 5 & 3 \\
\end{pmatrix}
$$

$(\alpha_1, \alpha_2, \alpha_3)$可由$(\beta_1,\beta_2,\beta_3)$线性表示。

A:正确

Q:

$$
(\alpha_1, \alpha_2, \alpha_3)=\begin{pmatrix}
    1 & 1 & 1 \\
    0 & 1 & -1 \\
    2 & 3 & 1 \\
\end{pmatrix},
(\beta_1,\beta_2,\beta_3)=\begin{pmatrix}
    1 & 2 & 2 \\
    2 & 1 & 1 \\
    2 & 5 & 3 \\
\end{pmatrix}
$$

$(\alpha_1, \alpha_2, \alpha_3)$可线性表示$(\beta_1,\beta_2,\beta_3)$。

A:错误

Q:

$\beta$能由$\alpha_1,\alpha_2\cdots\alpha_s$线性表示，但不能由$\alpha_1,\alpha_2\cdots\alpha_{s-1}$线性表示，$\alpha_s$能由$\beta,\alpha_1,\alpha_2\cdots\alpha_{s-1}$线性表示

A:

正确

Q:

$$
\begin{pmatrix}
    \alpha_1 \\
    \alpha_2 \\
    \alpha_3 \\
\end{pmatrix}=\begin{pmatrix}
    1 & 2 & 3 \\
    3 & 1 & 2 \\
    0 & 0 & 0 \\
\end{pmatrix}
$$

线性相关

A: 正确

Q:

$$
\begin{pmatrix}
    \alpha_1 \\
    \alpha_2 \\
    \alpha_3 \\
\end{pmatrix}=\begin{pmatrix}
    1 & 2 & 3 \\
    3 & 1 & 2 \\
    2 & 4 & 6 \\
\end{pmatrix}
$$

线性相关

A: 正确

Q:

$$
\begin{pmatrix}
    \alpha_1 \\
    \alpha_2 \\
    \alpha_3 \\
\end{pmatrix}=\begin{pmatrix}
    1 & 2 & 3 \\
    3 & 1 & 2 \\
    2 & -1 & -1 \\
\end{pmatrix}
$$

线性相关

A:正确

Q:

$\alpha_1,\alpha_2,\cdots,\alpha_s$线性相关，存在全不为零的常数$k_1,k_2,\cdots,k_s$使得等式$k_1\alpha_1+k_2\alpha_2+\cdots+k_s\alpha_s=0$

A: 错误

Q:

$\alpha_1,\alpha_2,\cdots,\alpha_s$线性相关，任意一组常数$k_1,k_2,\cdots,k_s$使得等式$k_1\alpha_1+k_2\alpha_2+\cdots+k_s\alpha_s=0$

A: 错误

Q:

$\alpha_1,\alpha_2,\cdots,\alpha_s$线性相关，唯一一组不全为零的常数$k_1,k_2,\cdots,k_s$使得等式$k_1\alpha_1+k_2\alpha_2+\cdots+k_s\alpha_s=0$

A: 错误

Q:

$\alpha_1,\alpha_2$线性相关，
$\beta_1\beta_2$线性相关，则
$\alpha_1+\beta_1,\alpha_2+\beta_2$线性相关

A: 错误

Q:

$\alpha_s$不能由$\alpha_1,\alpha_2,\cdots,\alpha_{s-1}$线性表示，则$\alpha_1,\alpha_2,\cdots,\alpha_{s-1},\alpha_s$是线性无关的

A: 错误

Q: 向量组线性相关，它的任意一部分也线性相关

A: 错误

Q: 向量组线性无关，它的任意部分也线性无关

A: 正确

Q: $\alpha_1,\alpha_2,\cdots,\alpha_s$线性无关，那么$\alpha1+\alpha_2,\alpha_2+\alpha_3,\cdots,\alpha_{s-1}+\alpha_s,\alpha_s+\alpha_1$线性无关

A: 错误

Q: 向量组线性相关，与其等价的向量组也线性相关

A: 错误

Q: 一个向量组与它的极大线性无关组总是等价的

A: 正确

Q: $r(A) = r(A^T)$

A: 正确

Q: $r(A+B) \le r(A) + r(B)$

A: 正确

Q: $r(AB) \le min(r(A), r(B))$

A: 正确

Q: P 可逆，r(A)=r(PA)

A: 正确

Q: P 可逆，r(A)=r(AP)

A: 正确

Q: 向量组线性无关的充要条件是去掉任意一个向量所剩的向量都线性无关

A: 错误

Q: 向量组线性无关的充要条件是取出 n 个向量都线性无关

A: 错误

Q: 向量组线性无关的充要条件是存在不全为 0 的$k_1,k_2,\cdots,k_s$使得$k_1\alpha_1+k_2\alpha_2+\cdots+k_s\alpha_s\ne0$

A: 错误

Q: 向量组线性无关的充要条件是任意不全为 0 的$k_1,k_2,\cdots,k_s$使得$k_1\alpha_1+k_2\alpha_2+\cdots+k_s\alpha_s\ne0$

A: 正确

Q:

$$
(\alpha_1,\alpha_2,\alpha_3)=\begin{pmatrix}
    1 & 1 & 1 \\
    1 & 2 & 3 \\
    1 & 3 & 6 \\
\end{pmatrix}
$$

线性相关

A: 错误

Q:

$$
(\alpha_1,\alpha_2,\alpha_3)=\begin{pmatrix}
    1 & 2 & 1 \\
    2 & 3 & -1 \\
    -1 & 5 & 20 \\
\end{pmatrix}
$$

线性相关

A: 正确

Q: 向量组线性相关的充要条件是其组成的行列式值为零

A: 正确

Q:

$$
(\alpha_1,\alpha_2,\alpha_3)=\begin{pmatrix}
    1 & 3 & 0 \\
    1 & t & 2 \\
    2 & 1 & -t \\
\end{pmatrix}
$$

线性相关求 t

A:

t=5,t=-2

Q:

向量组线性无关，则$\alpha_1-\alpha_2,\alpha_2-\alpha_3,\alpha_3-\alpha_4,\alpha_4-\alpha_1$线性无关

A: 错误

Q:

向量组线性无关，则$\alpha_1+\alpha_2,\alpha_2+\alpha_3,\alpha_3+\alpha_4,\alpha_4+\alpha_1$线性无关

A: 错误

Q:

向量组线性无关，则$\alpha_1+\alpha_2,\alpha_2-\alpha_3,\alpha_3-\alpha_4,\alpha_4+\alpha_1$线性无关

A: 错误

Q:

向量组线性无关，则$\alpha_1+\alpha_2,\alpha_2+\alpha_3,\alpha_3-\alpha_4,\alpha_4+\alpha_1$线性无关

A: 正确

Q:

向量组线性无关，则$\alpha_1+\alpha_2,\alpha_2+\alpha_3,\alpha_3-\alpha_1$线性无关

A: 错误

Q:

向量组线性无关，则$\alpha_1+\alpha_2,\alpha_2+\alpha_3,\alpha_3+\alpha_1$线性无关

A: 正确

Q:

向量组线性无关，则$\alpha_1+2\alpha_2,3\alpha_1+5\alpha_2,-\alpha_1-8\alpha_2$线性无关

A: 错误

Q:

向量组线性无关，则$\alpha_1+alpha_2,3\alpha_2+2\alpha_3,\alpha_1-2\alpha_2+\alpha_3$线性无关

A: 正确

Q: 向量组线性无关，则$\alpha_1+l_1\alpha_4,\alpha_2+l_2\alpha_4,\alpha_3+l_3\alpha_4$线性无关

A: 正确

Q: 向量组线性无关，A 为 n 维可逆矩阵，则$A\alpha_1,A\alpha_2,\cdots,A\alpha_s$线性无关

A: 正确

Q:

$$
(\beta_1,\beta_2,\cdots,\beta_s)=(\alpha_1,\alpha_2,\cdots,\alpha_s)C
$$

C 是 s\*r 矩阵，A 向量组线性无关，若 B 向量组线性无关则 r(C)=r。

A: 正确

Q: $\alpha_1,\alpha_2,\cdots,\alpha_n$线性无关的充要条件是它们能表示任意向量。

A: 正确

Q: 向量组的秩为 r，则其中有任意 r-1 向量线性无关。

A: 错误

Q: 向量组的秩为 r，则其中有任意 r 向量线性无关。

A: 错误

Q: 向量组的秩为 r，则其中有任意 r+1 向量线性相关。

A: 正确

Q: 向量组的秩为 r，则其中有任意 r+1 向量线性无关。

A: 错误

Q:

$$
r(\alpha_1,\alpha_2,\alpha_3,\alpha_4,\alpha_5)=3,
\alpha_1+2\alpha_3-3\alpha_5=0,
\alpha_2 = 2 \alpha_4,
$$

向量组的极大无关组

$$
\begin{cases}
A. \alpha_1,\alpha_3,\alpha_5 \\
B. \alpha_1,\alpha_2,\alpha_3 \\
C. \alpha_2,\alpha_4,\alpha_5 \\
D. \alpha_1,\alpha_2,\alpha_4 \\
\end{cases}
$$

A: B

Q:

$$
(\alpha_1,\alpha_2,\alpha_3)=\begin{pmatrix}
    1 & 1 & t \\
    1 & t & 1 \\
    t & 1 & 1 \\
\end{pmatrix}
$$

向量组秩为 2，求 t

A: t=-2

Q:

$$
(\alpha_1,\alpha_2,\alpha_3)=\begin{pmatrix}
    1 & 1 & 2 \\
    0 & 2 & 1 \\
    2 & 0 & 3 \\
    1 & 1 & 2 \\
\end{pmatrix}
$$

求秩和极大线性无关组

A: r=2, $\alpha_1,\alpha_2$是其一个极大线性无关组。

Q:

$$
(\alpha_1,\alpha_2,\alpha_3,\alpha_4,\alpha_5)=\begin{pmatrix}
    1 & 2 & 0 & 2 & 5 \\
    -2 & -5 & 1 & -1 & -8 \\
    0 & -3 & 3 & 4 & 1 \\
    3 & 6 & 0 & -7 & 2 \\
\end{pmatrix}
$$

求秩，极大线性无关组和其它向量的线性组合。

A:

$$
r=3,(\alpha_1,\alpha_2,\alpha_4),
\alpha_3=2\alpha_1-\alpha_2,
\alpha_5 = \alpha_1 + \alpha_2 + \alpha_4
$$

Q:

$$
(\alpha_1, \alpha_2, \alpha_3)=\begin{pmatrix}
    1 & 1 & 5 \\
    1 & 3 & 3 \\
    0 & -1 & t \\
\end{pmatrix}
$$

求其线性相关性

A:

$$
\begin{cases}
    线性相关, t=1 \\
    线性无关, t\ne 1 \\
\end{cases}
$$

Q:

$$
\begin{cases}
    A. a+b,a+c,c-a \\
    B. a+b,b+C,a+2b+c \\
    C. a+2b, 2b+3c, 3c+a \\
    D. a+b+c, 2a-3b+22c,3a+5b-5c \\
\end{cases}
$$

a,b,c 线性无关,以上线性无关的相是

A: C

Q:

$$
(\lambda_1 + k_1)\alpha_1 + \cdots +
(\lambda_m+k_m)\alpha_m +
(\lambda_1 - k_1)\beta_1 + \cdots +
(\lambda_m - k_m)\beta_m = 0
$$

- A. $(\alpha_1,\cdots,\alpha_m,\beta_1,\cdots,\beta_m)$ 线性相关
- B. $(\alpha_1,\cdots,\alpha_m,\beta_1,\cdots,\beta_m)$ 线性无关
- C. $(\alpha_1+\beta_1, \cdots, \alpha_m+\beta_m, \alpha_1-\beta_1, \cdots, \alpha_m-\beta_m)$ 线性无关
- D. $(\alpha_1+\beta_1, \cdots, \alpha_m+\beta_m, \alpha_1-\beta_1, \cdots, \alpha_m-\beta_m)$ 线性相关

A: D

Q:

$$
\begin{pmatrix}
    \alpha_1 \\
    \alpha_2 \\
    \alpha_3 \\
    \alpha_4 \\
    \alpha_5 \\
\end{pmatrix}=
\begin{pmatrix}
    1 & -1 & 2 & 4\\
    0 & 3 & 1 & 2\\
    3 & 0 & 7 & 14 \\
    1 & -2 & 2 & 0 \\
    2 & 1 & 5 & 10 \\
\end{pmatrix}
$$

求极大线性无关组和其它向量

A:

$$
(\alpha_1,\alpha_2,\alpha_4),
\alpha_3=3\alpha_1+\alpha_2,
\alpha_5=2\alpha_2+\alpha_2
$$

Q:

$(\alpha,\beta,\gamma)$线性无关,
$(\alpha, \beta, \delta)$线性相关,

- A. $\alpha$必可由$\beta,\gamma,\delta$线性表示
- B. $\beta$必不可由$\alpha,\gamma,\delta$线性表示
- C. $\delta$必可由$\alpha,\beta,\gamma$线性表示
- D. $\delta$必不可由$\alpha,\beta,\gamma$线性表示

A: C

Q: A 是 n*m 矩阵，B 是 m*n 其中 n<m，E 是 n 阶单位矩阵，若 AB=E，B 的列向量线性无关

A: 正确
