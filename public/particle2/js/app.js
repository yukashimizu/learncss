let g = {}
g.width = window.innerWidth
g.height = window.innerHeight
g.renderer = new THREE.WebGLRenderer({antialias: true})
g.scene = new THREE.Scene()
g.canvas = document.getElementById('main')
g.camera = new THREE.PerspectiveCamera(60, g.width / g.height, 1, 1000)
g.particles = undefined
g.controls = new THREE.OrbitControls(g.camera)

g.raycaster = new THREE.Raycaster()
g.mouse = new THREE.Vector2()

window.onload = init(g)

function init (g) {
	initRenderer(g)
	initParticles(g)
	animation(g)
}

function initRenderer (config) {
	config.renderer.setClearColor(0x131313)
	config.renderer.setSize(config.width, config.height)
	config.renderer.setPixelRatio(window.devicePixwlRatio)

	config.canvas.appendChild(config.renderer.domElement)
	config.camera.position.set(0, 0, 100)

	config.scene.fog = THREE.FogExp2(0x131313, 0.005)
}

function initParticles (config) {
	let geometry = new THREE.Geometry()
	let texture = new THREE.TextureLoader().load('./img/particle.png', (texture) => {
		initPoints(texture)
	})

	function initPoints (texture) {
		function setColor () {
			let color = new THREE.Color();
			let h = 360 * Math.random();
			let s = 40 + 20 * Math.random();
			let l = 50 + 20 * Math.random();
			color.setHSL(h / 360, s / 100, l / 100);
			return color;
		}

		for(let i = 0; i < 100; i++) {
			let vertex = new THREE.Vector3()
			vertex.x = Math.random() * 1000 - 500
			vertex.y = Math.random() * 1000 - 500
			vertex.z = Math.random() * 1000 - 500

			geometry.vertices.push(vertex)
		}

		let size = 15

		let materials = []

		for(let i = 0; i < 100; i++) {
			materials[i] = new THREE.PointsMaterial({
				size: size,
				map: texture,
				blending: THREE.AdditiveBlending,
				depthTest: false,
				transparent : true,
				opacity: 0.3
			})
			materials[i].color = setColor()

			g.particles = new THREE.Points( geometry, materials[i] )
			g.particles.rotation.x = Math.random() * 6
			g.particles.rotation.y = Math.random() * 6
			g.particles.rotation.z = Math.random() * 6
			config.scene.add(g.particles)
		}

		rendering(config)
	}
}

function rendering (config) {
	g.renderer.render(g.scene, g.camera)
}

function animation (config) {
	requestAnimationFrame(this.animation.bind(this))
	rendering(config)
}

//mouse event
function onMouseMove (g) {
	config.controls.update()
}





