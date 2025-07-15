---
type: post
category: fe
tags:
    - android
    - godot
    - unity
---

# Game Activities in Android (Unity/Godot)

Unity and Godot both support Android plugins. The Projects can be used as Activities in an Android App. As I mentioned I really not good at linking dependencies, the conclusion is that, unity has a better practice, but the App experience is still not good.

## Unity

There is a video, [Unity Android Integration: The Complete Guide](https://youtu.be/rB52ild5A9U?si=w7sP_RPIU7kl0A6_). It is very detailed. However the problem in linking is about SDKs' versions and environment variables. The project can be found [here](https://github.com/onedevapp/Unity_Integration_In_Android). Unity also provides [sample project](https://github.com/Unity-Technologies/uaal-example/blob/master/docs/android.md) can be used as a template.

When running the activity, you still can see the Unity splash screen every time.

## Godot

Godot recently supports Android plugins, there is not a document for that. However, I have not been able to run [the example project](https://github.com/m4gr3d/Godot-Android-Samples/tree/master). However, the godot player should be a runner for godot's pck files. It feels more easier than Unity.

## Conclusion

I think the WebGL way is more used than the two above.