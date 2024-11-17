---
type: post
category: tech
tags:
    - babylonjs
    - threejs
---

# Make Custom Texture in Babylon.js and three.js

This is the 2D Graphic homework. To make an UV map. But because blender is 3D Graphic's stuff. The teacher did not share more content.

So I wanted to make [a website](https://rolling-dice-eight.vercel.app/) to let students upload their UV maps to see the final result.

[The code](https://github.com/gongbaodd/all-the-demos/tree/main/dice) in here. There is also a [three.js version](https://github.com/gongbaodd/all-the-demos/tree/main/dice3/dice3).

The funny part, the uploaded image somehow became upset down. So I have to adjust the UV map, it is very hard, I literally don't know how to debug it.

```js
texture.uOffset = 0;  // Shift the texture horizontally
texture.vOffset = .25;  // Shift the texture vertically
```

I tried a lot number to get the right one. I think I should think a better solution in the future.