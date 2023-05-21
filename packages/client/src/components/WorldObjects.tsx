import { useSnapshot } from "valtio";
import {
  getClosestWorldObjects,
  worldObjectsState,
} from "../state/worldObjects";
import { Model } from "./Model";
import {
  startPaintingStructure,
  stopPaintingStructure,
} from "../state/character";
import { StructurePainting } from "./StructurePainting";
import { ComponentProps, useEffect } from "react";
import { useThree } from "@react-three/fiber";

export const WorldObjects = () => {
  const { objects } = useSnapshot(worldObjectsState);
  const closestObjects = getClosestWorldObjects(objects);

  const onStructureFocusIn = (structureName: string, currentColor: string) => {
    startPaintingStructure(structureName, currentColor);
  };

  const onStructureFocusOut = (structureName: string) => {
    stopPaintingStructure(structureName);
  };

  if (!objects.length) {
    return null;
  }

  return (
    <>
      {closestObjects.map((obj, i) => {
        return (
          <WorldModel
            key={i}
            id={obj.id}
            url={obj.modelUrl}
            structures={obj.structures}
            position-x={obj.x}
            position-z={obj.z}
            rotation-y={obj.rotation}
            onStructureFocusIn={onStructureFocusIn}
            onStructureFocusOut={onStructureFocusOut}
          />
        );
      })}

      <StructurePainting />
    </>
  );
};

const WorldModel = (props: ComponentProps<typeof Model>) => {
  const { scene } = useThree();

  useEffect(() => {
    console.log("rerender");
  }, [props.structures]);

  return <Model {...props} />;
};
