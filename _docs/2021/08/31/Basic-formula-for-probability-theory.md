---
type: post
category: book
tag:
  - math
series:
  name: 概率论
  slug: probability
---

# 概率论的基本公式

$$
A \subset B,P(B-A)=P(B)-P(A)
$$

$$
P(A \cup B) = P(A) + P(B) -P(AB)
$$

$$
P(A_1 \cup A_2 \cup A_3) =
P(A_1) + P(A_2) + P(A_3) -
P(A_1A_2) - P(A_1A_3) - P(A_2A_3) +
P(A_1A_2A_3)
$$

$$
P(A_1 \cup A_2 \cup A_3 \cup A_4) =
P(A_1) + P(A_2) + P(A_3) + P(A_4) -
[
    P(A_1A_2) + P(A_1A_3) + P(A_1A_4) +
    P(A_2A_3) + P(A_2A_4) + P(A_3A_4)
] +
[
    P(A_1A_2A_3) + P(A_1A_2A_4) +
    P(A_1A_3A_4) + P(A_2A_3A_4)
] +
P(A_1A_2A_3A_4)
$$

$$
P(A-B) = P(A) - P(AB) = P(A\bar{B})
$$

$$
P(B|A) = \frac{P(AB)}{P(A)}
$$

$$
P(\bar{B}|A) = 1 - P(B|A)
$$

$$
P(B-C|A) = P(B|A)-P(BC|A)
$$

$$
P(AB)=P(A)P(B|A)
$$

$$
\bigcup_{i=1}^n A_i = \Omega, A_iA_j = \Phi, B=\bigcup_{i=1}^n A_iB, P(B) = \sum^n_{i=1}P(A)P(B|A)
$$

$$
\bigcup_{i=1}^n A_i = \Omega, A_iA_j = \Phi,
P(A_j|B)=\frac{P(A_j)P(B|A_j)}{\sum^n_{i=i}P(A_i)P(B|A_i)}
$$

$$
P(\bar{AB})=P(\bar{A} \cup \bar{B})
$$
