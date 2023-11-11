---
type: post
category: plan
tag: 
    - GaN charger
    - Astro
    - Katex
    - Remark
    - Apple Watch
    - Proxmox
    - Favicons
    - Tailwind
    - WSL
    - Fonts
    - React Native
---

# Week 45: 2023年双十一

## What I bought

Bougt a GaN charger, because I do not have enough type-c charger. 

## Astro

Turns out there are a lot strict rules in astro, for instance, [RSS feed rules](https://www.npmjs.com/package/@astrojs/rss#rssfeeditem). The web world is becoming more and more strict. I kind like how it goes. 

### Katex on Astro

[This blog](https://ileumas.com/writing/2022/03/astro-math-katex/) shares the config to use katex on astro. The latest version is not correct, should use the correct `remark-math` package for `remark`.

## Remark

By reading [Awesome Remark](https://github.com/remarkjs/awesome-remark), found some interesting plugins.


## Apple Watch & React Native

Just a little research, here is the [link](https://www.coditation.com/blog/guide-101-apple-watch-app-development-and-integration-with-react-native?ssp=1&darkschemeovr=1&setlang=en-US&safesearch=moderate).

## Proxmox

Proxmox is a VM that can share the GPU with the host. Sadly, it could only work as a server, meaning that it need at least two machines.

## Favicons

[Real favicon generator](https://realfavicongenerator.net/) packs a zip for all icons work for web and mobile.

## Tailwind

This is a nice [cheatsheet](https://tailwindcomponents.com/cheatsheet/) for tailwind CSS.

## Share Windows fonts for WSL

[This](https://x410.dev/cookbook/wsl/sharing-windows-fonts-with-wsl/) is a workable solution. Run `sudo fc-cache -r -v` to make it work, sometimes WSL need to restart.
