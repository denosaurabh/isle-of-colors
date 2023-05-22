import { useSnapshot } from "valtio";
import { worldState } from "../state/world";

export const Loading = () => {
  const { isChainReady } = useSnapshot(worldState);

  if (isChainReady) return null;

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-slate-50 bg-opacity-50 backdrop-blur-md">
      <h6 className="animate-ping text-xl text-slate-900 font-mono uppercase">
        Loading..
      </h6>
    </div>
  );
};
