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

## 基本概念

- m*n 个数排列成 m 行 n 列的表格称为 m*n 矩阵
- m\*n 矩阵，m=n 时为 n 阶矩阵或 n 阶方阵
- 矩阵所有元素为 0，则是零矩阵记作 O
- $A = [a_{ij}]{m \times n}, B=[b_{ij}]_{s \times t}$其中 $m=s, n=t$，A 与 B 是同型矩阵
- $A = [a_{ij}]{m \times n}, B=[b_{ij}]_{m \times n}$对应的每个元素都相等，则 A=B
- n 阶方阵的行列式，记作|A|或者 detA

## 常见的矩阵

- 单位阵 E：主对角元素为 1，其余元素为 0
- 数量阵 kE：数 k 与单位阵 E 的积
- 对角阵，$diag[a_1, a_2, a_3, \ldots, a_n]$：非对角元素都是 0
- 上三角阵：矩阵只有右上角到主对角元素非零
- 下三角阵：矩阵只有左下角到主对角元素非零
- 对称阵：$A^T = A$
- 反对称阵： $A^T = -A, a_{ii}=0, a_{ij}=-a_{ji}$

## 伴随矩阵

矩阵 A 的行列式所有代数余子式构成的如下的矩阵，记作$A^*$

$$
\begin{pmatrix}
    A_{11} & A_{21} & \cdots &A_{n1} \\
    A_{12} & A_{22} & \cdots &A_{n2} \\
    \vdots & \vdots &        &\vdots \\
    A_{1n} & A_{2n} & \cdots &A_{nn} \\
\end{pmatrix}
$$

## 可逆矩阵

AB = BA= E，则 A 是可逆矩阵或非奇异矩阵，B 是 A 的逆矩阵，记作$A^{-1}=B$

## 初等变换、初等矩阵

- 初等倍乘：非零常数乘 A 的某一行或某一列
- 初等互换：互换 A 的某两行某两列
- 初等倍加：A 的某一行或者列的 k 倍加到另一行或者列

初等矩阵：单位矩阵经一次初等变换得到的矩阵

倍乘初等矩阵：记$E(i(k))$

$E(2(k))$表示单位阵第二行乘以 k.

互换初等矩阵：$E(i,j)$

$E(1,2)$表示单位阵 1，2 行互换

倍加初等矩阵：$E(ij(k))$

$E(13(k))$把单位阵的第一行的 k 倍加到第三行

行阶梯矩阵：所有零行在底部，每个非零行最左边的元素（主元）下面的元素为零。

行最简矩阵：行阶梯矩阵的非零行主元都是 1，且主元所在列的其它函数都为 0.

等价矩阵：矩阵 A 经过初等变换成矩阵 B，$A \cong B$

A 的等价标准形：$\begin{pmatrix} E_r & O \\ O & O \end{pmatrix}$

## 矩阵的秩

A 的 k 阶子式，从 A 中任取 k 行和 k 列按原来的顺序构成 k 阶行列式。

矩阵的秩，A 中的 r 阶子式不为 0，r 阶以上子式都为 0，则称 A 的秩为 r，记成 r(A)

- 零矩阵的秩为 0
- A 中非零子式的最高阶为 r，r(A) = r
- r(A)<\r, A 中每个 r 阶子式都为 0
- r(A)>=r, A 中有 r 阶子式不为 0

- r(A) = 0 恒等于 A = O
- A != O 恒等于 r(A) >= 1

## 重要定理

A 可逆，则 A 的逆矩阵唯一

A 可逆则|A|!=0，则$A=P_s\cdots P_2 P_1$，$P_i$为初等矩阵

克拉默法则：

$$
\begin{cases}
    a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1,\\
    a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2, \\
    \cdots \\
    a_{n1}x_1 + a_{n2}x_2 + \cdots + a_{nn}x_n = b_1,
\end{cases}
$$

齐次线性方程组的系数行列式$|A| \ne 0$，则方程组有唯一解且$x_i = \frac{|A_i|}{|A|}$， 其中$|A_i|$为第 i 列元素替换成常数项($b_1,b_2,\cdots,b_n$)

若常项都为 0，且$|A| \ne 0$，则齐次线性方程组有唯一零解。

若齐次线性方程组有非零解，则$|A| = 0$

## 公式、法则

### 同型矩阵加法

- A + B = B + A
- (A + B) + C = A + (B + C)
- A + O = A
- A + (-A) = O

### 数乘

- k(mA) = (km)A = m(kA)
- (k+m)A = kA + mA
- k(A + B) = kA + kB
- 1A = A
- 0A= O

### 乘法

- (AB)C = A(BC)
- A(B+C) = AB + AC
- (B + C)A = BA + CA

### 转置

- $(A+B)^T = A^T + B^T$
- $(kA)^T = kA^T$
- $(AB)^T = B^TA^T$
- $(A^T)^T = A$

### 伴随

- $AA^* = A^*A = |A|E$
- $(kA)^* = k^{n-1}A^*$
- $(A^*)^{-1}=(A^{-1})^*=\frac{A}{|A|}$
- $(A^T)^* = (A^*)^T$

### 可逆

- $(A^{-1})^{-1}=A$
- $(kA)^{-1} = \frac{1}{k}A^{-1}(k \ne 0)$
- $(AB)^{-1} = B^{-1}A^{-1}$
- $(A^T)^{-1}=(A^{-1})^T$
- $(A^n)^{-1}=(A^{-1})^n$

### 分块

B，C 为 m 阶和 n 阶矩阵，则

$$
\begin{pmatrix}
    B & O \\
    O & C \\
\end{pmatrix}^n
=
\begin{pmatrix}
    B^n & O \\
    O & C^n \\
\end{pmatrix}
$$

B，C 为 m 阶 n 阶可逆矩阵，则

$$
\begin{pmatrix}
    B & O \\
    O & C \\
\end{pmatrix}^{-1}
=
\begin{pmatrix}
    B^{-1} & O \\
    O & C^{-1} \\
\end{pmatrix}
$$

$$
\begin{pmatrix}
    O & B \\
    C & O \\
\end{pmatrix}^{-1}
=
\begin{pmatrix}
    O & C^{-1} \\
    B^{-1} & O \\
\end{pmatrix}
$$

A 是 mn 矩阵，B 是 ns 矩阵，且 AB=O 对 B 和 O 矩阵按列分块

$$
AB = A(B_1,B_2,\cdots,B_n) = (AB_1, AB_2, \cdots, AB_n) = (0, 0, \cdots, 0)
$$

即 B 的列向量是齐次方程组 Ax=0 的解

### 方阵行列式

- $|A^T|=|A|$
- $|kA| = k^n|A|$
- $|AB| = |A||B|$
- $|A^{-1}| = |A|^{-1}$
- $|A^*| = |A|^{n-1}$

### 秩

- $0 \le r(A_{m \times n}) \le min(m, n)$
- $r(A) = r(A^T)$
- $k \ne 0, r(kA)=r(A)$
- $r(A+B) \le r(A) + r(B)$
- $r(AB) \le min(r(A), r(B))$
- P、Q 可逆， $r(A)=r(PA)=r(AQ)=r(PAQ)$
- $max(r(A), r(B)) \le r(A,B) \le r(A)+r(B)$
- $r(A^TA) = r(A)$
- $r \begin{pmatrix} A & O \\ O & B \end{pmatrix} = r(A) + r(B)$
- $AB=O则r(A) + r(B) \le n$
