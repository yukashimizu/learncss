let renderer, scene, camera, light, loader, outer, inner, field, cylinder, width, height;

window.onload = init;

function init () {
	config();
	initScene();
	initCamera();
	initInner();
	initOuter();
	initField();
	initLight();
	initCylinder();
}

function config () {
	width = window.innerWidth;
	height = window.innerHeight;

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0x131313));
	renderer.setSize(width, height);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.shadowMap.enabled = true;

	let canvas = document.getElementById('gear');

	canvas.appendChild(renderer.domElement);
}

function initScene () {
	scene = new THREE.Scene();
}

function initCamera () {
	camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 9999);

	camera.position.x = 100;
	camera.position.y = 500;
	camera.position.z = 600;
}

function initLight () {
	light = new THREE.DirectionalLight(0xcccccc, 1.2);
	light.position.set(100, 400, 400);
	// light.shadow.camera.near = 50;
	light.shadow.camera.far = 700;
	light.shadow.camera.top = 200;
	light.shadow.camera.bottom = -200;
	light.shadow.camera.left = 200;
	light.shadow.camera.right = -200;

	var directionalLightHelper = new THREE.DirectionalLightHelper(light);
	let directionalLightShadowHelper = new THREE.CameraHelper(light.shadow.camera);

	light.castShadow = true;
	scene.add(light);
}

function initField () {
	let loader = new THREE.TextureLoader();
	let tex = loader.load('./img/tile.png', (texture) => {
		let geometry = new THREE.PlaneBufferGeometry(width, width, width);
		let material = new THREE.MeshPhongMaterial({
													map: texture,
													bumpMap: texture,
													bumpScale: 0.1,
													specularMap: texture
												});

		field = new THREE.Mesh(geometry, material);
		field.position.set(0, -10, 0);
		field.rotation.x = -Math.PI / 2;
		field.receiveShadow = true;
		scene.add(field);
	});
}

function initOuter () {
	let loader = new THREE.TextureLoader();
	let tex = loader.load('./img/outer.png', (texture) => {
		let geometry = new THREE.CircleGeometry(100, 32);
		let material = new THREE.MeshLambertMaterial({
														map: texture,
														transparent: true
													});
		outer = new THREE.Mesh(geometry, material);
		outer.position.set(0, 10, 0);
		outer.rotation.x = -Math.PI / 2;
		// outer.castShadow = true;
		outer.receiveShadow = true;
		scene.add(outer);
	});
}

function initInner () {
	loader = new THREE.TextureLoader();
	let tex = loader.load('./img/inner.png', (texture) => {
		let geometry = new THREE.CircleGeometry(70, 32);
		let material = new THREE.MeshLambertMaterial({
														map: texture,
														transparent: true
													});
		inner = new THREE.Mesh(geometry, material);
		inner.position.set(0, 25, 0);
		inner.rotation.x = -Math.PI / 2;
		inner.castShadow = true;
		scene.add(inner);
	});
}

function initCylinder () {
	loader = new THREE.TextureLoader();
	let tex = loader.load('./img/pillar.png', texture => {
		let geometry = new THREE.CylinderGeometry(100, 100, 70, 32, 1, true);
		let material = new THREE.MeshLambertMaterial({
													color: 0x007eff,
													map: texture,
													blending: THREE.AdditiveBlending,
													side: THREE.DoubleSide,
													transparent: true,
													depthWrite: false
												});
		cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.set(0, 40, 0);
		scene.add(cylinder);
		//現状、最後に描画するオブジェクトにrenderさせる
		animation();
	})
}

function animation () {
	camera.lookAt(inner.position);
	requestAnimationFrame(animation)
	outer.rotation.z += 0.01;
	inner.rotation.z += 0.02;
	cylinder.rotation.y -= 0.01
	renderer.render(scene, camera);
}


