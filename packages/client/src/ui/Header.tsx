import { useSnapshot } from "valtio";
import { worldState } from "../state/world";

export const Header = () => {
  const { numberOfOnlineCharacters, isChainReady } = useSnapshot(worldState);

  return (
    <div className="fixed top-2 right-2 flex gap-3 w-fit h-fit p-2 rounded-lg bg-slate-800 bg-opacity-25 backdrop-blur-md">
      <div className="rounded-lg bg-slate-700 flex justify-end gap-2 px-3 py-1.5 bg-opacity-30 text-md font-semibold uppercase text-blue-300">
        Online: {numberOfOnlineCharacters}
      </div>
      <div className="rounded-lg bg-slate-700 flex justify-end gap-2 px-3 py-1.5 bg-opacity-30 text-md font-semibold uppercase text-blue-300">
        Data Loaded: {isChainReady ? "Yes" : "No"}
      </div>
    </div>
  );
};
