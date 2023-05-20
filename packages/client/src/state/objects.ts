import { proxy } from "valtio";

export const CONTROL_ID = "drag-object-control";

export const objectState = proxy({ draggedObjectId: "" });

export const updateDraggedObjectId = (id: string) => {
  objectState.draggedObjectId = id;
};
