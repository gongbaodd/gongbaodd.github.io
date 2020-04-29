---
type: post
category: fe
tag:
  - threejs
  - JavaScript
  - webGL
---

# threejs 细化-创建一个 mesh、使用加载器、多个场景

记录下最近几天的事，终于 Dell 的维修把我电脑的风扇修好了，不过感觉 inspiron 的风扇设计有 bug，新风扇估计也撑不了多久，但愿只是我多疑了。另外通过神奇的某宝，我将我手上的小米平板二升级了内存和硬盘，考虑到 8GB 内存对于 Atom Z8500 这个 CPU 有点多余，于是升级到了 4GB + 128GB，到手之后果然比 2GB 流畅（当然肯定没法比酷睿了），所以这个配置还是比较推荐的。

回到主题，最近一周我都在使用 react-three-fiber 来学习 threejs，这里会做一个系列来详细整理一下。

## 创建一个 mesh

可以使用 JSX 创建 mesh, 因为 mesh 有 material 和 geometry 两个访问器，在 JSX 中可以作为属性使用。

```JavaScript
export default () => (
    <Canvas>
        <mesh
            name="mesh"
            material={new MeshBasicMaterial()}
            geometry={new BoxBufferGeometry(1, 1, 1)}
        />
    </Canvas>
);
```

当然作为参数也可以。

```JavaScript
export default () => (
    <Canvas>
        <mesh arg={[new BoxBufferGeometry(1, 1, 1), new MeshBasicMaterial()]}/>
    </Canvas>
);
```

官网还提供了一个绝妙的方法。

```JavaScript
// 实现不了，不知道咋回事儿
export default () => (
    <Canvas>
        <mesh>
            <boxBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" />
        </mesh>
    </Canvas>
);
```

另外因为 Canvas 里面的元素和 JSX 的绑定使用的是 memo，所以如果使用 primitive 定义元素的时候会丢。

```JavaScript
// 这么做虽然会渲染出来，但是Box有的时候会丢
const Box = new Mesh(
    new BoxBufferGeometry(1, 1, 1),
    new MeshBasicMaterial(),
);

export default () => (
    <Canvas>
        <primitive object={Box} />
    </Canvas>
);
```

## 加载器

加载 texture 时，可以使用`useEffect`自己写，当然也有更优雅的方法，利用 react 自己的`useMemo`或者`useCallback`，再就是使用 react three fiber 的`useLoader`。

```JavaScript
// 使用 useMemo
const Plane = () => {
    const texture = useMemo(() => new TextureLoader().load("xxx.jpg"), [])
    return <mesh
        material={new MeshBasicMaterial({map: texture})}
        geometry={new PlaneGeometry(1, 1)}
    />
}
```

```JavaScript
// 使用 useLoader
const PlaneAsync = () => {
    const [texture] = useLoader(TextureLoader, "xxx.jpg");

    return <mesh
        material={new MeshBasicMaterial({map: texture})}
        geometry={new PlaneGeometry(1, 1)}
    />
}

const Plane = () => (
        <Suspense fallback={<mesh />}>
            <PlaneAsync />
        </Suspense>
    )
```

## 使用多个场景

three react fiber 会默认给一个场景(scene)、一个摄像头(camera)还有一个渲染器(render)。可是如果我需要多个场景，比如建模工具往往会给一个正交视图以及正视图，这种情况就需要多个场景。

首先要使用`setDefaultCamera`将新建的摄像头代替默认摄像头。

```TypeScript
export default () => {
    const { setDefaultCamera } = useThree();
    const camera = useRef<PerspectiveCamera>();

    useLayoutEffect(() => camera.current && setDefaultCamera(camera.current), [])

    return <perspectiveCamera
      name="camera"
      ref={camera}
    />
}
```

接下来是创建场景，场景不需要代替原有场景，但是需要使用`useFrame`修改`render`方法。

```TypeScript
// 再原画面的左上角绘制场景
export default () => {
    const scene = useRef<Scene>();
    const {
        size: {left, top, width, height},
        camera,
    } = useThree();

    useFrame(({ gl }) => {
        gl.autoClear = true;
        gl.setScissor(left, top, width / 2, height / 2);
        gl.setViewport(left, top, width / 2, height / 2);

        scene.current && gl.render(scene, camera)
    }, 10);

    return (
        <scene ref={scene}>
            <mesh />
        </scene>
    );
}
```

这里`useFrame`的第二个参数表示它的优先级，值越高，越先渲染，这意味着比它优先级低的场景渲染之前要把`gl.autoClear`设置为`false`，以避免被清除。

## 其它

另外可以看看京东的一篇博客[凹凸实验室](https://aotu.io/notes/2018/10/18/cannonjs/index.html)。
