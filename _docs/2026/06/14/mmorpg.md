---
type: post
category: tech
tag:
    - portfolio
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1781526929/Screenshot_20260615_153316-1_ecgbir.png
    alt: pirate ship
series:
    name: deep knowledge tracing
    slug: DKT
---

# Player Persona base on Long Short Term Memory (LSTM)

In user interaction, [DKT](/tech/2026/06/12/deep-knowledge-tracing) feels a little too much. In most of time long short term memory is already handle time sequence action prediction.

<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/E1cMgT-4868" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>

For example, in rock-paper-scissor game. Usually this is totally random. But in people, it got patterns. A guy who uses rock for most time, he may still use rock for the next round.

Richard Bartle in his taxonomy of player types. He summarized that there are 4 types of players in MMORPGs. Killers, Explorers, Achievers and socializers.

So, in [this demo](https://lstm-mmorpg-demo.growgen.xyz), I provide a pirate game, the player can choose 4 options to communicate with the NPCs, Kill, Talk, WalkAround and AskForQuest. The top right shows a radar chat that the model assumes the next possible option the player will do.

![pirate game](https://res.cloudinary.com/dmq8ipket/image/upload/v1781526929/Screenshot_20260615_153316-1_ecgbir.png)

## Implementation

200 players and 30 rounds data is randomly generated to use as training data. So the model is ***not based on real data***, **DO NOT** directly use the model for real circumstances.  

![Train data](https://res.cloudinary.com/dmq8ipket/image/upload/v1781528789/MMORPG_gibweo.png)

Then, it is much easier than DKT, the input size is exactly how many the actions. While DKT needs to double it.

Then you can check the [result](https://lstm-mmorpg-demo.growgen.xyz).

## Note

The model uses randomly generated data rather than real-world datasets. Consequently, the model's predictions are not accurate and are intended solely to demonstrate the technology within a browser environment.