import { proxy } from "valtio";

type Player = {
  position: [number, number, number];
};

type PlayersState = {
  players: Array<Player>;
};

export const playersState = proxy<PlayersState>({ players: [] });

export const updatePlayers = (updatedPlayers: PlayersState["players"]) => {
  playersState.players = updatedPlayers;
};
