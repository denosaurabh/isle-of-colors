import { proxy } from "valtio";

export const characterState = proxy({ position: [0, 0, 0] });

export const updateCharacterPosition = (newPos: [number, number, number]) => {
  characterState.position = newPos;
};
