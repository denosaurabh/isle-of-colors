import { proxy } from "valtio";

export const worldState = proxy({
  numberOfOnlineCharacters: 0,
  isChainReady: false,
});

export const updateNumberOfOnlineCharacters = (num: number) => {
  worldState.numberOfOnlineCharacters = num;
};

export const updateIsChainReady = (isReady: boolean) => {
  worldState.isChainReady = isReady;
};
