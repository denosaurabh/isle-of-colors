import { Sky } from "@react-three/drei";
import { Camera } from "./components/Camera";
import { Character } from "./components/Character";
import { AddAndDragObjects } from "./components/DropModels";
import { Ground } from "./components/Ground";
import { Light } from "./components/Light";
import { Model } from "./components/Model";

import "./index.css";

export const App = () => {
  return (
    <>
      <Camera />
      <Ground />
      <Character />
      <Light />
      <AddAndDragObjects />
      <Sky />

      <Model url="/cabin.glb" position-y={0} />
    </>
  );
};
