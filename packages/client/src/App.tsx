import "./index.css";

import { Sky } from "@react-three/drei";
import { Camera } from "./components/Camera";
import { Character } from "./components/Character";
import { DraftObjects } from "./components/DraftObjects";
import { Ground } from "./components/Ground";
import { Sun } from "./components/Sun";
import { WorldObjects } from "./components/WorldObjects";

import { CharacterPos } from "./data/CharacterPos";
import { PointLight } from "./components/PointLight";
import { Players } from "./components/Players";

export const App = () => {
  return (
    <>
      <Camera />
      <Ground />
      <Character />
      <Sun />
      <Sky />
      <PointLight />
      <Players />

      <WorldObjects />
      <DraftObjects />

      <CharacterPos />
    </>
  );
};
