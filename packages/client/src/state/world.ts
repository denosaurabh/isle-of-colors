import { proxy } from "valtio";

export const DAY_NIGHT_CYCLE_SECONDS = 60 * 3;

type WorldState = {
  numberOfOnlineCharacters: number;
  isChainReady: boolean;
  time: {
    angle: number;
    type: "morning" | "noon" | "evening" | "night" | "midnight";
  };
};

export const worldState = proxy<WorldState>({
  numberOfOnlineCharacters: 0,
  isChainReady: false,
  time: { angle: 0, type: "morning" },
});

export const updateNumberOfOnlineCharacters = (num: number) => {
  worldState.numberOfOnlineCharacters = num;
};

export const updateIsChainReady = (isReady: boolean) => {
  worldState.isChainReady = isReady;
};

export const updateWorldSunAngle = (angle: WorldState["time"]["angle"]) => {
  worldState.time.angle = angle;

  if ((angle >= 0 && angle < 45) || (angle >= 350 && angle <= 360)) {
    worldState.time.type = "morning";
  } else if (angle >= 45 && angle < 135) {
    worldState.time.type = "noon";
  } else if (angle >= 135 && angle < 190) {
    worldState.time.type = "evening";
  } else if (angle >= 190 && angle < 220) {
    worldState.time.type = "night";
  } else if (angle >= 220 && angle < 350) {
    worldState.time.type = "midnight";
  }
};

/* **************************************** */
/* **************  UTILS   **************** */
/* **************************************** */

export const calculateNormalizedVector = (angleInDegrees: number) => {
  const angleInRadians = angleInDegrees * (Math.PI / 180);
  const x = Math.cos(angleInRadians);
  const y = Math.sin(angleInRadians);
  const length = Math.sqrt(x * x + y * y);
  const normalizedVector = [x / length, y / length];

  return normalizedVector;
};

export const lerpNumber = (angle: number) => {
  let normalizedIntensity;

  // Ensure the angle is between 0 and 360
  angle = angle % 360;
  if (angle < 0) angle = 360 + angle;

  if (angle <= 90) {
    // Light intensity is 1
    normalizedIntensity = 1;
  } else if (angle <= 230) {
    // Transition from 1 to 0 between 90deg and 230deg
    normalizedIntensity = 1 - (angle - 90) / (230 - 90);
  } else if (angle <= 340) {
    // Light intensity is 0
    normalizedIntensity = 0;
  } else {
    // Transition from 0 to 1 between 340deg and 360deg (same as 0deg)
    normalizedIntensity = (angle - 340) / (360 - 340);
  }

  return normalizedIntensity;
};
