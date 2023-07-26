import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()

renderer.shadowMap.enabled = true

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Orbit Controls
const orbit = new OrbitControls(camera, renderer.domElement)

// Axes Helper to show the X, Y, Z axis
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// Green Cube
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(boxGeometry, material)
scene.add(cube)
cube.receiveShadow = true
cube.castShadow = true


// Sphere
const sphereGeometry = new THREE.SphereGeometry(4)
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, wireframe: false })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-10, 10, 0)
sphere.castShadow = true

// Setting Camera Position to view the objects from different angles and distance
// camera.position.z = 5;
camera.position.set(-10, 30, 30)
orbit.update()

// Plane
const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true

// Grid Helper
const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

// LIGHTS

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

// Directional Light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
// scene.add(directionalLight)
// directionalLight.position.set(-30, 50, 0)
// directionalLight.castShadow = true
// directionalLight.shadow.camera.bottom = -12

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(directionalLightHelper)

// const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightShadowHelper)

const spotLight = new THREE.SpotLight(0xffffff)
scene.add(spotLight)
spotLight.position.set(-100, 100, 0)
spotLight.castShadow = true
spotLight.angle = 0.2
spotLight.distance = 500

const spotLighHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLighHelper)

// scene.fog = new THREE.Fog(0xffffff, 50, 200)
scene.fog = new THREE.FogExp2(0xffffff, 0.01)

// Dat GUI
const gui = new dat.GUI()

const options = {
  sphereColor: '#ffea00',
  wireframe: true,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1
}

gui.addColor(options, 'sphereColor').onChange(function (e) {
  sphere.material.color.set(e)
})

gui.add(options, 'wireframe').onChange(function (e) {
  sphere.material.wireframe = e
})

gui.add(options, 'speed', 0, 0.1)

gui.add(options, 'angle', 0, 1)
gui.add(options, 'penumbra', 0, 1)
gui.add(options, 'intensity', 0, 1)

let step = 0

// Animations for the elements go here
function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  step += options.speed
  sphere.position.y = 10 * Math.abs(Math.sin(step))

  spotLight.angle = options.angle
  spotLight.penumbra = options.penumbra
  spotLight.intensity = options.intensity
  spotLighHelper.update()

  renderer.render(scene, camera)
}
animate()
// renderer.setAnimationLoop(animate)