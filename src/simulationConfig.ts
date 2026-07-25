export default interface SimulationConfig {
    title: string;
    cloudRadius: number;  // 0.0 - 1.0
    particle: {
        count: number;    // 1 - 100,000
        size: number;     // 0.0 - 1.0
        opacity: number;  // 0.0 - 1.0
    }
    gradient: {
        hueStart: number;       // 0.0 - 1.0
        radialDistMod: number;  // 0.0 - 1.0
    }
    rotSpeed: {
        startX: number;   // 0.0 - 1.0
        startY: number;   // 0.0 - 1.0
        accel: number;    // 0.0 - 1.0
        targetX: number;  // 0.0 - 1.0
        targetY: number;  // 0.0 - 1.0
    }
    noise: {
        magnitude: number;    // 0.0 - 1.0
        granulatiry: number;  // 0.0 - 1.0
        speed: number;        // 0.0 - 1.0
    }
}

export const defaultConfig: SimulationConfig = {
    title: "Welcome to Signal Field",
    cloudRadius: 1.0,
    particle: {
        count: 10000,
        size: 0.2,
        opacity: 1.0
    },
    gradient: {
        hueStart: 0.0,
        radialDistMod: 1.0,
    },
    rotSpeed: {
        startX: 0.05,
        startY: 0.1,
        accel: 0.1,
        targetX: 0.1,
        targetY: 0.2
    },
    noise: {
        magnitude: 0.5,
        granulatiry: 0.5,
        speed: 0.1
    }
}

export const loadingConfig: SimulationConfig = {
    title: "Loading...",
    cloudRadius: 0.2,
    particle: {
        count: 1000,
        size: 0.2,
        opacity: 1.0
    },
    gradient: {
        hueStart: 0.8,
        radialDistMod: 0.2,
    },
    rotSpeed: {
        startX: 1.0,
        startY: 1.0,
        accel: 0.0,
        targetX: 0.0,
        targetY: 0.0
    },
    noise: {
        magnitude: 1.0,
        granulatiry: 0.2,
        speed: 0.6
    }
}