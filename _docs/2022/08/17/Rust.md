---
type: post
category: tech
tag:
  - algorithm
  - Rust
---

# Rust 实现的几个排序算法

## 冒泡排序

$O(n^2)$ 稳定排序

选择每个元素和后面的作比较，如果前面的元素比后面的大，就交换两个元素的位置。

```rust
fn bubble_sort<T: Ord>(arr: &mut [T]) {
    for i in 0..arr.len() {
        for j in i..arr.len() {
            if arr[i] > arr[j] {
                arr.swap(i, j);
            }
        }
    }
}
```

## 插入排序

$O(n^2)$ 稳定排序

假定只有两个元素并排好序，每次再插入新的元素，直到全部元素都插入。

```rust
fn insert<T: Ord>(arr: &mut [T]) {
    for i in 1..arr.len() {
        let mut j = i;
        while j > 0 && arr[j] < arr[j-1] {
            arr.swap(j, j-1);
            j -= 1;
        }
    }
}
```

## 快速排序

期望$O(n\log{n})$，最坏情况$O(n^2)$，不稳定排序

选中一个元素，把小于它的元素放到左边，再把大于它的放到右边，再继续处理两边数据。

```rust
fn quick<T:Ord>(arr: &mut [T]) {
    _quick(arr, 0, (arr.len() - 1) as isize);
}

fn _quick<T:Ord>(arr: &mut [T], start: usize, end: isize) {
    if start > end {
        return;
    }

    let pivot = partition(arr, start, end as isize);
    _quick(arr, start, (pivot) as isize - 1);
    _quick(arr, pivot + 1, end);
}

fn partition<T:Ord>(arr: &mut [T], mut low: usize, mut high: usize) -> usize {
    let pivot = 0;

    loop {
        if low < high && data[low] < pivot {
            low += 1;
        }
        data.swap(low, high);

        if low < high && data[high] > pivot {
            high -= 1;
        }
        data.swap(low, high);

        if low == high {
            break;
        }
    }

    low
}
```

## 归并排序

$O(n\log{n})$ 稳定排序

将两个有序数组合并为一个有序数组

```rust
fn merge<Ord:T>(arr: &mut [T]) {
    let length = arr.len();
    let middle = length / 2;

    if length > 1 {
        let a = arr[0..middle];
        let b = arr[middle..length];
        merge(a);
        merge(b);


    }
}

fn sort<Ord: T>(a: &[T], b: &[T], arr: &mut[T]) {
    let mut ia = 0;
    let mut ib = 0;
    let mut i = 0;

    while ia < arr.len() && ib < arr.len() {
        if a[ia] < b[ib] {
            data[i] = a[ia];
            ia += 1;
        } else {
            data[i] = b[ib];
            ib += 1;
        }
        i += 1;
    }

    if ia < arr.len() {
        data[..i].copy_from_slice(&a[ia..]);
    }

    if ib < arr.len() {
        data[..i].copy_from_slice(&b[ib..]);
    }
}
```

## 希尔排序

$O(n\log^2{n})$不稳定排序

升级版的插入排序，每隔一个 gap 进行一次排序，直到 gap 缩到 1。

```rs
fn shell<T: Ord>(arr: &mut [T]) {
    let length = arr.len();
    let mut gap = length / 2;

    while gap > 0 {
        for i in gap..length {
            let mut j = i;
            while j > gap & data[j] < data[j-gap] {
                data.swap(j, j-gap);
                j -= gap;
            }
        }
        gap /= 2;
    }
}
```

## 堆排序

$O(n\log{n})$不稳定排序

将数组转换成大顶堆，把作为根的最大值排到数组最后，再去除最大值重新排序。

```rs
fn heap(data: &mut Vec<i32>) {
    if data.len() < 2 {
        return ;
    }

    // build one max heap
    let last_root = (data.len() + 2) / 2;
    for root in (0..=last_root).rev() {
        to_max_heap(data, root, data.len() - 1);
    }

    // replace the first element(max element) to the last
    // make max heap using the other elements
    for last in (1..data.len()).rev() {
        data.swap(0, last);
        to_max_heap(data, 0, last-1);
    }
}

fn to_max_heap(data: &mut Vec<i32>, mut root: usize, last: usize) {
    loop {
        let left = root * 2 + 1;
        let right = left + 1;
        let max_child;

        if left > last {
            break;
        }

        if right > last {
            max_child = left;
        } else {
            max_child = if data[right] > data[left] {
                right
            } else {
                left
            }
        }

        if data[max_child] > data[root] {
            data.swap(max_child, root);
        }

        root = max_child;
    }
}
```

另外还有很多排序算法参考[https://github.com/TheAlgorithms/Rust/tree/master/src/sorting](https://github.com/TheAlgorithms/Rust/tree/master/src/sorting)

## bogo 排序

$O(n\times n!)$

随机排列直到排序完成

## 桶排序(Bucket Sort)

$O(n)$ 稳定排序

先对元素分类，如 0-10，10-20...然后在每个桶中进行排序

## 鸡尾酒排序(cocktail Sort)

$O(n^2)$ 稳定排序

冒泡排序的变形，先向上冒泡，再进行一次下沉，是两个方向的冒泡排序。

## 梳排序(Comb sort)

$O(n\log{n})$ 不稳定排序

用希尔排序的方法进化冒泡排序，衰减值默认选 1.3 效率最高

## 计数排序

$O(n+k)$ 稳定排序

新建一个 k 元素的计数数组，k 为排序数组的取值空间，有值的计数数组键值就是排序结果。

## 基数排序(Radix sort)

$O(k\cdot n)$

按照个位、十位、百位...排序

## Tim sort

长度小于 64 的数组进行二分插入排序，大于 64 的数组进行归并排序，归并排序在比较大于 minrun 时直接对接数组。
