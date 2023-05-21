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
import { ComponentProps, memo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color } from "three";
import { isEqual } from "lodash";
import { getFullStructureName } from "../utils/object";

export const WorldObjects = () => {
  const { objects } = useSnapshot(worldObjectsState);
  const closestObjects = getClosestWorldObjects(objects);

  const { scene } = useThree();

  const onStructureFocusIn = (structureName: string, currentColor: string) => {
    startPaintingStructure(structureName, currentColor);
  };

  const onStructureFocusOut = (structureName: string, objectId: string) => {
    stopPaintingStructure(structureName);

    // const structure = scene.getObjectByName(structureName);

    // console.log("asd", !!structure);

    // if (structure && worldObjectsState.objects[objectId]?.id) {
    //   // col.set(color);
    //   // console.log("OBJ", -name, color);

    //   structure.material?.color?.set?.(worldObjectsState.objects[objectId]['']);
    // }
  };

  console.log(closestObjects);

  return (
    <>
      {Object.values(closestObjects).map((obj, i) => {
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

            // onStructureFocusOut={(structureName) =>
            //   onStructureFocusOut(structureName, obj.id)
            // }
          />
        );
      })}

      <StructurePainting />
    </>
  );
};

const WorldModel = memo(
  (props: ComponentProps<typeof Model>) => {
    const structuresRef = useRef(props.structures);

    useFrame(({ scene }) => {
      const newStructures = worldObjectsState.objects[props.id].structures;

      // if (!isEqual(structuresRef.current, newStructures)) {
      Object.entries(newStructures).map(([name, color]) => {
        const structure = scene.getObjectByName(
          getFullStructureName(props.id, name)
        );

        if (structure) {
          // col.set(color);

          structure.material?.color?.set?.(color);
        }
      });

      structuresRef.current = newStructures;
      // }
    });

    return <Model {...props} />;
  },
  (oldProps, newProps) => {
    // don't rerender the component when structures change
    return oldProps.id === newProps.id && oldProps.url === newProps.url;
  }
);

WorldModel.displayName = "WorldModel";
