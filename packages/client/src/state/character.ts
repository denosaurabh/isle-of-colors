import { proxy } from "valtio";

export const characterState = proxy({
  position: [0, 0, 0],
  allowUpdate: false,
});

export const updateCharacterPosition = (newPos: [number, number, number]) => {
  characterState.position = newPos;
};

export const allowUpdate = (allow: boolean) => {
  characterState.allowUpdate = allow;
};
