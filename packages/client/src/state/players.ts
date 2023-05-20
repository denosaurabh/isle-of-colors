import { proxy } from "valtio";

type Player = {
  name: string;
  position: [number, number, number];
};

export type PlayersState = {
  players: Array<Player>;
};

export const playersState = proxy<PlayersState>({ players: [] });

export const updatePlayers = (updatedPlayers: PlayersState["players"]) => {
  playersState.players = updatedPlayers;
};
