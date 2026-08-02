---
type: post
category: fe
series:
    name: Figma Teaching
    slug: figma
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1785609594/IMG_3193_pxptrg.jpg
    alt: 20 years photo
---

# Week 30: Figma Teaching Week II

This is the 2nd week of my Figma teaching. The slides can be checked [here](https://figma.growgen.xyz).

![cover](https://figma.growgen.xyz/images/001.png)

This week I have four teaching days. This week, the students are working on their own project, all the teaching contents are not mandatory to be shown in the project.

- Hand off, A11y and i!8n
- Prototype & Interactions
- Brand Identity
- Test play

|  |  | 
|--|--|
|![teaching content](https://res.cloudinary.com/dmq8ipket/image/upload/v1785612619/Screenshot_20260801_222855_ylknfi.png)| ![teaching demo](https://res.cloudinary.com/dmq8ipket/image/upload/v1785613027/Screenshot_20260801_223549_cjhc0w.png) |

## Hand Off

Besides Zeplin. I also mentioned the following ways to hand off.

- Figma Measure
- Dev Mode
- Figma Export

Hand off is an important skill for designers to deliver their design to the developers and stakeholders.

## Accessibility(A11y)

A11y, I talked about [color contrast](https://www.figma.com/color-contrast-checker/).

To further describe the importance, I introduced a disability simulator, [Funkify](https://chromewebstore.google.com/detail/funkify-disability-simula/ojcijjdchelkddboickefhnbdpeajdjg). And screen readers on Windows, it is Microsoft Narrator, on Mac, it is Voice Over.

For annotation, I introduced the [Web Accessibility Annotation Toolkit](https://www.figma.com/community/file/1311421011482282592/web-accessibility-annotation-kit).

Finally, after the MCP part, I introduced google lighthouse, and how to do a11y validations on chrome.

## Internationalization(i18n)

The [CopyDoc](https://www.figma.com/community/plugin/900893606648879767/copydoc-text-kit) can export all the texts to excel, let the designers to hand off textual content to translation team.

If there is no translation team, google sheet also offers translation feature. After applied the translations, the designer should check the long words. And if some fonts in some languages are too small to read.

Besides translation, for RTL (Right to Left) languages. All the components are needed to reverse layout. The way to do that is to make a RTL variants for all the components.

## MCP

This is more developer's job, so it is not needed for students to understand. Still I introduced how to integrate the figma's remote MCP to the local AI agents.

If there is no development environment installed. They can use bolt.new's figma integration to build the page.

This part is to simulate when the development finished. How the designers check the final work. Google Lighthouse is introduced here as a helper for checking accessibility.

## Prototype

This part is to teach about adding flows and using the figma's prototype function. Two features are introduced and they are needed to add into students' projects.

- Switching pages
- Scroll Behavior

## Brand Identity

In this course, the students are going to swap their designs. As a design system should be able to show the brand's identity. So the design should not only be able to used in only one situation.

## Test play

Each project is asked to make a test object. By observing the test play, the designers need to make changes base on what they observed after the test play.

## Conclusion

It is an intense journey. During these two weeks, we started from very basic knowledge of design tokens, building one design system, handing off, A11y, i18n, test play and applying the design system on other cases.

I am very grateful for Tallinn University and [Yan Asadchy](https://yanasadchy.com) for providing this chance to teach. And great thanks to the talented students. For their courage in challenging in unknown projects. So that my education can be tested and improved.

Eventually, the four projects:

An XR music player, by Abigail Adrianne Dubouzet. The design system is derived Meta's Horizon UI. And it can also used on mobile platform.

| | |
|--|--|
|![XR player](https://res.cloudinary.com/dmq8ipket/image/upload/v1785615410/Screenshot_20260801_231501_p057lh.png) | ![mobile](https://res.cloudinary.com/dmq8ipket/image/upload/v1785615459/image_2026-08-01_231738177_t9lhig.png) |

A web blog, by Enrico Armenia. The design system is built from wireframe. And it can be used on mobile platform.

| | |
|--|--|
|![Web blog](https://res.cloudinary.com/dmq8ipket/image/upload/v1785615618/Screenshot_20260801_231945_sycthy.png) |![mobile](https://res.cloudinary.com/dmq8ipket/image/upload/v1785615784/Screenshot_20260801_232236_h6xs96.png) | 

A mobile delivery mobile APP, by Preston Fossati. The design derived from Apple's iOS UIKit, the design system can be also applied on desktop web platform.

| | |
|--|--|
|![delivery](https://res.cloudinary.com/dmq8ipket/image/upload/v1785615878/Screenshot_20260801_232414_kx9eam.png) | ![Web page](https://res.cloudinary.com/dmq8ipket/image/upload/v1785615946/Screenshot_20260801_232522_wunwqv.png) |

A mobile weekly diary APP, by Yifei Wang. This design system is built with the help of Figma make. It is also suitable for XR environment.

|||
|--|--|
|![diary](https://res.cloudinary.com/dmq8ipket/image/upload/v1785616030/Screenshot_20260801_232647_yzzf8m.png) | ![XR](https://res.cloudinary.com/dmq8ipket/image/upload/v1785616115/Screenshot_20260801_232742_cikmh7.png) |

**In retrospect**, because there is an XR project. In A11y some content should be mentioned:

- Using vignetting to solve XR motion sickness
- iOS's Vehicle Motion Cues

As there are mobile projects, one thing should be mentioned in [AutoLayout course](/life/2026/07/24/figma). It is the virtual keyboard.

**Some other thoughts**, because of the rising of AI generation tools. The education is challenged. 

As I mentioned last week, during these weeks, AI on design was taught in two ways:

1. Use AI to generate a project, then make it into a design system.
2. Use AI to generate space/size tokens, then apply the tokens to the project.

For method (1), the students' work needs further checking, to make sure the components and variants were built, not screenshots.

For method (2), make sure the student use the color wheel for color tokens. And because AI relies heavily on its memory. The result differs. Should provide an example for the students to use for the AI.

In the final projects, there is a Chinese student, who is without any design knowledge, but still can build a proper project with the help of AI. There were not only one student tried the AI way, but this one is the only one that finally worked. She has got askill of harnessing the model while other student does not have the concept. From this small example, I can see that the AI tool usage education or popularity in China is more advanced than other countries. So, there will be a new market that allows the AI generated designs. 

## Party Night

After the last class, I went to Linnahall to enjoy the 27 degree summer. Finally, a week that is over 20 degrees.

![After class](https://res.cloudinary.com/dmq8ipket/image/upload/v1785619301/9404DB81-E1B1-4157-BE7A-B2167833945E_wvg27n.jpg)

Also, this is the 20th Summer school of Tallinn University. The course ended with a big ending party.

![group photo](https://res.cloudinary.com/dmq8ipket/image/upload/v1785609594/IMG_3193_pxptrg.jpg)

![Cake](https://res.cloudinary.com/dmq8ipket/image/upload/v1785618968/IMG_3190_pjtj6f.jpg)

