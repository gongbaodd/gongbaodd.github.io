---
category: fe
type: post
---
# TypeScript Sucks but Long Live the Types


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

震惊，TypeScript在这种情况下不报错！！！

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

* TypeScript只做了类型检查，而JS数组是引用赋值的，因此引起了错误