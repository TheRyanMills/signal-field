import * as THREE from 'three';

// Scene Set-up
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

export function renderParticleSimulation() {
    // Render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    document.body.lastChild?.remove();
    document.body.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.clear();
    scene.add(cube);

    // Animate render
    function animate(time: number) {

        cube.rotation.x = time / 2000;
        cube.rotation.y = time / 1000;

        renderer.render(scene, camera);
    }
}
