---
type: post
category: fe
tag:
    - Unity
series:
    name: Master Thesis
    slug: master
    number: 8
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1777046104/Screenshot_2026-04-17_093559_vgx2tz.png
    alt: vana tallinn
---

# Digital Twin of Vana Tallinn

I've mentioned to use [GIS systems](/tech/2026/04/07/gis) in Unity. But to use them in the game, I found it much harder, because you need the API keys. They do not provide the service freely.

However, you can download Tallinn's old town data from [Ruumiandmed](https://www.tallinn.ee/et/geoportaal/ruumiandmed). With the help of LLMs and Unity MCP. You can assemble these almost 800 buildings in one night.

![Old Town](https://res.cloudinary.com/dmq8ipket/image/upload/v1777045361/Screenshot_2026-04-16_004635_wycoxi.png)

And you can see there is one problem. There is no ground.

I tried a lot solutions, like Unity terrain. [The Republic of Estonia Land and Development Board]() provides a web map that is able for me to download terrain data base on the map number, the old town is in the following 4 areas.

- 589541
- 589542
- 588541
- 588542

It is a tiff 32 bit file. I tried a lot different ways to make it suit in Unity's Terrain system. I did not succeed. Finally, after one sauna. I tought since what I want is just one mesh. There is a plugin called QGis2Threejs Exporter. I can directly export it from QGIS.

![Terrain](https://res.cloudinary.com/dmq8ipket/image/upload/v1777045827/Screenshot_2026-04-22_151736_hiopdq.png)

Last but not the least, remember to make occlusion culling so that these mesh will not crash the memory.

![occlusion culling](https://res.cloudinary.com/dmq8ipket/image/upload/v1777046071/Screenshot_2026-04-22_152123_alahnj.png)

