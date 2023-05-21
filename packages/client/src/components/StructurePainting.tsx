import { useFrame } from "@react-three/fiber";
import {
  characterState,
  increaseStructureColorTransition,
} from "../state/character";
import { Color } from "three";

const color = new Color();

export const StructurePainting = () => {
  useFrame(({ scene }) => {
    Object.values(characterState.paintingState).map((p) => {
      if (!p.isPainting || !p.structureName || !p.initialColor) return;

      const structureObj = scene.getObjectByName(p.structureName);

      if (!!structureObj && !!structureObj.material) {
        const mixWithColor = color.set(p.mixWithColor);
        const alpha = increaseStructureColorTransition(p.structureName);

        if (alpha !== null) {
          structureObj.material.color.lerp(mixWithColor, alpha);
        }
      }
    });
  });

  return <></>;
};
