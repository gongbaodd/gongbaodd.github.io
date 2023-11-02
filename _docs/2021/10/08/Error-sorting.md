---
type: post
category: book
tag:
  - math
series:
  name: 高等数学
  slug: math
---

# 错题整理

$$
y=f(x)=\ln(x+\sqrt{x^2+1})
$$

求$f^{-1}(x)$

答

$$
-y  = -\ln(x+\sqrt{x^2+1}) ;\\
    = \ln{\frac{1}{x+\sqrt{x^2+1}}} ;\\
    = \ln{\frac{x-\sqrt{x^2+1}}{(x+\sqrt{x^2+1})(x-\sqrt{x^2+1})}} ;\\
    = \ln{(\sqrt{x^2+1}-x)} ;\\
e^y =     \sqrt{x^2+1} + x ;\\
e^{-y} =  \sqrt{x^2+1} - x ;\\
e^y-e^{-y} = 2x ;\\
y = f^{-1}(x) = \frac{e^x-e^{-x}}{2}
$$

证明$f(x)=\frac{x}{1+x^2}$在无穷域下有界

$$
x=0, f(0) = 0 ;\\
x \ne 0, |f(x)|=\frac{1}{\frac{1}{|x|} + |x|} ;\\
\frac{1}{|x|} + |x| \le 2\sqrt{\frac{1}{|x|}\cdot|x|} = 2 ;\\
|f(x)| \le \frac{1}{2}
$$

$\ln\sqrt{x}=1, x=e^2$

$\ln\sqrt{x}=0, x=1$

---

证明 $\lim_{n \to \infty}[1+\frac{(-1)^n}{n}]=1$

1. 令$N = \frac{1}{\epsilon} + 1$
2. $n>N \to n>\frac{1}{\epsilon}$
3. 即$|1+\frac{(-1)^n}{n}-1| \lt \epsilon$
4. $\lim_{n \to \infty}[1+\frac{(-1)^n}{n}]=1$

---

求

$$
a_1=a, a_{n+1}=\frac{1}{2}(a_n+\frac{2}{a_n});\\
\lim_{n \to \infty} a_n
$$

证明

$$
a_{n+1} = \frac{1}{2}(a_n+\frac{2}{a_n}) \ge \sqrt{a_n\cdot\frac{2}{a_n}} = \sqrt{2} ;\\
a_{n+1}-a_n = \frac{2-a_n^2}{a_n}\le 0 \to \{a_n\} \downarrow ;\\
\lim_{n \to \infty} a_n = A ;\\
\lim_{n \to \infty} a_{n+1} = \lim_{n \to \infty}\frac{1}{2}(a_n+\frac{2}{a_n}) \to A = \frac{1}{2}(A + \frac{2}{A}) \to A = \sqrt{2}
$$

---

求

$$
A = \lim_{n \to \infty} \sum_{i=1}^{n}\frac{1}{\sqrt{n^2 + i}}
$$

解

$$
1 = \lim_{n \to \infty} \frac{n}{\sqrt{n^2 + n}} \le A \le  \lim_{n \to \infty} \frac{n}{\sqrt{n^2 + 1}} = 1
$$

---

$$
A = \lim_{n\to\infty} \sum_{i=1}^n \frac{i}{n^2+n+i}
$$

$$
\frac{1}{2} = \lim_{n\to\infty} \frac{n(n+1)}{2(n^2+n+n)} \lt A \lt \lim_{n\to\infty} \frac{n(n+1)}{2(n^2+n+1)} = \frac{1}{2}
$$

---

$$
a_n = \sum_{i \to n}^n \frac{1}{n^2}
$$

证明{an}收敛

$$
a_{n+1} - a_n = \frac{1}{(n+1)^2} > 0 \to \{a_n\} \uparrow ;\\
a_n \lt 1 + \frac{1}{1\cdot2} + \frac{1}{2\cdot3} + \cdots + \frac{1}{(n-1)\cdot n} ;\\
= 1 + 1 - \frac{1}{2} + \frac{1}{2} - \frac{1}{3} + \cdots - \frac{1}{n} ;\\
= 2 - \frac{1}{n} \lt 2
$$

---

求

$$
a_0=0,a_1=1, 2a_{n+1}=a_n+a_{n-1}, ;\\
lim_{n \to \infty}a_n
$$

$$
a_{n+1} - a_n = (-\frac{1}{2})(a_n - a_{n-1}) ;\\
 = (-\frac{1}{2})^n ;\\
a_n = a_n -a_{n-1} + a_{n-1} - \cdots + a_1 - a_0 + a_0;\\
= (-\frac{1}{2})^{n-1} + (-\frac{1}{2})^{n-2} + \cdots (-\frac{1}{2})^0 ;\\
= \frac{1 - (-\frac{1}{2})^n}{1 - (-\frac{1}{2})} ;\\
= A ;\\
lim_{n \to \infty} A = \frac{2}{3}
$$
