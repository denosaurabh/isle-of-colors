import { useSnapshot } from "valtio";
import {
  WorldObject,
  getClosestWorldObjects,
  worldObjectsState,
} from "../state/worldObjects";
import { Model } from "./Model";
import { updatePaintingState } from "../state/character";
import { useEffect } from "react";

export const WorldObjects = () => {
  const { objects } = useSnapshot(worldObjectsState);
  const closestObjects = getClosestWorldObjects(objects);

  const onPointerDown = (obj: WorldObject) => {
    updatePaintingState(obj);
  };

  const onPointerUp = () => {
    updatePaintingState(null);
  };

  useEffect(() => {
    if (!window) return;

    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

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
            onPointerDown={() => onPointerDown(obj)}
          />
        );
      })}
    </>
  );
};
