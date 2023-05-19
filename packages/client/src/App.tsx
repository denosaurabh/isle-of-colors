import { Camera } from "./components/Camera";
import { Character } from "./components/Character";
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

      <Model url="/cabin.glb" />
    </>
  );
};
