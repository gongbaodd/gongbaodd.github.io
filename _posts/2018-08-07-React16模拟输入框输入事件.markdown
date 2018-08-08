---
type: post
category: fe
---
# React16 模拟输入框输入事件

照往常，我会新建一个input事件然后dispatch一下，今天在instagram上面试验失败了。原因是React16 内部定义了descriptor拦截了value.

```javascript
let input = $0;
let value = 'new value';

let event = new Event('input', { bubble: true });
event.simulated = true;

let tracker = input._valueTracker;
tracker && tracker.setValue(value);

input.value = value;
input.dispatchEvent(event);
```
