---
type: post
category: plan
tag:
    - Flowise
    - Genetic Algorithm
    - ADSR
    - ECS
---

# Week 46: Flowise, Genetic Algorithm and ECS


## Flowise

Last week I tried WhisperCPP. So I wanted to dig dipper, I tried langchain before. Now you can use [flowise](https://flowiseai.com/) to make a chat bot without coding.
Sad thing, I wanted to use it to connect Ollama with WhisperCPP. But there is not whisperCPP integration.

## Genetic Algorithm

I am reading Shiffman's Nature of Code. I am at the Genetic Algorithm chapter. I wanted to implement it in the new game project I am going to submit in Graphic and Sound course.
And in the sound course, there is a new theory on sound, ADSR, (attack decay sustain release). I will try to implement it in the game.

## ECS

Both [Meta's Spatial SDK](https://developers.meta.com/horizon/develop/spatial-sdk) and [Apple's RealityKit](https://developer.apple.com/documentation/realitykit) use ECS. And as I remember, [Aframe.js](https://aframe.io/) also uses ECS. 
But I did some research, both Unity and Godot are not using ECS. Unreal used an Actor Component System, which is similar to ECS, but still not ECS. However, I am gonna try to implement it in my new project.

```js
// Entity: 创建一个独特 ID 和组件容器
class Entity {
    constructor(id) {
        this.id = id;
        this.components = new Map();
    }

    addComponent(component) {
        this.components.set(component.constructor.name, component);
    }

    getComponent(componentClass) {
        return this.components.get(componentClass.name);
    }

    hasComponent(componentClass) {
        return this.components.has(componentClass.name);
    }
}

// Component: 只包含数据
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Velocity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// System: 处理某类组件的逻辑
class MovementSystem {
    constructor(entities) {
        this.entities = entities;
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            if (entity.hasComponent(Position) && entity.hasComponent(Velocity)) {
                const position = entity.getComponent(Position);
                const velocity = entity.getComponent(Velocity);

                // 更新位置
                position.x += velocity.x * deltaTime;
                position.y += velocity.y * deltaTime;
            }
        });
    }
}

// 创建一些实体和系统
const entities = [];
const entity1 = new Entity(1);
entity1.addComponent(new Position(0, 0));
entity1.addComponent(new Velocity(1, 1));
entities.push(entity1);

const movementSystem = new MovementSystem(entities);

// 更新系统
function gameLoop() {
    const deltaTime = 1 / 60; // 假设每帧 1/60 秒
    movementSystem.update(deltaTime);

    // 输出实体的位置
    console.log(`Entity 1 Position: (${entity1.getComponent(Position).x.toFixed(2)}, ${entity1.getComponent(Position).y.toFixed(2)})`);

    // 继续循环
    requestAnimationFrame(gameLoop);
}

// 开始游戏循环
gameLoop();

```

