---
type: post
category: tech
tag:
    - portfolio
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1781530063/Screenshot_20260615_162624_in0yls.png
    alt: screenshot
series:
    name: deep knowledge tracing
    slug: DKT
---

# Agile Story Point Prediction base on Deep Knowledge Tracing and Item Response Theory

[Deep Knowledge Tracing (DKT)](/tech/2026/06/12/deep-knowledge-tracing) can predict the correctness of person's next answer. However, in reality an answer usually can not be identified simply a correct or an incorrect.

Item Response Theory (IRT) on the other hand is a score test design framework. Originally it was use to dynamically test a students' ability of one skill. For example, if a student easily answered one question with a difficulty of 5, then the next question's difficulty can be 9, if 9 was too hard for the student, the next question can be 6... eventually this method can figure out the student's ability level without testing all the questions.

While in agile software development, the story point is used to estimate the work load of one ticket. It is like the difficulty of one question. Usually, the story point of one ticket is decided by the team in a short meeting. A poker game. 

Consider, if one day a stake holder wants the project manager (PM) to add a new feature, whether it can be done in a week. If the team already have like 20 points in the backlog, and usually the team can finish 25 points in a week. The PM has to decide whether the new ticket can be less than 5 points, without having a meeting.

However, the story point estimation can be done by collecting the old tickets' story points. And combining DKT and IRT the agile estimation is like

...

![screen shot](https://res.cloudinary.com/dmq8ipket/image/upload/v1781530063/Screenshot_20260615_162624_in0yls.png)