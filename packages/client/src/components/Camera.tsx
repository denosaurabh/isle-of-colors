import { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useSnapshot } from "valtio";
import { characterState } from "../state/character";
import { cameraState } from "../state/camera";

export const Camera = () => {
  const cameraControlRef = useRef();

  const { position } = useSnapshot(characterState);
  const { disableControls } = useSnapshot(cameraState);

  useFrame(() => {
    cameraControlRef.current.setTarget(
      position[0],
      position[1],
      position[2],
      true
    );

    cameraControlRef.current.dollyTo(100, true);
  });

  return (
    <>
      <CameraControls
        ref={cameraControlRef}
        enabled={!disableControls}
        minZoom={20}
        maxZoom={70}
        maxPolarAngle={Math.PI / 3.5}
      />
    </>
  );
};
