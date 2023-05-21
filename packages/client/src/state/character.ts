import { proxy } from "valtio";

type StructureName = string;

type ColorName = string;
type ColorAmount = number;

type Painting = {
  isPainting: boolean;
  structureName: StructureName;

  initialColor: string;
  mixWithColor: string;

  transition_amount: number; // how much the color has transitioned, between 0 & 1
  transition_speed: number; // speed of the transition
};

type CharacterState = {
  id: string;
  position: [number, number, number];
  allowUpdate: boolean;

  activeActionMode: "paint" | "scoop";

  activeColor: string;
  colorInventory: Record<ColorName, ColorAmount>;

  paintingState: Record<StructureName, Painting>;
};

const TRANSITION_SPEED = 0.005;

export const characterState = proxy<CharacterState>({
  id: "",

  position: [0, 0, 0],
  allowUpdate: false,

  activeActionMode: "paint",
  activeColor: "#000",
  colorInventory: { "#000": 500, pink: 500 },

  paintingState: {},
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

export const decreaseActiveColorQuantity = (quantity = 0.5) => {
  characterState.colorInventory[characterState.activeColor] -= quantity;
};

export const setActiveActionMode = (
  mode: CharacterState["activeActionMode"]
) => {
  characterState.activeActionMode = mode;
};

export const setActiveColor = (color: string) => {
  characterState.activeColor = color;
};

export const startPaintingStructure = (
  structureName: string,
  currentColor: string
) => {
  switch (characterState.activeActionMode) {
    case "paint": {
      startApplyingPaintOnStructure(structureName, currentColor);
      break;
    }
    case "scoop": {
      startScoopingPaintFromStructure(structureName, currentColor);
      break;
    }
  }
};

export const startApplyingPaintOnStructure = (
  structureName: string,
  currentColor: string
) => {
  characterState.paintingState[structureName] = {
    isPainting: true,
    structureName,

    initialColor: currentColor,
    mixWithColor: characterState.activeColor,

    transition_amount: 0,
    transition_speed: TRANSITION_SPEED,
  };
};

export const startScoopingPaintFromStructure = (
  structureName: string,
  currentColor: string
) => {
  characterState.paintingState[structureName] = {
    isPainting: true,
    structureName,

    initialColor: currentColor,
    mixWithColor: "#fff",

    transition_amount: 0,
    transition_speed: TRANSITION_SPEED,
  };
};

export const stopPaintingStructure = (structureName: string) => {
  delete characterState.paintingState[structureName];
};

export const increaseStructureColorTransition = (structureName: string) => {
  const p = characterState.paintingState[structureName];

  const updatedTransitionAmount =
    p.transition_amount < 1 ? p.transition_amount + p.transition_speed : 1;

  characterState.paintingState[structureName] = {
    isPainting: true,
    structureName,

    initialColor: p.initialColor,
    mixWithColor: p.mixWithColor,

    transition_amount: updatedTransitionAmount,
    transition_speed: p.transition_speed,
  };

  return updatedTransitionAmount;
};
