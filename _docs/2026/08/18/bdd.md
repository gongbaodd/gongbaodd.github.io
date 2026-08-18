---
type: post
category: fe
tag:
    - BDD
    - Unity
    - Python
series:
    name: Grandpa's bee Haven
    slug: grandpa-bee
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1787053472/Capture_laxflk.png
    alt: testing report
---

# BDD Testing in Grandpa's Bee Haven

[Grandpa's Bee Haven](https://store.steampowered.com/app/3209160/Grandpas_Bee_Haven/), the first game I made in Estonia, is now in public testing, click the link and request for testing now ~ We wish you can tell us what you like, what you wish to add, what you dislike.

Besides the manual testing. We also have automation testing. Different to public testing. The goal of the automaton testing is to keep the game stably runnable during the gaming process. Also the automation is run on different resolutions or different languages, at the same time we can track the performance of the game.

Automation testing is already mature now. [Airtest Project](https://airtest.netease.com) is an open source testing automation platform by Netease.

![Testing report](https://res.cloudinary.com/dmq8ipket/image/upload/v1787053472/Capture_laxflk.png)

Airtest provides support for Windows, Android and iOS. It is not only for testing Unity but also, UE, native and web with selenium automation. The editor has support with recording. However, during using it, I can not capture the window. So I have to give up the recording part.

[Poco SDK](https://poco.readthedocs.io/en/latest/source/doc/integration.html), provides support to cast Unity games into something like a DOM tree. So the testers can use python to write automation tests.

Only able to use code to control game is not enough. A semantic method to write test cases and the bridge between testing code and the test cases is also important. So I included [Pytest-bdd](https://pytest-bdd.readthedocs.io/en/stable/). In this way, I can write Gherkin language for test cases, then use Claude to write the testing code. Then generate the testing report.

During these two days, I still found some problem for this workflow.

1. Only Windows support, as I am the only Windows user, the testing job is majorly on me.
2. The scroll method is not workable, as the major users of Airtest are mobile, it does not support mouse events. To implement that, I need deep explore.