---
type: post
category: tech
tag:
    - portfolio
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1781555072/Screenshot_20260615_232254_rsfcmw.png
    alt: the dashboard
series:
    name: deep knowledge tracing
    slug: DKT
---

# Skill Tracer for Energy Trading Agents based on Deep Knowledge Tracing (DKT)

This is actually my very first idea when I read the paper about [Deep Knowledge Tracing](/tech/2026/06/12/deep-knowledge-tracing). Since this approach can somehow dashboard a student's ability, why not dashboard agents?

<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/hepVbMELm7E" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>

I used to develop a game called [Discoin](/fe/2025/02/07/discoin) in the global game jam.

![Gamejam](https://dis-coin.vercel.app/photos/group-photo.jpg)

In the game, the player act as a crypto coin manipulator, by spreading the information to control the coin price.

![game screen shot](https://res.cloudinary.com/dmq8ipket/image/upload/v1781595915/Screenshot_20260616_104059-1_wl5rkr.png)

Last week I went to [Enefit Talks](/tech/2026/06/11/enefit), where they mentioned that the battery company they have to buy the electricity when it is low and sell in high. They use Reinforcement Learning agent to handle it. But the training process is very hard.

I totally understand that, as I also tried to do RL Agent in my master thesis about [drone piloting](/tech/2026/03/30/drone-rl-agent). One of the pain point of the RL process, is to find the part to offer the rewards and how much the reward can be. Usually they are static value, but the training result is very random.

So, [Here](https://dkt-trading-ability-measure-demo.growgen.xyz) is a little demo, where I used Lison's temperature data in June 2014, and the [electricity loads](https://archive.ics.uci.edu/dataset/321/electricityloaddiagrams20112014?utm_source=chatgpt.com) as the electricity price (The data did not mention it is from lisbon, but it mentioned Portugal, and the load data seems correlated with Lisbon temperature, it is good enough for showcasing, do not use in reality).

In this demo, you can click the "random solution" or add your own solution in the graph. And then in the "DKT report" you can see the report on your ability of handling "Buy", "Hold" and "Sell" Skill.

![The dashboard](https://res.cloudinary.com/dmq8ipket/image/upload/v1781555072/Screenshot_20260615_232254_rsfcmw.png)
