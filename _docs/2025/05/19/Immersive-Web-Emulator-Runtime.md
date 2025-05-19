---
type: post
category: fe
tag:
    - IWER
    - WebXR
    - babylonjs
---

# Immersive Web Emulator Runtime

[IWER](https://meta-quest.github.io/immersive-web-emulation-runtime/) is a developing tool for webXR. I am doing a [school project](https://jingles.vercel.app/), which uses webXR to make a campus tour.

I used MeshLab to cut the 3DGS model, and Google Camera to take panorama environment.

I tried three.js, babylon.js and R3F to test which one is suitable.

## Panorama

Babylon.js has its own panorama component `EquiRectangularCubeTexture`. Generating this uses a lot resources, make sure to use assetManager to load it the page will show a loading state.

```js
    const textureP = new Promise<EquiRectangularCubeTexture>(res => {
        const textureTask = assetManager.addEquiRectangularCubeTextureAssetTask(
            "sky",
            "./images/sky.jpg",
            2048,
        );
        textureTask.onSuccess = task => {
            task.texture.coordinatesMode = Texture.SKYBOX_MODE;
            res(task.texture)
        }
    })

    const eqTexture = await textureP;
    const hdrSkybox = MeshBuilder.CreateBox("hdrSkyBox", { size: 2000 }, scene);
    const hdrSkyboxMaterial = new PBRMaterial("skyBox", scene);

    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = eqTexture.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    hdrSkyboxMaterial.microSurface = 1.0;
    hdrSkyboxMaterial.disableLighting = false;
    hdrSkybox.material = hdrSkyboxMaterial;
    hdrSkybox.infiniteDistance = true;
```

While three.js and R3F do not have panorama support, a sphere geometry can be used, but the building will be tilted.

## 3DGS

Babylon.js also have its [official support](https://doc.babylonjs.com/features/featuresDeepDive/mesh/gaussianSplatting) for guassian splatting files `PLY`. But it has less customization options.

`import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic"` is needed to be imported.

```js
    const meshP = new Promise<AbstractMesh[]>(res => {
        const meshTask = assetManager.addMeshTask(
            "logo",
            "",
            "./models/",
            "logo.ply"
        )
        meshTask.onSuccess = task => {
            res(task.loadedMeshes)
        }
    })

    const result = await meshP;


    const mesh = result[0];
    mesh.position.y = -50.0;
    mesh.rotation.z = Math.PI;
    mesh.rotation.y = -280/360 * Math.PI;
    mesh.scaling.x = 100;
    mesh.scaling.y = 100;
    mesh.scaling.z = 100;
```

Three.js and R3F have no support for 3DGS. `useLoader` will load a weird Mesh. But you can make a point cloud with more customization.

```js
export default function GaussianPointCloud({ url }) {
  const geometry = useLoader(PLYLoader, url)

  const material = new THREE.PointsMaterial({
    size: 0.01,
    vertexColors: true,
  })

  return <points geometry={geometry} material={material} />
}
```

## Inspector

There is an [inspector](https://doc.babylonjs.com/toolsAndResources/inspector/) support in Babylon.js. It is much easier to visually put item in the scenes. `import "@babylonjs/inspector";` is needed.

While three.js and r3f's inspector is archived. There is [leva](https://github.com/pmndrs/leva) can be used as a [dat.gui](https://github.com/dataarts/dat.gui) in React.

## Request XR

In babylon, just config every thing in the scene setup. However, the `getEnabledFeature` can not correctly return the right type. And you do not need to care about others, the VR button will automatically added on screen.

```js

    const experience = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-vr",
        },
        optionalFeatures: true,
        floorMeshes: [ground],
    });
    experience.teleportation.addFloorMesh(ground);

    const teleportation = experience.baseExperience.featuresManager.getEnabledFeature(
        WebXRFeatureName.TELEPORTATION
    ) as WebXRMotionControllerTeleportation


    teleportation.onAfterCameraTeleport.add((targetPosition) => {
        console.log("Teleported to:", targetPosition);
    });
```

There is an [XR](https://pmndrs.github.io/xr/docs/getting-started/introduction) component that provides XR components for R3F. And To add the VRButton, you need to place the `VRButton` component in page, also in three.js.

Three.js also needs `gamepad-wrapper` from npm to add gamepad support.

## Text Render

`troika-three-text` can be used in three.js.

`earcut` is used as an injection in babylon.js.

## On Device Testing

Start a https server, if using vite, use mkcert plugin.

```js
export default defineConfig({
  plugins: [
    mkcert()
  ],
})
```

Also, there are many examples in babylonjs's playground, using [Caddy](https://caddyserver.com/) is a good option.

```ini
# Caddyfile
localhost:5000 {
 root * ./
 file_server
}
```

Using Meta Quest Link sometimes work. But it is better to use [port-forwarding in chrome](https://developer.chrome.com/docs/devtools/remote-debugging/local-server).

## PC Testing

This time, IWER is in use. There are some errors in the latest version, `"@iwer/devui": "^0.1.1"`,`"iwer": "^1.0.4"` is a workable version. But the movement is slow.

```js
import { XRDevice, metaQuest3 } from 'iwer';
import { DevUI } from '@iwer/devui';

  let nativeWebXRSupport = false;
  if (navigator.xr) {
    nativeWebXRSupport = await navigator.xr.isSessionSupported('immersive-vr');
  }
  if (!nativeWebXRSupport) {
    const xrDevice = new XRDevice(metaQuest3);
    xrDevice.installRuntime();
    xrDevice.fovy = (75 / 180) * Math.PI;
    xrDevice.ipd = 0;
    xrDevice.controllers.right?.position.set(0.15649, 1.43474, -0.38368);
    xrDevice.controllers.right?.quaternion.set(
      0.14766305685043335,
      0.02471366710960865,
      -0.0037767395842820406,
      0.9887216687202454,
    );
    xrDevice.controllers.left?.position.set(-0.15649, 1.43474, -0.38368);
    xrDevice.controllers.left?.quaternion.set(
      0.14766305685043335,
      0.02471366710960865,
      -0.0037767395842820406,
      0.9887216687202454,
    );
    new DevUI(xrDevice);
  }

```