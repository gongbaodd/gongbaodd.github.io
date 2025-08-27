---
type: post
category: fe
series:
    name: "website-rebuild"
    slug: "website-rebuild"
tag:
    - map
cover:
    url: https://visgl.github.io/react-map-gl/images/hero.jpg
    alt: react-map-gl hero image
---

# 🗺️ Put a Map on Your Website

This was totally **unexpected**. Weeks ago, I asked Cursor to scan all my files and add a `city` parameter, like *"Tallinn, Estonia"*, to show where I wrote each post 📍.  

Yesterday, I thought: since so many documents are already marked, why not **add a map** to the website? 🌍 Also, I was curious about **how many places I’ve been**.  

---

## 🛠️ Adding the Map

Adding a map to a page is not hard:  
- **Google Maps / Mapbox** → mature solutions, barely any code needed ✅  
- Downside → requires **paid tokens** 💸  

Since I didn’t want to spend too much, I looked for **open-source solutions**.  
The answer: **[MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)** 🚀.  

For React, there’s a component: **[react-map-gl](https://visgl.github.io/react-map-gl)** ⚛️.  

For a free base map, **Carto’s Positron Style** 👉 [Carto Positron](https://basemaps.cartocdn.com/gl/positron-gl-style/style.json).  
Best part: **no token required** 🎉.  

---

## 📍 The Hard Part – Getting City Coordinates

Showing cities on the map means I need their **latitude & longitude**. This was trickier than I expected:  

- Tried [cities.json](https://www.npmjs.com/package/cities.json) → includes many major cities, but not suitable for my case ❌  
- Tried [china-division](https://www.npmjs.com/package/china-division) → good data, but only in **Chinese** 🀄  
- Tried [pinyin](https://www.npmjs.com/package/pinyin) to translate → unstable results ⚠️  

Finally, I fell back to **Google Maps Geocoding API**:  

`https://maps.googleapis.com/maps/api/geocode/json?address=${data.city[i]}&key=${GOOGLE_API_KEY}`


It works well, even with vague searches. To avoid exceeding the API quota, I wrote a **script to cache/save the coordinates** 📂.  

And now 👉 [here](/world) I can see **all my articles pinned on a map** 🌏✨.  

---

## ✅ Conclusion

What started as a small “add city info” experiment became a **map visualization project**.  

- Open-source tools like **MapLibre + react-map-gl + Carto basemap** give you **free, flexible mapping** options 🆓  
- For coordinates, **Google Maps API** is still the most reliable choice 🔑  
- With a bit of scripting, you can **cache results** and avoid extra costs 🧑‍💻  

Now my blog not only shows what I write, but also **where I write it** ✍️📍— turning content into a **travel map of my life** 🚀.  

