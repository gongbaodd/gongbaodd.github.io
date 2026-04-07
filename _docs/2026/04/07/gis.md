---
type: post
category: tech
tag:
    - GIS
    - Unity
    - Cesium
    - ArcGIS
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1775556276/Screenshot_2026-04-07_113628_dwbx5z.png
    alt: Tallinn
---

# 🌍 GIS in Unity

Last year's [retrospective](/plan/2025/12/21/week-52-2025-retrospective), I mentioned that I always wanted to learn GIS.

Early this year, I attended a [workshop](/tech/2026/02/01/lusofona) to learn QGIS. But I never have time to try by myself.

## Cesium for Hong Kong

Hong Kong Lands Department provides [open scaned data of the city](https://www.landsd.gov.hk/en/survey-mapping/mapping/3d-mapping.html). 

### The Setup

First, I needed the **Cesium for Unity** plugin. While Cesium offers a [quick start tutorial](https://cesium.com/learn/unity/unity-quickstart/), I actually ran into issues downloading the plugin through the standard installer. 😅 I ended up heading to the [GitHub releases](https://github.com/CesiumGS/cesium-unity) and installing it manually—which worked like a charm! 🛠️

### Connecting the Data

Before rendering anything, you’ll need an API key from the [Hong Kong Common Spatial Data Infrastructure (CSDI)](https://portal.csdi.gov.hk/csdi-webpage/). Once you have that, look for your target data; I used the [3D Visualization Map API](https://portal.csdi.gov.hk/csdi-webpage/apidoc/3d-visualisation-map-api).


**In Unity:**

1.  Open the **Cesium** menu and create a **Blank 3D Tile Tileset**.
2.  In the **Inspector**, change the source to the CSDI URL.
3.  Update the coordinates to Latitude: `22.3193` and Longitude: `114.1694`.

The data is massive, so it takes a moment to load, but the level of detail in the scan is impressively clear! 📸✨

![Hong Kong](https://res.cloudinary.com/dmq8ipket/image/upload/v1775556278/Screenshot_2026-04-06_191045_msfiaa.png)

## 🏰 ArcGIS for Tallinn


Finding the raw data for the [Tallinn 3D map](https://gis.tallinn.ee/linnamudel/) was a bit of a treasure hunt since the site is mostly in Estonian. 🇪🇪

However, because the site is built on **ArcGIS Scene Viewer**, I was able to snag the [API endpoint](https://gis.tallinn.ee/arcgis/rest/services/Hosted/LoD2_2024/SceneServer) directly from the browser's DevTools. 🕵️‍♂️


### The Setup

For this one, you'll need the [ArcGIS Maps SDK for Unity](https://assetstore.unity.com/packages/tools/integration/arcgis-maps-sdk-for-unity-258537). Similar to Cesium, you'll also need to generate an API key from the [ArcGIS Developer portal](https://www.arcgis.com/index.html). 🔑

### Bringing Tallinn to Unity

1.  Create an **ArcGIS Map** component.
2.  Add a new layer using the Tallinn URL as the source.
3.  Set the layer type to **ArcGIS 3D Object Scene Layer**.
4.  Set the coordinates to Longitude: `24.7°` and Latitude: `59.4°`.

The city model is relatively lightweight (about 2GB), so it loads quite fluently. While the buildings look a bit like "paper crafts" (LoD2 quality) compared to the photogrammetry of HK, it’s more than enough to create some awesome game scenes! 🏗️🎨

![Tallinn](https://res.cloudinary.com/dmq8ipket/image/upload/v1775556276/Screenshot_2026-04-07_113628_dwbx5z.png)
