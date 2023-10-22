---
type: post
category: fe
---
# 总结一下最近 jest 上面的经验

## mock localStorage

jsdom里面的localStorage是不能通过赋值覆盖的，但是有一个hack就是利用Object.defineProperty。

```javascript
Object.defineProperty(window, 'localStorage', {
    writable: true,
    value:{
        getItem: jest.fn(),
        setItem: jest.fn()
    }
});
```

## setTimeout

有的时候需要让测试代码以为自己已经跑了一会儿。

```javascript
jest.useFakeTimers();

jest.advanceTimersByTime();

jest.clearAllTimers();
```

## matchMedia

jsdom 还没提供，需要自己mock。

```javascript
window.matchMedia = jest.fn(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
}));
```