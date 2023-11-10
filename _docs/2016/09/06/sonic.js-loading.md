---
type: post
category: fe
---

# sonic.js制作盾牌形状loading

## 如图

<img src="http://ww1.sinaimg.cn/thumb300/89d0a2e1jw1f7k2y2x1h7j20qo0qowha.jpg" style="background:#000;">

---

```javascript
var circle = new Sonic({

    width: 50,
    height: 50,
    padding: 50,
    strokeColor: 'white',

    pointDistance: .01,
    stepsPerFrame: 7,
    trailLength: .95,
    fps: 30,

    step: 'fader',
    fillColor: 'white',

    setup: function() {
        this._.lineWidth = 3;
        this._.lineCap = 'round';
        this._.lineJoin = 'round';
    },

    path: [
        ['bezier', 0, 0, 30, -10, 0, 5, 30, -5],
        ['bezier', 30, -10, 60, 0, 30, -5, 45, 0],
        ['line', 60, 0, 60, 45],
        ['bezier', 60, 45, 0, 45, 30, 70, 30, 70],
        ['line', 0, 45, 0, 0]
    ]

});

circle.play();
```
