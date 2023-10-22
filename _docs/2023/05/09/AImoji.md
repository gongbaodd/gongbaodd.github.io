---
type: post
category: tech
---

# AImoji

you can download the model of [AImoji](https://civitai.com/models/23111/aimoji-memoji-model), put in stable diffusion's model folder. Using `memoji of xxx` as prompt to generate a memoji.

But I want to use it generating my photo, I need to merge my old model with it. That means I have to use extra 4GB for the new model. But I can make a Lora. Using [Kohya's GUI](https://github.com/bmaltais/kohya_ss), with the AImoji model, I can simply make one Lora, then put it to the statble diffusion's Lora folder.

using Lora prompt, now I can combine two model without retraining.
