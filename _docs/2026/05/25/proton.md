---
type: post
category: fe
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1779700322/Screenshot_20260525_120028_fm3doc.png
    alt: grandpa's bee haven
series:
    name: Grandpa's bee Haven
    slug: grandpa-bee
---

# 🐧 Support Proton Environment

Yes, I am done implementing the transparent background support for **Linux**. Now, I have started adding a specific background for it.

As most game players are using **Proton 10** as their compatibility layer, the code may detect the platform as **Windows** 🪟. However, Proton exposes a `wine_get_version` function to retrieve the Proton version. This function is only callable within a Proton environment.

Therefore, we can use the following script to manage the background:

```csharp
[DisallowMultipleComponent]
public class LinuxBackgroundCanvas : MonoBehaviour
{
    // 🔍 Import the wine_get_version function from ntdll.dll
    [DllImport("ntdll.dll", EntryPoint = "wine_get_version", CallingConvention = CallingConvention.Cdecl)]
    private static extern IntPtr WineGetVersion();

    private void Awake()
    {
        // 🚫 Disable the canvas if the environment is neither Linux nor Proton
        if (!IsLinuxOrProton())
        {
            gameObject.SetActive(false);
        }
    }

    private static bool IsLinuxOrProton()
    {
        try
        {
            // 🛠️ Check if the Proton function returns a valid pointer
            return WineGetVersion() != IntPtr.Zero;
        }
        catch (DllNotFoundException)
        {
            return false;
        }
        catch (EntryPointNotFoundException)
        {
            return false;
        }
        catch (Exception)
        {
            return false;
        }
    }
}
```

🎨 For the background asset, I used the [Free Sky with Clouds Background Pixel Art Set](https://craftpix.net/freebies/free-sky-with-clouds-background-pixel-art-set/?num=1&count=41&sq=sky&pos=4).

## 📸 Result

![Result](https://res.cloudinary.com/dmq8ipket/image/upload/v1779700322/Screenshot_20260525_120028_fm3doc.png)
