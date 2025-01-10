---
type: post
category: plan
tags:
    - Unity
    - https
    - WebGL
---
# Week 2: Unity Essentials

This is the second week of 2025, I booked a bank card in Estonia. But the card is not yet here. I will talk about it when it arrives.

## Unity Essentials

This week I was focusing on learning Unity. The Unity Essentials said it will cost 2 weeks. But I have finished it in 3 days. In 24th, I will attend a game jam. So it is better for me to finish [the pathway](https://learn.unity.com/pathways). At least the creative core.

The unity essentials are not about coding, mostly are focusing on how to use the editor. I have finished the WebGL part. It is better to use the dev server made by Unity. I used "http-server" but it need more configuration. 

for example, an https server needs following command:

```json
{
    "setup-ssl": "npm run generate-privatekey && npm run generate-csr && npm run generate-cert",
    "generate-privatekey": "openssl genrsa -out key.pem",
    "generate-csr": "openssl req -new -key key.pem -out csr.pem",
    "generate-cert": "openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem",
    "dev-server": "http-server -S -C cert.pem -K key.pem -o"
}
```

And the build files are compressed with brotli, not gzip. I have to say I learned a lot from this pathway.

## Creature Commandos

It is the first animation in DCU. The stories in DC are always dark and mature. James Gunn made them more fun. Sadly it only has 7 episodes. The ending is not very satisfying.

## よんでますよ、アザゼルさん。

It is a comedy anime. The story is about a detective who can summon demons. The demons are not very powerful. But they are very funny. The first season is fun. The second one, they just focus more on hentai jokes. Making the story less interesting.