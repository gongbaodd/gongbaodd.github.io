---
type: post
category: tech
tag:
    - localization
    - Unity
---

# Week 7: Mastering Localization in Unity

Last week, I dove deep into the world of localization for **[Grandpa's Bee Haven](https://store.steampowered.com/app/3209160/Grandpas_Bee_Haven/)** 🍯🐝. To many, localization seems like a simple 1:1 mapping of words. However, once you start implementing it, you realize there is **so much** more to consider! 🤯

I’m using Unity's official **[Localization Package](https://docs.unity3d.com/Packages/com.unity.localization@1.5/manual/index.html)**. It’s fantastic because it supports CSV and Google Sheets, allowing translators to work their magic without ever having to touch the Unity Editor! 📊✨

---

## 🎨 Step 1: Creating the Fonts

In game dev, your first hurdle is rasterizing fonts. For our project, we chose **[Google's Noto Sans](https://fonts.google.com/noto)** 🅰️. It’s open-source and supports almost every language we need. 🌏

**The Setup:** Download these `.ttf` files:

* ✅ NotoSans-Regular
* ✅ NotoSansSC-Regular (Simplified Chinese)
* ✅ NotoSansTC-Regular (Traditional Chinese)
* ✅ NotoSansJP-Regular (Japanese)
* ✅ NotoSansKR-Regular (Korean)

⚠️ **Pro-Tip on Padding:** I noticed that with a **5px padding**, Latin letters looked blurry in-game. Switching to **10px** fixed it! However, 10px assets for CJK fonts are massive (over 100MB! 😱), so I kept CJK at **5px**. Luckily, blurriness is much less noticeable on complex CJK characters.

### ✨ TextMeshPro Font Asset Creator Settings

Go to `Window -> TextMeshPro -> Font Asset Creator` and use these specs:

| Language | Resolution | Padding | Character Set / Unicode Range |
| --- | --- | --- | --- |
| **Latin** | 1024x1024 | 10px | Extended ASCII |
| **Cyrillic** | 1024x1024 | 10px | `400-4FF, 500-52F` |
| **Greek** | 1024x1024 | 10px | `370-3FF, 1F00-1FFF` |
| **Latin Extended** | 1024x1024 | 10px | `0100-017F` |
| **Japanese** | 4096x4096 | 5px | Hiragana, Katakana, Katakana Extensions, Full-width forms, Kanji (`3040-309F,30A0-30FF,31F0-31FF,FF00-FFEF,4E00-9FFF`) |
| **Korean** | 4096x4096 | 5px | `1100-11FF, 3130-318F, AC00-D7AF, FF00-FFEF` |
| **Simp. Chinese** | 4096x4096 | 5px | [3500 Common Characters](https://gist.github.com/jjgod/1432945) |
| **Trad. Chinese** | 4096x4096 | 5px | `4E00-9FA5, FF00-FFEF` |

**The Result:** You’ll end up with a library of SDF assets. Select your main font (NotoSans-Regular SDF) and in the **Inspector**, add all the other SDFs to the **"Fallback Font Assets"** list. Unity will now automatically swap to the correct font when it sees a specific character! 🧠💡

---


## 📦 Working with the Package

The [official guide](https://docs.unity3d.com/Packages/com.unity.localization@1.5/manual/QuickStartGuideWithVariants.html) is great for the basics, but here’s my workflow:

1. **UI Elements:** It’s incredibly easy! Click the three dots (context menu) on any **TextMeshPro** component -> Click **Localize**.
2. Unity adds a `Localize String Event` automatically.
3. Just pick your string from the table, and you're done! 🎯

**For the Coders 💻:** Use `LocalizedString` to reference your entries and call `GetLocalizedString()` to fetch the data:

```csharp
public class ItemInfo
{
    private readonly LocalizedString rawName;

    public string Name
    {
        get => rawName.GetLocalizedString();
    }
}

```

📺 **Need a visual?** This YouTube video is an excellent resource: [Unity Localization Tutorial](https://youtu.be/NFn74l2WA_8?si=1WhWmn2oaLxLlZrG).


## ☁️ Google Sheets Integration

The official [Google Sheets Service Provider guide](https://docs.unity3d.com/Packages/com.unity.localization@1.5/manual/Google-Sheets-Sheets-Service-Provider.html) is very detailed.

I opted for **OAuth** for [authentication](https://console.cloud.google.com/apis/credentials). By setting the API to "Testing" mode, I can strictly limit access to specific user accounts. Even if someone gets hold of the OAuth credentials, they can't access the data without being on the allow-list. Safety first! 🔒🛡️

---

Is this over? No, there are very long words in different languages, these have to be polished manually. 😅








