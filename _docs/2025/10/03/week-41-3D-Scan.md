---
type: post
category: tech
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1759499231/552532190_1140605504076650_2371037736575177324_n_r9jekh.jpg
    alt: scan
---
# Week 41: 3D Scan

## 3D Scan

This week, I started a school project. In which we started to use 3D print to help Museums exhibiting their exhibitions. As the customers are not allowed to touch the exhibitions, we decide to use 3D printing to solve this. As planned we decided to use *3D scanning*, *AI generations* and *modeling* to solve this problem.

### The exhibits

I never thought the objects are so small and in the storage room,(also not big) we do not have a network connection. Everything we collect can only be processed after. Which is very hard. Since we do not know the scan is succeed or not.

For example, this [Shoe Shape item](https://lumalabs.ai/capture/437AA66C-A9DE-4B37-9D53-6B7BD5E3ADA3), I believe I touched the table. Eventually the front view of the item is tilted.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500392/IMG_8291_cmdfvd.png)

I also tried to use scanniverse, but there are not many instructions on the scanning, so the result is not as [expected](https://scaniverse.com/scan/x4cqo57ikqijfh2a).

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500354/E5869558-1D91-424D-8353-7BB84017BD57_a4qraz.png)

Also, this [Scratcher](https://lumalabs.ai/capture/CBB17018-2E41-49EB-83D8-516432AFD791), the rear view is totally broken.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500388/IMG_8288_hmadw3.png)

The [mummy hand](https://lumalabs.ai/capture/B8878821-31C4-4644-B177-933D8B0588D6) is the best scan.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500391/IMG_8289_o0k8ut.png)

And, these scans are point clouds. Need further process to make them into meshes.

### Test scan

Because all the scans have to be processed online and to see the result in the other day. As I find out most scans are not as expected. I decided to do a test scan to make sure which software is suit for my situation.


#### Luma 3D

[See the result](https://lumalabs.ai/capture/61382180-037A-4553-9052-949074B88C46) 

Luma 3D gives the best instructions of all the softwares. Frist, choose the scan space, then scan base on the guide lines.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500377/IMG_8284_nrcnxa.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500382/IMG_8285_pmmloe.png)

The scan can be stored locally, but needed to upload to process the result. The result is point cloud. Need further process to transform it into mesh.

#### Scannivers(Detail Scan)

[See the result](https://scaniverse.com/scan/rih4hstdvia7qltb)

Scannivers detail scan is fast, but there is not enough instruction of how much I have scaned. 

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500375/IMG_8281_acybxb.png)

After scanning you can see a preprocessed scan result

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500375/IMG_8282_n8ll9b.png)

Altough the result is mesh, but the scanned model need adjust.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500377/IMG_8283_jwvawd.png)

#### Scannivers (Splat Scan)

[See the result](https://scaniverse.com/scan/vefa4tajbvku2ehx)

Splat scan in Scannivers is like Luma 3D, the result is also point cloud.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500369/IMG_8278_lhrq3r.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500371/IMG_8280_fwaksz.png)

#### Reality Scan

Reality scan scans the object first then do the clips.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500363/IMG_8275_iokdna.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500361/IMG_8276_wqzxpy.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500367/IMG_8277_kkmaom.png)

The same as the scanniverse, the scan need more adjust.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500352/8E08905F-851B-4455-82E9-2054F90A164F_jgpkqh.png)

#### Kiri Engine

Like Luma 3D, kiri provides almost the same instructions.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500365/IMG_8271_axhhqg.png)

But it has to finish the local process first then go on next scan. Also the server process is non free.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500354/IMG_8272_lmqdfp.png)

Although it is local processed, the result looks better than Reality scan and scaniverse.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759500356/IMG_8273_wvb6jj.png)

### Conclusion

If we need to use 3d Scan, a rescan maybe needed. Right now only the mummy hand is usable. But we can continue to use the gamepad as the further research.

Because we need tp find out:

- how to transfer point cloud, like Luma 3D, to mesh
- how to straight some tilted mesh scan 

And if we need a rescan, we still need to know how to *make the exhizibits stand*

### AI generation

However, AI generation is unexpectedly successful. I used [Tencent's HunYuan 3D Generation](https://3d.hunyuan.tencent.com/). 

[See the result](https://3d.hunyuan.tencent.com/share?shareId=97a63ac7-c0b2-407e-ad27-c904daf71a7b)

Compared with 3D scan, this is rather simple, just upload the front, rear, left right view. And wait.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759503069/image_dafhdg.png)

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759503066/image_1_nwqq0z.png)

The result, texture included is amazingly correct.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759503183/image_2_hgeoc9.png)

Everyday, you can generate 20 models using the server. So, to do further research:

- Try to build a local service
- Calculate the price if we make large amout of scans

## AI in CRM, MindStone AI meetup

This week, I read the [人工智能客户关系管理（AI CRM）系统研究报告（2025年）](https://notebooklm.google.com/notebook/b62ec1e4-ca21-426e-8ed6-f28f70448a54?authuser=1). This is a report on Chinese AI used in CRM.

CRM to me, is quite boring, majorly about relation database and regulation stuff. It is like a typical middle aged programmer's work (Well I am middle aged now)， who wears shirts under the belt and leather shoes. usually with a squared glasses and a pen in the upper pocket... 

Yeah, but CRM is a huge part of information technology and they are probably the last group in IT who starts to use AI.

So in this week, I attended Mindstone AI meetup in Tallinn. They are sharing some AI usages in their CRM systems. Most like using ChatGPT to write SQL stuff. 

In some way, they look like only started to use AI in recent few days. The fresh feelings are not flushed by the AI hallusination yet.

But, CRMs are more focusing on stable, so it is understandable they handle this new technology carefully.

