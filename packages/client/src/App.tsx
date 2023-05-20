import { Sky } from "@react-three/drei";
import { Camera } from "./components/Camera";
import { Character } from "./components/Character";
import { DraftObjects } from "./components/DraftObjects";
import { Ground } from "./components/Ground";
import { Light } from "./components/Light";
import { WorldObjects } from "./components/WorldObjects";

import "./index.css";

export const App = () => {
  return (
    <>
      <Camera />
      <Ground />
      <Character />
      <Light />
      <Sky />

      <WorldObjects />
      <DraftObjects />
    </>
  );
};
