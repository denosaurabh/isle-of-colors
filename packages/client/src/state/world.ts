import { proxy } from "valtio";

export const worldState = proxy({ numberOfOnlineCharacters: 0 });

export const updateNumberOfOnlineCharacters = (num: number) => {
  worldState.numberOfOnlineCharacters = num;
};
