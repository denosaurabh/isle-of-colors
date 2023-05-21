import { useFrame } from "@react-three/fiber";
import {
  characterState,
  increaseStructureColorTransition,
} from "../state/character";
import { Color } from "three";
import {
  updateObjectStructureColor,
  worldObjectsState,
} from "../state/worldObjects";
import { parseStructureData } from "../utils/object";

const color = new Color();
const lerpColor = new Color();

export const StructurePainting = () => {
  useFrame(() => {
    Object.values(characterState.paintingState).map((p) => {
      if (!p.isPainting || !p.structureName || !p.initialColor) return;

      // const structureObj = scene.getObjectByName(p.structureName);

      const { modelName, structureName } = parseStructureData(p.structureName);
      const intitialColor =
        worldObjectsState.objects[modelName]?.["structures"][structureName] ||
        "#fff";
      lerpColor.set(intitialColor);

      // if (!!structureObj && !!structureObj.material) {
      const mixWithColor = color.set(p.mixWithColor);
      const alpha = increaseStructureColorTransition(p.structureName);

      if (alpha !== null) {
        updateObjectStructureColor(
          modelName,
          structureName,
          `#${lerpColor.lerp(mixWithColor, alpha).getHexString()}`
        );
      }
      // }
    });
  });

  return <></>;
};
