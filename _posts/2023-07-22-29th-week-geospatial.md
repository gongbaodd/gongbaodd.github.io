---
type: post
category: plan
---
# 29th week: Google Geo-Spatial

## Google Geo-Spatial

Firstly, I didn't get the permission, this API is not opened for mainland China. I need a abroad VISA card.

This is [a slideshow](https://www.docswell.com/s/FumiyaHr/56YG27-2023-05-18-221638#p6) to introduce it.

This is [the official document](https://developers.google.com/ar/develop/geospatial). [This](https://developers.google.com/ar/develop/unity-arf/geospatial/streetscape-geometry) is about using google geo-spatial on unity. It is based on [AR Foundation](https://developers.google.com/ar/develop/unity-arf/getting-started-ar-foundation).

These are some [samples](https://github.com/google-ar/arcore-unity-extensions/tree/master/Samples~).

This is an [ARCore official page](https://developers.google.com/ar/geospatialcreator).

[Earth Studio](https://www.google.com/earth/studio/) uses google geo-spatial to build Video assets.

This is a google's WebXR [tutorial](https://developers.google.com/ar/develop/webxr/hello-webxr), I'll check it out this week.

Also, here is some webXR [tutorial](https://doc.babylonjs.com/features/featuresDeepDive/webXR/WebXRSelectedFeatures
) in [babylon.js](https://doc.babylonjs.com/features/featuresDeepDive/webXR/webXRARFeatures).

## use Babylon editor and react-babylon.js

The Babylon editor uses CANNON as physical engine, before importing, I need to inject it.

``` js
BabylonFileLoaderConfiguration.LoaderInjectedPhysicsEngine = CANNON;
```

And the asset should be relatively put in the `root_dir`.

```js
SceneLoader.AppendAsync(`${root_dir}`, "scene.babylon", scene);
```

## OpenFaas

This is a new world to me, I found an ebook, [Kubernetes 中文指南](https://jimmysong.io/kubernetes-handbook/). I don't have time to read it yet.

## GASP

[GASP](https://greensock.com/gsap/) is an animation library, I heard from [@WawaSensei](https://www.youtube.com/@WawaSensei). He's got some nice shader [tutorials](https://www.youtube.com/watch?v=e2ntx-fyXaE) I want to learn.

## Face tracking on WebXR

Currently, Face tracking is not supported in WebXR. This is a 3rd party library [mind-AR.js](https://medium.com/web-augmented-reality-development/webar-face-tracking-with-10-lines-of-code-18c5f24a0e38) that supports it.

## Swift on Linux

This is a page about [swift on linux](http://swift-linux.refi64.com/en/latest/index.html). It seems only [Vapor](https://vapor.codes/) is still alive now (as a web server).

## 3D LUT File

LUT file(look up table) is a file that contains color correction data. It is used in video editing. [Adobe Premiere](https://www.makeuseof.com/adobe-premiere-how-to-export-lut/) can export it.

## Video with depth

This is a [script](https://github.com/jankais3r/Video-Depthify) in Codelab to make depthify video. I can also use [stable diffusion](https://github.com/thygate/stable-diffusion-webui-depthmap-script) to make one.

## Lottie

[Lottie](https://lottiefiles.com/featured) is a SVG animation tool. Differences between Lottie and Rive is in this [document](https://rive.app/blog/rive-as-a-lottie-alternative). 

## React v18

useSyncExternalStore is a new react hook in v18. It can be used observe an element outside react environment

```js
let data = {w: 0, h: 0};
const subscribe = snap => {
    window.addEventListener('resize', snap);
    () => window.removeEventListener('resize', snap);
}

const snapshot = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w !== data.w || h !== data.h) {
        data = {w, h};
    }
    return data
}
const Component = () => {
    const {w, h} = useSyncExternalStore(subscribe, snapshot);
}
```

Suspense is updated to support data fetching.

```js
let data = null
let promise = null
const Suspender = () => {
    if (data === null) {
        if (promise === null) {
            promise = fetch('url').then(res => res.json()).then(res => {
                data = res;
                promise = null;
            });
        }
        throw promise;
    }
    return <div>{data}</div>
}

const Component = () => {
    return (
        <Suspense fallback={<div>loading</div>}>
            <Suspender />
        </Suspense>
    )
}
```

## react-babylon.js

I've finished the examples in [react-babylon.js](https://brianzinn.github.io/react-babylonjs/). I will try webXR next week. Still, there are some stuff I don't understand. Like [pbrMaterial](https://www.youtube.com/watch?v=CRg8P1Af1M0&ab_channel=Babylonjs), reflectionFresnelParameters, arcRotateCamera, and mesh-lookat.

## Next week

I'll try Google's webXR tutorial, and the babylon one.

I'll continue the tensorflow tutorial. And the rust on android one.

I'll try to compare Remix and Next.js.