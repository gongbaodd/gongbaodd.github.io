---
type: post
category: book
tag:
  - math
series:
  name: 概率论
  slug: probability
---

# 期望与方差

| 分布                  | 分布列或概率密度                                                                            | 期望(E)             | 方差(D)               |
| --------------------- | ------------------------------------------------------------------------------------------- | ------------------- | --------------------- |
| 0-1                   | $P\{X=k\}=p^k(1-p)^{1-k},k=0,1$                                                             | $p$                 | $p(1-p)$              |
| 二项 $B(n,p)$         | $P\{X=k\}=C^k_np^k(1-p)^{n-k},k=0,1,\cdots,n$                                               | $np$                | $np(1-p)$             |
| 泊松 $P(\lambda)$     | $P\{X=k\}=\frac{\lambda^k}{k!}e^{-\lambda},k=0,1$                                           | $\lambda$           | $\lambda$             |
| 几何$G(p)$            | $P\{X=k\}=(1-p)^{k-1}p,k=1,2,\cdots$                                                        | $\frac{1}{p}$       | $\frac{1-p}{p^2}$     |
| 正态$N(\mu,\sigma^2)$ | $f(x)=\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}, - \infty < x < + \infty$ | $\mu$               | $\sigma^2$            |
| 均匀$U(a,b)$          | $f(x)=\frac{1}{b-a}, a<x<b$                                                                 | $\frac{a+b}{2}$     | $\frac{(b-a)^2}{12}$  |
| 指数$E(\lambda)$      | $f(x)=\lambda e^{-\lambda x}, x>0$                                                          | $\frac{1}{\lambda}$ | $\frac{1}{\lambda^2}$ |

$Cov(X,Y)=E[(X-EX)(Y-EY)]=E(XY)-EX\cdot EY$

$\rho=\frac{Cov(X,Y)}{\sqrt{DX}\sqrt{DY}}$

$\rho_{XY}=0$ 则 XY 不相关

$\rho_{XY} \ne 0$ 则 XY 相关
