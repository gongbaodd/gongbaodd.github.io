---
type: post
category: tech
---
# YKnytt

I used to introduce [Knytt Stories](/plan/2025/03/07/week-10-knyttstories) in my blog. It is a platformer game with a level editor. However, it is only available on Windows. But there is a rewrite called [YKnytt](https://github.com/youkaicountry/yknytt) that is written in Godot, and supports Web build.

I added my level [Neon Night](https://gongbaodd.itch.io/neon-night) to the game, and everything works fine. The default levels are hard coded in file`/knytt/ui/LevelSelection.cs`.

```c#
    private void loadDefaultWorlds()
    {
        binLoad("res://knytt/worlds/Nifflas - The Machine.knytt.bin");
        binLoad("res://knytt/worlds/Nifflas - Gustav's Daughter.knytt.bin");
        binLoad("res://knytt/worlds/Nifflas - Sky Flowerz.knytt.bin");
        binLoad("res://knytt/worlds/Nifflas - An Underwater Adventure.knytt.bin");
        binLoad("res://knytt/worlds/Nifflas - This Level is Unfinished.knytt.bin");
        binLoad(OS.GetName() == "HTML5" ? MainMenu.WEB_TUTORIAL_PATH :
                TouchSettings.EnablePanel ? MainMenu.TOUCH_TUTORIAL_PATH : MainMenu.TUTORIAL_PATH);
    }
```

And when exporting the project, the `worlds` folder needs to be included in the export settings. 