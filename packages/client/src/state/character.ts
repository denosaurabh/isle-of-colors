import { proxy } from "valtio";
import { WorldObject } from "./worldObjects";

type CharacterState = {
  id: string;
  position: [number, number, number];
  allowUpdate: boolean;
  paintingState: {
    isPainting: boolean;
    paintingSince: number | null; // milliseconds
    object: WorldObject | null;
  };
};

export const characterState = proxy<CharacterState>({
  id: "",

  position: [0, 0, 0],
  allowUpdate: false,

  paintingState: { isPainting: false, paintingSince: null, object: null },
});

export const updateCharacterPosition = (newPos: [number, number, number]) => {
  characterState.position = newPos;
};

export const allowUpdate = (allow: boolean) => {
  characterState.allowUpdate = allow;
};

export const updateCharacterId = (id: string) => {
  characterState.id = id;
};

export const updatePaintingState = (
  object: CharacterState["paintingState"]["object"]
) => {
  if (object) {
    characterState.paintingState = {
      isPainting: true,
      paintingSince: Date.now(),
      object,
    };
  } else {
    characterState.paintingState = {
      isPainting: false,
      paintingSince: null,
      object: null,
    };
  }
};
