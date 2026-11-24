---
type: post
category: tech
series:
    name: leetcode
    slug: leetcode
---

# LeetCode 909: Snakes and Ladders

The [link](https://leetcode.com/problems/snakes-and-ladders/). This problem is harder to read than to implement. But it is a simple graph BFS problem. Whether the snake or the ladder, is just an edge between two points.

To solve a BFS problem, you need two variables, a dist array to save all the costs to get to all the points and a queue to save current route.

The reason to record this question is that, it helps me to understand how to fill arrays, how to use queues and how to make closure/lambda function in different languages.


## Fill Arrays/Vectors

- C++

```cpp
vector<int> dist(target + 1, -1);
```

- Java

```java
import java.util.Arrays;

int[] dist = new int[target + 1];
Arrays.fill(dist, -1);
```

- Python

```python
dist = [-1] * (target + 1)
```

- TypeScript

```typescript
const dist = new Array(target + 1).fill(-1);
```

- C#

```csharp
var dist = new int[target + 1];
Array.Fill(dist, -1);
```

- Go

```go
dist := make([]int, target+1)
for i := range dist {
    dist[i] = -1
}
```

- Kotlin

```kotlin
val dist = IntArray(target + 1) { -1 }
```

- Swift

```swift
var dist = Array(repeating: -1, count: target + 1)
```

- Rust

```rust
let mut dist = vec![-1i32; target + 1];
```

## Queue methods

- C++

```cpp
queue<int> q;
q.push(1);
int cur = q.front();
q.pop();
```

- Java

```java
import java.util.ArrayDeque;
import java.util.Queue;

Queue<Integer> q = new ArrayDeque<>();
q.offer(1);
int cur = q.poll();
```

- Python

```python
from collections import deque

q = deque([1])
q.append(2)
cur = q.popleft()
```

- TypeScript

```typescript
const q: number[] = [1];
q.push(2);
const cur = q.shift()!;
```

- C#

```csharp
var q = new Queue<int>();
q.Enqueue(1);
int cur = q.Dequeue();
```

- Go

```go
q := []int{1}
q = append(q, 2)
cur := q[0]
q = q[1:]
```

- Kotlin

```kotlin
val q = ArrayDeque<Int>()
q.addLast(1)
val cur = q.removeFirst()
```

- Swift

```swift
var q = [1]
q.append(2)
let cur = q.removeFirst()
```

- Rust

```rust
use std::collections::VecDeque;

let mut q = VecDeque::new();
q.push_back(1);
let cur = q.pop_front().unwrap();
```


## Closure

A closure captures `n` and `board`, and maps a square number (1-based, zigzag from the bottom) to the square you end up on: the snake/ladder target, or the same square if there is none.

- C++

```cpp
        auto jumpTo = [&](int squareNum) {
            int row = (squareNum - 1) / n;
            int col = (squareNum - 1) % n;

            int r = n - 1 - row;
            int c = row % 2 == 0 ? col : n - 1 - col;

            return board[r][c] == -1 ? squareNum : board[r][c];
        };
```

- Java

```java
IntUnaryOperator jumpTo = squareNum -> {
    int row = (squareNum - 1) / n;
    int col = (squareNum - 1) % n;

    int r = n - 1 - row;
    int c = row % 2 == 0 ? col : n - 1 - col;

    return board[r][c] == -1 ? squareNum : board[r][c];
};
// jumpTo.applyAsInt(squareNum)
```

- Python

```python
def jump_to(square_num):
    row, col = divmod(square_num - 1, n)

    r = n - 1 - row
    c = col if row % 2 == 0 else n - 1 - col

    return square_num if board[r][c] == -1 else board[r][c]
```

- TypeScript

```typescript
const jumpTo = (squareNum: number): number => {
  const row = Math.floor((squareNum - 1) / n);
  const col = (squareNum - 1) % n;

  const r = n - 1 - row;
  const c = row % 2 === 0 ? col : n - 1 - col;

  return board[r][c] === -1 ? squareNum : board[r][c];
};
```

- C#

```csharp
Func<int, int> jumpTo = squareNum =>
{
    int row = (squareNum - 1) / n;
    int col = (squareNum - 1) % n;

    int r = n - 1 - row;
    int c = row % 2 == 0 ? col : n - 1 - col;

    return board[r][c] == -1 ? squareNum : board[r][c];
};
```

- Go

```go
jumpTo := func(squareNum int) int {
    row := (squareNum - 1) / n
    col := (squareNum - 1) % n

    r := n - 1 - row
    c := col
    if row%2 == 1 {
        c = n - 1 - col
    }

    if board[r][c] == -1 {
        return squareNum
    }
    return board[r][c]
}
```

- Kotlin

```kotlin
val jumpTo = { squareNum: Int ->
    val row = (squareNum - 1) / n
    val col = (squareNum - 1) % n

    val r = n - 1 - row
    val c = if (row % 2 == 0) col else n - 1 - col

    if (board[r][c] == -1) squareNum else board[r][c]
}
```

- Swift

```swift
let jumpTo = { (squareNum: Int) -> Int in
    let row = (squareNum - 1) / n
    let col = (squareNum - 1) % n

    let r = n - 1 - row
    let c = row % 2 == 0 ? col : n - 1 - col

    return board[r][c] == -1 ? squareNum : board[r][c]
}
```

- Rust

```rust
let jump_to = |square_num: usize| -> usize {
    let row = (square_num - 1) / n;
    let col = (square_num - 1) % n;

    let r = n - 1 - row;
    let c = if row % 2 == 0 { col } else { n - 1 - col };

    if board[r][c] == -1 { square_num } else { board[r][c] as usize }
};
```
