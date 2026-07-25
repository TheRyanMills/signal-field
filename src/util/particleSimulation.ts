import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';
import type SimulationConfig from './simulationConfig';


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
export function renderParticleSimulation(config: SimulationConfig) {
    pointCloud = createPointCloud(config);

    scene.clear();
    scene.add(pointCloud);

    // Render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop((time) => animate(time, config));

    document.body.lastChild?.remove();
    document.body.appendChild(renderer.domElement);
}

function createPointCloud(config: SimulationConfig): THREE.Points {
    const maxRadius = config.cloudRadius * 5;
    const positions = new Float32Array(config.particle.count * 3);
    const colors = new Float32Array(config.particle.count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < config.particle.count; i++) {
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
        const hue = getHue(dist, config.gradient.hueStart, config.gradient.radialDistMod);
        color.setHSL(hue, 0.8, 0.5);

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
            uSize: { value: config.particle.size },
            uOpacity: { value: config.particle.opacity },
            uNoiseMagnitude: { value: config.noise.magnitude },
            uNoiseGranularity: { value: config.noise.granulatiry },
            uNoiseSpeed: { value: config.noise.speed },
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
function getHue(radialDist: number, hueStart: number, radialDistMod: number): number {
    // Return rotation velocity at given time as it converges to the target value
    return 1.0 + hueStart - (radialDist * radialDistMod);
}

function animate(time: number, config: SimulationConfig) {
    const secsElapsed = time / 1000;

    // Update material's time value for animated displacement
    material.uniforms.uTime.value = secsElapsed;

    // Apply rotation speed
    const rs = config.rotSpeed
    pointCloud.rotation.x = secsElapsed * getVelocity(rs.accel, rs.startX, rs.targetX, secsElapsed);
    pointCloud.rotation.y = secsElapsed * getVelocity(rs.accel, rs.startY, rs.targetY, secsElapsed);

    // Render frame
    renderer.render(scene, camera);
}

function getVelocity(accel: number, startSpeed: number, targetSpeed: number, secsElapsed: number): number {
    // Return rotation velocity at given time as it converges to the target value
    const decay = Math.exp(-1.0 * Math.abs(accel) * secsElapsed);
    return targetSpeed + (startSpeed - targetSpeed) * decay;
}