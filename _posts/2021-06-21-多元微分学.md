---
type: post
category: book
tag:
  - math
series:
  name: 高等数学
  slug: math
---

# 多元微分学

全微分 dz

$$
\mathrm{d}z = \frac{\partial z}{\partial x} \Delta x + \frac{\partial z}{\partial x} \Delta y =  \frac{\partial z}{\partial x} \mathrm{d} x + \frac{\partial z}{\partial x} \mathrm{d} y
$$

---

$$
z = f[u(t), v(t)]
$$

求$\frac{\mathrm{d} z}{\mathrm{d} t}$

$$
\frac{\mathrm{d} z}{\mathrm{d} t} =
\frac{\partial z}{\partial u}\frac{\mathrm{d} u}{\mathrm{d} t} + \frac{\partial z}{\partial v}\frac{\mathrm{d} v}{\mathrm{d} t}
$$

---

$$
z = f[u(x, y), v(x, y)]
$$

求$\frac{\partial z}{\partial x}$

$$
\frac{\partial z}{\partial x} =
\frac{\partial z}{\partial u}
\frac{\partial u}{\partial x} +
\frac{\partial z}{\partial v}
\frac{\partial v}{\partial x}
$$

---

$$
z = f[u(x, y), v(y)]
$$

求$\frac{\partial z}{\partial y}$

$$
\frac{\partial z}{\partial y} =
\frac{\partial z}{\partial u}
\frac{\partial u}{\partial y} +
\frac{\partial z}{\partial v}
\frac{\partial v}{\mathrm{d} y}
$$

---

$$
F(x,y),
\frac{\mathrm{d} y}{\mathrm{d} x}
$$

$$
\frac{\mathrm{d} y}{\mathrm{d} x} =
- \frac{F_x'}{F_y'}
$$

---

$$
F(x,y,z),
\frac{\partial z}{\partial x}
$$

$$
\frac{\partial z}{\partial x} =
- \frac{F_x'}{F_z'}
$$

---

f(x,y)在 P 点取极值的必要条件是

$$
f_x'(x_0, y_0) = 0,
f_y'(x_0, y_0) = 0
$$

---

f(x,y)在 P 点取极值的充分条件是

$$
\begin{cases}
    f_{xx}''(x_0, y_0) = A \\
    f_{xy}''(x_0, y_0) = B \\
    f_{yy}''(x_0, y_0) = C \\
\end{cases},
B^2-AC < 0
$$

---

$$
\begin{cases}
    f_{xx}''(x_0, y_0) = A \\
    f_{xy}''(x_0, y_0) = B \\
    f_{yy}''(x_0, y_0) = C \\
\end{cases},
B^2-AC < 0, A < 0
$$

f(x,y)在该点取极大值

---

$$
\begin{cases}
    f_{xx}''(x_0, y_0) = A \\
    f_{xy}''(x_0, y_0) = B \\
    f_{yy}''(x_0, y_0) = C \\
\end{cases},
B^2-AC < 0, A > 0
$$

f(x,y)在该点取极小值

---

$$
\begin{cases}
    f_{xx}''(x_0, y_0) = A \\
    f_{xy}''(x_0, y_0) = B \\
    f_{yy}''(x_0, y_0) = C \\
\end{cases},
B^2-AC > 0
$$

f(x,y)在该点非极值

---

$$
\begin{cases}
    f_{xx}''(x_0, y_0) = A \\
    f_{xy}''(x_0, y_0) = B \\
    f_{yy}''(x_0, y_0) = C \\
\end{cases},
B^2-AC = 0
$$

无法判断

---

$$
\begin{cases}
    \phi(x,y,z) = 0 \\
    \psi(x,y,z) = 0 \\
\end{cases}
$$

求 u=f(x,y,z)在上面条件下的最值，列出拉格朗日乘数公式

$$
F(x,y,z,\lambda, \mu),
\begin{cases}
    F_x' = f_x' + \lambda\phi_x' + \mu\psi_x' = 0 \\
    F_y' = f_y' + \lambda\phi_y' + \mu\psi_y' = 0 \\
    F_z' = f_z' + \lambda\phi_z' + \mu\psi_z' = 0 \\
    F_\lambda' = \phi(x, y, z) = 0 \\
    F_\mu' = \psi(x, y, z) = 0 \\
\end{cases}
$$

带入备选点如(1,1,1),(2,2,2)取最大值和最小值为所求
