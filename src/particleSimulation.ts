import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

// Config
const CLOUD_RADIUS = 1.0;
const PARTICLE_COUNT = 10000;
const PARTICLE_SIZE = 0.2;
const PARTICLE_OPACITY = 1.0;

const ROT_SPEED_START_X = 0.1;
const ROT_SPEED_START_Y = 0.2;

const ROT_SPEED_ACCL = 0.5;
const ROT_SPEED_TARGET_X = 0.2;
const ROT_SPEED_TARGET_Y = 0.3;

const NOISE_MAGNITUDE = 0.5;
const NOISE_GRANULARITY = 0.5;
const NOISE_SPEED = 0.1;


// Scene Set-up
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

let pointCloud = new THREE.Points();
let material = new THREE.ShaderMaterial();
let renderer = new THREE.WebGLRenderer();


// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// Driver Logic
export function renderParticleSimulation() {
    pointCloud = createPointCloud();

    scene.clear();
    scene.add(pointCloud);

    // Render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    document.body.lastChild?.remove();
    document.body.appendChild(renderer.domElement);
}

function createPointCloud(): THREE.Points {
    const maxRadius = CLOUD_RADIUS * 5;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const color = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Initialize positions - distribute points within a sphere
        const r = maxRadius * Math.cbrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Initialize colors - scale hue based on distance from center
        const dist = r / maxRadius;

        color.setHSL(1.0 - dist, 0.8, 0.5);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            uSize: { value: PARTICLE_SIZE },
            uOpacity: { value: PARTICLE_OPACITY },
            uNoiseMagnitude: { value: NOISE_MAGNITUDE },
            uNoiseGranularity: { value: NOISE_GRANULARITY },
            uNoiseSpeed: { value: NOISE_SPEED },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geometry, material);
}


// Util Functions
function animate(time: number) {
    const secsElapsed = time / 1000;

    // Update material's time value for animated displacement
    material.uniforms.uTime.value = secsElapsed;

    // Apply rotation speed
    pointCloud.rotation.x = secsElapsed * getVelocity(ROT_SPEED_ACCL, ROT_SPEED_START_X, ROT_SPEED_TARGET_X, secsElapsed);
    pointCloud.rotation.y = secsElapsed * getVelocity(ROT_SPEED_ACCL, ROT_SPEED_START_Y, ROT_SPEED_TARGET_Y, secsElapsed);

    // Render frame
    renderer.render(scene, camera);
}

function getVelocity(accel: number, startSpeed: number, targetSpeed: number, secsElapsed: number): number {
    // Return rotation velocity at given time as it converges to the target value
    const decay = Math.exp(-1.0 * Math.abs(accel) * secsElapsed);
    return targetSpeed + (startSpeed - targetSpeed) * decay;
}