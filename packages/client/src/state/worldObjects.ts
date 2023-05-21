import { proxy, subscribe } from "valtio";
import { OBJECTS_DATA } from "../data/objects";
import { characterState } from "./character";
import { nanoid } from "nanoid";
import { ArrayElement } from "../utils/array";

type StructureName = string;
type StructureColor = string;

export type WorldObject = {
  id: string;
  modelUrl: string;

  x: number;
  z: number;
  rotation: number;

  owner: string;

  structures: Record<StructureName, StructureColor>;
};

type WorldObjectsState = {
  objects: Array<WorldObject>;
};

export const worldObjectsState = proxy<WorldObjectsState>({
  objects: [
    {
      id: nanoid(),
      modelUrl: "/cabin.glb",
      x: 0,
      z: 0,
      rotation: 0,
      owner: "",
      structures: {},
    },
  ],
});

export const addWorldObjects = (
  // newWorldObjects: Array<Omit<ArrayElement<WorldObjectsState["objects"]>, "id">>
  newWorldObjects: WorldObjectsState["objects"]
) => {
  const newObjectsData = newWorldObjects.map((nw) => ({ ...nw, id: nanoid() }));

  worldObjectsState.objects = [...worldObjectsState.objects, ...newObjectsData];
};

export const getClosestWorldObjects = (
  objects: WorldObjectsState["objects"]
): WorldObjectsState["objects"] => {
  // TODO: do sort & filtering
  return objects;
};

/* *************************************************************** */
/* *********************  USER OBJECTS STATE  ******************** */
/* *************************************************************** */

export type DraftWorldObject = {
  id: string;

  objectData: ArrayElement<typeof OBJECTS_DATA>;

  x: number;
  z: number;
  rotation: string;

  status: "editing" | "saved" | "discard";
};

type UserObjectsState = {
  draftObjects: Array<DraftWorldObject>;
};

export const userObjectsState = proxy<UserObjectsState>({
  draftObjects: [],
});

export const addDraftObject = (objectId: string) => {
  const foundObjectData = OBJECTS_DATA.find(({ id }) => id === objectId);

  if (!foundObjectData) {
    throw new Error("no world object found with that id");
  }

  userObjectsState.draftObjects.push({
    id: nanoid(),

    objectData: foundObjectData,

    rotation: "0",
    x: characterState.position[0],
    z: characterState.position[1],

    status: "editing",
  });
};

export const updateDraftObjectPosition = (
  id: string,
  { x, z }: { x: number; z: number }
) => {
  const updatedDraftObjects = userObjectsState.draftObjects.map((dobj) => {
    const updatedDobj = dobj;

    if (dobj.id === id) {
      dobj.x = x;
      dobj.z = z;
    }

    return updatedDobj;
  });

  userObjectsState.draftObjects = updatedDraftObjects;
};

export const updateDraftObjectRotation = (id: string, rotation: string) => {
  const updatedDraftObjects = userObjectsState.draftObjects.map((dobj) => {
    const updatedDobj = dobj;

    if (dobj.id === id) {
      dobj.rotation = rotation;
    }

    return updatedDobj;
  });

  userObjectsState.draftObjects = updatedDraftObjects;
};

export const discardDraftObjects = (ids: string[]) => {
  let updatedDraftObjects = userObjectsState.draftObjects;

  ids.map((id) => {
    updatedDraftObjects = userObjectsState.draftObjects.map((draftObject) => {
      const updatedDraftObject = draftObject;

      if (draftObject.id === id) {
        updatedDraftObject.status = "discard";
      }

      return updatedDraftObject;
    });
  });

  userObjectsState.draftObjects = updatedDraftObjects;
};

export const saveDraftObjects = (ids: string[]) => {
  let updatedDraftObjects = userObjectsState.draftObjects;

  ids.map((id) => {
    updatedDraftObjects = userObjectsState.draftObjects.map((draftObject) => {
      const updatedDraftObject = draftObject;

      if (draftObject.id === id) {
        updatedDraftObject.status = "saved";
      }

      return updatedDraftObject;
    });
  });

  userObjectsState.draftObjects = updatedDraftObjects;

  return updatedDraftObjects;
};

export const moveSavedObjectIntoWorld = () => {
  const savedDraftObject = userObjectsState.draftObjects.filter(
    (dobj) => dobj.status === "saved"
  );

  const savedWorldObjectsData = savedDraftObject.map((sobj) => ({
    id: sobj.id,
    modelUrl: sobj.objectData.url,

    x: sobj.x,
    z: sobj.z,
    rotation: Number(sobj.rotation),

    // TODO: owner
    owner: "",

    structures: {},
  }));

  worldObjectsState.objects = [
    ...worldObjectsState.objects,
    ...savedWorldObjectsData,
  ];

  // discard saved objects
  discardSavedObjects();
};

export const removeSavedObjects = () => {
  const updatedDraftObjects = userObjectsState.draftObjects.filter(
    (dobj) => dobj.status !== "saved"
  );

  userObjectsState.draftObjects = updatedDraftObjects;
};

export const discardSavedObjects = () => {
  const updatedDraftObjects = userObjectsState.draftObjects.map((dobj) => {
    const updatedDraftObject = dobj;

    if (updatedDraftObject.status === "saved") {
      updatedDraftObject.status = "discard";
    }

    return updatedDraftObject;
  });

  userObjectsState.draftObjects = updatedDraftObjects;
};

export const removeDiscardObjects = () => {
  const updatedDraftObjects = userObjectsState.draftObjects.filter(
    (dobj) => dobj.status !== "discard"
  );

  userObjectsState.draftObjects = updatedDraftObjects;
};

export const deleteDraftObjects = (ids: string[]) => {
  let updatedDraftObjects = userObjectsState.draftObjects;

  ids.map((id) => {
    updatedDraftObjects = userObjectsState.draftObjects.filter(
      (draftObject) => {
        return draftObject.id !== id;
      }
    );
  });

  userObjectsState.draftObjects = updatedDraftObjects;
};

// SUBSCRIPTIONS
subscribe(userObjectsState, () => {
  console.log(userObjectsState.draftObjects);
});
