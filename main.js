import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Orbit Controls
const orbit = new OrbitControls(camera, renderer.domElement)

// Axes Helper to show the X, Y, Z axis
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// Green Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Setting Camera Position to view the objects from different angles and distance
// camera.position.z = 5;
camera.position.set(0, 2, 5)
orbit.update()

// Animations for the elements go here
function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}
animate()
// renderer.setAnimationLoop(animate)