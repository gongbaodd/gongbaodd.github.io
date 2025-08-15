---
type: post
category: plan
tag:
  - godot
cover:
  url: https://cdn2.unrealengine.com/godot-fb-tw-share-image-1920x1080-0abe26cbac38.jpg
  alt: godot image from epic store
---

# Week 27: Godot

This week I was working on a game, [Landlord Simulator](https://github.com/gongbaodd/landlord-simulator).  
Last week I mentioned I was setting up a CI pipeline—based on the CI data, I found that the most used version of Godot right now is **4.3**.

## External Editor

Godot comes with its own built-in editor, but I prefer Visual Studio Code.  
To set it up, go to:

`Editor Settings -> Text Editor -> External Editor`  

Then select the path to your VS Code executable, and set **Exec Flags** to: `{project} --goto {file}:{line}:{col}`.

## Dialogue System

For dialogue, I’m using [Dialogue Nodes](https://github.com/nagidev/DialogueNodes).

## Animation Tree

Godot has a powerful animation system… but the documentation isn’t great.

## Caveats

The build results may not always match your expectations.  
Sometimes the online release build is different from my local release build—so the engine still feels a bit unstable at times.