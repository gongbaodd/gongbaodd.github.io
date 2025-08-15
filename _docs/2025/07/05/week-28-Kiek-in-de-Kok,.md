---
type: post
category: plan
tag:
    - godot
    - figma
    - zeplin
    - Qwen
    - LLM
    - Midi
    - SFX
cover:
    url: https://linnamuuseum.ee/wp-content/uploads/2023/05/neitsitorn.jpg
    alt: image from linnamuuseum.ee
---

# 🏰 Week 28: Kiek in de Kök, Tallinn

## Kiek in de Kök

This week I visited the **Kiek in de Kök** museum in Tallinn, Estonia. Located in one of the old town’s towers, it’s much more than just a tower! It’s part of the **old town wall**, and after finishing the wall tour, you can explore an **underground tunnel** built during the Swedish occupation and extended over hundreds of years — different styles layered through time.  

Walking **above the wall** and **through the tunnels** gives a really immersive glimpse into history. Such an amazing experience! 😲

## Godot Development Experience

Last week, I worked with **Godot 4.3**.  

- As a JIT script, **GDScript** can be unstable. I hit a circular dependency issue — something that languages like JS or Python fixed decades ago.  
- The **type system isn’t strict enough**, so some errors only show at runtime, and headless mode doesn’t always catch them.  
- The community prefers **singleton patterns**, which makes unit testing difficult, so major plugins often aren’t tested.  

I switched from **Dialogue Nodes** to **Dialogue Manager** because the former sometimes caused silent build errors.  

That said, the **animation** and **canvas systems** are fantastic. The animation system feels like an advanced Blender system — very powerful, even if the documentation is rough.  

### Sound Effects & MIDI

- **[ZzFX](https://github.com/KilledByAPixel/ZzFX)** – a JS framework to generate sound effects.  
- **[Online Sequencer](https://onlinesequencer.net/)** – handy for making MIDI music. 🎵  

## Figma Insights

I got a temporary job teaching Figma in a summer camp… but lost it when the original teacher returned 😅. Still, I explored some great Figma tools:  

- **[DesignDoc Spectral](https://www.figma.com/community/plugin/1177722582033208360/designdoc-spectral-measures-annotations-and-handoff)** – generate design docs from frames  
- **[html.to.design](https://www.figma.com/community/plugin/1159123024924461424/html-to-design-by-divriots-import-websites-to-figma-designs-web-html-css)** – import webpages into Figma  
- **[Lorem Ipsum](https://www.figma.com/community/plugin/736000994034548392/lorem-ipsum-by-divriots)** – generate placeholder text  
- **[Unsplash](https://www.figma.com/community/plugin/738454987945972471/unsplash)** – import stock images  
- **[Dev Mode](https://www.figma.com/community/plugin/1494328067634197406/dev-mode)** – better than the design document plugin  
- **[Kigen](https://kigen.design/)** – generates color palettes  
- **[Zeplin](https://www.zeplin.io/)** – for smooth design handoffs  

## AI & LLMs

- **[MNN Chat](https://deepwiki.com/alibaba/MNN/7.1-ios-llm-chat-app)** – a local LLM chat app that runs on your phone 🤖  

