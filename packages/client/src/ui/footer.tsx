import { useSnapshot } from "valtio";
import {
  moveSavedObjectIntoWorld,
  saveDraftObjects,
  userObjectsState,
} from "../state/worldObjects";
import { useMUD } from "../MUDContext";

export const Footer = () => {
  const { draftObjects } = useSnapshot(userObjectsState);
  // const {
  //   components: { Counter, Buildings },
  //   systemCalls: { increment, updateBuildingsList },
  //   network: { singletonEntity },
  // } = useMUD();

  const onSaveObjectsClick = () => {
    // disbale transform control
    const savedObjectsProxy = saveDraftObjects(draftObjects.map((d) => d.id));

    // const savedObjects = draftObjects.filter((d) => d.status === "saved");

    const savedObjects = JSON.parse(JSON.stringify({ a: savedObjectsProxy }));

    // console.log("savedObjects", savedObjects.a); // id, url, ower address, rotaton, x, z, ( color list empty , amount list empty)

    savedObjects.a.forEach((obj: any) => {
      // console.log("obj", obj);
      // const { id, rotation, x, z } = obj;
      // console.log("Adding obj", id, rotation, x, z);
      // updateBuildingsList(
      //   // obj["id"],
      //   // "sdibeoidv",
      //   Math.round(Number(obj["x"])),
      //   Math.round(Number(obj["z"])),
      //   Math.round(Number(obj["rotation"]))
      // );
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
