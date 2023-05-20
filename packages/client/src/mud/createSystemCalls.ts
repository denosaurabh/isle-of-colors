import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

const entityToBytes32 = (entity: string) => {
  return "0x" + entity.replace("0x", "").padStart(64, "0");
};

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter }: ClientComponents
) {
  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const addCharacterMud = async (x: number, z: number, lastOnline : number) => {
    await worldSend("addCharacterMud", [x, z, lastOnline]);
  };

  const updateCharacterPositionMud = async (
    id: string,
    x: number,
    z: number,
    lastOnline: number
  ) => {
    await worldSend("updateCharacterPositionMud", [
      entityToBytes32(id),
      x,
      z,
      lastOnline,
    ]);
  };

  const getCurrentCharacterIdMud = () => {
    return worldSend("getCurrentCharacterIdMud", []);
  };

  return {
    increment,
    addCharacterMud,
    updateCharacterPositionMud,
    getCurrentCharacterIdMud,
  };
}
