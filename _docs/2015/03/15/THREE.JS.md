---
type: post
category: fe
---

#THREE.JS参数记录
## Renderer

    var renderer = new THREE.WebGLRenderer({
        canvas:document.getElementById('WebGL-output')
    });
    
    //or
    
    document.getElementById('WebGL-output').appendChild(renderer.domElement);
    
### setClearColor

    renderer.setClearColor(new THREE.Color(0x000000,1.0));
    
### Others

    renderer.shadowMapEnabled = true;
    renderer.setSize(w,h);
    
***

## Scene

    scene.add(mesh);
        
    scene.fog = new THREE.Fog(0xffffff,near,far);
        
***

## Camera

    THREE.OrthgraphicCamera(left,right,top,bottom,near,far);
    
    THREE.PerspectiveCamera(fov,//45
                            width/height,
                            near,
                            far);
                            
***

## Geometry

* Cube

        THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
    
* Plane

        THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
        
* Sphere

        THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)

        