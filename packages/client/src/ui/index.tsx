import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { characterState, updateCharacterPosition } from "../state/character";
import { useSnapshot } from "valtio";
import { useEffect, useRef } from "react";
import { Has, getComponentValueStrict } from "@latticexyz/recs";

export const UI = () => {
  const {
    components: { Counter, Character },
    systemCalls: { increment, addCharacterMud, updateCharacterPositionMud },
    network: { singletonEntity },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  // TODO : all users position stored but hidden ( shared encrypt setup ), only those users will see location which are closem zkp system
  // TODO : Position update function, check distance, make sure no teleportation, make sure no speed hacks, with zkp, and shared encrypt
  // TODO : Adding NFT storage, deploying on optimisim

  // const { position } = useSnapshot(characterState);

  const characterIds = useEntityQuery([Has(Character)]);
  // console.log("characterIds", characterIds);
  // playerIds.map((id) => {
  //   const loadedPlayerData = getComponentValueStrict(Player, id);
  //   console.log("loadedPlayerData", loadedPlayerData);
  // });
  // const loadedPlayerData = getComponentValueStrict
  // updateCharacterPosition

  const characterData = useComponentValue(Character, characterIds[0]);
  useEffect(() => {
    console.log("characterData", characterData);
    if (characterData) {
      console.log("characterData", characterData);
      updateCharacterPosition([characterData["x"], 0, characterData["z"]]);
    }
  }, [characterData]);

  // useEffect(() => {
  //   addCharacterMud();
  // }, []);

  // Debounce position updates
  useEffect(() => {
    const subId = setInterval(() => {
      // console.log(characterState.position);
      // updateCharacterPositionMud(
      //   characterIds[0],
      //   Math.floor(characterState.position[0]),
      //   Math.floor(characterState.position[2])
      // );
    }, 1000);

    return () => {
      clearInterval(subId);
    };
  }, [characterIds]);

  // updatePosition(position);
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Counter: <span>{counter?.value ?? "??"}</span>
      </h1>

      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await increment());
        }}
      >
        Increment
      </button>
    </>
  );
};
