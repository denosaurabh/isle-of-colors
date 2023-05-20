import "./index.css";

import { Sky } from "@react-three/drei";
import { Camera } from "./components/Camera";
import { Character } from "./components/Character";
import { DraftObjects } from "./components/DraftObjects";
import { Ground } from "./components/Ground";
import { Light } from "./components/Light";
import { WorldObjects } from "./components/WorldObjects";

import { CharacterPos } from "./data/CharacterPos";
import "./index.css";
import { PointLight } from "./components/PointLight";
import { Players } from "./components/Players";

export const App = () => {
  return (
    <>
      <Camera />
      <Ground />
      <Character />
      <Light />
      <Sky />
      <PointLight />
      <Players />

      <WorldObjects />
      <DraftObjects />

      <CharacterPos />
    </>
  );
};
