import { useSnapshot } from "valtio";
import {
  getClosestWorldObjects,
  worldObjectsState,
} from "../state/worldObjects";
import { Model } from "./Model";

export const WorldObjects = () => {
  const { objects } = useSnapshot(worldObjectsState);
  const closestObjects = getClosestWorldObjects(objects);

  if (!objects.length) {
    return null;
  }

  return (
    <>
      {closestObjects.map((obj, i) => {
        return (
          <Model
            key={i}
            id={obj.id}
            url={obj.modelUrl}
            position-x={obj.x}
            position-z={obj.z}
            // rotate-y={obj.rotation}
          />
        );
      })}
    </>
  );
};
