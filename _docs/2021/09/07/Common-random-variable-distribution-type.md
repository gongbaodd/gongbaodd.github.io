---
type: post
category: book
tag:
  - math
series:
  name: 概率论
  slug: probability
---

# 常见的随机变量分布类型

二次分布$P\{X=k\}=C^k_np^k(1-p)^{n-k}$记为$X \sim B(n,p)$

泊松分布$P\{X=k\}=\frac{\lambda^k}{k!}e^{-\lambda}(k=0,1,\cdots;\lambda>0)$记为$X \sim P(\lambda)$

几何分布$P\{X=k\}=(1-p)^{k-1}p(k=1,2,\cdots;0<p<1)$记为$X \sim G(p)$

超几何分布$P\{X=k\}=\frac{C^k_MC^{n-k}_{N-M}}{C^n_N}(max\{0,n-N+M\} \le k \le min\{M,n\})$记为$X \sim H(n,N,M)$

均匀分布$U(a,b)$

$$
f(x)=\begin{cases}
    \frac{1}{b-a}, a<x<b \\
    0
\end{cases}
$$

$$
F(x)=\begin{cases}
    0, x < a \\
    \frac{x-a}{b-a}, a \le x < b\\
    1, x \ge b
\end{cases}
$$

指数分布

$$
f(x) = \begin{cases}
    \lambda e^{-\lambda x}, x>0 \\
    0
\end{cases}
$$

$$
F(x) = \begin{cases}
    1 - e^{-\lambda x}, x \ge 0 \\
    0, x<0
\end{cases}
$$

正态分布

$$
N(\mu,\sigma)
$$

$$
f(x)=\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{1}{2}(\frac{x-\mu}{\sigma})^2}(-\infty<x<+\infty)
$$

$$
N(0,1)
$$

$$
\phi(x)=\frac{1}{\sqrt{2\pi}}e^{-\frac{1}{2}x^2}
$$

$$
\Phi(x)=\frac{1}{\sqrt{2\pi}}\int^x_{-\infty}e^{-\frac{t^2}{2}}dt
$$

$$
\Phi(0) = 0.5
$$

$$
\Phi(-x) = 1 - \Phi(x)
$$
