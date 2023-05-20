import { useSnapshot } from "valtio";
import { worldObjectsState } from "../state/worldObjects";
import { Model } from "./Model";

export const WorldObjects = () => {
  const { objects } = useSnapshot(worldObjectsState);

  if (!objects.length) {
    return null;
  }

  return (
    <>
      {objects.map((obj, i) => {
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
