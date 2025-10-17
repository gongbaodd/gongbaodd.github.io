---
type: post
category: tech
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1759499231/552532190_1140605504076650_2371037736575177324_n_r9jekh.jpg
    alt: scan
city:
    - Tallinn, Estonia
series:
  name: 3D printing
  slug: 3d-printing
---
# Week 41: 3D Scan 🎨

## 3D Scan

This week kicked off an exciting school project where we're helping museums make their exhibitions more accessible through 3D printing technology. Since visitors can't touch the original artifacts, we're creating tactile replicas using three approaches: *3D scanning*, *AI generation*, and *manual modeling*.

### The Exhibits 🏛️

Working with museum artifacts brought some unexpected challenges. The objects were surprisingly small, and the storage room—equally compact—had zero network connectivity. This meant processing everything after the fact, with no way to verify scan quality on-site. Talk about working blind!

Take this [Shoe-Shaped Item](https://lumalabs.ai/capture/437AA66C-A9DE-4B37-9D53-6B7BD5E3ADA3), for example. I accidentally touched the table during scanning, resulting in a tilted front view—not ideal! 😅

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500392/IMG_8291_cmdfvd.png)

I experimented with Scanniverse too, but the lack of clear instructions led to disappointing [results](https://scaniverse.com/scan/x4cqo57ikqijfh2a).

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500354/E5869558-1D91-424D-8353-7BB84017BD57_a4qraz.png)

This [Back Scratcher](https://lumalabs.ai/capture/CBB17018-2E41-49EB-83D8-516432AFD791)? The rear view completely fell apart.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500388/IMG_8288_hmadw3.png)

The star of the show was definitely this [Mummy Hand](https://lumalabs.ai/capture/B8878821-31C4-4644-B177-933D8B0588D6)—by far our best scan! 🌟

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500391/IMG_8289_o0k8ut.png)

Important note: These scans are point clouds and require additional processing to convert them into usable meshes.

### Test Scan Round 📱

After discovering most museum scans didn't meet expectations, I ran controlled tests at home to find the right tool for our constraints.

#### Luma 3D ⭐

[See the result](https://lumalabs.ai/capture/61382180-037A-4553-9052-949074B88C46) 

Luma 3D provided the clearest instructions of any software. First, you select the scan space, then follow intuitive guidelines.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500377/IMG_8284_nrcnxa.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500382/IMG_8285_pmmloe.png)

Scans save locally but require cloud upload for processing. Output is a point cloud needing mesh conversion.

#### Scanniverse (Detail Scan) 🔍

[See the result](https://scaniverse.com/scan/rih4hstdvia7qltb)

Detail scanning was fast, but lacked progress indicators—hard to know when you've captured enough data.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500375/IMG_8281_acybxb.png)

The preview feature was helpful:

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500375/IMG_8282_n8ll9b.png)

While it outputs meshes directly, significant cleanup is usually needed.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500377/IMG_8283_jwvawd.png)

#### Scanniverse (Splat Scan) ✨

[See the result](https://scaniverse.com/scan/vefa4tajbvku2ehx)

Similar to Luma 3D, this produces point cloud results.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500369/IMG_8278_lhrq3r.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500371/IMG_8280_fwaksz.png)

#### RealityScan 📸

RealityScan captures the full object first, then handles cropping afterward.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500363/IMG_8275_iokdna.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500361/IMG_8276_wqzxpy.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500367/IMG_8277_kkmaom.png)

Like Scanniverse, results need considerable post-processing.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500352/8E08905F-851B-4455-82E9-2054F90A164F_jgpkqh.png)

#### Kiri Engine 🎯

Kiri provides similar guidance to Luma 3D.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500365/IMG_8271_axhhqg.png)

The downside? You must complete local processing before starting a new scan, and server processing isn't free.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500354/IMG_8272_lmqdfp.png)

Despite being locally processed, results looked cleaner than RealityScan and Scanniverse.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500356/IMG_8273_wvb6jj.png)

### Scanning Conclusion 📋

We'll likely need to rescan most artifacts. Currently, only the mummy hand is production-ready, though the gamepad shows promise for continued research.

**Outstanding questions:**
- How to convert point clouds (from Luma 3D) into meshes?
- How to correct tilted mesh scans?
- How to properly stabilize exhibits for scanning?

### AI Generation: The Surprise Winner! 🤖✨

Plot twist: AI generation exceeded all expectations! I used [Tencent's HunYuan 3D](https://3d.hunyuan.tencent.com/).

[See the result](https://3d.hunyuan.tencent.com/share?shareId=97a63ac7-c0b2-407e-ad27-c904daf71a7b)

The process is beautifully simple: upload front, back, left, and right photos, then wait.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759503069/image_dafhdg.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759503066/image_1_nwqq0z.png)

The results—textures and all—were surprisingly accurate! 🎯

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759503183/image_2_hgeoc9.png)

The free tier allows 20 models daily. Next steps:
- Explore local deployment options
- Calculate costs for large-scale production

## AI in CRM: MindStone Meetup 💼

This week, I dove into [人工智能客户关系管理（AI CRM）系统研究报告（2025年）](https://notebooklm.google.com/notebook/b62ec1e4-ca21-426e-8ed6-f28f70448a54?authuser=1)—a comprehensive report on AI implementation in Chinese CRM systems.

Full disclosure: CRM has always felt a bit dry to me. Relational databases, regulations, compliance—it's typically middle-aged programmer territory. You know the type: shirt tucked in, leather shoes, square glasses, pen in the pocket... (Okay, fine, I'm middle-aged now too! 😅)

But here's the thing: CRM represents a *massive* segment of IT, and they're among the last to embrace AI integration.

### MindStone AI Meetup, Tallinn 🇪🇪

I attended the MindStone AI meetup where they demonstrated AI applications in their CRM systems—primarily using ChatGPT for SQL generation.

The vibe was refreshingly optimistic, like they'd just discovered AI last week. That honeymoon phase before AI hallucinations become a daily frustration! 😄

To their credit, CRM systems prioritize stability above all else, so approaching new technology cautiously makes perfect sense. Better slow and steady than breaking production systems, right?