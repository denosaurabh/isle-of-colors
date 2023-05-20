import { useSnapshot } from "valtio";
import {
  WorldObject,
  addWorldObjects,
  moveSavedObjectIntoWorld,
  saveDraftObjects,
  userObjectsState,
} from "../state/worldObjects";
import { useMUD } from "../MUDContext";
import { useEffect } from "react";
import { worldState } from "../state/world";
import { Has, getComponentValueStrict } from "@latticexyz/recs";
import { useEntityQuery } from "@latticexyz/react";

export const Footer = () => {
  const { draftObjects } = useSnapshot(userObjectsState);
  const {
    components: { Buildings },
    systemCalls: { addBuildingsMud },
    network: { singletonEntity },
  } = useMUD();

  const { numberOfOnlineCharacters, isChainReady } = useSnapshot(worldState);
  const allBuildingsIds = useEntityQuery([Has(Buildings)]);
  useEffect(() => {
    if (isChainReady) {
      // console.log("allBuildingsIds", allBuildingsIds);
      const newWorldObjects = allBuildingsIds.map((id) => {
        const loadedBuildingsData = getComponentValueStrict(Buildings, id);
        // console.log("loadedBuildingsData", loadedBuildingsData);

        const objectData: WorldObject = {
          id: id,
          modelUrl: loadedBuildingsData["url"],
          x: loadedBuildingsData["x"],
          z: loadedBuildingsData["z"],
          rotation: loadedBuildingsData["rotation"],
          owner: loadedBuildingsData["owner"],
          color: [],
        };

        return objectData;
      });

      addWorldObjects(newWorldObjects);
    }
  }, [allBuildingsIds]);

  const onSaveObjectsClick = () => {
    // disbale transform control
    const savedObjectsProxy = saveDraftObjects(draftObjects.map((d) => d.id));

    // const savedObjects = draftObjects.filter((d) => d.status === "saved");

    const savedObjects = JSON.parse(JSON.stringify({ a: savedObjectsProxy }));

    // console.log("savedObjects", savedObjects.a); // id, url, ower address, rotaton, x, z, ( color list empty , amount list empty)

    savedObjects.a.forEach((obj: any) => {
      addBuildingsMud(
        Math.round(Number(obj["x"])),
        Math.round(Number(obj["z"])),
        Math.round(Number(obj["rotation"])),
        obj["id"],
        obj["objectData"]["url"]
      );
    });

    moveSavedObjectIntoWorld();
  };

  return (
    <div className="fixed bottom-2 right-2 w-fit h-fit p-2 rounded-lg bg-slate-800 bg-opacity-25 backdrop-blur-md">
      <div className="rounded-lg bg-slate-700 flex justify-end gap-2 p-1.5 bg-opacity-70">
        <button
          onClick={onSaveObjectsClick}
          style={{ display: draftObjects.length ? "flex" : "none" }}
          className="uppercase w-fit px-5 py-2 text-lg text-emerald-200 bg-emerald-600 rounded-md
        cursor-pointer transition-all hover:bg-emerald-500 hover:rotate-3 hover:shadow-xl active:shadow-sm active:rotate-1 active:bg-emerald-600 active:translate-y-0.5 focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-emerald-200"
        >
          Save Objects
        </button>
      </div>
    </div>
  );
};
