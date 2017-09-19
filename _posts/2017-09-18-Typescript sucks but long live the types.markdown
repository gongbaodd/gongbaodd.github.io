---
category: fe
type: post
---
# TypeScript Sucks but Long Live the Types

## Part I : Type System

### JavaScript 是一种很爽的语言

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

而正好，这个 onClick 在自测的时候被忽略了。上线之后就是灾难了。

---

### 动态一时爽，重构火葬场

### 举个 TS 的栗子

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

众多类型系统里面，typescript 和 flowtyped 的比较类似，目标都是为了 JS 的工程化，而且语法上除了细节几处根本没区别。

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

TypeScript(strict) 和 Flow 都能指出 nullCheck 函数应该指明返回值为 string | void 类型。

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

TypeScript 和 Flow 都指出狗的数组不能加入猫的实例。

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

---

此处 TS 和 Flow 都能查出错误，但是报错位置不同。

```javascript
//@flow
class Animal {}
class Dog extends Animal { woff = true }
class Cat extends Animal { meow = true }

let animals: Animal[] = [];
            // ^^^^^^
            // [flow] Animal (This type is incompatible with Cat)'
let cats: Cat[] = animals;
// ^^^
// [ts] Type 'Animal[]' is not assignable to type 'Cat[]'.
```

#### Wait for IT

震惊，TypeScript 在这种情况下不报错！！！

```javascript
//@flow
class Animal {}
class Dog extends Animal { woff = true }
class Cat extends Animal { meow = true }

let cats: Cat[] = [];
let animals: Animal[] = cat;
        // ^^^^^^^^^
        // [flow] Animal (This type is incompatible with Cat)

animals.push(new Dog);
animals.push(new Cat);
animals.push(new Animal);

JSON.stringify(cats); // [{"woff":true},{"meow":true},{}]
```

***TS 只做了类型检查，而 JS 数组是引用赋值的，因此引起了错误***

#### Nominal & Structural (property-based) Typing

Flow 是标称类型而 TS 是结构类型。

```javascript
class Animal { }
class Dog extends Animal { name = "dog" }
class Cat extends Animal { name = "cat" }

let dog: Dog = new Dog;
       // ^^^^^^^ [Flow] Cat. This type is incompatible with Dog
dog = new Cat;
dog = { name: "dog" };
      // ^^^^^^^^^^^^^^^ object literal. This type is incompatible with
```

#### 对比总结

|    |　TypeScript | Flow-typed |
|----|-------------|------------|
| 工具支持　| 有亲爸做编辑器　| 目前体验存在迟钝，但可以做 linting 前的最后工序 |
| 第三方库定义支持　| npm @types 私有库　| flow-typed 可以安装定义，但明显少于 TS |
| 质量检查　| tslint　| eslint　(jshint 不行) |
| 编译　|　可以直接编译为各版本的 JS | 借助babel |
| 迁移成本　| 可以把原来的 JS 作为类库使用，但整体依然要用 TS 写 | 可以指定要检查的文件 |
| 其他　| 支持很多es7/8的功能　| 只是检查器，但是类型检查强于 TS |