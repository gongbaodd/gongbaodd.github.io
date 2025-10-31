---
type: post
category: plan
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1761924996/unnamed_1_nusckr.jpg
    alt: missile command
tag:
    - colyseus
    - multiplayer
---

# 🚀 Week 45: Colyseus Multiplayer Journey

This week, I finally completed my [**Missile Command 3D Multiplayer**](/plan/2025/10/08/remake-of-missile-command) game! 🎯  

After many experiments, the real-time multiplayer feature is now live — powered by [**Colyseus**](https://colyseus.io/). It’s surprisingly easy to set up, but there are a few important lessons I learned along the way 👇

---

### 💡 Key Takeaways

- 🏠 **`defineRoom` limitation:** It can only create one room instance. If you want multiple replicated rooms (like `room/1`, `room/2`...), you’ll need to handle that manually.  
- 📦 **Schema matters:** Colyseus requires a **predefined data schema** for all state transfers. I initially wanted to stream the computed Babylon.js scene directly to clients — but hit a wall due to schema constraints.  
- ⚙️ **Monorepo caveat:** Some Colyseus packages don’t play nicely inside a **monorepo** setup, so you might face build or dependency issues there.

---

Overall, it’s been a fun challenge combining **Babylon.js** for visuals and **Colyseus** for networking. 