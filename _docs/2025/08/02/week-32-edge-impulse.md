---
type: post
category: plan
cover: {
    url: "./hearing-aid.jpg",
    alt: "hearing aid prototype"
}
tag:
    - edge-impulse
    - machine-learning
    - arduino
    - portfolio
---

# Week 32: Edge Impulse & DIY Hearing Aid

This week marks my **second week at Tallinn Summer School**! 🌞  
We kicked off a project to build a **hearing aid device** using Arduino. To distinguish different sounds, I trained a **machine learning model** with **Edge Impulse**.  

However… Arduino didn’t have enough memory 😅. So, we switched to a **Heltec LoRa ESP32** — much better for this kind of project.  

## Project Information

|||
|--|--|
| Title| Tactile feedback for deaf people|
| Authors | Gong, Yin & Nienke |

## Problem

- Deaf people can’t hear alarms, phones or baby’s crying when they don’t wear their hearing aids
- They should be made aware of this using tactile feedback

## Persona 1: Claire, 25 years old

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758051942/Screenshot_2025-09-16_224358_rjzfdt.png)

| | |
|--|--|
| Segment |  single, deaf parent of baby, living alone |
| Bio |  Deaf from birth. Has just ended a long-term relationship and now has to care for her 1-year old baby alone as a first-time mom. |
| Location | Amsterdam |
| Goals | Get notified when her child needs her, without disturbing people around her|

### Scenario

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052034/Screenshot_2025-09-16_224644_dnadxr.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052051/Screenshot_2025-09-16_224712_fqohih.png)

## Persona 2: Jun Li, 84 years old

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052122/Screenshot_2025-09-16_224821_ors0kg.png)

### Scenario

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052173/Screenshot_2025-09-16_224906_b4buvr.png)

|||
|--|--|
| Segment |  Older people with hearing loss, living alone |
| Bio | His wife just passed away. His children live abroad. Because he can not adapt the culture abroad, he lives alone now. Since a couple of years he doesn’t hear so good anymore. He is afraid of death and his children worry about him. |
| Location | Shanghai |
| Goals | Wants to stay in his own house |
| | Feel safe |
| | Get alerted when there is an emergency or phone call from his children. |

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052198/Screenshot_2025-09-16_224932_ftayxw.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052255/Screenshot_2025-09-16_225037_vgt7p2.png)

## Low Fidelity Prototype

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052435/Screenshot_2025-09-16_225323_xgnocm.png)

Features:
- vibration starts only when sound exceeds threshold
- vibration stops as soon as sound stops
- device can be worn on both sides

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052514/Screenshot_2025-09-16_225450_hxvqxc.png)

## High Fifelity Prototype

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052870/Screenshot_2025-09-16_230052_g8ndm8.png)

![Display](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052667/Screenshot_2025-09-16_225623_lgclik.png)

## Why Frequency analysis did not work

- Phone, baby and alarm do not contain one clear frequency
- The frequencies within the same sound changed more than the frequencies between sounds

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052735/Screenshot_2025-09-16_225818_hbvg1f.png)

## Use MFCC + CNN

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052832/Screenshot_2025-09-16_225934_qlhn3r.png)

The training process is open source on [edge impulse](https://studio.edgeimpulse.com/public/757088/live).

## State Machine

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1758052954/Screenshot_2025-09-16_230214_akbcpb.png)

---

Some useful links from the project:  
- Arduino [code](https://github.com/gongbaodd/hearing_aid/tree/main/sketches/main)  
- Machine learning [steps](https://studio.edgeimpulse.com/public/757088/live)  

For guidance, I also watched tutorials on:  
- [Bilibili](https://www.bilibili.com/video/BV1ADBUYmE8Q/?share_source=copy_web&vd_source=0161e564e6ea2247143fd95f4d81e6c0)  
- [YouTube](https://youtu.be/dYTukgY9kEU?si=IJ-cDs9eg3hJq2Fq)  

To display images on the screen, I experimented with **XBM files**, following [this tutorial](https://youtu.be/ac5CYQ3OJ7c?si=lYtThTf8I-MUOPAJ) 🖼️.  

It’s been a fun mix of **hardware, ML, and a bit of trial and error** — learning by doing is the best! 🚀
