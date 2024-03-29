---
type: post
category: book
tag:
  - math
series:
  name: 高等数学
  slug: math
---

# 高等数学必背知识

Q: 等差数列前 n 项和

A: $S_n=\frac{n}{2}[2a_1+(n-1)d]$

Q: 等比数列前 n 项和

A:

$$
S_n=\begin{cases}
    na_1, r=1 \\
    \frac{a_1(1-r^n)}{1-r}, r \ne 1
\end{cases}
$$

Q:
求

$$
\sum^n_{k=1}k
$$

A:

$$
\frac{n(n+1)}{2}
$$

Q:求

$$
\sum^n_{k=1}k^2
$$

A:

$$
\frac{n(n+1)(2n+1)}{6}
$$

Q:求

$$
\sum^n_{k=1}\frac{1}{k(k+1)}
$$

A:

$$
\frac{n}{n+1}
$$

Q:

$$
sin^2\alpha+cos^2\alpha
$$

A: 1

Q:

$$
1+tan^2\alpha
$$

A:

$$
sec^2\alpha=\frac{1}{cos^2\alpha}
$$

Q:

$$
1 + cot^2\alpha
$$

A:

$$
csc^2\alpha=\frac{1}{sin^2\alpha}
$$

---

$$
sin(\frac{\pi}{2}-\alpha)=cos\alpha
$$

$$
cos(\frac{\pi}{2}-\alpha)=sin\alpha
$$

$$
tan(\frac{\pi}{2}-\alpha)=cot\alpha
$$

$$
\cot(\frac{\pi}{2}-\alpha)=tan\alpha
$$

$$
sin(\frac{\pi}{2}+\alpha)=cos\alpha
$$

$$
cos(\frac{\pi}{2}+\alpha)=-sin\alpha
$$

$$
tan(\frac{\pi}{2}+\alpha)=-cot\alpha
$$

$$
cot(\frac{\pi}{2}+\alpha)=-tan\alpha
$$

$$
sin(\pi-\alpha)=sin\alpha
$$

$$
cos(\pi-\alpha)=-cos\alpha
$$

$$
tan(\pi-\alpha)=-tan\alpha
$$

$$
cot(\pi-\alpha)=-cot\alpha
$$

$$
sin(\frac{3}{2}\pi-\alpha)=-cos\alpha
$$

$$
sin(\frac{3}{2}\pi-\alpha)=-cos\alpha
$$

$$
cos(\frac{3}{2}\pi-\alpha)=-sin\alpha
$$

$$
tan(\frac{3}{2}\pi-\alpha)=cot\alpha
$$

$$
cot(\frac{3}{2}\pi-\alpha)=tan\alpha
$$

$$
sin(\frac{3}{2}\pi+\alpha)=-cos\alpha
$$

$$
cos(\frac{3}{2}\pi+\alpha)=sin\alpha
$$

$$
tan(\frac{3}{2}\pi+\alpha)=-cot\alpha
$$

$$
cot(\frac{3}{2}\pi+\alpha)=-tan\alpha
$$

$$
sin(2\pi-\alpha)=-sin\alpha
$$

$$
cos(2\pi-\alpha)=cos\alpha
$$

$$
tan(2\pi-\alpha)=-tan\alpha
$$

$$
cot(2\pi-\alpha)=-cot\alpha
$$

Q: 若 f(x)=f(2T-x)则

A: f(x)关于 T 对称

Q: 若 f(x)是可导偶函数则 f'(x)

A: f'(x)是奇函数

Q: 若 f(x)是可导奇函数，则 f'(x)

A: f'(x)是偶函数

Q: 若 f(x)是可导周期函数周期为 T,则 f'(x)的周期

A: T

Q: 连续的基函数原函数

A: 偶函数

Q: 连续偶函数的原函数

A: 只有一个基函数

Q: 连续偶函数周期为 T 且$\int_0^Tf(x)dx=0$则其一一切原函数周期为

A: T

Q: f(x)在有限区间(a,b)内可导，且 f'(x)有界，则 f(x)

A: 在(a,b)内有界

---

基本求导公式

$$
(x^\alpha)'=\alpha x^{\alpha-1}
$$

$$
(\alpha^x)'=\alpha^xln\ \alpha
$$

$$
(e^x)'=e^x
$$

$$
(log_\alpha x)'=\frac{1}{xln\ \alpha}
$$

$$
(lnx\ )'=\frac{1}{x}
$$

$$
(sin\ x)'= cos x
$$

$$
(cos\ x)' = -sinx
$$

$$
(arcsin\ x)' = \frac{1}{\sqrt{1-x^2}}
$$

$$
(arccos\ x)' = -\frac{1}{\sqrt{1-x^2}}
$$

$$
(tan\ x)'=sec^2\ x
$$

$$
(cot\ x)'=-csc^2\ x
$$

$$
(arctan\ x)'=\frac{1}{1+x^2}
$$

$$
(arccot\ x)'=-\frac{1}{1+x^2}
$$

$$
(sec\ x)'=sec\ xtan\ x
$$

$$
(csc\ x)'=-csc\ xcot\ x
$$

$$
[ln(x+\sqrt{x^2+1})]'=\frac{1}{\sqrt{x^2+1}}
$$

$$
[ln(x+\sqrt{x^2-1})]'=\frac{1}{\sqrt{x^2-1}}
$$

---

基本积分公式

$$
\int x^kdx=\frac{1}{k+1}x^{k+1}+C
$$

$$
\int \frac{1}{x^2}dx=-\frac{1}{x}+C
$$

$$
\int \frac{1}{\sqrt{x}}dx=2\sqrt{x}+C
$$

$$
\int \frac{1}{x}dx = ln|x| + C
$$

$$
\int e^x dx=e^x+C
$$

$$
\int a^x dx = \frac{a^x}{ln\ a}+C
$$

$$
\int sin\ xdx=-cos\ x + C
$$

$$
\int cos\ xdx = sin\ x + C
$$

$$
\int tan\ xdx = -ln |cos\ x|+C
$$

$$
\int cot\ x dx = ln |sin\ x|+C
$$

$$
\int sec\ xdx= ln |sec\ x + tan\ x| + C
$$

$$
\int csc\ x dx = ln |csc\ x -cot\ x| + C
$$

$$
\int sec^2 x dx=tan\ x+C
$$

$$
\int csc^2\ x dx =-cot\ x + C
$$

$$
\int sec\ xtan\ xdx = sec\ x+C
$$

$$
\int csc\ xcot\ xdx=-csc\ x+C
$$

$$
\int \frac{1}{1+x^2}dx=arctan\ x+C
$$

$$
\int \frac{1}{a^2+x^2}dx=\frac{1}{a}arctan\frac{x}{a}+C
$$

$$
\int \frac{1}{\sqrt{1-x^2}}dx=arcsin\ x+C
$$

$$
\int \frac{1}{\sqrt{a^2-x^2}}dx=arcsin\frac{1}{a}+C
$$

$$
\int \frac{1}{\sqrt{x^2+a^2}}dx=ln(x+\sqrt{x^2+a^2}) + C
$$

$$
\int \frac{1}{\sqrt{x^2-a^2}}dx=ln|x+\sqrt{x^2-a^2}|+C
$$

$$
\int \frac{1}{x^2-a^2}dx=\frac{1}{2a}ln|\frac{x-a}{x+a}|+C
$$

$$
\int \frac{1}{a^2-x^2}dx=\frac{1}{2a}ln|\frac{x+a}{x-a}|+C
$$

$$
\int \sqrt{a^2-x^2} dx = \frac{a^2}{2} arcsin \frac{x}{a} + \frac{x}{2}\sqrt{a^2-x^2} + C
$$

$$
\int sin^2\ x dx = \frac{x}{2} - \frac{sin\ 2x}{4} + C(sin^2x=\frac{1-cos\ 2x}{2})
$$

$$
\int cos^2\ x dx = \frac{x}{2} + \frac{sin\ 2x}{4} + C(cos^2x=\frac{1-+cos\ 2x}{2})
$$

$$
\int tan^2 x dx = tan\ x-x+C(tan^2x=sec^2x-1)
$$

$$
\int cot^2 x dx = -cot\ x-x+C(cot^2x=csc^2x-1)
$$

---

$$
sin\ 0 = 0
$$

$$
\sin\frac{\pi}{6} = \frac{1}{2}
$$

$$
\sin\frac{\pi}{4} = \frac{\sqrt{2}}{2}
$$

$$
\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}
$$

$$
\sin\frac{\pi}{2} = 1
$$

$$
\sin\ \pi = 0
$$

$$
\sin\frac{3\pi}{2} = -1
$$

$$
\sin\ 2\pi = 0
$$

$$
cos\ 0 = 1
$$

$$
cos\frac{\pi}{6} = \frac{\sqrt{3}}{2}
$$

$$
cos\frac{\pi}{4} = \frac{\sqrt{2}}{2}
$$

$$
cos\frac{\pi}{3} = \frac{1}{2}
$$

$$
cos\frac{\pi}{2} = 0
$$

$$
cos\ \pi = -1
$$

$$
cos \frac{3\pi}{2} = 0
$$

$$
\cos2\pi = 1
$$

$$
\tan\ 0 = 0
$$

$$
\tan\frac{\pi}{6} = \frac{\sqrt{3}}{3}
$$

$$
\tan\frac{\pi}{4} = 1
$$

$$
\tan\frac{\pi}{3} = \sqrt{3}
$$

$$
\lim_{x \to \infty}\tan x = \infty
$$

$$
\tan\pi = 0
$$

$$
\lim_{x \to \frac{3\pi}{2}} \tan x = \infty
$$

$$
\tan 2\pi = 0
$$

$$
\lim_{x \to 0} \cot x = \infty
$$

$$
\cot \frac{\pi}{6} = \sqrt{3}
$$

$$
\cot\frac{\pi}{4} = 1
$$

$$
\cot\frac{\pi}{3} = \frac{\sqrt{3}}{3}
$$

$$
\cot\frac{\pi}{2} = 0
$$

$$
\lim_{x \to \pi} \cot x = \infty
$$

$$
\cot\frac{3\pi}{2} = 0
$$

$$
\lim_{x \to 2\pi}\cot x = \infty
$$

$$
\arcsin x + \arccos x = \frac{\pi}{2}
$$

$$
\arcsin 0 = 0
$$

$$
\arcsin\frac{1}{2} = \frac{\pi}{6}
$$

$$
\arcsin\frac{\sqrt{2}}{2} = \frac{\pi}{4}
$$

$$
\arcsin\frac{\sqrt{3}}{2} = \frac{\pi}{3}
$$

$$
\arcsin 1 = \frac{\pi}{2}
$$

$$
\arccos 1 = 0
$$

$$
\arccos\frac{\sqrt{3}}{2} = \frac{\pi}{6}
$$

$$
\arccos\frac{\sqrt{2}}{2} = \frac{\pi}{4}
$$

$$
\arccos\frac{1}{2} = \frac{\pi}{3}
$$

$$
\arccos 0 = \frac{\pi}{2}
$$

$$
\arctan x + \textrm{arccot} x = \frac{\pi}{2}
$$

$$
\arctan 0 = 0
$$

$$
\arctan\frac{\sqrt{3}}{3} = \frac{\pi}{6}
$$

$$
\arctan 1 = \frac{\pi}{4}
$$

$$
\arctan\sqrt{3} = \frac{\pi}{3}
$$

$$
\textrm{arccot} 0 = \frac{\pi}{2}
$$

$$
\textrm{arccot}\sqrt{3} = \frac{\pi}{6}
$$

$$
\textrm{arccot}1 = \frac{\pi}{4}
$$

$$
\textrm{arccot}\frac{\sqrt{3}}{3} = \frac{\pi}{3}
$$

$$
\lim_{x \to -\infty}\arctan x = -\frac{\pi}{2}
$$

$$
\lim_{x \to +\infty}\arctan x = \frac{\pi}{2}
$$

$$
\lim_{x \to -\infty}\textrm{arccot}x = \pi
$$

$$
\lim_{x \to +\infty}\textrm{arccot}x = 0
$$
