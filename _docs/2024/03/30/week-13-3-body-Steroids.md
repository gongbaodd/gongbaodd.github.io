---
type: post
category: plan
plan:
    - 3 body
    - steroids
    - LLama
    - MediaPipe
    - WTF Academy
    - Edge Impulse
    - solidity
---

# Week 13: 3 Body and Steroids

## Netflix's Three Body Problem

Finally, The Three Body Problem is on Netflix. I used most of this week to watch the 8 episodes. Back in school, my professor used to strongly recommended this book. However, I don't like the story. 

- The black forest theory is against my knowledge. I don't believe the scientist will suicide if they found that the god exists.
- Too many characters and the alien is not even figured. Female characters are pale.
- The cultural revolution part made it hard to read. To many book want to be famous by just mention some dark side of the CCP.
- The ending of the first book, "we are bugs" is not a big scene. 

Some of the changes in the series are out of my expectation. 

- They did not mention the black forest theory. Instead of suicide, scientists were murdered. The character Auggie is cute.
- They put the most of the third book to the first which balanced the pale female character set up. Reassembled some characters, which caused a weird situation. The group to save the world. They have already know each other.
- I got a second thought about the cultural revolution part. I think it is a good idea to set up an alien contact during when mysterious is not allowed.
- The ending is still boring. Most exciting scene is in the 5th episode. Leaving the rest 3 episode boring.

Yes, the 5th episode is exciting. But don't watch it during food time. The series still got some lacks. The story was too fast. When I just felt into the murders about the scientists then they started to talk about VR. When I finally follow up the VR part, and the story goes to Sophon. By the way, Sophon was too strong. It looks that it's no need for Santis to come, Sophon can end the human race.

## Steroids

Another thing, remember I got a free HIV test last year? Yes I did more than that. Because I want to try some steroids. I know it's not good for health. But I want to see how it works. This is my stack.

- Dianabol 30mg/day
- Testosterone E 1ml/week
- Boldenone 1ml/week
- DECA 1ml/week

It's cheap to get those in Thailand. Pharmacy is [Meditech](https://meditechpharmaceutical.com/) . Only cost me 3560 Baht. Injection is hard. It is extremely hard to extrude the drug into the syringe. And injection to the butt is hard. Thankful to the 30g needle, it's not painful during the injection.

## LLaMa

This week I tried to use [LLaMa](https://huggingface.co/TheBloke/Llama-2-70B-Chat-GGML/tree/main) locally. I failed, got `llama_model_loader: failed to load model` error. Then I tried to use it in colab with replicate.

```py
import replicate

pre_prompt =  "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. You only respond once as 'Assistant'."
prompt_input = "What is python"

output = replicate.run("meta/llama-2-13b-chat",
                       input={"prompt": f"{pre_prompt} {prompt_input} Assistant: ",
                      "temperature": 0.1, "top_p": 0.9, "max_length": 128, "repetition_penalty": 1})
```

Kind of boring.

## MediaPipe

Remember that I want to use [Edge impulse](https://www.youtube.com/@EdgeImpulse) to make a workout tracker. Here is another solution, [MediaPipe](https://developers.google.com/mediapipe/). It's a library from Google. It's free and open source. Here is a [tutorial](https://www.youtube.com/watch?v=06TE_U21FK4&ab_channel=NicholasRenotte) about it. I will try to use it next week.

## WTF Academy

Also I am studying solidity on [WTF Academy](https://www.wtf.academy/docs/solidity-101).