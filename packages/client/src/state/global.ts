import { proxy } from "valtio";

type GlobalState = {
  cursor: "auto" | "pointer";
};

export const globalState = proxy<GlobalState>({
  cursor: "auto",
});

export const setGlobalCursor = (cursor: GlobalState["cursor"]) => {
  globalState.cursor = cursor;
};
