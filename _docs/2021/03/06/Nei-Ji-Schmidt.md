---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 内积施密特正交化

Q:

$$
\alpha=(1,0,-2)^T,\beta=(-4,2,3)^T,
\beta=k\alpha+\gamma
$$

alpha 和 gamma 正交，求 k 和 gamma

A:

$$
k=-2,\gamma=(-2,2,-1)
$$

Q:

$$
\begin{cases}
  \alpha_1=(1, 1, -1, 1)^T \\
  \alpha_2=(1, -1, -1, 1)^T \\
  \alpha_3=(2, 1, 1, 3)^T \\
\end{cases}
$$

求与他们都正交的单位向量

A:

$$
\pm\frac{1}{\sqrt{26}}(4,0,1,-3)
$$

Q:

$$
\begin{cases}
  \alpha_1=(1,1,1)^T \\
  \alpha_2=(1,2,1)^T \\
  \alpha_3=(0,-1,1)^T \\
\end{cases}
$$

施密特正交化

A:

$$
\begin{cases}
  \gamma_1=\frac{1}{\sqrt{3}}(1,1,1)^T \\
  \gamma_2=\frac{1}{\sqrt{6}}(1,-2,1)^T \\
  \gamma_3=\frac{1}{\sqrt{2}}(1,0,-1)^T \\
\end{cases}
$$

Q:

$$
\begin{cases}
  x_1 + x_2 - 3x_4 - x_5 = 0 \\
  x_1 - x_2 + 2x_3 - x_4 - x_5 = 0 \\
  x_1 + x_3 - 2x_4 - x_5 = 0 \\
\end{cases}
$$

求解空间的一个规范正交基

A:

$$
\begin{cases}
  \gamma_1 = \frac{1}{\sqrt{3}}(-1,1,1,0,0)^T \\
  \gamma_2 = \frac{1}{\sqrt{51}}(5,4,1,3,0)^T \\
  \gamma_3 = \frac{1}{\sqrt{340}}(3,-1,4,-5,17)^T \\
\end{cases}
$$

Q: A 是正交矩阵则 A\*也是正交矩阵

A: 正确

Q: A 是正交矩阵$AA^T$

A: E

Q: A 是正交矩阵$|A|$

A: $\pm1$
