---
category: fe
type: post
---
# TypeScript Sucks but Long Live the Types

## Part I : Type System

### JavaScript是一种很爽的语言

作为一款动态语言，比如你可以执行以下代码而不用担心报错。

```javascript
var num = "3" - "2";　// num = 1
```

---

但是，如果遇到了下面这种情况，就算是灾难了。

```javascript
isGreater("1000", "233"); // false

function isGreater(ａ, b) {
    return a > b;
}
```

---

所以我们写代码的时候，都会加注释

```javascript
/**
* 是否为最大
* 参数传数字啊
* 谁不传谁是小狗
* @constructor
* @param {number} ａ
* @param {number} b
* @returns {boolean}
**/
function isGreater(ａ, b) {
    return a > b;
}
```

---

可是总有人不看注释，所以这个函数变成了

```javascript
function isGreater(a, b) {
    const T_NUM = "number";
    if (
        T_NUM === typeof a &&
        T_NUM === typeof b
    ) {
        return a > b;
    } else {
        throw("参数传数字啊，扎心了，老铁！");
    }
}
```

---

这还没完呢，假设这次改动出现在某次重构中，此前这个isGreater方法已经遍布你的项目了。

```javascript
btn.onclick = () =>
    isGreater("x", "y") ? ... : ...;
```

而正好，这个onClick在自测的时候被忽略了。上线之后就是灾难了。

---

### 动态一时爽，重构火葬场

### 举个typescript的栗子

```javascript
function isGreater(ａ: number, b: number): boolean {
    return a > b;
}
```

### 类型系统的优势

* 代码可读性高
* 更有利于重构
* IDE能更好地支持
* 预防某些类型相关的错误

### 比较流行的JS类型系统

![](http://ww1.sinaimg.cn/mw690/89d0a2e1ly1fjow3fyxzbj20fy0baq4k.jpg)

## Part II : TS vs Flow

众多类型系统里面，typescript和flowtyped的比较类似，目标都是为了js的工程化，而且语法上除了细节几处根本没区别。

### 对照

| | TypeScript    | Flow-typed    |
|--|---------------|---------------|
| by   | Microsoft  | Facebook   |
| in   | TypeScript | OCamel     |
| is A | Compiler   | Checker    |
| VSCode | 原生支持  | 安装插件 |
| webpack | ts-loader | babel |
| config | json | config |
| version | 2.3.2 | 0.54.1 |

### 简单比对

#### TypeScript

```javascript
function isGreater(a: number, b: number): boolean {
    return a > b;
}

isGreater("1", "2");
      // ^^^^
      // Argument of type "1" is not assignable to parameter of type 'number'.
```

### Flow-typed

```javascript
//@flow
function isGreater(a: number, b: number): boolean {
    return a > b;
}

isGreater("1", "2");
        // ^^^  ^^^
        // string (This type is incompatible with the expected param type of number)
```

### 空值检查

```javascript
function nullCheck(num: number): string {
                                // ^^^
                                // [ts] Function lacks ending return statement and return type does not include 'undefined'.
                                // [flow] This type is incompatible with an implicitly-returned undefined.
    if (num > 10) {
        return "it's ok"
    }
}
```

### 泛型

```javascript
class Animal { }
class Dog extends Animal { woff = true }
class Cat extends Animal { meow = true }

let animals: Animal[] = [];
let dogs: Dog[] = [];
let cat: Cat[] = [];

animals.push(new Animal);
animals.push(new Dog);
animals.push(new Cat);

dogs.push(new Cat);
      // ^^^^^^^^
      // 'Argument of type 'Cat' is not assignable to parameter of type 'Dog'.
      // ^^^^^^^ Cat. This type is incompatible with
```