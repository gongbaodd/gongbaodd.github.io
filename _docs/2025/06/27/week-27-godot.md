---
type: post
category: plan
tags:
  - godot
---

# Week 27: Godot

This week I was working on a game, [landlord simulator](https://github.com/gongbaodd/landlord-simulator). I mentioned last week that I was building a CI. base on the CI data, I realized that the most used version of Godot is 4.3.

## External Editor

Godot editor provides its own editor, however, I prefer to use Visual Studio Code. `Editor Settings -> Text Editor -> External Editor`, choose your vscode position, add `Exec Flags` to `{project} --goto {file}:{line}:{col}`.

## Dialogue System

I use [Dialogue Nodes](https://github.com/nagidev/DialogueNodes). 

## Animation Tree

Godot provides a powerful animation system. The document sucks. 


## Caveats 

The build result may not be as expected. Sometimes the online release version is different from my local release version. That means the engine is still not stable enough
