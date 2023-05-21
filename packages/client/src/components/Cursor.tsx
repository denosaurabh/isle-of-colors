import { useCursor } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { globalState } from "../state/global";

export const Cursor = () => {
  const { cursor } = useSnapshot(globalState);
  console.log("cursor", cursor);

  useCursor(cursor === "pointer", "pointer", "auto");

  return <></>;
};
