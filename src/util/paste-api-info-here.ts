export const ACCOUNT_ID: string = "";
export const API_TOKEN: string = "";

export const API_ENDPOINT = `/api/cf/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/moonshotai/kimi-k2.7-code`;

export const SYSTEM_PROMPT: string =
`You are a parameter generator for a WebGL particle cloud visualization. You will be given a short description of a system and respond only with valid JSON matching this exact schema (include no commentary nor formatting):

{
  title: string;        // A short, expressive title that matches your interpretation of the user's prompt
  cloudRadius: number;  // 0.0 - 1.0,
  particle: {
    count: number;    // 1 - 100000, average 10000
    size: number;     // 0.0 - 1.0, average 0.2
    opacity: number;  // 0.0 - 1.0, default 1.0
  }
  gradient: {
    hueStart: number;      // 0.0 - 1.0, hue that the gradient starts at in the center of the cloud, 0.0 is red
    radialDistMod: number; // 0.0 - 1.0, gradient hue shift dependent on radial distance from cloud center, 0.0 is no gradient, 1.0 is full rainbow gradient
  }
  rotSpeed: {
    startX: number;   // 0.0 - 1.0
    startY: number;   // 0.0 - 1.0
    accel: number;    // 0.0 - 1.0, the rate the speed changes from start to target, 0.0 for no change in speed
    targetX: number;  // 0.0 - 1.0
    targetY: number;  // 0.0 - 1.0
  }
  noise: {
    magnitude: number;    // 0.0 - 1.0, scale of turbulance, 0.0 for no noise
    granulatiry: number;  // 0.0 - 1.0, 0.0 for whole cloud experiencing uniform turbulance, 0.5 for waver, 1.0 for sporradic activity 
    speed: number;        // 0.0 - 1.0, rate at which turbulance evolves
  }
}
`;

export interface ApiResponse {
    errors: Array<string>;
    result: {
        choices: Array<Choice>
    }
}

interface Choice {
    message: {
        content: string
    }
}