---
type: post
category: tech
---
# JavaScript 获取 Unsigned Int

JavaScript 默认是64位有符号的整型，可以利用移位符号解决，但不是>>2而是>>>0

```javascript
const a = 4136517969;
const b = a >> 2;
/* b == -39612332 */
```

```javascript
const a = 4136517969;
const b = a >>> 0;
/* b == 4136517969 */
```

>最好不要使用 >> ，推荐使用 >>> 因为最左边一位会被解析成符号位，当数字溢出时，会被解析成负数。

当然按照这种方式eslint的默认配置是不允许的，所以可以借助 Unit32Array.

```javascript
const a = 4136517969;
const b = new Uint32Array([a])[0];
/* b == 4136517969 */
```