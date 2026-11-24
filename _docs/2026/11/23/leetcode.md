---
type: post
category: tech
series:
    name: leetcode
    slug: leetcode
---

# LeetCode 149: Max Points in Line

Recently, I started going through LeetCode in several languages to find interesting aspects of each. Here is the [link](https://leetcode.com/problems/max-points-on-a-line/).

Given an array points of unique 2D points where points[i] = [xi, yi], return the maximum number of points that lie on the same straight line.

> Input: points = [[1,1],[2,2],[3,3]]
> 
> Output: 3

> Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
>
> Output: 4

Constraints: 

- 1 <= points.length <= 300
- points[i].length == 2
- -10^4 <= xi, yi <= 10^4
- all points are unique.

This is not a hard question. You can fix one point $(x_i, y_i)$, then find another one $(x_j, y_j)$ and calculate the slope $dy/dx$. Count each slope; the slope with the highest count means the most points lie on the same line.

The hard part for me is that I am not clear about the constant numbers in each language, or about float calculations in compiled languages.

## Infinity

|language| positive infinity |
|--------|-------------------|
| TypeScript| Infinity               |    
| C++ | numeric_limits<float>::infinity() |
| Java | Float.POSITIVE_INFINITY |
| Python | float('inf') |
| C# | Double.PositiveInfinity |
| Go | Math.Inf(1) |
| Kotlin | Double.POSITIVE_INFINITY |
| Swift | Double.infinity |
| Rust | f64::INFINITY |

## Handling Double Sign

For the Double type in many languages, 0.0 and -0.0 are two distinct values. In this case, when using the slope as a key, you need to normalize the sign by adding 0.0.

```Rust
let k = if dx == 0 {
    f64::INFINITY
} else {
    dy as f64 / dx as f64 + 0.0
};
```

## HashMap Usage

For TypeScript

```ts
const counts = new Map<string, number>();
...
counts.set(key, (counts.get(key) ?? 0) + 1)

for (const v of counts.values()) { ... }
```

For C++

```cpp
map<float, int> counts;
...
counts[k]++;
...
for(auto& [_, v]: counts) { ... }
```

For Java

```java
import java.util.HashMap;
import java.util.Map;
...
Map<Double, Integer> counts = new HashMap();
...
counts.merge(k, 1, Integer::sum);

for (int v: counts.values()) { ... }
```

For Python

```py
counts: dict[float, int] = {}
...
counts[k] = counts.get(k, 0) + 1
...
best = max(best, counts[k] + 1)
```

For C#

```csharp
var counts = new Dictionary<double, int>();
...
counts[k] = counts.GetValueOrDefault(k) + 1;
...
foreach(var v in counts.Values) { ... }
```

For Go

```go
counts := map[float64]int{}
...
counts[k] ++
...
for _, v:=range(counts) { ... }
```

For Kotlin

```kt
val counts = HashMap<Double, Int>()
...
counts[k] = counts.getOrDefault(k, 0) + 1
...
for (v in counts.values) { ... }
```

For Swift

```swift
var counts: [Double: Int] = [:]
...
counts[k, default: 0] += 1
...
for v in counts.values { ... }
```

For Rust

```rs
let mut counts: HashMap<u64, i32> = HashMap::new();
...
*counts.entry(k.to_bits()).or_insert(0) += 1;
...
for &v in counts.values() { ... }
```

## What is more

Swift's `if` grammar is so elegant, but remember to add a space between the exclamation mark and the variable, because `j!` means force-unwrapping `j`.

```swift
for i in 0..< where j != i
```

Rust has very strict limitations on strings. In other languages you can usually treat a string as an array, but in Rust you should use `s.as_bytes()`, and the indexes are `usize`. This is even more noticeable in [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/).