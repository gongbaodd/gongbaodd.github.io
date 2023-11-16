---
type: post
category: fe
tag:
  - react-native
  - flutter
  - dart
series:
  name: 从RN到Flutter
  slug: Flutter-for-RN-devs
  number: 1
---

# 从 RN 到 Flutter-从 Dart 开始

这是一篇翻译，原文来自于[官方文档](https://flutter.dev/docs/get-started/flutter-for/react-native-devs)，当然，里面夹带私货，哈哈。

## 从 JavaScript 到 Dart

就像 React Native，Flutter 也是用响应式界面。但是 React Native 是链接原生环境，而 flutter 则是直接编译到原生环境中。Flutter 可以控制屏幕上面的每一个像素，可以避免 JavaScript 和原生环境桥的性能问题。

Dart 是一个简单的语言，并提供以下功能。

- 提供一个开源可伸缩的开发环境并提供给网页端、服务器端、移动端使用。
- 提供单继承面向对象的 C 语法支持，并支持 AOT 编译至原生环境。
- 可翻译到 JavaScript
- 支持接口和虚基类的数据结构

以下是几处 JavaScript 和 Dart 的不同之处。

### 入口

JavaScript 没有与设定的入口函数。

```js
function startHere() {
  // 可以用来做入口函数
}
```

Dart 有一个顶级`main()`函数作为入口函数使用。

```dart
main() {}
```

在 [DartPad](https://dartpad.dev/0df636e00f348bdec2bc1c8ebc7daeb1) 上使用。

### 打印日志

在 Dart 中打印日志需要使用`print()`函数。

```js
console.log("Hello JavaScript!");
```

```dart
print("Hello Dart!");
```

在 [DartPad](https://dartpad.dev/cf9e652f77636224d3e37d96dcf238e5) 试用。

### 变量

Dart 是类型安全的——它结合静态类型检查和动态类型检查确保变量总是符合它的静态类型。即使类型是强制的，但类型标识并不是必须的，因为 Dart 会预判类型。

#### 声明变量并赋值

在 JavaScript 中，变量是无类型的（这是原文说的，不是我说的，我不是很同意）。

```js
var name = "JavaScript";
```

在 Dart 中，变量必须声明类型，或者让系统能够预判类型。

```dart
String name = "Dart";
var otherName = "Dart";
```

在 [DartPad](https://dartpad.dev/3f4625c16e05eec396d6046883739612) 中试用。

点[这里](https://dart.dev/guides/language/sound-dart)了解 Dart 的类型系统。

#### 默认值

在 Javascript 中，未初始化的变量是`undefined`（他可能指的是函数作用域变量）。

```js
var name; // undefined
```

在 Dart 中，未初始化的变量值为`null`。因为 Dart 中的类型都是对象，所以即使定义了类型但没有赋值它的默认值依然是 null。

```dart
var name; // null
int x; // null
```

在 [DartPad](https://dartpad.dev/57ec21faa8b6fe2326ffd74e9781a2c7) 使用。

更多关于 [Dart 变量](https://dart.dev/guides/language/language-tour#variables) 的信息。

#### 空值检查和零值检查

在 JavaScript 中非空对象被认为是真值。

```js
var myNull = null;
if (!myNull) {
  console.log("null是假值");
}
var zero = 0;
if (!zero) {
  console.log("0是假值");
}
```

Dart 中，只有布尔真值是真值。

```dart
var myNull = null;
if (myNull == null) {
  print("使用 == null 做空值检查");
}
var zero = 0;
if (zero == 0) {
  print("使用 == 0 做零值检查");
}
```

在 [DartPad](https://dart.dev/guides/language/language-tour#variables) 上使用。

#### 函数

两个语言的函数基本上相同。

```js
function fn() {
  return true;
}
```

不同点是他们的声明。

```dart
{
  fn() {
    return true;
  }
}

{// 也能这么写
  bool fn() {
    return true;
  }
}
```

在 [DartPad](https://dartpad.dev/5454e8bfadf3000179d19b9bc6be9918) 上使用，点[这里](https://dart.dev/guides/language/language-tour#functions)查看函数细节。

#### 异步开发

##### Futures

和 Javascript 一样，Dart 支持单线程执行。JavaScript 使用 promise 对象处理异步的成功以及失败状态，并获取它的值。

```js
const getIp = () =>
  fetch("https://httpbin.org/ip")
    .then((res) => res.json())
    .then(({ origin: { ip } }) => ip);

getIp()
  .then((ip) => console.log(ip))
  .catch((errpr) => console.error(error));
```

而在 Dart 中，使用 [Future](https://dart.dev/tutorials/language/futures) 对象处理异步。

```dart
import "dart:convert";
import "package:http/http.dart" as http;

Future<string> getIp() {
  return http.get("https://httpbin.org/ip")
    .then((res) {
      String ip = jsonDecode(res.body)["origin"];
      return ip;
    });
}

main() {
  getIp()
    .then(ip => print(ip))
    .catchError((error) ==> print(error));
}
```

点击[这里](https://dart.dev/tutorials/language/futures)了解 Future 对象。

##### `async` 和 `await`

使用 `async` 标识符声明异步函数。

在 JavaScript 中，`async`函数返回一个`Promise`对象，并使用`await`处理它。

```js
async function getIp() {
  const res = await fetch("http://httpbin/ip");
  const { origin } = await res.json();
  return origin;
}

async function main() {
  try {
    const ip = await getIp();
    console.log(ip);
  } catch (e) {
    console.log(e);
  }
}
```

在 Dart 中，`async`函数返回`Future`类型，函数体会被安排运行，`await`运算符被用来获取`Future`的返回值。

```dart
import "package:http/http.dart" as http;
import "dart:convert"

Future<string> getIp() {
  final res = await http.get("http://httpbin.org/ip");
  String ip = jsonDecode(res.body)['origin'];
  return ip;
}

main() async {
  try {
    final ip = await getIp();
    print(ip);
  } catch(e) {
    print(e);
  }
}
```

了解更多[async 和 await](https://dart.dev/guides/language/language-tour#asynchrony-support)的信息。
