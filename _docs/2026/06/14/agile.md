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

# Agile Story Point Prediction base on Deep Knowledge Tracing (DKT) and Item Response Theory (IRT)

<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/ocJUW4NmWS4" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>

[Deep Knowledge Tracing (DKT)](/tech/2026/06/12/deep-knowledge-tracing) can predict the correctness of person's next answer. However, in reality an answer usually can not be identified simply a correct or an incorrect.

Item Response Theory (IRT) on the other hand is a score test design framework. Originally it was use to dynamically test a students' ability of one skill. For example, if a student easily answered one question with a difficulty of 5, then the next question's difficulty can be 9, if 9 was too hard for the student, the next question can be 6... eventually this method can figure out the student's ability level without testing all the questions.

While in agile software development, the story point is used to estimate the work load of one ticket. It is like the difficulty of one question. Usually, the story point of one ticket is decided by the team in a short meeting. A scrum poker. 

Consider, if one day a stake holder wants the project manager (PM) to add a new feature, whether it can be done in a week. If the team already have like 20 points in the backlog, and usually the team can finish 25 points in a week. The PM has to decide whether the new ticket can be less than 5 points, without having a meeting.

However, the story point estimation can be done by collecting the old tickets' story points. And combining DKT and IRT the agile estimation is like:

| Question   | 1| 2| 3|
| ----------- | - | -| -|
| Difficulty | High | High | Low |
| Ability  | 3  | 3 | 5 |

So, if the forth question if it is a medium level difficulty, how much will the student score?

Mapped into Agile Story, the backlog looks like

| Ticket | 1 | 2 | 3 |
| ------ | - | - | - |
| content| fix typo(low) | A totally new feature(high) | Add a widget with existing logic (medium) |
| story point | 1 | 8 | 3 |

If there is a new ticket, the PM can base on the old status to fast assume the story point without a meeting. Note: the meeting in every sprint should still be held, the estimated points can be a reference rather than replacing people.

[Here](https://dkt-irt-agile-demo.growgen.xyz) is the demo of the system, the data is from [giseldo/deep-se](https://huggingface.co/datasets/giseldo/deep-se). I picked the issues from Moodle. In the left panel shows the old issues(also the training data), the right panel shows the new issues. There are two methods of estimating the story points. Base on the title's keyword and the cluster.

![screen shot](https://res.cloudinary.com/dmq8ipket/image/upload/v1781530063/Screenshot_20260615_162624_in0yls.png)

You can see the estimation is not very correct, as the method of identifying the difficulty is not correct. I can not say like a front end job is easier then a back end. The cluster logic here should be optimized.

However, this is a demo, concept of proof to make sure the concept work.
