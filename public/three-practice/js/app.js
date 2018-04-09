window.onload = init;

function init () {
	config();
	initScene();
	initCamera();
	initLight();
	initCube();
	initField();
	rendering();
}

let width, height, scene, camera, light, cube;
function config () {
	width = window.innerWidth;
	height = window.innerHeight;

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x131313);
	renderer.setSize(width, height);
	renderer.setPixelRatio(window.devicePixelRaito);

	let canvas = document.getElementById('main');
	canvas.appendChild(renderer.domElement);
}

function initScene () {
	scene = new THREE.Scene();

	let axis = new THREE.AxisHelper(1000);
	scene.add(axis);
}

function initCamera () {
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(100, 150, 300);
}

function initLight () {
	light = new THREE.DirectionalLight(0x999999);
    light.position.set(100, 100, 100);

	light.shadow.camera.near = 50;
	light.shadow.camera.far = 1000;
	light.shadow.camera.top = 100;
	light.shadow.camera.bottom = -100;
	light.shadow.camera.left = 100;
	light.shadow.camera.right = -100;

	light.castShadow = true;

	scene.add(light);
}

function initCube () {
	let geometry = new THREE.BoxGeometry(50, 50, 50);
	let material = new THREE.MeshLambertMaterial({color: 0x0077ff});
	cube = new THREE.Mesh(geometry, material);
	cube.castShadow = true;

	scene.add(cube);
}

function initField() {
	let geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
	let material = new THREE.MeshLambertMaterial({color: 0xdddddd});
	let field = new THREE.Mesh(geometry, material);
	field.position.set(0, -100, 0);
	field.rotation.x = -Math.PI / 2;
	field.receiveShadow = true;

	scene.add(field);
}

function rendering () {
	camera.lookAt(cube.position);
	requestAnimationFrame(rendering);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
}
