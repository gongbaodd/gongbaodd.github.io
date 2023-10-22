---
type: post
category: fe
tag:
  - test
  - stryker
  - javascript
---

# 使用 stryker 做 mutation test

今年年初的时候，我整理了一下前端测试现状，有一项就是 mutation test。本文将会讲一下如何给 typescript 项目添加 mutation test。

## Stryker-mutator

首先，为项目安装 stryker 全家桶。

```shell
yarn add -D stryker-typescript stryker-jest-runner stryker-html-reporter stryker-api stryker
```

你可能会接到升级的警告，我发现最新版本（以@stryker-mutator 做域）会有 bug，而且 github 上面显示 CI 编译失败，保守起见，还是使用老版本比较好。

执行`yarn stryker init`初始化项目，修改 stryker.conf.js，详细的参数说明可以参考[这里](https://github.com/stryker-mutator/stryker/tree/master/packages/core)。

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
      reportType: "full",
    },
  });
};
```

注意，官网的 tutorial 会要求添加 transpilor 为 typescript，这里因为我们的测试 runner 是已经配置好的 jest，所以不能再添加一次编译。

执行`yarn stryker run`就能执行测试，这个测试很占用性能，我这 10 代 i7 的本都要跑 8 分钟左右，执行成功会生成报告存储在 reports 文件夹下。

## 配置 travis

stryker 官方提供[dashboard](https://dashboard.stryker-mutator.io)，登入配置好环境变量即可生成 stryker 的徽章，可以把它贴到 github 的 readme 中。这样，每次 travis 执行好 mutation test 后都能更新徽章分数。

关于 dashboard 如何配置可以参考[handbook](https://github.com/stryker-mutator/stryker-handbook/blob/master/dashboard.md)。

但是我没能成功上传 report，只能显示出分数，并不确定哪里出了问题，还是看官方如何更新吧。

## 原理

如果我有以下函数，并配合 100%测试覆盖的单元测试。

```typescript
function isGe18(num: number) {
  return num >= 18;
}

describe("the input is 1", () => {
  it("should return false", () => {
    expect(isGe18(1)).toBe(false);
  });
});
```

显然以上的测试是不完备的，那么 stryker 如何找到它不完备的地方？首先修改函数的返回值，如生成如下四个函数。

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

分别用他们重新跑测试，只要有一个测试失败，就称这个 mutate 被 killed，如果测试全部通过，则称 mutate 被 survived。
则对应上面例子：

- isGe18_1 => survived
- isGe18_2 => killed
- isGe18_3 => killed
- isGe18_3 => survived

则此时需要增加测试

```typescript
describe("the input is 19", () => {
  it("should return true", () => {
    expect(isGe18(19)).toBe(true);
  });
});

describe("the input is 18", () => {
  it("should return true", () => {
    expect(isGe18(18)).toBe(true);
  });
});
```

重新跑测试

- isGe18_1 => killed（最后一个测试未通过）
- isGe18_2 => killed
- isGe18_3 => killed
- isGe18_3 => killed（新增加的 2 个测试未通过）

此时测试才是完备的。
