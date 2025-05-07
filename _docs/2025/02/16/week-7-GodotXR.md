---
type: post
category: plan
tag:
    - Godot
---

# Week 7: Godot XR

This week I was doing a [Godot XR GameJam](https://itch.io/jam/godot-xr-game-jam-feb-2025). By doing this gamejam, I wanted to learn a little godot.

## Godot XR

[Godot XR toolkit](https://github.com/GodotVR/godot-xr-tools/wiki) provides almost the same functions as Unity. And they are very easy to use compared with Meta SDK. Strongly suggest to follow the wiki I provided before. There are plenty video [tutorials on youtube](https://www.youtube.com/@BastiaanOlij). But they are based on different versions of Godot. Every version of godot has different APIs. Even chatGPT can mess up.

I made a little shooting game, [Enchanted Magic](https://gongbaodd.itch.io/enchanted-magic). Player uses wand to shoot monsters in one minute.

Reckless, I found a collision bug, I guess so. As I shrink the wand's collision shape. It lost collision with the ground. And the editor crashes all the time. The 3rd day, every time I clicked, there will be a chance of crashing.
