---
type: post
category: book
tag:
  - CSAPP
series:
  name: 深入理解计算机系统
  slug: CSAPP
---

# Amdahl 定律

加速比 S，系统改进比$\alpha$，性能提升比 k

$$
S=\frac{1}{(1-\alpha)+\alpha/k}
$$

卡车司机从 Boise 到 Minneapolis，全程 2500km，全程限速 100km/h，期间有 1500km 临时改为限速 150km/h

则$\alpha = 1500/2500 = 0.6, k=150/100=1.5,S=\frac{1}{(1-0.6)+0.6/1.5}=1.25 \mathrm{X}$
