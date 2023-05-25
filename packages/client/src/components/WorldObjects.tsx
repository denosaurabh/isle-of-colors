import { useSnapshot } from "valtio";
import {
  WorldObject,
  getClosestWorldObjects,
  worldObjectsState,
} from "../state/worldObjects";
import { Model } from "./Model";
import {
  characterState,
  startPaintingStructure,
  stopPaintingStructure,
} from "../state/character";
import { StructurePainting } from "./StructurePainting";
import { ComponentProps, memo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { getFullStructureName } from "../utils/object";
import { setGlobalCursor } from "../state/global";
import { useMUD } from "../MUDContext";
import { useEntityQuery } from "@latticexyz/react";
import { Has } from "@latticexyz/recs";

export const WorldObjects = () => {
  const { objects } = useSnapshot(worldObjectsState);
  const closestObjects = getClosestWorldObjects(objects);
  const {
    components: { Buildings },
    systemCalls: { updateBuildingsMud, addBuildingsMud },
    network: { singletonEntity },
  } = useMUD();

  const allBuildingsIds = useEntityQuery([Has(Buildings)]);

  const onStructureFocusIn = (structureName: string, currentColor: string) => {
    setGlobalCursor("pointer");
    startPaintingStructure(structureName, currentColor);
  };

  const onStructureFocusOut = (
    structureName: string,
    obj: WorldObject["id"]
  ) => {
    if (!characterState.paintingState[structureName]?.isPainting) return;

    stopPaintingStructure(structureName);
    setGlobalCursor("auto");

    // update object in mud
    const updatedObj = worldObjectsState.objects[obj];
    // console.log("updatedObj", Object.keys(updatedObj['structures']).join(","));
    // console.log("updatedObj", updatedObj);
    // console.log("allBuildingsIds", allBuildingsIds);

    for (const i in allBuildingsIds) {
      // console.log("buildingId", buildingId);
      const buildingId = allBuildingsIds[i];

      // console.log("ascii", buildingId, updatedObj['id']);
      // console.log("buildingId", buildingId, updatedObj['id']);

      if (buildingId == updatedObj["id"]) {
        // console.log("updatedObj", updatedObj['structures']);
        // console.log("updatedObj", updatedObj['id'], Object.keys(updatedObj['structures']).join(","));

        const hexParts = buildingId.match(/.{1,2}/g);
        // console.log("hexParts", hexParts);
        const ascii = hexParts
          .map(function (hexPart) {
            const charCode = parseInt(hexPart, 16);
            // ignore non-printable characters and padding zeroes
            if (charCode > 31 && charCode != 127) {
              return String.fromCharCode(charCode);
            } else {
              return "";
            }
          })
          .join("");

        updateBuildingsMud(
          // buildingId,
          ascii,
          Object.keys(updatedObj["structures"]).join(","),
          Object.values(updatedObj["structures"]).join(",")
          // "this"
        );
      }
    }
  };

  return (
    <>
      {Object.values(closestObjects).map((obj, i) => {
        if (!obj.modelUrl) return null;

        console.log("obj", obj);

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
            // onStructureFocusOut={onStructureFocusOut}
            onStructureFocusOut={(structureName) =>
              onStructureFocusOut(structureName, obj.id)
            }
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
