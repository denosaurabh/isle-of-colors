import { proxy } from "valtio";

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
  time: { angle: 0, time: "day" },
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
