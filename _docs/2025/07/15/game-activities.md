---
type: post
category: fe
tag:
    - android
    - godot
    - unity
cover:
    url: https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK6dxV8hsDXdBTwRvrRSk2nilKJc3owJh48S2PjczAxYRjVHafZaAacwa-gN3LB9M8gqX5xsWcvuQmJypyyckWEWjVU-RCfErdYlDBchmQBvqy7SXo1A-VILCSeHRGymBJAJOaor8C5bA/s0/192107754__34085217__148018.png
    alt: android icon in developer.android.com
---

# Game Activities in Android (Unity/Godot)

Both Unity and Godot support **Android plugins**, and their projects can be embedded as **Activities** inside an Android app.  

From my experience (and I admit, I’m not great at linking dependencies), Unity has a more streamlined approach — but the final app experience still isn’t ideal.

## Unity

There’s an excellent, detailed guide here: [Unity Android Integration: The Complete Guide](https://youtu.be/rB52ild5A9U?si=w7sP_RPIU7kl0A6_).  

The biggest issues I faced were related to **SDK version mismatches** and **environment variable setup**.  

You can find the example project [here](https://github.com/onedevapp/Unity_Integration_In_Android). Unity also offers an [official sample](https://github.com/Unity-Technologies/uaal-example/blob/master/docs/android.md) that can be used as a template.

One caveat: when running the Unity activity, you’ll still see the Unity splash screen **every single time**.

## Godot

Godot recently added Android plugin support, but the documentation is still lacking.  

I couldn’t get [the sample project](https://github.com/m4gr3d/Godot-Android-Samples/tree/master) to run, but in theory, the Godot player acts as a runner for `.pck` files, which feels simpler than Unity’s approach.

## Conclusion

In practice, I think the **WebGL route** is used far more often than embedding game engines as Android activities.
