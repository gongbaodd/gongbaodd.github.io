---
type: post
category: fe
---
# 使用stryker做mutation test

今年年初的时候，我整理了一下前端测试现状，有一项就是mutation test。本文将会讲一下如何给typescript项目添加mutation test。

## Stryker-mutator

首先，为项目安装stryker全家桶。

```shell
yarn add -D stryker-typescript stryker-jest-runner stryker-html-reporter stryker-api stryker
```

你可能会接到升级的警告，我发现最新版本（以@stryker-mutator做域）会有bug，而且github上面显示CI编译失败，保守起见，还是使用老版本比较好。

执行```yarn stryker init```初始化项目，修改stryker.conf.js，详细的参数说明可以参考[这里](https://github.com/stryker-mutator/stryker/tree/master/packages/core)。

```javascript
module.exports = function stryker(config) {
  config.set({
    mutator: "typescript",
    mutate: ["src/linked_node/**/*.ts", "!src/**/*.spec.ts"],
    packageManager: "yarn",
    reporters: ["clear-text", "dashboard", "progress", "html"],
    testRunner: "jest",
    coverageAnalysis: "off",
    tsconfigFile: "tsconfig.json",
    dashboard: {
      reportType: "full"
    }
  });
};
```

注意，官网的tutorial会要求添加transpilor为typescript，这里因为我们的测试runner是已经配置好的jest，所以不能再添加一次编译。

执行```yarn stryker run```就能执行测试，这个测试很占用性能，我这10代i7的本都要跑8分钟左右，执行成功会生成报告存储在reports文件夹下。

## 配置travis

stryker官方提供[dashboard](https://dashboard.stryker-mutator.io)，登入配置好环境变量即可生成stryker的徽章，可以把它贴到github的readme中。这样，每次travis执行好mutation test后都能更新徽章分数。

关于dashboard如何配置可以参考[handbook](https://github.com/stryker-mutator/stryker-handbook/blob/master/dashboard.md)。

但是我没能成功上传report，只能显示出分数，并不确定哪里出了问题，还是看官方如何更新吧。

## 原理

如果我有以下函数，并配合100%测试覆盖的单元测试。

```typescript
function isGe18(num: number) {
    return (num >= 18);
}

describe("the input is 1", () => {
    it('should return false', () => {
        expect(isGe18(1)).toBe(false);
    });
});
```

显然以上的测试是不完备的，那么stryker如何找到它不完备的地方？首先修改函数的返回值，如生成如下四个函数。

```typescript
function isGe18_1(num: number) {
    return num > 18;
}
function isGe18_2(num: number) {
    return num < 18;
}
function isGe18_3(num: number) {
    return true;
}
function isGe18_3(num: number) {
    return false;
}
```

分别用他们重新跑测试，只要有一个测试失败，就称这个mutate被killed，如果测试全部通过，则称mutate被survived。
则对应上面例子：

+ isGe18_1 => survived
+ isGe18_2 => killed
+ isGe18_3 => killed
+ isGe18_3 => survived

则此时需要增加测试

```typescript
describe("the input is 19", () => {
    it('should return true', () => {
        expect(isGe18(19)).toBe(true);
    });
});

describe("the input is 18", () => {
    it('should return true', () => {
        expect(isGe18(18)).toBe(true);
    });
});
```

重新跑测试

+ isGe18_1 => killed（最后一个测试未通过）
+ isGe18_2 => killed
+ isGe18_3 => killed
+ isGe18_3 => killed（新增加的2个测试未通过）

此时测试才是完备的。