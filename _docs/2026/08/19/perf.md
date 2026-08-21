---
type: post
category: fe
tag:
    - performance
series:
    name: Grandpa's bee Haven
    slug: grandpa-bee
---

# I Improved 25% Performance of Our Game

[Grandpa's Bee Haven](https://store.steampowered.com/app/3209160/Grandpas_Bee_Haven/), the first game I made in Estonia, is now in public testing, click the link and request for testing now ~ We wish you can tell us what you like, what you wish to add, what you dislike.

Performance in game is a huge topic. Because the goals of different genre varies. A 3D shooting game may focus on high FPS rate while our idle game should focus on low resource usage.

## Memory allocation

Firstly check the redundant packages, some packages only used in editor, but they were incidentally included in the package.
For example, we have nuget included in the game, it used about 20MB of the virtual machine memory.

Unity's memory profiler is a nice tool to capture the memory usage.

![memory profiler](https://res.cloudinary.com/dmq8ipket/image/upload/v1787058676/memoryprofiler_ulqxv8.png)

### CJK Fonts

Earlier this year, I made a [post](/tech/2026/02/23/unity-localization) about localization. That method may cause some memory issues. As the method is to bake all the commonly used characters into font assets and allocate as fallback of the Latin fonts. The fonts will be firstly allocated in the memory. Then in [the post](/tech/2026/03/02/unity-localization) that talking about language selection. This will cause a spike of memory allocation as the list will include all the font assets.

So, in our project, there are three things to do:

- Bake the language names into new assets
- Bake the characters on demand, only the needed characters not the common characters
- Make the fonts addressable

I was very surprised that the CJK improvement was not very obviously, when I checked the Unity Object capture of the entry scene. The improvement was only 100KB.

However, the fonts are more clear now.

### Sound

The sounds are messy. Most of them were mp3 files, they are decompressed in memory. Some background music after decompressed can be several hundreds of MBs.

I changed them all to wav files.