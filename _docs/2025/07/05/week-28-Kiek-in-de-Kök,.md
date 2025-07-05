---
type: post
category: plan
tags:
    - godot
    - figma
    - zeplin
    - Qwen
    - LLM
    - Midi
    - SFX
---

# Week 28: Kiek in de Kök, Tallinn

## Kiek in de Kök

This week I went to the Kiek in de Kök museum in Tallinn, Estonia. This museum is located in one of the towers in Tallinn's old town. At first， I thought it was just a tower, but it is an entrance of the old town wall. When you finished the wall tour. There is an underground tunnel, which was built from the sweden occupation period. And the tunnel was continued to be built through hundreds of years. So, many different styles are added to this tunnel.

Through this small museum, you can walk around the old town both upper on the wall and underground. Such an amazing experience.

## Experience on Godot development

Last week I was working with Godot 4.3.

As a JIT script, Godot script is still unstable. I met one circular dependency issue. For such kind of issue, they were already fixed in JavaScript or Python dozens years ago. And, the type system is not strict enough, which cause many errors in build time. while the headless mode does not throw any error.

The community prefer singleton pattern. This pattern makes unit test difficult. So major plugins are not tested.

Last week I changed Dialogue Nodes plugin to Dialogue Manager plugin. Just because Dialogue Nodes may cause build error. And since build error can not throw errors. The error will be found online.

However, the animation system and the canvas system are interesting. Though the documents are terrible. The animation system is like an advanced blender's animation system. It is very powerful.

About sound effects, there is a JS framework [ZzFX](https://github.com/KilledByAPixel/ZzFX) that generates sound effects. There is also an [online sequencer](https://onlinesequencer.net/) to make MIDI music.

## Figma

This week I got a job and lost the job. I was asked to teach Figma in school's summer camp. However, the old teacher find his time to teach. So I lost the job. While I still digged some good practice in Figma.

- [DesignDoc Spectral](https://www.figma.com/community/plugin/1177722582033208360/designdoc-spectral-measures-annotations-and-handoff), This generates design document from frame
- [html.to.design](https://www.figma.com/community/plugin/1159123024924461424/html-to-design-by-divriots-import-websites-to-figma-designs-web-html-css), This plugin can import web pages to Figma.
- [Lorem Ipsum](https://www.figma.com/community/plugin/736000994034548392/lorem-ipsum-by-divriots), This plugin can generate text in Figma.
- [unsplash](https://www.figma.com/community/plugin/738454987945972471/unsplash), This plugin can import images from unsplash to Figma.
- [dev mode](https://www.figma.com/community/plugin/1494328067634197406/dev-mode), It is better than design document plugin.
- [kigen](https://kigen.design/), This generates color palette for Figma.
- [Zeplin](https://www.zeplin.io/), This is a design handoff tool. 

## AI

[MNN Chat](https://deepwiki.com/alibaba/MNN/7.1-ios-llm-chat-app) is a local LLM chat app that can be installed on phone.
