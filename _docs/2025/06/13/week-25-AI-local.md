---
type: post
category: plan
tags:
    - AI
---

# Week 25: AI Locally on browser

There are two main things I was doing this week, Langchain and huggingface transformerjs. I learnt how exactly a multi-modal agent works. And how to use models in browser.

A model is pretty big, it can be 10MB to 2GB. So, downloading it in a webpage is not user friendly. [Background Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Fetch_API) is a good solution, but it is only supported in Chrome and Edge. I think that provide a download link to let user to use the downloaded model is also a good complement, just need to check the hash of the file.

## bitECS

Another thing, the coming week, I will try to make something using Babylon.js Editor and bitECS.