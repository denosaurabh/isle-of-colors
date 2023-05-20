import { useFrame } from "@react-three/fiber";
import { memo, useRef } from "react";
import { DirectionalLight } from "three";
import * as THREE from "three";
import { updateWorldSunAngle } from "../state/world";

const DAY_NIGHT_CYCLE_SECONDS = 100;

export const Light = memo(() => {
  // const { position } = useSnapshot(characterState);

  const directonalLightRef = useRef<DirectionalLight>();
  const ambientLightRef = useRef();
  const orthoCamRef = useRef<DirectionalLight>();

  const axis = new THREE.Vector3(0, 1, 0);
  // const pos = new THREE.Vector3(0, 1, 0);

  useFrame(({ clock }) => {
    const angle = Number(
      (
        (clock.elapsedTime % DAY_NIGHT_CYCLE_SECONDS) *
        (360 / DAY_NIGHT_CYCLE_SECONDS)
      ).toFixed(2)
    );

    // update sun angle
    updateWorldSunAngle(angle);

    const intensity = lerpNumber(angle, 230, 340);
    const normalizedVector = calculateNormalizedVector(angle);

    directonalLightRef.current?.rotateOnAxis(axis, angle);
    directonalLightRef.current?.position.set(
      normalizedVector[0],
      normalizedVector[1],
      1
    );

    // orthoCamRef.current?.rotateOnAxis(axis, angle);

    directonalLightRef.current.intensity = intensity;
    ambientLightRef.current.intensity = intensity;

    // if (lightRef.current) {
    //   const angle = Date.now() * 0.001; // Calculate the angle based on time
    //   const x = position[0] + radius * Math.cos(angle); // Calculate the x position
    //   const y = position[1] + radius * Math.sin(angle); // Calculate the y position
    //   const z = position[2]; // Keep the z position the same as the center

    //   lightRef?.current?.position.set(x, y, z); // Set the position of the mesh
    // }
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.8} />
      <directionalLight
        ref={directonalLightRef}
        castShadow
        intensity={1}
        position={[100, 100, 100]}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          ref={orthoCamRef}
          attach="shadow-camera"
          left={-20}
          right={20}
          top={20}
          bottom={-20}
        />
      </directionalLight>
    </>
  );
});

Light.displayName = "Light";

function calculateNormalizedVector(angleInDegrees: number) {
  const angleInRadians = angleInDegrees * (Math.PI / 180);
  const x = Math.cos(angleInRadians);
  const y = Math.sin(angleInRadians);
  const length = Math.sqrt(x * x + y * y);
  const normalizedVector = [x / length, y / length];

  return normalizedVector;
}

function lerpNumber(angle: number) {
  let normalizedIntensity;

  // Ensure the angle is between 0 and 360
  angle = angle % 360;
  if (angle < 0) angle = 360 + angle;

  if (angle <= 90) {
    // Light intensity is 1
    normalizedIntensity = 1;
  } else if (angle <= 230) {
    // Transition from 1 to 0 between 90deg and 230deg
    normalizedIntensity = 1 - (angle - 90) / (230 - 90);
  } else if (angle <= 340) {
    // Light intensity is 0
    normalizedIntensity = 0.04;
  } else {
    // Transition from 0 to 1 between 340deg and 360deg (same as 0deg)
    normalizedIntensity = (angle - 340) / (360 - 340);
  }

  return normalizedIntensity;
}
