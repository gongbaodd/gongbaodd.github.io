---
type: post
category: tech
tag:
    - AI
---

# Token Monitor

This month, I resubscribed claude, I want to do some blender stuff, I had a very good experience with claude when [digitalize vana Tallinn](/fe/2026/04/17/terrain/), but I regreted immediately one day after.

I have a project to translate pdfs into English and Chinese side by side version. It used to use codex to do translation. With the luna model, it barely costs me any credits. 
While this time I use claude run the project. Claude suggested me to use Anthropic API instead. Then it told me that Anthropic API is not inclusive in the Claude subscription, it will use `claude -p` as an alternative. After a whole afternoon, it used up all the 5h limit with Sonnet 5.5...
In retrospect, it told me it's better to use Haiku. Unbeleivably, I suggested it to use Haiku, but got rejected...

Anyway, after a chaos day, I have to find an unified credit limit monitor. After like few minutes of research. I found [Token Monitor](https://javis-ai.com/token-monitor/?lang=en). It supports claude, codex, grok, cursor, copilot, antigravity, deepseek and so many other platforms. Token Monitor's linux package is AppImage, it is also published on [AUR](https://aur.archlinux.org/packages/token-monitor-bin). 