---
type: post
category: plan
---

# 27th week: AUS 462

This week I applied AUS 462 visa, wish I can get it soon.

## React-BabylonJS

I finished the basic part. In the tutorial, position in terrain is no longer supported. And EngineView, which renders viewport on different canvases, is not supported. Snippet is a way to call shader from babylon server, but I don't want to use that.

## VSCode extension

[Import Cost](https://citw.medium.com/keep-your-bundle-size-under-control-with-import-cost-vscode-extension-5d476b3c5a76#:~:text=Enter%20Import-Cost%20Import-Cost%20is%20a%20Visual%20Studio%20Code,for%20that%2C%20some%20of%20them%20are%20stated%20above.) calculates the size of imported packages.

## Some git errors

I bumped into a git error, some corrupted files in .git/objects. A simple way is just delete them.

```shell
find .git/objects/ -size 0 -delete
```

Dangling objects are tricky, [this](https://mirrors.edge.kernel.org/pub/software/scm/git/docs/user-manual.html#recovering-from-repository-corruption) is the official solution.

## SwiftUI

I learnt some basic knowledge about SwiftUI. Still don't know why people say it's elegant.

## CSS3DRenderer

ThreeJS can use CSS as it's renderer. These are some examples:

- [3D Youtube](https://threejs.org/examples/#css3d_youtube)
- [CSS sprites](https://threejs.org/examples/?q=CSS#css3d_sprites)

## Video Tutorials

Finished [The Net Ninja's Flutter Tutorial](https://www.youtube.com/watch?v=1ukSR1GRtMU&list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ&pp=iAQB)

Watching [The Net Ninja's GraphQL Tutorial](https://www.youtube.com/watch?v=xMCnDesBggM&list=PL4cUxeGkcC9gUxtblNUahcsg0WLxmrK_y&pp=iAQB) now.

planing to watch [TensorFlow 2.0 Course in Free Code Campus](https://www.youtube.com/watch?v=tPYj3fFJGjk&t=114s)

and [Rafa Tec XR's web XR tutorial](https://www.youtube.com/watch?v=uJ2ikVUXKBw) is in planing too.