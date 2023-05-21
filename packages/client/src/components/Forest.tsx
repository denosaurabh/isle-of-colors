import { useFrame } from "@react-three/fiber";
import { TreeSpirit } from "./TreeSpirit";
import { useRef } from "react";
import { Vector3 } from "three";
import { addColorInInventory, characterState } from "../state/character";
import { worldState } from "../state/world";

const charPos = new Vector3();

export const Forest = () => {
  const treeSpiritRef = useRef();

  useFrame(() => {
    if (treeSpiritRef.current && worldState.isChainReady) {
      const distance = treeSpiritRef.current.position.distanceTo(
        charPos.set(
          characterState.position[0],
          characterState.position[1],
          characterState.position[2]
        )
      );

      const color = treeSpiritRef.current.userData.color;
      if (distance < 10 && color) {
        addColorInInventory(color, 0.05);
      }
    }
  });

  return (
    <group
      ref={treeSpiritRef}
      position={[30, 0, 30]}
      userData={{ color: "orange" }}
    >
      <TreeSpirit color="orange" name="tree-spirit" />
    </group>
  );
};
