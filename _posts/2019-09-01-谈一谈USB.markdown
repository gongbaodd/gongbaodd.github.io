---
type: post
category: tech
---
# 谈一谈USB

这篇文章其实是之前挖的坑，大上个月在改造我的平板的时候，就像写这篇文章了。说说这个平板吧，酷比魔方iwork8，8英寸的windows平板，用来读pdf刚刚好，只是存储不是很足而且只有一个micro-usb接口。所以我更期望给它改造成usb type-c接口或者增加一个标准usb接口，然而当我粗略查询micro-usb和type-c针脚的不同点的时候，发现并不是那么简单。当然，最后我还是给这个平板装上了标准usb接口，而这篇文章也就油然而生了。

## USB的产生

如果你是近些年才使用了计算机，那么熟知的接口自然就只有USB，然而就在上世纪90年代，计算机接口的分工还有所不同。当时还有链接屏幕的串口，链接打印机的并口，链接键盘鼠标的PS/2口，声卡显卡的PCI-E，而现在基本上都被USB统一天下了。

根据Wikipedia，在1994年，7家公司开始开发USB，通用串口，目标是实现为计算接提供可以通用适配多种外设，包括足够的电量适配和数据传输，他们组织了USB-IF，以后每次技术更新都要提交到USB-IF中。7家公司分别提供了对USB从软件到硬件的支持（颇有一点点西方神话众神造物的感觉）。其中Intel于1995年研发出了USB的集成单元。到1996年1月，USB终于发布了1.0版本（有趣的是红荔村也是1996年出来的，这俩没什么关系，主要是我刚吃完红荔村）。

### USB 1.x

USB最早发布了两个版本每秒1.5Mbit/s的【Low Speed】和12Mbit/s的【Full Speed】，大概一首3MB的歌，Low Speed需要传输16s，而Full Speed需要2s，如果拆解过这两款数据线，Full Speed会有另外一条解决静电的地线。可见Low Speed是用来处理如鼠标、键盘等设备，而Full Speed则处理如打印机软盘等设备，显然在1.0时链接屏幕还是不行的，如果一张1MB的图片光传输就要1s，那基本上看视频就和看PPT一样了。

Windows 95于1997年开始预装USB的驱动。1998年8月，USB1.1发布，苹果全线产品开始推动USB，在苹果的影响之下，PC也开始推动市场上的计算机换代使用USB。

USB 1.x的时候其实没有对小型接口的形状有描述，以至于除了标准的type-A（最常见的长方形接口）和方形的type-B（我在打印机上面见到过）接口的其它接口基本上由厂家自定义，要知道90年代末期可是mp3、mp4大爆发的年代。

### USB 2.x

到了2000年4月，60MB/s的【High Speed】传输版本发布，发布了usb-min和usb-micro标准（从Wikipedia看基本上算是整理出来的，可见这个组织初期的地位是多低...）；提供了USB供电标准，允许1.5A到5A的接口（这么大的跨度，估计也是个整理的数值）；On-the-go允许主从设备反向链接。

#### USB on the go

USB初期设计是一个主从设备，计算机链接U盘，计算机就是主设备，U盘则是从设备。可是随着平板等一系列设备出现，这种平板链接U盘的时候是主设备，而链接计算机的时候又是从设备，除了给这种平板两个接口之外，还可以依赖一个转接口反转主从位置，这就是USB OTG。

### USB 3.x

USB 3.0于2008年11月提出称之为【Super Speed】，允许5Gbit/s传输速率，支持每byte以10bit传输，所以会按照500MB/s单工传输。

USB 3.1于2013年7月发布，将USB 3.0改名为【USB 3.1 Gen 1】，并将USB 3.1命名为【Super Speed+】也叫【USB 3.1 Gen 2】，Super Speed+对于Super Speed的改造就是修改原有的单工传输为双工传输，这样单方向传输速率可以达到1GB/s。

USB 3.2于2017年发布，主要是将Super Speed和Super Speed+实现在USB type-c接口上，并允许传输效率达到1.25~2.5GB/s。

写到这里，感觉USB 3系列有点晕。基本上每个子版本都被改名了，现在是按照速率命名：

+ 符合USB 3.0标准，但是速率为5Gbit/s的接口被命名为USB 3.2 Gen 1
+ 符合USB 3.0标准，但是速率为10Gbit/s的接口被命名为USB 3.2 Gen 2
+ 符合USB 3.0标准，但是速率为20Gbit/s的接口被命名为USB 3.2 Gen 2x2

所以目前号称是USB 3.2的接口说不定它是08年的USB 3.0接口。

### USB 4

2019年8月，USB 4发布，支持40Gbit/s和Thunderbolt 3协议，并向下兼容USB 2.0和USB 3.2协议。

#### 什么是Thunderbolt协议

这个协议是Intel和苹果合作实现的，用来代替PCIe和DisplayPort接口，Thunderbolt 3选择使用USB type-c作为默认接口。

## USB的针脚定义

#### 标准USB

包括+5V， Data-， Data+， Ground，当然这一直是USB2.0的标准

#### 迷你USB

包括+5V，Data-， Data+， ID（用于OTG），Ground

#### Type-C

因为Type-C接口支持正反方向，所以两个方向的针脚排列是镜像的。包括Ground，SuperSpeed+，SuperSpeed-，+5V，Configure， D+， D-，SideBand use，+5V，SuperSpeed-， SuperSpeed+，Ground。

所以想拿Type-C的针脚链接迷你USB的主板，基本是不太可能的。

## USB的特征和限制

1. USB的设计基于主从模式，主设备提供对从设备的控制，至于人体输入设备或者OTG设备则需要额外芯片处理。
2. 链接于同一台主设备的两台从设备不能互相连通。
3. 两台主设备链接不能互相联通。
4. 目前的USB线缆只能保证近距离数据传输，远程传输需要依赖远程传输的设备，当然USB-4中还包括光纤，所以这个限制只算是目前。

# 参考

[1] USB https://en.wikipedia.org/wiki/USB
[2] USB hardware https://en.wikipedia.org/wiki/USB_hardware#Connectors
[3] USB_On-The-Go https://en.wikipedia.org/wiki/USB_On-The-Go
[4] USB-C https://en.wikipedia.org/wiki/USB-C
[5] A brief history of USB, what it replaced, and what has failed to replace it https://arstechnica.com/gadgets/2014/08/a-brief-history-of-usb-what-it-replaced-and-what-has-failed-to-replace-it/





