---
layout: post
category: fe
---

# LearningInThreeJS
## （一）基本之基本

> 这些是嚼the Packt book "Learning Threejs"出来的一些干货，捡了些觉得可学的代码放到我的myExpirements下面的learning-in-threejs分支里面了。

### 1. 简单实现(basic.html)

https://github.com/gongbaodd/myExperinments/blob/learning-threejs/01-basic.html

* 必须要有的

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
        var renderer = new THREE.WebGLRenderer();
        document.getElementById("WebGL-output").appendChild(renderer.domElement);
        
* 坐标帮助

        var axes = new THREE.AxisHelper(20);
        scenne.add(axes);
        
* initStates

        ()=>
            var stats = new Stats();

                stats.setMode(0);

                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';

                document.getElementById("Stats-output").appendChild(stats.domElement);

                return stats;
                
* onResize()

        window.addEventListener('resize',onResize,false);
        
* controller

            var controls = new function () {
                this.rotationSpeed = 0.02;
                this.bouncingSpeed = 0.03;
            };

            var gui = new dat.GUI();
            gui.add(controls,'rotationSpeed',0,0.5);
            gui.add(controls,'bouncingSpeed',0,0.5);

### 2. 场景Scene
https://github.com/gongbaodd/myExperinments/blob/learning-threejs/02-scene.html
    
        var scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0xffffff,0.015,100);
            scene.overrideMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
            
### 3. 内置几何图形 
https://github.com/gongbaodd/myExperinments/blob/learning-threejs/03-geometery.html

### 4. 拼装几何图形
https://github.com/gongbaodd/myExperinments/blob/learning-threejs/04-basic-geometry.html

### 5. 网格操作
https://github.com/gongbaodd/myExperinments/blob/learning-threejs/05-mesh.html

### 6. 摄像头操作
https://github.com/gongbaodd/myExperinments/blob/learning-threejs/06-camera.html