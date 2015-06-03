window.manifest=[{title:"Panorama",icon:"../images/apps/panorama.jpg",url:"panorama",face:"PanoFace"},{title:"Movie",icon:"../images/apps/movie.jpg",url:"movie",face:"MovieFace"},{title:"NoodleFace",icon:"../images/apps/noodle_face.jpg",url:"noodle_face",face:"NoodleFace"}],function(e){var t=new e.Stats;t.domElement.style.position="absolute",t.domElement.style.top="0px",t.domElement.style.zIndex=100,e.stats=t}(window),function(e){function t(){this.renderer=new o.WebGLRenderer({antialias:!0,alpha:!0}),this.renderer.setSize(e.innerWidth,e.innerHeight),this.renderer.shadowMapEnabled=!0,this.scene=new o.Scene,this.effect=new o.StereoEffect(this.renderer),this.camera=new o.PerspectiveCamera(90,e.innerWidth/e.innerHeight,.001,700),this.scene.add(this.camera),this.controls=new o.DeviceOrientationControls(this.camera,!0),this.orbitControls=new o.OrbitControls(this.camera,this.renderer.domElement),this.orbitControls.noZoom=!0,this.orbitControls.noPan=!0,this.orbitControls.autoRotate=!1,e.addEventListener("resize",this.resize.bind(this),!1),this._initControls=this.initControls.bind(this),e.addEventListener("deviceorientation",this._initControls,!1),setTimeout(this.resize.bind(this),0),this.animate=this.animate.bind(this),setTimeout(this.play.bind(this),0)}var o=e.THREE;t.prototype.initControls=function(t){t.alpha&&(e.removeEventListener("deviceorientation",this._initControls,!1),this.renderer.domElement.addEventListener("click",this.fullscreen.bind(this),!1),this.orbitControls.enabled=!1,this.controls.connect(),this.controls.update())},t.prototype.animate=function(){this._playing&&(requestAnimationFrame(this.animate),this.update(),this.render())},t.prototype.pause=function(){this._playing=!1},t.prototype.play=function(){this._playing||(this._playing=!0,this.animate())},t.prototype.update=function(){(this.width!==e.innerWidth||this.height!==e.innerHeight)&&this.resize(),this.camera.updateProjectionMatrix(),this.orbitControls.enabled!==!0?this.controls.update():this.orbitControls.update()},t.prototype.render=function(){this.effect.render(this.scene,this.camera)},t.prototype.fullscreen=function(){this.renderer.domElement.requestFullscreen?this.renderer.domElement.requestFullscreen():this.renderer.domElement.msRequestFullscreen?this.renderer.domElement.msRequestFullscreen():this.renderer.domElement.mozRequestFullScreen?this.renderer.domElement.mozRequestFullScreen():this.renderer.domElement.webkitRequestFullscreen&&this.renderer.domElement.webkitRequestFullscreen()},t.prototype.resize=function(){this.width=e.innerWidth,this.height=e.innerHeight,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height),this.effect.setSize(this.width,this.height)},e.Cardboard=t}(window),function(e){function t(e,t,i){o.Object3D.call(this);var s=new o.Shape;s.moveTo(0,0),s.lineTo(0,i.rectLength),s.lineTo(i.rectWidth,i.rectLength),s.lineTo(i.rectWidth,0),s.lineTo(0,0),this.rectShape=s;var n=new o.ShapeGeometry(s),r=new o.Mesh(n,new o.MeshBasicMaterial({color:16711680,transparent:!0,opacity:i.showHotspot?.5:0}));this.rectMesh=r;var a=i.verticalDegree*Math.PI/180,c=(i.degree-180)*Math.PI/180;r.position.x=-i.radius*Math.cos(a)*Math.cos(c),r.position.y=i.radius*Math.sin(a),r.position.z=i.radius*Math.cos(a)*Math.sin(c),r.lookAt(t.position),this.add(r),e.add(this),e.intersectables.push(this.children[0]),this.remove=function(){e.intersectables.splice($.inArray(this.children[0],e.intersctables),1),e.remove(this)},this.onFocus=i.onFocus,this.onBlur=i.onBlur}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.Hotspot=t}(window),function(e){function t(e,t,i,s){o.Object3D.call(this);var n=new o.PlaneBufferGeometry(i.image.width/s.scale||10,i.image.height/s.scale||10),r=new o.MeshBasicMaterial({map:i,transparent:!0,opacity:1}),a=new o.Mesh(n,r);this.mesh=a,this.camera=t,this.add(a),this.args=s,this.onFocus=s.onFocus,this.onBlur=s.onBlur,this.degree=s.degree,this.updatePosition(),this.intersectable=void 0!==this.args.onFocus||void 0!==this.args.onBlur,e.add(this),this.intersectable&&e.intersectables.push(this.children[0]),this.remove=function(){this.intersectable&&e.intersectables.splice($.inArray(this.children[0],e.intersectables),1),e.remove(this)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,t.prototype.updatePosition=function(){var e=this.args.verticalDegree*Math.PI/180,t=(this.args.degree-180)*Math.PI/180;this.position.x=-this.args.radius*Math.cos(e)*Math.cos(t),this.position.y=this.args.radius*Math.sin(e),this.position.z=this.args.radius*Math.cos(e)*Math.sin(t),this.lookAt(this.camera.position)},e.Image3D=t}(window),function(e){function t(e,t,n){s.Object3D.call(this);var r=i(this,n);r.receiveShadow=n.receiveShadow||!0,r.castShadow=!1,r.computeBoundingBox();var a=n.verticalDegree*Math.PI/180,c=(n.degree-180)*Math.PI/180,h=o(this.textMesh);this.textMesh.position.x=-n.radius*Math.cos(a)*Math.cos(c),this.textMesh.position.y=n.radius*Math.sin(a),this.textMesh.position.z=n.radius*Math.cos(a)*Math.sin(c),this.textMesh.geometry.applyMatrix((new s.Matrix4).makeTranslation(-h.x,-h.y,-h.z)),this.textMesh.lookAt(t.position),e.add(this.textMesh);var l=this;this.remove=function(){e.remove(this),e.remove(l.textMesh),l.textMesh.geometry.dispose()}}function o(e){e.geometry.computeBoundingBox();var t=e.geometry.boundingBox,o=t.min.x,i=t.max.x,s=t.min.y,n=t.max.y,r=t.min.z,a=t.max.z,c=o>i?o-i:i-o,h=s>n?s-n:n-s,l=r>a?r-a:a-r,p=o+c/2+e.position.x,d=s+h/2+e.position.y,u=r+l/2+e.position.z;return e.geometry.centroid={x:p,y:d,z:u},e.geometry.centroid}function i(e,t){var o=new s.TextGeometry(t.text,{size:t.size||3,height:t.height||.4,curveSegments:t.curveSegments||1,font:t.font||"helvetiker",bevelThickness:t.bevelThickness||.1,bevelSize:t.bevelSize||.1,bevelEnabled:t.bevelEnabled||!0,material:0,extrudeMaterial:1});return e.textGeo=o,o.computeBoundingBox(),o.computeVertexNormals(),e.material=new s.MeshFaceMaterial([new s.MeshPhongMaterial({color:t.color||16777215,shading:s.SmoothShading,shininess:5,transparent:t.transparent||!1,opacity:t.opacity||1}),new s.MeshPhongMaterial({color:t.color||16777215,shading:s.SmoothShading,shininess:5,transparent:t.transparent||!1,opacity:t.opacity||1})]),e.textMesh=new s.Mesh(o,t.material||e.material),o}var s=e.THREE;t.prototype=Object.create(s.Object3D.prototype),t.prototype.constructor=t,e.Text=t}(window),function(e){function t(e,t){o.Object3D.call(this),this.direct=new o.DirectionalLight(16777215,.125),this.direct.position.set(0,0,0),e.add(this.direct),this.point=new o.PointLight(16777215,1),this.point.position.set(5,0,0),e.add(this.point),this.ambient=new o.AmbientLight(3355443),e.add(this.ambient),this.spot=new o.SpotLight(16777215),this.spot.position.set(t.position),this.spot.castShadow=!0,this.spot.shadowCameraNear=2,this.spot.shadowCameraFar=200,this.spot.shadowCameraFov=30,this.spot.distance=0,this.spot.angle=.4,e.add(this.spot);var i=this;this.remove=function(){e.remove(i.direct),e.remove(i.point),e.remove(i.ambient),e.remove(i.spot)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.Lights=t}(window),function(e){function t(t,i,s){o.Object3D.call(this),s=null||s,this.elems=[];var n=this;s.forEach(function(s,r,a){o.ImageUtils.loadTexture(s.icon,void 0,function(c){var h=function(){};h.prototype=Object.create(o.Object3D.prototype),h.constructor=h;var l=-60+180/(a.length+1)*r,p=15,d=-15,u=new e.Text(t,i,{text:s.title,radius:p,degree:l,verticalDegree:d,color:0,size:1}),m=new e.Image3D(t,i,c,{scale:4,degree:l,verticalDegree:d+20,radius:p,onFocus:function(){location.hash="#!/app/"+s.url},onBlur:function(){}});h.text=u,h.image=m,n.elems.push(h)})}),t.add(this),this.remove=function(){this.elems.forEach(function(e){e.text.remove(),e.image.remove()}),t.remove(n)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.Cards=t}(window),function(e){function t(e,t,i){i={}||i;var s=new o.Mesh(new o.SphereGeometry(i.depth||100,32,32),new o.MeshBasicMaterial({map:o.ImageUtils.loadTexture(t),transparent:i.transparent||!1,opacity:1}));s.scale.x=-1,this.sphere=s,e.add(s),this.remove=function(){e.remove(s)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.Panorama=t}(window),function(e){function t(e,t){o.Object3D.call(this),t={}||t;var i=new o.BoxGeometry(500,500,500),s="../images/skydom/",n=".jpg",r=[s+"px"+n,s+"nx"+n,s+"py"+n,s+"ny"+n,s+"pz"+n,s+"nz"+n],a=o.ImageUtils.loadTextureCube(r,o.CubeRefractionMapping),c=o.ShaderLib.cube;c.uniforms.tCube.value=a;var h=new o.ShaderMaterial({fragmentShader:c.fragmentShader,vertexShader:c.vertexShader,uniforms:c.uniforms,side:o.BackSide}),l=new o.Mesh(i,h);this.skydom=l,e.add(l),this.remove=function(){e.remove(l)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.Skydom=t}(window),function(e){function t(e,t){o.Object3D.call(this),t=t||{width:500,length:500,color:16777215,shadow:!0,pos:[0,-20,0],rot:[-.5,0,0]};var i=new o.PlaneBufferGeometry(t.width,t.length),s=new o.MeshLambertMaterial({color:t.color,wireframe:!1});this.plane=new o.Mesh(i,s),this.plane.position.x=t.pos[0],this.plane.position.y=t.pos[1],this.plane.position.z=t.pos[2],this.plane.rotation.x=t.rot[0]*Math.PI,this.plane.rotation.y=t.rot[1]*Math.PI,this.plane.rotation.z=t.rot[2]*Math.PI,e.add(this.plane),this.remove=function(){e.remove(this.plane)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.Plane=t}(window),function(e){function t(e,t){o.Object3D.call(this),t=t||{width:5,color:16777215,pos:[0,-5,0],rot:[0,0,0]};var i=new o.BoxGeometry(t.width,t.width,t.width),s=new o.MeshLambertMaterial({color:t.color});this.cube=new o.Mesh(i,s),this.cube.position.x=t.pos[0],this.cube.position.y=t.pos[1],this.cube.position.z=t.pos[2],this.cube.rotation.x=t.rot[0]*Math.PI,this.cube.rotation.y=t.rot[1]*Math.PI,this.cube.rotation.z=t.rot[2]*Math.PI,e.add(this.cube),this.remove=function(){e.remove(this.cube)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.Cube=t}(window),function(e){function t(t,i){e.Cube.call(this,t,i);var s=new o.TextGeometry(i.text,{size:i.size||1,height:i.height||.4,curveSegments:i.curveSegments||1,font:i.font||"helvetiker",bevelThickness:i.bevelThickness||.1,bevelSize:i.bevelSize||.1,bevelEnabled:i.bevelEnabled||!0,material:0,extrudeMaterial:1}),n=new o.MeshFaceMaterial([new o.MeshPhongMaterial({color:i.textColor||0,shading:o.SmoothShading,shininess:5,transparent:i.transparent||!1,opacity:i.opacity||1}),new o.MeshPhongMaterial({color:i.color||0,shading:o.SmoothShading,shininess:5,transparent:i.transparent||!1,opacity:i.opacity||1})]);this.text=new o.Mesh(s,n),this.text.position.x=i.pos[0],this.text.position.y=i.pos[1]+2.2,this.text.position.z=i.pos[2],this.text.rotation.x=i.rot[0]*Math.PI,this.text.rotation.y=i.rot[1]*Math.PI,this.text.rotation.z=i.rot[2]*Math.PI,t.add(this.text),this.name=i.text,this.onFocus=i.onFocus,this.onBlur=i.onBlur,this.cube.parent=this,this.intersectable=void 0!==i.onFocus||void 0!==i.onBlur,this.intersectable&&t.intersectables.push(this.cube),this.remove=function(){t.remove(this.cube),t.remove(this.text),this.intersectable&&t.intersectables.splice($.inArray(this.cube,t.intersectables),1)}}var o=e.THREE;t.prototype=Object.create(e.Cube.prototype),t.prototype.constructor=t,e.Seat=t}(window),function(e){function t(e){var s=new o.RingGeometry(.85*t.SIZE*i,1*t.SIZE*i,32),n=new o.MeshBasicMaterial({color:16777215,blending:o.AdditiveBlending,side:o.DoubleSide});o.Mesh.call(this,s,n),this.camera=e,this.position.z=-3*i,this.lookAt(this.camera)}var o=e.THREE,i=3;t.SIZE=.1*i,t.prototype=Object.create(o.Mesh.prototype),t.prototype.constructor=t,e.Cursor=t}(window),function(e){function t(t,i){o.Object3D.call(this),t.face=this,this.background=new e.Skydom(t),this.Lights=new e.Lights(t,i),this.cards=new e.Cards(t,i,e.manifest),this.remove=function(){this.background.remove(),this.Lights.remove(),this.cards.remove(),t.removeFace(this)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.HomeFace=t}(window),function(e){function t(t,i){if(o.Object3D.call(this),this.pictures=["PANO0.jpg","PANO1.jpg","PANO2.jpg","PANO3.jpg","PANO4.jpg","PANO5.jpg","PANO6.jpg"],this.background={},"#!/app/panorama"===location.hash)this.background.name=this.pictures[0],location.hash+="/"+this.background.name,this.background=new e.Panorama(t,"../images/panorama/"+this.background.name);else{var s=location.hash.split("/");this.background.name=s[s.length-1],this.pictures[this.background.name]||(this.background.name=this.pictures[0]),this.background=new e.Panorama(t,"../images/panorama/"+this.background.name)}this.lights=new e.Lights(t,i),this.elems=[];var n=this;this.goAfterBtn=new e.Text(t,i,{lookAt:new o.Vector3(i.position.x,-300,i.position.z),text:">",radius:15,degree:-160,verticalDegree:-10,color:0,size:5}),this.goAfterSpot=new e.Hotspot(t,i,{rectLength:5,rectWidth:5,degree:-150,verticalDegree:-20,radius:15,showHotspot:t.showHotspots,onFocus:function(){var o=location.hash.split("/");n.background.name=n.background.name||o[o.length-1];var i=n.pictures.indexOf(n.background.name),s=(i+1)%n.pictures.length;n.background.remove(),n.background=new e.Panorama(t,"../images/panorama/"+n.pictures[s]),location.hash=location.hash.replace(n.pictures[i],n.pictures[s]),n.background.name=n.pictures[s]}}),this.elems.push(this.goAfterBtn),this.elems.push(this.goAfterSpot),this.goHomeBtn=new e.Text(t,i,{lookAt:new o.Vector3(i.position.x,-300,i.position.z),text:"O",radius:15,degree:-120,verticalDegree:-10,color:0,size:5}),this.goHomeSpot=new e.Hotspot(t,i,{rectLength:5,rectWidth:5,degree:-110,verticalDegree:-20,radius:15,showHotspot:t.showHotspots,onFocus:function(){location.hash="#!/"}}),this.elems.push(this.goHomeBtn),this.elems.push(this.goHomeSpot),this.goPrevBtn=new e.Text(t,i,{lookAt:new o.Vector3(i.position.x,-300,i.position.z),text:"<",radius:15,degree:-80,verticalDegree:-10,color:0,size:5}),this.goPrevSpot=new e.Hotspot(t,i,{rectLength:5,rectWidth:5,degree:-70,verticalDegree:-20,radius:15,showHotspot:t.showHotspots,onFocus:function(){var o=location.hash.split("/");n.background.name=n.background.name||o[o.length-1];var i=n.pictures.indexOf(n.background.name),s=(i+n.pictures.length-1)%n.pictures.length;n.background.remove(),n.background=new e.Panorama(t,"../images/panorama/"+n.pictures[s]),location.hash=location.hash.replace(n.pictures[i],n.pictures[s]),n.background.name=n.pictures[s]}}),this.elems.push(this.goPrevBtn),this.elems.push(this.goPrevSpot),this.remove=function(){this.background.remove(),this.lights.remove(),this.elems.forEach(function(e){e.remove()}),t.removeFace(this)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.PanoFace=t}(window),function(e){function t(t,i){o.Object3D.call(this),this.scene=t,this.lights=new e.Lights(t,i),this.plane=new e.Plane(t),this.cubes=[],this.camPos=i.position.clone().setY(-9),this.camera=i,this.screen={},this.screen.remove=function(){},t.fog=new o.Fog(16777215,.015,10),$.ajax({type:"GET",cache:!1,url:"movie.json",async:!0,context:this,success:function(o){var s=this,n=o.seats,r=1,a=2,c=5,h=0,l=0,p=0,d=0,u=n[0].length*(c+a);h=p=h-u/2,l=d=l,s.screen=new e.Plane(s.scene,{width:66,length:37.125,color:16777215,shadow:!0,pos:[h+u/2,.5625,l-10],rot:[0,0,0]}),n.forEach(function(o){o.forEach(function(o){o.isSeat&&s.cubes.push(new e.Seat(s.scene,{width:c,color:16777215,pos:[h,-18,l],rot:[-.5,0,-1],text:o.num,onFocus:function(){var e=t.selected.obj,o=e.position.clone();i.position.setX(o.x),i.position.setY(o.y+3),i.position.setZ(o.z),i.lookAt(s.screen.plane.position)},onBlur:function(){}})),h=h+r+c}),h=p,l=l+a+c})},error:function(e,t,o){console.log(t+":"+o)},dataType:"json"}),this.remove=function(){this.lights.remove(),this.plane.remove(),this.scene.remove(),this.screen.remove(),this.camera.position.setX(0),this.camera.position.setY(0),this.camera.position.setZ(0),this.cubes.forEach(function(e){e.remove()}),t.removeFace(this)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.MovieFace=t}(window),function(e){function t(t){o.Object3D.call(this);var i=document.createElement("video");i.autoplay=!0;var s=document.createElement("canvas"),n=s.getContext("2d");$("#back").append(i),$("#back").append(s),this.resizeHandle=function(){$("#back").width(e.innerWidth),$("#back").height(e.innerHeight),$("#back video").height(e.innerHeight),$("#back video").width(e.innerHeight/3*4),$("#back canvas").height(e.innerHeight),$("#back canvas").width(e.innerHeight/3*4)},this.resizeHandle(),navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,navigator.getUserMedia({audio:!1,video:!0},function(t){window.stream=t,i.src=window.URL?window.URL.createObjectURL(t):t,i.style.height=e.innerHeight,i.style.width=e.innerHeight/3*4,i.style.cssText=i.style.cssText+"position:absolute;top:0;left:0;",s.style.height=e.innerHeight,s.style.width=e.innerHeight/3*4,s.style.cssText=s.style.cssText+"position:absolute;top:0;left:50%;"},function(e){console.log("navigator.getUserMedia error: ",e)}),this.timer=setInterval(function(){n.drawImage(i,0,0,s.width,s.height)},62.5),e.addEventListener("resize",this.resizeHandler,!1),this.remove=function(){e.removeEventListener("resize",this.resizeHandler,!1),clearInterval(this.timer),$("#back").html(),t.removeFace(this)}}var o=e.THREE;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,e.NoodleFace=t}(window),function(e){function t(t,i){o.Object3D.call(this),this.updatables=[],this.intersectables=[],this.raycaster=new o.Raycaster;var s=this;this.camera=t,this.cursor=i;var n=new e.HomeFace(s,t);s.add(n),s.face=n,this.removeFace=function(e){s.intersectables=[],s.updatables=[],s.remove(e)}}var o=e.THREE,i=100;t.prototype=Object.create(o.Object3D.prototype),t.prototype.constructor=t,t.prototype.findIntersections=function(){var t=new o.Vector3(0,0,1);e.gaze=t,t.unproject(this.camera),this.raycaster.set(this.camera.position,t.sub(this.camera.position).normalize());var s=this.raycaster.intersectObjects(this.intersectables);if(this.cursor.scale.set(1,1,1),s.length>0){var n=s[0];if(this.selected)if(this.selected.id===n.object.uuid){if(void 0!==this.selected.obj.parent.onFocus){this.selected.ttl-=1;var r=this.selected.ttl/i;this.cursor.scale.set(r,r,r),this.selected.ttl<=1&&(this.selected.obj.parent.onFocus(),this.selected=void 0)}}else try{this.selected.obj.parent.onBlur(),e.navigator.vibrate(30),this.selected={id:n.object.uuid,ttl:i,obj:n.object}}catch(a){console.log(a)}else e.navigator.vibrate(30),this.selected={id:n.object.uuid,ttl:100,obj:n.object}}else void 0!==this.selected&&void 0!==this.selected.obj.parent.onBlur&&this.selected.obj.parent.onBlur(),this.selected=void 0},t.prototype.update=function(){this.findIntersections();for(var e=0;e<this.updatables.length;e++){var t=this.updatables[e];t()}},e.MainController=t}(window),function(e){function t(t,o,i){function s(){if(!(r instanceof e.HomeFace)){r.remove();var i=new e.HomeFace(t.controller,o);t.controller.face=i}}function n(s){if(!(r instanceof e[s.face])){r.remove();var n=new e[s.face](t.controller,o,i);t.controller.face=n}}var r={};e.addEventListener("load",function(){if(r=t.controller.face,location.hash&&/^#!\/.*/.test(location.hash)){var o=location.hash.split("/")[2],i=1;e.manifest.forEach(function(e){o===e.url&&(n(e),i--)}),i&&(location.hash="#!/")}else location.hash="#!/"},!1),e.addEventListener("hashchange",function(o){if(r=t.controller.face,!/^!\/.*/.test(o.newURL.split("#")[1])||o.newURL.split("#")[1].length<3)"!/"!==o.newURL.split("#")[1]&&(location.hash="#!/"),s();else{var i=o.newURL.split("#!/")[1].split("/")[1],a=1;e.manifest.forEach(function(e){i===e.url&&(n(e),a--)}),a&&(location.hash="#!/")}},!1)}t.prototype.constructor=t,e.Router=t}(window),function(e){function t(){var t=new e.Cardboard,o=new e.Cursor(t.camera),i=new e.MainController(t.camera,o);t.scene.add(i),t.scene.controller=i,t.camera.add(o),o.position.z=-9,o.lookAt(t.camera.position),t.effect.separation=.6,e.has.mobile||setTimeout(function(){t.orbitControls.target.set(0,.3,1)},0),t.update=function(){e.Cardboard.prototype.update.call(this),i.update()},e.scene=t.scene,e.camera=t.camera,e.cursor=o,document.getElementById("scene").appendChild(t.renderer.domElement);new e.Router(t.scene,t.camera,o)}t()}(window);