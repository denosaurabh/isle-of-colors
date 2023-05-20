import { useSnapshot } from "valtio";
import { characterState } from "../state/character";
import { PointMaterial } from "@react-three/drei";
import { Vector3 } from "three";

const pos = new Vector3();

export const PointLight = () => {
  const { position } = useSnapshot(characterState);

  return <></>;

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
