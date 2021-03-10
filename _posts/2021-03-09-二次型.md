---
type: post
category: book
tag:
  - math
series:
  name: 线性代数
  slug: linear
---

# 二次型

Q:

$$
f(x_1,x_2,x_3)=x_1^2+3x_2^2-2x_3^2+8x_1x_2-10x_2x_3
$$

求二次型矩阵及其秩

A:

$$
A=\begin{pmatrix}
    1 & 4 & 0 \\
    4 & 3 & -5 \\
    0 & -5 & -2 \\
\end{pmatrix},r(A) = 3
$$

Q:

$$
f(x_1, x_2, x_3)=\mathbf{x}^T\begin{pmatrix}
    1 & 0 & 2 \\
    -2 & -3 & 2 \\
    0 & -8 & 0 \\
\end{pmatrix}\mathbf{x}
$$

求二次型矩阵及其秩

A:

$$
A=\begin{pmatrix}
    1 & -1 & 1 \\
    -1 & -3 & -3 \\
    1 & -3 & 0 \\
\end{pmatrix},r(A)=2
$$

Q:

$$
A=\begin{pmatrix}
    0 \\
    & 1 \\
    && 3 \\
\end{pmatrix}
$$

求此二次型的表达式及其正负惯性指数

A:

$$
f(x_1,x_2,x_3)=x_2^2+3x_3^2,p=2,q=0
$$

Q:

$$
f(x_1,x_2,x_3)=5x_1^2+5x_2^2+ax_3^2-2x_1x_2-6x_2x_3+6x_1x_3
$$

秩为 2，求 a，求正惯性指数 p

A: a=3,p=2

Q: 将二次型转换为标准型，写出正交变换

$$
f(x_1,x_2,x_3)=4x_2^2-3x_3^2+4x_1x_2-4x_1x_3+8x_2x_3
$$

A:

$$
Q=\begin{pmatrix}
  \frac{2}{\sqrt{5}} & \frac{1}{\sqrt{30}} & \frac{1}{\sqrt{6}} \\
  0 & \frac{5}{\sqrt{30}} & -\frac{1}{\sqrt{6}} \\
  -\frac{1}{\sqrt{5}} & \frac{2}{\sqrt{30}} & \frac{2}{\sqrt{6}}
\end{pmatrix},
(x_1,x_2,x_3)^T=Q(y_1,y_2,y_3)^T,
f(x_1,x_2,x_3)=y_1^2+6y_2^2-6y_3^2
$$

Q: 将二次型转换为标准型，写出正交变换

$$
f(x_1,x_2,x_3)=2x_1^2+2x_2^2+2x_3^2+2x_1x_2+2x_1x_3+2x_2x_3
$$

A:

$$
Q=\begin{pmatrix}
  \frac{1}{\sqrt{3}} & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}} \\
  \frac{1}{\sqrt{3}} & -\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}} \\
  \frac{1}{\sqrt{3}} & 0 & -\frac{2}{\sqrt{6}} \\
\end{pmatrix},x=Qy,
f(x_1,x_2,x_3)=4y_1^2+y_2^2+y_3^2
$$

Q:

$$
f=x_1^2+x_2^2+x_3^2+2ax_1x_2+2bx_2x_3+2x_1x_3,
x=Qy,
f=y_2^2+2y_3^2
$$

求 a，b 以及 Q

A:

$$
a=b=0,
Q=\begin{pmatrix}
  \frac{1}{\sqrt{2}} & 0 & \frac{1}{\sqrt{2}} \\
  0 & 1 & 0 \\
  -\frac{1}{\sqrt{2}} & 0 & \frac{1}{\sqrt{2}} \\
\end{pmatrix}
$$

Q: 用配方法转化二次型为标准型，并写出坐标转换

$$
f(x_1,x_2,x_3)=x_1^2+2x_2^2-x_3^2+4x_1x_2-4x_1x_3-4x_2x_3
$$

A:

$$
f(x_1,x_2,x_3)=y_1^2-2y_2^2-3y_3^2,
\begin{cases}
  x_1=y_1-2y_2 \\
  x_2=y_2+y_3 \\
  x_3=y_3 \\
\end{cases}
$$

Q:

化二次型为规范型

$$
f=x_1^2+5x_2^2-3x_3^2
$$

A:

$$
f=y_1^2+y_2^2-y_3^2,
\begin{cases}
  y_1= x_1 \\
  y_2=\sqrt{5}x_2 \\
  y_3=\sqrt{3}x_3 \\
\end{cases}
$$

Q:

$$
B=\begin{pmatrix}
  1 & 0 & 0 \\
  0 & 0 & 2 \\
  0 & 2 & 0 \\
\end{pmatrix}
$$

A 与 B 合同，求$x^TAx$的规范形

A: $y_1^2+y_2^2-y_3^2$

Q: 配方法公式

A: $x^2+ax+b=(x+\frac{1}{2}a)^2-(\frac{1}{2}a)^2+b$

Q: $f(x_1,x_2,x_3)=2x_1^2+5x_2^2+5x_3^2+4x_1x_2-4x_1x_3-8x_2x_3$是正定的

A: 正确

Q: $f(x_1,x_2,x_3)=x_1^2+4x_2^2+x_3^2+2tx_1x_2+10x_1x_3+6x_2x_3$正定，求 t

A: 对任何 t 值，二次型都不能正定

Q: A 是 n 阶正定矩阵，则$A^{-1}$是正定矩阵

A: 正确

Q: A 是 m\*n 矩阵,r(A)=n 则$A^TA$为正定矩阵

A: 正确

Q: A 是 m\*n 矩阵,r(A)=n 则$AA^T$为正定矩阵

A: 正确
