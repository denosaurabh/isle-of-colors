import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { characterState, updateCharacterPosition } from "../state/character";
import { useSnapshot } from "valtio";
import { useEffect, useRef, useState } from "react";
import { Has, getComponentValueStrict } from "@latticexyz/recs";

export const UI = () => {
  const {
    components: { Counter, Character },
    systemCalls: {
      increment,
      addCharacterMud,
      updateCharacterPositionMud,
      getCurrentCharacterIdMud,
    },
    network: { singletonEntity },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  // TODO : all users position stored but hidden ( shared encrypt setup ), only those users will see location which are closem zkp system
  // TODO : Position update function, check distance, make sure no teleportation, make sure no speed hacks, with zkp, and shared encrypt
  // TODO : Adding NFT storage, deploying on optimisim

  // const { position } = useSnapshot(characterState);

  const characterIds = useEntityQuery([Has(Character)]);
  const [currentCharacterId, setcurrentCharacterId] = useState(null);

  useEffect(() => {
    const getCharacterId = async () => {
      const currentCharacterId = await getCurrentCharacterIdMud();
      if (currentCharacterId) {
        setcurrentCharacterId(currentCharacterId?.["from"]);
      }
    };

    getCharacterId();
  }, []);

  useEffect(() => {
    const allCharactersData = {};
    if (characterIds.length !== 0) {
      characterIds.map((id) => {
        const loadedPlayerData = getComponentValueStrict(Character, id);
        // console.log("loadedPlayerData", id, loadedPlayerData);
        allCharactersData[id] = loadedPlayerData;
      });
    }
    // console.log("allCharactersData", allCharactersData);
  }, [characterIds]);

  // TODO : Only needed if the character get's removed from chain once it's logged out
  // TODO : Multiple players seems to remove the character each other states
  const updated = useRef(false);
  useEffect(() => {
    if (currentCharacterId && characterIds.length !== 0 && !updated.current) {
      if (characterIds.includes(currentCharacterId.toLowerCase())) {
        const loadedPlayerData = getComponentValueStrict(
          Character,
          currentCharacterId.toLowerCase()
        );

        updateCharacterPosition([
          loadedPlayerData["x"],
          0,
          loadedPlayerData["z"],
        ]);
      }
      // else {
      //   addCharacterMud(0, 0);
      // }
      updated.current = true;
    }
  }, [currentCharacterId, characterIds]);

  // Debounce position updates
  useEffect(() => {
    const subId = setInterval(() => {
      if (currentCharacterId) {
        updateCharacterPositionMud(
          currentCharacterId,
          Math.floor(characterState.position[0]),
          Math.floor(characterState.position[2])
        );
      }
    }, 1000);

    return () => {
      clearInterval(subId);
    };
  }, [currentCharacterId]);

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
