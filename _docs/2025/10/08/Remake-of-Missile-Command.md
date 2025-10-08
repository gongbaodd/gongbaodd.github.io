---
type: post
category: plan
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1759920254/defender_instruction_erc481.png
    alt: defender
tag:
    - babylonjs
    - yuka
    - portfolio
---

# 🚀 3D Missile Command: Battle Mode (1v1)

![](https://www.growgen.xyz/_astro/week-48-1.BeLVKpHd_LgsTr.webp)

Last year, I created a [3D Missile Command game](/plan/2024/12/06/week-48-ecs) using **p5.js** for my *Digital Graphics* class. This time, for the **Game AI** class, I decided to upgrade it into a **1v1 Battle version** ⚔️.  

However, since p5.js is essentially a subset of the Processing language, extending the project came with limitations from both Processing and JavaScript. So I decided to **rebuild it entirely in Babylon.js** 🧱.

Thanks to the **ECS paradigm** and **Cursor**, the transition from p5.js to Babylon.js wasn’t too painful. I started with [Babylon’s webpack example](https://github.com/RaananW/babylonjs-webpack-es6) and swapped the bundler to **Rspack** ⚙️.

The AI assistant (Sonnet 3.5) got stuck handling mouse events 🐭. In the original p5.js version, I had to implement raycasting myself, but Babylon.js provides raycasting natively — so some manual adjustment was needed.

🎮 **Play the remake here:** [missile-command.netlify.app](https://missile-command.netlify.app/)

---

## 🛡️ Defender Mode

The original *Missile Command* is all about defense — the player marks laser targets to protect cities from incoming missiles.  

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759920254/defender_instruction_erc481.png)

I kept most of the defense logic the same. The player simply **long-clicks on the ground** to set the target location. Simple, classic, and satisfying 💥.

---

## ☄️ Attacker Mode

Now comes the twist — the **Attacker** 😈.  
I added a sky area in the game so the attacker can **click positions to launch missiles** toward the defender’s cities.

![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759921430/attack_instruction_tfruru.png)

This turns the game into a tense 1v1 showdown — one defends, one destroys.

---

## 🗄️ Data & Storage

At first, I used **LocalStorage** for quick prototyping 🧩. Later, I refactored everything with **Cursor** to use **Firebase Realtime Database** 🔥 for proper multiplayer sync.

Here’s how it works:
- When **Player 1** starts a game, a **6-digit room hash** is generated in the URL.
- **Player 2** joins using that same URL — they automatically become the **Attacker**.
- Any other players joining the same link will be blocked

| 🛡️ Defender | ☄️ Attacker | 👀 Others |
|--|--|--|
| ![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759921633/Screenshot_2025-10-08_140649_nkqtrb.png) | ![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759921634/Screenshot_2025-10-08_140656_xwpkff.png) | ![](https://res.cloudinary.com/dmq8ipket/image/upload/v1759921682/Screenshot_2025-10-08_140747_h8mbgq.png) |

---

The data in the Firebase database is structured as follows:  

```graphql
rooms = Record<ID, Room>

Room {
  houses: Houses[]
  players: Record<FID, Players>
  Missiles: Missiles[]
}

House {
 color: Color
 isDestoryed: Boolean
 position: Position
 size: Position
}

Player {
 fid: FID,
 role: "defender" | "attacker"
}

Missile {
 color: Color,
 isActive: Boolean,
 isHit: Boolean,
 position: Position,
 target: position,
}

Color { r g b a }
Position { x, y, z }
```

```mermaid
classDiagram
    class Room {
        houses: House[]
        players: Record<FID, Player>
        missiles: Missile[]
    }

    class House {
        color: Color
        isDestroyed: Boolean
        position: Position
        size: Position
    }

    class Player {
        fid: FID
        role: "defender" | "attacker"
    }

    class Missile {
        color: Color
        isActive: Boolean
        isHit: Boolean
        position: Position
        target: Position
    }

    class Color {
        r: float
        g: float
        b: float
        a: float
    }

    class Position {
        x: float
        y: float
        z: float
    }

    Room "1" --> "*" House : contains
    Room "1" --> "*" Missile : launches
    Room "1" --> "2" Player : has
    House "1" --> "1" Color
    House "1" --> "1" Position : position
    Missile "1" --> "1" Color
    Missile "1" --> "1" Position : position
    Missile "1" --> "1" Position : target

```
## 🏗️ How Do I Place the Buildings?

![Building placement visualization](https://res.cloudinary.com/dmq8ipket/image/upload/v1759940257/Screenshot_2025-10-08_191152_layk4c.png)

To place the buildings on the plate, I used random numbers combined with trigonometric functions (`sin`, `cos`) to generate polar coordinates. 🎲
```js
const angle = Math.random() * Math.PI * 2;
const distance = Math.random() * (groundRadius - 5);
const x = Math.cos(angle) * distance;
const z = Math.sin(angle) * distance;
const y = 0;
```

### 🔍 Collision Detection

Next, I calculate whether the proposed position is already occupied. For this, I leverage [Yuka](https://mugen87.github.io/yuka/docs/index.html)'s AABB (Axis-Aligned Bounding Box) system:

```ts
function getHouseAABB(position: Vector3, size: Vector3): YukaAABB {
    const points = []
    // Push the 8 corners of the house
    points.push(new YukaVector3(position.x + size.x / 2, position.y + size.y / 2, position.z + size.z / 2));
    /* ... */

    return new YukaAABB().fromPoints(points);
}

function isValidHousePosition(ctx: SceneContext, position: Vector3, size: Vector3): boolean {
    // Keep ground boundary constraint (circular ground with radius 30)
    const distanceFromCenter = Math.sqrt(position.x * position.x + position.z * position.z);
    if (distanceFromCenter + Math.max(size.x, size.z) / 2 > 30) {
        return false;
    }

    const proposedAABB = getHouseAABB(position, size)

    // Test intersection with existing houses (box vs box)
    for (const house of ctx.gameState.houses) {
        const existingAABB = getHouseAABB(house.position, house.size)
        if (proposedAABB.intersectsAABB(existingAABB)) {
            return false;
        }
    }
}
```

### ♻️ Retry Strategy

The algorithm simply tries multiple times until it finds a valid position. In my implementation, I attempt up to **100 iterations**. This ensures that buildings are randomly distributed across the ground while maintaining proper spacing and preventing overlaps. ✨

## 🎯 Conclusion

This was an exciting experiment combining **Babylon.js** and **Yuka**! Yuka offers many powerful features that are worth exploring further. I'm confident I'll be incorporating it into future projects. 🚀