---
type: post
category: fe
---
# 单元测试时使用mock-fs模拟IO返回值

最近换工作到了一家对测试要求比较高的公司，相比以前仅仅完成Appnium完全匹配不同，这里要求使用jest自动化测试覆盖率达到80%+，[此处应有jest cheat sheet](https://devhints.io/jest)。

工作过程中有很多需要读配置文件的地方，做法是在本地对应位置放上文件，然后配置ignore掉这个文件进行测试，然而这并不是个很优雅的方式（尤其是当代码中有判断此配置是否存在时，需要手动移动文件），此时即可利用mock-fs。

## 简单使用

```javascript
const mock = require('mock-fs');

mock({
  'path/to/fake/dir': {
    'some-file.txt': 'file content here',
    'empty-dir': {/** empty directory */}
  },
  'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
  'some/other/path': {/** another empty directory */}
});
```

指定的文件夹地址是默认相对于process.cwd()的，当然也可以配置其它地址。执行mock之后，所有有关IO的部分就都被修改了。

## 需要注意的地方

* 因为强制修改了IO，你会发现require也不好用了所以一般放在require之后
* 记得要在每个用例执行之后回收mock状态

```javascript
decribe('# test', () => {
    const mockfs = require('mock-fs');
    beforeEach(() => jest.resetModule());
    afterEach(() => mockfs.restore());
    it('should do ...', () => {
        const foo = require('foo.js');
        mockfs({...});
        expect(foo)...
    });
})
```