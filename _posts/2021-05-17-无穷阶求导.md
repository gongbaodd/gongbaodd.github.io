---
type: post
category: book
tag:
  - math
series:
  name: 高等数学
  slug: math
---

# 无穷阶求导

## 泰勒展开式

$$
e^x = \sum^\infty_{n=0}\frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \cdots
$$

$$
\frac{1}{x+1} = \sum^\infty_{n=0}(-1)^nx^n = 1-x+x^2+ \cdots
$$

$$
\frac{1}{1-x} = \sum^\infty_{n=0}x^n = 1 + x + x^2 + \cdots
$$

$$
\ln(1+x) = \sum^\infty_{n=1}(-1)^{n-1}\frac{x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots
$$

$$
\sin x = \sum^\infty_{n=0}(-1)^n\frac{x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} + \cdots
$$

$$
\cos x = \sum^\infty_{n=0}(-1)^n\frac{x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots
$$

$$
(1+x)^{\alpha} = 1 + \alpha x + \frac{\alpha(\alpha - 1)}{2!}x^2 + \cdots
$$

## 无穷阶求导公式

$$
(\alpha^x)^{(n)} = \alpha^x(\ln \alpha)^n
$$

$$
(e^x)^{(n)} = e^x
$$

$$
(\sin kx)^{(n)} = k^n\sin(kx + \frac{n\pi}{2})
$$

$$
(\cos kx)^{(n)} = k^n\cos(kx + \frac{n\pi}{2})
$$

$$
(\ln x)^{(n)} = (-1)^{n-1}\frac{(n-1)!}{x^n}
$$

$$
[\ln(1+x)]^{(n)} = (-1)^{n-1}\frac{(n-1)!}{(1+x)^n}
$$

$$
[(x+x_0)^m]^{(n)} = m(m-1)(m-2)\cdots(m-n+1)(x+x_0)^{m-n}
$$

$$
(\frac{1}{x+a})^{(n)} = \frac{(-1)^nn!}{(x+a)^{n+1}}
$$
