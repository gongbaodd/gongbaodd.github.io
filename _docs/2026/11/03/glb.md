---
type: post
category: fe
tag:
    - AI
    - 3D
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1793730299/HWMUF4HXIAAR-n1_nksckb.jpg
    alt: blender mcp
---

# Week 44: AI generated GLBs

Since GPT-6 Astra's comercial went viral in the Internet. 
Using Code LLM to generate 3D models is becoming an alternative to the diffusion generated 3D models.
However, it was too token costy, one plus subscription can not finish 2 objects in the 5 hour credit limit.

At that time, I sighed on twitter that maybe in the future. Using threejs to generate GLB files and adjust in side unity will become a new trend.

And only about one month, [ccore/Qwen3.5-4B-GLB-3D-Coder](https://pirateface.co/ccore/Qwen3.5-4B-GLB-3D-Coder) published. This one can run inside of an M4 Macmini(16GB).
The core idea is to generate threejs code base on the prompt. Then export the model from webpage. I used the following prompt.

> Create a village blacksmith wearing a blue apron.

## Qwen 3.5

![Qwen result](https://res.cloudinary.com/dmq8ipket/image/upload/v1793730300/HWMB5sWWMAAKLv-_g5ohsq.jpg)

The result is not too bad. Yet it is still not acceptable, like 40/100.

## Blender script

Then I tried to use Claude Sonnet 5.5 medium to run blender script with the same prompt.

![blender script result](https://res.cloudinary.com/dmq8ipket/image/upload/v1793730299/HWMT88AWcAAeq3O_ba4nat.jpg)

The result still not acceptable, like 50/100. But it only took me like 1% of my 5h credit usage(Claude Pro).

## Blender MCP

Claude support install blender MCP in Customize. Before using it, remember to install [the blender MCP addon](https://www.blender.org/lab/mcp-server/). 
There is a cummunity version, do not mess up.

![blender MCP result](https://res.cloudinary.com/dmq8ipket/image/upload/v1793730299/HWMUF4HXIAAR-n1_nksckb.jpg)

Although it added extra light, the result still like 50/100. And MCP costs like 3% of the credit limit.

## Extra Research

Obviously, the prompt was too short. So I did some research.

One is from Bilibili, [西高君-AI生成3D游戏场景/Codex+Blender三维模型方法/HD-2D·原来如此简单！](https://www.bilibili.com/video/BV1T8aD6qEeg/?share_source=copy_web&vd_source=0161e564e6ea2247143fd95f4d81e6c0)

And [ZZ是画渣-不用GPT-6！本地模型操作Blender建模教程，0元复刻GPT-6的相同效果？](https://www.bilibili.com/video/BV1MfYu68E73/?share_source=copy_web&vd_source=0161e564e6ea2247143fd95f4d81e6c0)

I will report my tests on their methods in the future posts.