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
import { Forest } from "./components/Forest";
import { Cursor } from "./components/Cursor";

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

      <Forest />

      <CharacterPos />
      <Cursor />
    </>
  );
};
