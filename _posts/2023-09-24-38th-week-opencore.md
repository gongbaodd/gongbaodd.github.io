---
type: post
category: plan
tag:
    - hackintosh
    - opencore
    - IELTS
    - OCAuxiliaryTool
---

# 38th Week - OpenCore

## IELTS

Got a 7 in IELTS test! Hooooray!

## OpenCore

Two weeks ago, I bought a new laptop, ASUS Pro Art 16. Thus, I decide to sell my old one, which is Dell Inspiron 7391 2in1. Sadly, even as cheap as 2k RMB, it picks no one's interest. So I decide to keep it as a hackintosh machine. And yes, it was sold out in the next day.

Making a laptop into a hackintosh is not as easy as an ITX. I can not choose the hardware. Gladly, Dell has a good reputation on Linux support. I found a lot configurations on github. However, most of them doesn't work as I expected. So I used almost one week to learn how to configure a opencore config file.

### OCAuxiliaryTool

This tool is a must-have for hackintosh. Earlier in this year, I have to config opencore with [OpenCore Configurator](https://mackie100projects.altervista.org/download-opencore-configurator/), one of its flaw is that it is a macOS only App. But OCAT is a cross-platform tool, which is very convenient for me.

### Dortania's Guide

[This](https://dortania.github.io/OpenCore-Install-Guide/) is the most important guide for hackintosh. It is very detailed and easy to understand. Beleive me, all the errors I met, they were all finally went to this guide.

However, since I'm a Chinese, I also checked [国光](https://apple.sqlsec.com/) and [黑果小兵](https://blog.daliansky.net/) for more information.

### My Config

This is my [config.plist](https://github.com/gongbaodd/DELL-Inspiron-7391-Hackintosh-EFI), hint it is only available for Ventura. For other versions, you may need to change the Itlwm.

### Hide entries

To hide some entry, you need to add ".contentVisibility" to the Boot folder. Check [this](https://www.insanelymac.com/forum/topic/355227-how-to-opencore-087-088-differences/).

