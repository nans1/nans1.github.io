
$(function() {



	var objects = [];
	var count = 0;

// Load the background texture
var texture1 = new THREE.TextureLoader().load( 'texture/sphere/2k_stars_milky_way.jpg' );
// add scene + camera
var scene = new THREE.Scene();
scene.background = texture1;
scene.fog = new THREE.FogExp2( 0x001B35,0.001);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 850 );
camera.position.z = 550;
// add control with mouse and keyboard
controls = new THREE.OrbitControls( camera );
controls.addEventListener( 'change', render );

//******************************************************************************************************

var renderer = new THREE.WebGLRenderer();
// renderer.setClearColor(0xdddddd);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
document.body.appendChild( renderer.domElement );

// var axis = new THREE.AxisHelper(10);
// scene.add (axis);

var grid = new THREE.GridHelper(50 , 5);
var color = new THREE.Color("rgb(255,0,0)");

// grid.setColors(color , 0x00000);

// scene.add(grid);
//****************************************************************************************************




var geometryC = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
var geometry360 = SphereGeometry( 4.5,84);
var geometryN = SphereGeometry( 1,20);
var geometry = SphereGeometry( 5,64);
var geometryFond = SphereGeometry( 550, 64);
var geometryVenus = SphereGeometry( 1.8, 64);
var geometrySaturne = SphereGeometry( 6, 64);
var geometrySun = SphereGeometry( 11, 64);
var geometry2 = SphereGeometry( 0.7, 64);


var meshMaterial = new THREE.MeshPhongMaterial({ transparent: false, map: new THREE.TextureLoader().load('texture/cube/acierR.jpg') });
var material360 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('texture/cube/360.jpg',THREE.SphericalRefractionMapping) ,side:THREE.DoubleSide, overdraw: true } );
var material = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('texture/sphere/earth.jpg',THREE.SphericalRefractionMapping) ,side:THREE.DoubleSide, overdraw: true } );
var material2 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('texture/sphere/mars_1k_color.jpg',THREE.SphericalRefractionMapping) } );
var materialSun = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('texture/sphere/2k_sun.jpg',THREE.SphericalRefractionMapping) } );
var materialFond = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('texture/sphere/fond2.png',THREE.SphericalRefractionMapping),side:THREE.DoubleSide, overdraw: true } );
var materialVenus = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('texture/sphere/venus.png',THREE.SphericalRefractionMapping), overdraw: true } );
var materialN = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('texture/sphere/2k_stars_milky_way.jpg',THREE.SphericalRefractionMapping)} );
var materialSaturne = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('texture/sphere/2k_saturn.jpg',THREE.SphericalRefractionMapping), overdraw: true } );



var cube = new THREE.Mesh( geometryC,meshMaterial );
var sphere360 = Mesh(geometry360 , material360);
var sphereN = Mesh(geometryN , materialN);
var saturne = Mesh(geometrySaturne , materialSaturne);
var sphereFond = Mesh(geometryFond , materialFond);
var sphereSun = Mesh(geometrySun , materialSun);
var sphere3 = Mesh( geometry, material );
var sphere2 = Mesh( geometry2, material2 );
var sphereV = Mesh( geometryVenus, materialVenus );






var normalMapS = Normal('texture/sphere/normalSaturne.png',THREE.SphericalRefractionMapping);

var normalMapV = Normal('texture/sphere/venusNormal.png',THREE.SphericalRefractionMapping);

var normalMapM = Normal('texture/sphere/mars_1k_normal.jpg',THREE.SphericalRefractionMapping);

var normalSun = Normal('texture/sphere/NormalSun.png',THREE.SphericalRefractionMapping);

var normalMap = Normal('texture/cube/acierN.png');


scene.add( sphere3 , sphere2 , sphereSun, sphereFond , sphereV,cube,saturne,sphere360, sphereN);

var anno;
var anno = createRings(6,55);
scene.add(anno);

var sphereS;
var sphereS = createSphere(5,8);
scene.add(sphereS);

cube.material.normalMap = normalMap;
sphereSun.material.normalMap = normalSun;
sphere2.material.normalMap = normalMapM;
saturne.material.normalMap = normalMapS;
sphereV.material.normalMap = normalMapV;

	//  var normalMap = new THREE.TextureLoader().load('texture/sphere/2k_earth_normal_map.psd');
	// sphere.material.normalMap = normalMap;
	
	saturne.position.y = 55;
	saturne.position.x = 355;
	sphereN.position.z = 1950;

	anno.position.x = 355;
	anno.position.y = 55;
	anno.rotation.z = +190;
	anno.rotation.x = +190;

	sphereSun.position.x = 20;
	sphereSun.position.y = 10;
	sphereSun.position.z = 400;
	sphereV.position.z = 150;
	sphere2.position.x = 48;
	sphere2.position.y = 1;
	sphereFond.overdraw = true;
	sphereFond.castShadow = true;
	sphereSun.overdraw = true;
	sphereSun.castShadow = true;
	sphere2.overdraw = true;
	sphere2.castShadow = true;
	sphere3.overdraw = true;
	sphere3.castShadow = true;
	sphere2.position.multiplyScalar( - 1 );
	meshMaterial.side = THREE.DoubleSide;
	cube.position.set(0,1.5,0);
	cube.castShadow = true;

	objects.push(sphere3 , sphere2 , sphereSun, sphereV , saturne,cube,sphereN,sphere360);
	

// var planeGeometry = new THREE.PlaneGeometry (5,5,5);
// var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
// var plane = new THREE.Mesh(planeGeometry, planeMaterial);

// plane.rotation.x = -.3*Math.PI;
// plane.receiveShadow = true;

// scene.add(plane);

//*************LUMIERE********************************************************




	var lightA = new THREE.AmbientLight( 0x404040,0.3); // soft white light
	var light = Light( 0xff0000, 1, 100 );
	var lightSa = Light( 0xff0000, 1, 150 );
	var lightSun = Light( 0xFFCA97, 2.3, 300 );
	var lightSun2 = Light( 0xFFCA97, 2.3, 200 );
	var lightTerre = Light( 0xFFCA97, 2.3, 390 );
	var spotLight = new THREE.SpotLight(0x004282);
	
	scene.add( lightSun,lightSun2,lightTerre,lightA,light,lightSa, spotLight);



	spotLight.castShadow = true;
	spotLight.position.set (10, 15, 35);
	spotLight.shadow.mapSize.width = 65;
	spotLight.shadow.mapSize.height = 65;
	// spotLight.shadow.camera.near = 500;
	// spotLight.shadow.camera.far = 4000;
	// spotLight.shadow.camera.fov = 30;
	spotLight.penumbra = 0.99;
	spotLight.power = 2;
	scene.add(spotLight);

	
	lightTerre.position.set( 0, 10, 0 );
	lightSun2.position.set( 18, 10, 300);
	lightSun.position.set( 18, 10, 510 );
	lightSa.position.set( 355, 55, 50 );
	light.position.set( 50, 50, 50 );


	// LIGHTS particule

	var light1, light2, light3, light4, light5, light6,light7,light8,light9;
	var clock = new THREE.Clock();

	var intensity = 1.5;
	var intensity2 = 0.5;
	var distance = 100;
	var distance2 = 10;
	var decay = 2.0;
	var decay2 = 3.5;
	var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100,c7 = 0xff1100,c8 = 0x0040ff,c9 = 0xFF3399;
	var sphere = SphereGeometry( 0.02, 15, 15);
	light1 = Light( c1, intensity, distance, decay );
	light1.add( Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
	scene.add( light1 );
	light2 = Light( c2, intensity2, distance, decay2 );
	light2.add( Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );
	scene.add( light2 );
	light3 = Light( c3, intensity, distance2, decay );
	light3.add( Mesh( sphere, new THREE.MeshBasicMaterial( { color: c3 } ) ) );
	scene.add( light3 );
	light4 = Light( c4, intensity, distance, decay );
	light4.add( Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );
	scene.add( light4 );
	light5 = Light( c5, intensity2, distance, decay );
	light5.add( Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );
	scene.add( light5 );
	light6 = Light( c6, intensity, distance, decay2 );
	light6.add( Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );
	scene.add( light6 );
	light7 = Light( c7, intensity, distance, decay );
	light7.add( Mesh( sphere, new THREE.MeshBasicMaterial( { color: c7 } ) ) );
	scene.add( light7 );
	light8 = Light( c8, intensity2, distance, decay );
	light8.add( Mesh( sphere, new THREE.MeshBasicMaterial( { color: c8 } ) ) );
	scene.add( light8 );
	light9 = Light( c9, intensity, distance2, decay );
	light9.add( Mesh( sphere, new THREE.MeshBasicMaterial( { color: c9 } ) ) );
	scene.add( light9 );
	var dlight = new THREE.DirectionalLight( 0xffffff, 0.05 );
	dlight.position.set( 5, 10, 80 ).normalize();
	scene.add( dlight );

//**************************************************************


// find intersections
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var radius;


// document.addEventListener('mousemove' , function(event){
//     var rect = renderer.domElement.getBoundingClientRect();
// 	mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
// 	mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

// 	raycaster.setFromCamera( mouse, camera );

// 	intersects = raycaster.intersectObjects( objects );
//  	console.log(intersects[0].object.id);


// 		for( var i = 0; i < intersects.length; i++ ) {
// 			var intersection = intersects[ i ],
// 				obj = intersection.object;
// 			console.log(obj);
// 			// obj.scale.set(10,10,10);
// 			obj.material.lightMap = true;
// 			// obj.material.color.setRGB( 0.5 - i / intersects.length, 5, 0 );
// 			// intersects[0].obj.material.color.setRGB( object.grayness, object.grayness, object.grayness );

// 		}


// });
function SphereGeometry(radius,Segments){

	return new THREE.SphereGeometry( radius, Segments, Segments);


}




function Mesh(geometry,material){

	return new THREE.Mesh(geometry,material);

}


function Normal(url,option){

	return new THREE.TextureLoader().load(url,option);
}



function Light(color,size,intensity){

	return new THREE.PointLight(color,size,intensity);

}


//satelite terre
function createSphere(radius, segments) { return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), THREE.TextureLoader({ map:  THREE.TextureLoader('texture/sphere/earth.jpg'),
	bumpScale: 0.05 , specular: new THREE.Color('#190909') }) 
); } 



function createRings(radius, segments) { 

	var texture;
	texture = new THREE.TextureLoader().load( "texture/sphere/ringS.png" );
	return new THREE.Mesh(new THREE.RingGeometry(1.2 * radius, 2 * radius, 2 * segments, 5, 0, Math.PI * 2), 
		new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.6 }));

} 



// var teste;
// var teste = createSphereP(2,36);
// scene.add(teste);


// function createSphereP(radius, segments) { 

// 	var saturne;
// 	var saturne = new THREE.TextureLoader().load( "texture/sphere/earth.jpg",THREE.SphericalRefractionMapping);
// 	return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({ map: saturne, side : THREE.DoubleSide})); 

// } 




// mouse listener
	document.addEventListener( 'mousedown', function( event ) {

	var rect = renderer.domElement.getBoundingClientRect();
	mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
	mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	intersects = raycaster.intersectObjects( objects );
	
	if (intersects.length > 0) {

		console.log(intersects[0].object.id);


	}


	
	
	if ( intersects.length > 0 && intersects[0].object.id == 15 ) {
		//intersects[0].object.geometry.colors = (0x001B35,0.001)
		//console.log(intersects[0].object.geometry.colors);

		setupTween (camera.position.clone(), new THREE.Vector3 (8, 0, -9), 5000);
		var radius = 10;

	}else if( intersects.length > 0 && intersects[0].object.id == 16){

		setupTween (camera.position.clone(), new THREE.Vector3 (-52, -0.5, 1), 2000);
		var radius = 10;
	}else if( intersects.length > 0 && intersects[0].object.id == 14){

		setupTween (camera.position.clone(), new THREE.Vector3 (0, 0, 460), 2000);
		var radius = 10;
	}else if( intersects.length > 0 && intersects[0].object.id == 17){

		setupTween (camera.position.clone(), new THREE.Vector3 (-5, 0, 160), 2000);
		var radius = 10;
	}else if( intersects.length > 0 && intersects[0].object.id == 12){

		setupTween (camera.position.clone(), new THREE.Vector3 (380, 50, 0), 2000);
		var radius = 10;
	}else if( intersects.length > 0 && intersects[0].object.id == 9){

		setupTween (camera.position.clone(), new THREE.Vector3 (0, 0, 2000), 5000);
		var radius = 10;
	}else if( intersects.length > 0 && intersects[0].object.id == 11){

		setupTween (camera.position.clone(), new THREE.Vector3 (0, 0, 2), 4000);
		var radius = 10;
	}															


},false);



function setupTween (position, target, duration)
{
    // remove previous tweens if needed
    TWEEN.removeAll(); 
    new TWEEN.Tween (position)

    .to (target, duration)
    .easing (TWEEN.Easing.Quartic.InOut)
    .onUpdate (
    	function() {
                // copy incoming position into capera position
                camera.position.copy (position);
            })
    .start();

}



function animate() {
	
	camera.updateProjectionMatrix();
	requestAnimationFrame( animate );
	TWEEN.update();
	render();
	

	sphere360.rotation.y += 0.001;


	anno.rotation.z += 0.001;
	saturne.rotation.y -= 0.002;
	
	cube.rotation.x += 0.001;
	cube.rotation.y += 0.001;
	cube.position.z += 0.001;
	cube.position.z -= 0.001;


	sphere2.rotation.x += 0.002;
	sphere2.rotation.y += 0.002;

	sphere3.rotation.x -= 0.002;
	sphere3.rotation.y -= 0.002;

	sphereSun.rotation.x += 0.002;
	sphereSun.rotation.y += 0.002;

	sphereV.rotation.x += 0.002;
	sphereV.rotation.y += 0.002;

	sphereS.rotation.x += 0.002;
	sphereS.rotation.y += 0.002;

	var time = Date.now() * 0.00025;
	var z = 20, d = 55, x = 12,z = 40;
	light1.position.x = Math.sin( time * 0.7 ) * d;
	light1.position.z = Math.cos( time * 0.5 ) * x;
	light2.position.x = Math.cos( time * 0.34 ) * d;
	light2.position.z = Math.sin( time * 0.55 ) * d;
	light3.position.x = Math.sin( time * 0.64 ) * d;
	light3.position.z = Math.sin( time * 0.5 ) * d;
	light4.position.x = Math.sin( time * 0.3 ) * x;
	light5.position.x = Math.cos( time * 0.8 ) * d;
	light5.position.z = Math.sin( time * 0.5 ) * d;
	light6.position.x = Math.cos( time * 0.7 ) * d;
	light6.position.z = Math.sin( time * 0.5 ) * d;
	light7.position.x = Math.cos( time * 0.66 ) * x;
	light7.position.z = Math.cos( time * 0.16 ) * x;
	light8.position.z = Math.sin( time * 0.5 ) * d;
	light9.position.z = Math.cos( time * 0.6 ) * d;
	controls.update( clock.getDelta() );


}

function render(){
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.clear();
	
	renderer.render( scene, camera );

}

animate();

});

