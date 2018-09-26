window.onload = () => {
  initRender()
  initCamera()
  initLight()

  createBase()
  createCristal()

  // initDebugMode()
  rotationCristal()
}

// config
let canvas
let scene
let renderer
initRender = () => {
  canvas = document.getElementById("canvas")
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: 1.0})

  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  let clearColor = 0x000000
  let alpha = 1.0
  renderer.setClearColor(clearColor, alpha)

  scene = new THREE.Scene()

  canvas.appendChild(renderer.domElement)
}

// camera
let camera
initCamera = () => {
  // THREE.PerspectiveCamera(fov, aspect, near, far)
  let fov = 45
  let aspect = canvas.clientWidth / canvas.clientHeight
  let near = 1
  let far = 2000
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  let positionX = 0
  let positionY = 300
  let positionZ = -800
  camera.position.set(positionX, positionY, positionZ)

  let vectorX = 0
  let vectorY = 1
  let vectorZ = 0
  camera.up.set(vectorX, vectorY, vectorZ)

  let centerX = 0
  let centerY = 0
  let centerZ = 0
  camera.lookAt({x: centerX, y: centerY, z: centerZ})
}

// light
initLight = () => {
  let _directionalLight
  let _ambientLight

  // 平行光源 new THREE.DirectionalLight(hex, 光源強度)
  let directionalHex = 0xFFFFFF
  let directional = 0.8
  _directionalLight = new THREE.DirectionalLight(directionalHex, directional)

  let directionalX = 400
  let directionalY = 200
  let directionalZ = -800
  _directionalLight.position.set(directionalX, directionalY, directionalZ)

  scene.add(_directionalLight)

  // 環境光 new THREE.AmbientLight(hex)
  let ambientHex = 0x999999
  _ambientLight = new THREE.AmbientLight(ambientHex)

  scene.add(_ambientLight)
}

// rendering
draw = () => {
  renderer.render(scene, camera)
}

// debug
let _camera_control
initDebugMode = () => {
  let _axis

  // マウス操作を可能にする
  _camera_control = new THREE.OrbitControls(camera, canvas)

  // axis new THREE.AxisHelper(length)
  let length = 500
  _axis = new THREE.AxisHelper(length)

  let x = 0
  let y = 0
  let z = 0
  _axis.position.set(x, y, z)

  scene.add(_axis)
  
  debugDraw()
}

debugDraw = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(debugDraw)
}

// degree -> radian変換
toRadian = (_deg) => {
  return _deg * Math.PI / 180
}

// base
createBase = () => {
  // 円の形状オブジェクトの生成 new THREE.CircleGeometry(radius, 分割数)
  let _geometry = new THREE.CircleGeometry(120, 100)

  // テクスチャの生成
  let _texture = new THREE.TextureLoader().load("./images/base.png")

  // 材質
  let _material = new THREE.MeshBasicMaterial({
    map: _texture,
    transparent: true
  })

  // 円オブジェクトの生成
  let _circle = new THREE.Mesh(_geometry, _material)

  let positionX = 0
  let positionY = -50
  let positionZ = 0
  _circle.position.set(positionX, positionY, positionZ)

  // 回転させる
  let rotationX = -90
  let rotationY = 0
  let rotationZ = 0

  _circle.rotation.set(toRadian(rotationX), rotationY, rotationZ)

  scene.add(_circle)
}

// cristal
let _cristal
let createCristal = () => {
  let dark = 0x007a8c
  let light = 0x96f4ff

  // 頂点のposition
  let x_left = 70
  let x_right = -x_left
  let x_middle = x_right - x_right
  let y_bottom = 20
  let y_middle = y_bottom + 150
  let y_top = y_middle + 90
  let z_back = 70
  let z_front = -z_back
  let z_middle = z_front - z_front

  // マテリアル config
  let specular = 0xffffff
  let shininess = 10
  let opacity = 0.85

  // 表面用マテリアル
  let _material_normal = new THREE.MeshPhongMaterial({
    vertexColors: THREE.VertexColors,
    specular: specular,
    shininess: shininess,
    transparent: true,
    opacity: opacity
  })

  // 裏面用マテリアル
  let _material_back = new THREE.MeshPhongMaterial({
    side: THREE.BackSide,
    vertexColors: THREE.VertexColors,
    specular: specular,
    shininess: shininess,
    transparent: true,
    opacity: opacity
  })

  // クリスタルオブジェクト生成
  _cristal = new THREE.Object3D()

  // 三角形 8枚生成
  // 1
  let _front_left_top_g = new THREE.Geometry()
  // 各頂点の座標を指定
  _front_left_top_g.vertices = [
    new THREE.Vector3(x_left, y_middle, z_middle),
    new THREE.Vector3(x_middle, y_top, z_middle),
    new THREE.Vector3(x_middle, y_middle, z_front)
  ]
  // 各頂点の色を指定
  let _front_left_top_c = [
    new THREE.Color(dark),
    new THREE.Color(light),
    new THREE.Color(dark)
  ]
  // 三角形の形状オブジェクトの頂点インデックスを生成(座標番号, 座標番号, 座標番号, 法線ベクトル, 頂点色)
  _front_left_top_g.faces[0] = new THREE.Face3(0, 1, 2, null, _front_left_top_c)
  // 法線ベクトルを自動計算
  _front_left_top_g.computeFaceNormals()
  // オブジェクトを生成
  let _front_left_top = new THREE.Mesh(_front_left_top_g, _material_back)

  _cristal.add(_front_left_top)

  // 2
  let _back_left_top_g = new THREE.Geometry()

  _back_left_top_g.vertices = [
    new THREE.Vector3(x_left, y_middle, z_middle),
    new THREE.Vector3(x_middle, y_top, z_middle),
    new THREE.Vector3(x_middle, y_middle, z_back)
  ]

  let _back_left_top_c = [
    new THREE.Color(dark),
    new THREE.Color(light),
    new THREE.Color(dark)
  ]

  _back_left_top_g.faces[0] = new THREE.Face3(0, 1, 2, null, _back_left_top_c)

  let _back_left_top = new THREE.Mesh(_back_left_top_g, _material_normal)

  _cristal.add(_back_left_top)

  // 3
  let _front_right_top_g = new THREE.Geometry()

  _front_right_top_g.vertices = [
    new THREE.Vector3(x_right, y_middle, z_middle),
    new THREE.Vector3(x_middle, y_top, z_middle),
    new THREE.Vector3(x_middle, y_middle, z_front)
  ]

  let _front_right_top_c = [
    new THREE.Color(dark),
    new THREE.Color(light),
    new THREE.Color(dark)
  ]

  _front_right_top_g.faces[0] = new THREE.Face3(0, 1, 2, null, _front_right_top_c)

  let _front_right_top = new THREE.Mesh(_front_right_top_g, _material_normal)

  _cristal.add(_front_right_top)

  // 4
  let _back_right_top_g = new THREE.Geometry()

  _back_right_top_g.vertices = [
    new THREE.Vector3(x_right, y_middle, z_middle),
    new THREE.Vector3(x_middle, y_top, z_middle),
    new THREE.Vector3(x_middle, y_middle, z_back)
  ]

  let _back_right_top_c = [
    new THREE.Color(dark),
    new THREE.Color(light),
    new THREE.Color(dark)
  ]

  _back_right_top_g.faces[0] = new THREE.Face3(0, 1, 2, null, _back_right_top_c)

  let back_right_top = new THREE.Mesh(_back_right_top_g, _material_back)

  _cristal.add(back_right_top)

  // 5
  let _front_left_bottom_g = new THREE.Geometry()
  
  _front_left_bottom_g.vertices = [
    new THREE.Vector3(x_left, y_middle, z_middle),
    new THREE.Vector3(x_middle, y_bottom, z_middle),
    new THREE.Vector3(x_middle, y_middle, z_front)
  ]

  let _front_left_bottom_c = [
    new THREE.Color(dark),
    new THREE.Color(light),
    new THREE.Color(dark)
  ]

  _front_left_bottom_g.faces[0] = new THREE.Face3(0, 1, 2, null, _front_left_bottom_c)

  let _front_left_bottom = new THREE.Mesh(_front_left_bottom_g, _material_normal)

  _cristal.add(_front_left_bottom)

  // 6
  let _front_right_bottom_g = new THREE.Geometry()

  _front_right_bottom_g.vertices = [
    new THREE.Vector3(x_right, y_middle, z_middle),
    new THREE.Vector3(x_middle, y_bottom, z_middle),
    new THREE.Vector3(x_middle, y_middle, z_front)
  ]

  let _front_right_bottom_c = [
    new THREE.Color(dark),
    new THREE.Color(light),
    new THREE.Color(dark)
  ]

  _front_right_bottom_g.faces[0] = new THREE.Face3(0, 1, 2, null, _front_right_bottom_c)

  let _front_right_bottom = new THREE.Mesh(_front_right_bottom_g, _material_back)

  _cristal.add(_front_right_bottom)

  // 7
  let _back_left_bottom_g = new THREE.Geometry()

  _back_left_bottom_g.vertices = [
    new THREE.Vector3(x_left, y_middle, z_middle),
    new THREE.Vector3(x_middle, y_bottom, z_middle),
    new THREE.Vector3(x_middle, y_middle, z_back)
  ]

  let _back_left_bottom_c = [
    new THREE.Color(dark),
    new THREE.Color(light),
    new THREE.Color(dark)
  ]

  _back_left_bottom_g.faces[0] = new THREE.Face3(0, 1, 2, null, _back_left_bottom_c)

  let _back_left_bottom = new THREE.Mesh(_back_left_bottom_g, _material_back)

  _cristal.add(_back_left_bottom)

  // 8
  let _back_right_bottom_g = new THREE.Geometry()

  _back_right_bottom_g.vertices = [
    new THREE.Vector3(x_right, y_middle, z_middle),
    new THREE.Vector3(x_middle, y_bottom, z_middle),
    new THREE.Vector3(x_middle, y_middle, z_back)
  ]

  let _back_right_bottom_c = [
    new THREE.Color(dark),
    new THREE.Color(light),
    new THREE.Color(dark)
  ]

  _back_right_bottom_g.faces[0] = new THREE.Face3(0, 1, 2, null, _back_right_bottom_c)

  let _back_right_bottom = new THREE.Mesh(_back_right_bottom_g, _material_normal)

  _cristal.add(_back_right_bottom)


  let cristalPositionX = 0
  let cristalPositionY = -50
  let cristalPositionZ = 0
  _cristal.position.set(cristalPositionX, cristalPositionY, cristalPositionZ)

  scene.add(_cristal)
}

// rotate cristal
let cristalStep = 0
rotationCristal = () => {
  cristalStep += .02
  _cristal.rotation.set(0, cristalStep, 0)

  draw()

  requestAnimationFrame(rotationCristal)
}

