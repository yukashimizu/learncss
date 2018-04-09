window.onload = init;

function init () {
	initRenderer();
	initCamera();
	initLight();
	initParticles();
	// animation();
}

/************/
class config {

}
/************/

let renderer, scene, camera, light;
let radius = 500;
let angle = -90;
let degree = 0;
let depression = 30;
let radian = Math.PI / 180;
let center = new THREE.Object3D();

function initRenderer () {
	let width = window.innerWidth;
	let height = window.innerHeight;

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x131313);
	renderer.setSize(width, height);
	renderer.setPixelRatio(window.devicePixelRatio);

	let canvas = document.getElementById('perticle');
	canvas.appendChild(renderer.domElement);

	scene = new THREE.Scene();
}

function initCamera () {
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1000);
    camera.position.set(0, 0, 100);
}

function initLight () {
	light = new THREE.DirectionalLight(0xeeeeee);
	light.position.set(0, 0, 300);

	scene.add(light);
}

function initParticles () {
	let texture = new THREE.TextureLoader().load('./img/particle.png', (texture) => {
		initPoints(texture);
	});

	function initPoints (texture) {
		function setColor () {
			let color = new THREE.Color();
			let h = 200 + 30 * Math.random();
			let s = 40 + 20 * Math.random();
			let l = 50 + 20 * Math.random();
			color.setHSL(h / 360, s / 100, l / 100);
			return color;
		}

		let geometry = new THREE.Geometry();
		for(let i = 0; i < 2000; i++) {
			let vertex = new THREE.Vector3();
			vertex.x = Math.random() * 1000 - 500;
			vertex.y = Math.random() * 1000 - 500;
			vertex.z = Math.random() * 1000 - 500;

			geometry.vertices.push(vertex);
			geometry.colors.push(setColor());
		}

		let materials = [];
		let particle;
		for (let i = 0; i < 2000; i++) {
			materials[i] = new THREE.PointsMaterial({
				vertexColors: true,
				map: texture,
				size: 3,
				transparent: true,	//想定どおりではない。textureをcanvasで作る方法もある
				opacity: 0.5
			});
			particle = new THREE.Points(geometry, materials[i]);
			materials[i].map.needsUpdate = true;
			scene.add(particle);
		}
		rendering();
	}
}

function rendering () {
	requestAnimationFrame(rendering);
	angle -= 0.5;
	degree += 1;
	var dip = depression*Math.sin(degree*radian);
	camera.position.x = radius*Math.cos(angle*radian)*Math.cos(dip*radian);
	camera.position.y = radius*Math.sin(dip*radian);
	camera.position.z = radius*Math.sin(angle*radian)*Math.cos(dip*radian);
	camera.lookAt(center.position);

	renderer.render(scene, camera);
}


