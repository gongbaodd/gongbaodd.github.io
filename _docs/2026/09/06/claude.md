---
type: post
category: tech
tag:
    - LLM
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1788681048/claude-code-v0-86MxfNlRrfEltsvsMwQKkuaptKciLClI0-fCUKtdsSc_t31xc3.webp
    alt: Claude Code
---

# Week 35: Claude Code

From last month, I decided to readlly working on each of the AI agent harness, and the first one is Claude.

For the last few months, I have been working on Cursor with the IDE. So when I turned to Claude Code, the CLI tool, it became quite unstable. So after few hours, I turned to use the VScode extension.

Claude doesn't have so many model options to use. 

- Haiku, I barely use, quick but do not support auto, you should click accept everytime, but the lowest token cost.
- Sonnet, I used mostly, quick and can be used for daily routine, lower token cost.
- Opus, when I was using cursor, it was quite smart, but after one month I think Sonnet can do most of what I need, and cost more token
- Fable, it charges extra, but more smart as commercial says. However, I found it is quite rebellant.

I have talked to some developers. They like Fable and Opus, because they can teach them a lot. However, during the last month. For example, when I do the behavior test, I found that airtest does not support Unity's scroll behaviour. I told the model to do touch for few seconds then use the keyboard to control the scroller. However, Fable and Opus still tried to use all the win32 APIs of scrolling and swiping, after all the failure, they started to do my way, and finally worked. I was very pissed, because Fable was using the real money and did not listen to my order.

Besides the rebellion. Claude has 5h token limit and week token limit. Not like cursor, when you used up the token you can decide to charge. This limit at first I thought it was a good thing for me to pause. But when I have something urgent, it became like a burden.

And Cluade does not use the common `Agents.md`, I have to reference a new `Claude.md`, rules and skills, mostly linking files can be fine. It just left too many dot folders in the projects. 

## CC Switch

[CC Switch](https://github.com/farion1231/cc-switch) is a proxy that bridge Claude Code harness with other models. I tried DeepSeek and Qwen. It is surprised that the flash models can do more than what I expected. Compared with the cost, flash models listened to my order and cost only few dosens of cents(RMB). While the smarter ones they always try their own ideas first and wasted much of my money.

Now, I understand why Microsoft and Google only work on small models this year. Next month, I will try Codex.