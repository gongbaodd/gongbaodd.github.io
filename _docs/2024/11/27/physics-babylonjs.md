---
type: post
category: fe
tags:
    - babylonjs
---
# Physics in Babylonjs

I want to make a [rolling dice](https://rolling-dice-eight.vercel.app/), I found it very hard to add physics on the mesh, turns out I have to tie the imported mesh with a mesh that natively in babylonjs.

```js

    const dice = BABYLON.MeshBuilder.CreateBox("dice", { size: 1 }, scene);
    // Assign physics to the dice
    dice.physicsImpostor = new BABYLON.PhysicsImpostor(
        dice,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 1, restitution: 0.6 },
        scene
    );

    let physicsImpostor
    getModel(scene).then(m => {
        model = m
        const root = m.meshes.find(function (mesh) {return mesh.name === "__root__"});

        root.parent = dice;
        root.scaling = new BABYLON.Vector3(0.52, 0.52, 0.52);

        // Assign physics to the dice
        physicsImpostor = new BABYLON.PhysicsImpostor(
            root,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 1, restitution: 0.6 },
            scene
        );
        root.physicsImpostor = physicsImpostor;
    })

```