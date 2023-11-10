---
type: post
category: fe
tag:
  - threejs
  - webgl
series:
  name: 细品threejs
  slug: threejs-howto
---

# threejs 细化-在网格上渲染，停止渲染，使用物理引擎

这是细化了解 threejs 的第二篇，[第一篇](/fe/2020/04/21/threejs细化-创建一个mesh、使用加载器、多个场景.html)

## 在网格上渲染

这里有一点类似于使用多个场景，设想如果想要做一个类似于水晶球的设计，水晶球有一个 scene1，水晶球自己又在另一个 scene0 里面，这里就需要使用 renderTarget 渲染 scene1 到水晶球上面。

先创建一个 target。

```typescript
const target = new WebGLRenderTarget(width, height);
```

再创建一个球，并使用 target 作为材料。

```tsx
const ball = () => {
  return (
    <mesh name="ball">
      <sphereBufferGeometry attach="geometry" args={[1, 32, 16]} />
      <meshPhongMaterial attach="material" map={target.texture} />
    </mesh>
  );
};
```

然后创建 scene1。

```ts
const scene1 = new Scene();
const camera = new PerspectiveCamera(75, 1, 0.1, 5, position: [0, 1, 2]);

{
  const light = new HemisphereLight();
  scene1.add(light);
}

{
  const mesh = new Mesh(
    new BoxBufferGeometry(1, 1, 1),
    new MeshPhongMaterial({ color: 0x8844aa }),
  );
  scene1.add(mesh);
}
```

貌似 react-three-fiber 的 render 函数也可以把 JSX 渲染成 scene。但是使用的时候告诉我需要创建 context，难道是要用 React.createContext? 感觉坑很多，所以暂时没有尝试，以后再补充这里。

```tsx
const scene = new Scene();
const context = createContext();

render(
  <>
    <perspectiveCamera />
    <hemishpereLight />
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
      <meshPhongMaterial color={0x8844aa} attach="material" />
    </mesh>
  </>,
  scene,
  context
);
```

好了，回到正题，现在需要在 target 上面渲染 scene1.

```ts
useFrame(({ gl }) => {
  gl.setRenderTarget(target);
  gl.render(scene1, camera); // 这里的camera是scene1里面的camera
  gl.setRenderTarget(null);
});
```

和渲染两个 scene 一样，不管打算渲染几个场景，实际的渲染器只有一个，所以渲染好 target 后还要把要渲染的目标换回来。

## 停止渲染

react-three-fiber 默认会一直渲染每一帧，而在网页上，我们往往不需要它一直耗费 GPU 时间，比如渲染好的动画，只需要它在特殊时间才运动，react-three-fiber 有一个 invalidateFrameloop 选项可以暂停渲染。

```tsx
<Canvas invalidateFrameloop />
```

另外`useThree().invalidate`也可以暂停渲染，但这个不太稳定，不确定是不是我的问题。

比如加载进来一个模型，想让它动画结束后就停止 GPU 渲染。

```tsx
const animate = useMemo(() => new AnimationMixer(obj));
const action = useMemo(() => {
  const act = animate.clipAction(obj.animations[0]);
  act.setLoop(LoopOnce, 1);
  act.enabled = true;
  act.clampedWhenFinished = true;
  act.play();
  return act;
}, []);

const { invalidate } = useThree();

useFrame((_, delta) => {
  animate.update(delta);
  if (!act.isRunning()) {
    invalidate();
  }
});
```

## 使用物理引擎

物理引擎是使用 webGL 最爽的部分，主要是不用考虑那些公式，这里用`Cannon.js`打个比方，（感动常在）。

首先创建世界，比如创建一个 z 轴加速度为 9.82 的世界，还需要 NaiveBroadphase 做碰撞检测。

```ts
const world = new World();
world.gravity.set(0, 0, -9.82);
world.broadphase = new NaiveBroadphase();
```

接下来创建一个物体，包括它的形状（shape）和在世界中的细节参数（body）。

```ts
const shape = new Sphere(1);
const body = new Body({ mass: 5, shape });
world.add(body);
```

接下来设置渲染的时间间隔。

```ts
useFrame(() => world.step(1 / 60)); // 单位秒
```

好了，那么怎么和 react-three-fiber 玩耍呢？其实可以写一个[useCannon](https://github.com/gongbaodd/webgl_demos/blob/dev/hooks/useCannon.tsx)。

但是考虑到有现成的 hooks，自己就不用写轮子了，[react-spring/use-cannon](https://github.com/react-spring/use-cannon)，他是用 web worker 跑的，性能肯定更好，直接看例子好了，白嫖真爽。

```jsx
import { Canvas } from "react-three-fiber";
import { Physics, usePlane, useBox } from "use-cannon";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
    </mesh>
  );
}

ReactDOM.render(
  <Canvas>
    <Physics>
      <Plane />
      <Cube />
    </Physics>
  </Canvas>,
  document.getElementById("root")
);
```
