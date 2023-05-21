import { characterState } from "../state/character";
import { PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { worldState } from "../state/world";
import { PointLight as PointLightT } from "three";

export const PointLight = () => {
  const ref = useRef<PointLightT>();
  // const { position } = useSnapshot(characterState);

  useFrame(() => {
    if (ref.current) {
      if (worldState.time.type === "midnight") {
        ref.current.intensity = 0.6;
      } else {
        ref.current.intensity = 0;
      }

      ref.current.position.set(
        characterState.position[0],
        characterState.position[1] + 1,
        characterState.position[2]
      );
    }
  });

  return (
    <>
      <pointLight
        ref={ref}
        color="transparent"
        distance={10}
        // decay={10}
      />
    </>
  );

  return (
    <mesh position={position}>
      <sphereGeometry args={[2, 36, 36]} />
      <meshPhysicalMaterial
        // ref={matRef}
        color={"gold"}
        roughness={0.2}
        metalness={0.5}
        // emissiveMap={base}
        emissive={"white"}
        emissiveIntensity={1}
      />
    </mesh>
  );

  return (
    <points>
      <PointMaterial
        transparent
        vertexColors
        size={15}
        sizeAttenuation={false}
        depthWrite={false}
      />
    </points>
  );

  return <pointLight color="blue" intensity={1} position={position} />;
};
