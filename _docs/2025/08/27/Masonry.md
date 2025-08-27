---
type: post
category: fe
cover:
    url: https://i.imgur.com/6Lo8oun.jpg
    alt: masonry layout
---

# Masonry Layout 🧱

I want to write a more detailed article, but right now, my time is just super short.  

---

## 📖 Explain

**Masonry Layout** in web pages is very common — you see it a lot in **image-heavy sites** 🖼️. It helps fill the screen with resourceful content in a waterfall-like style.  

Back in the iPhone 4 era 📱, Twitter introduced a **one-dimensional waterfall loading layout** to replace pagination. At that time, small screens made this approach practical.  

Now, with **bigger screens**, masonry is becoming trendy again. Although it has existed for years, in the Web standard it’s still **experimental in CSS Grid** and not consistently supported across browsers ⚠️.  

---

## ⚙️ How to Implement

### 1. **Absolute Position + JS Library**  
The easiest method: use absolute positioning with a library like [Masonry](https://masonry.desandro.com/layout).  
✅ Pros:  
- Supports almost every layout style  
- Smooth animations during resize (because of absolute positioning)  

❌ Cons:  
- No SSR support  
- Requires skeleton loaders  

---

### 2. **Flexbox / Grid Hacks**  
As described in [CSS-Tricks](https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/), you can hack it with **flexbox** or **row/column grids**.  

I initially used [@MUI/masonry](https://mui.com/material-ui/react-masonry/) for this site. But soon hit issues, **Flickering** due to column-based calculation of heights, which makes it only works for **static / non-responsive SSR sites**  

---

### 3. **React Plock**  
I later switched to [React Plock](https://github.com/askides/react-plock).  
- It fixed the **flickering issue** 🎉  
- But since it’s written in CommonJS and bundled in ESM, you need to **exclude it in Vite’s optimization config** ⚙️  

```js
  vite: {
    optimizeDeps: {
      include: ["react-plock"], 
    },
    ssr: {
      noExternal: ["react-plock"], 
    },
  },
```
---

## ✅ Conclusion

Masonry layout is **visually appealing** and **widely used**, but its implementation is still tricky:  
- Native CSS Grid support is **experimental** 🧪  
- JS libraries offer flexibility but often break **SSR compatibility**  
- Each solution has trade-offs between **performance, responsiveness, and DX**  

For now, if you need **SSR + responsive support**, libraries like **React Plock** (with tweaks) are a solid choice. But keep an eye on **native CSS masonry support** — it’s the future 🚀.  
