import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import {
  allowUpdate,
  characterState,
  updateCharacterId,
  updateCharacterPosition,
} from "../state/character";
import { useEffect, useRef, useState } from "react";
import { Has, getComponentValueStrict } from "@latticexyz/recs";
import {
  updateIsChainReady,
  updateNumberOfOnlineCharacters,
} from "../state/world";

export const CharacterPos = () => {
  const {
    components: { Counter, Character },
    systemCalls: {
      increment,
      addCharacterMud,
      updateCharacterPositionMud,
      getCurrentCharacterIdMud,
      updateCharacterOnlineStatusMud,
    },
    network: { singletonEntity },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);
  console.log("counter", counter);
  useEffect(() => {
    if (counter) {
      updateIsChainReady(true);
    }
  }, [counter]);
  // const counter = 1;
  // updateIsChainReady(true);

  // TODO : all users position stored but hidden ( shared encrypt setup ), only those users will see location which are closem zkp system
  // TODO : Position update function, check distance, make sure no teleportation, make sure no speed hacks, with zkp, and shared encrypt
  // TODO : Adding NFT storage, deploying on optimisim

  // const { position } = useSnapshot(characterState);

  const characterIds = useEntityQuery([Has(Character)]);
  const [currentCharacterId, setcurrentCharacterId] = useState(null);

  // const updateCharacterOnlineStatus = () => {
  //   updateCharacterOnlineStatusMud(currentCharacterId, false);
  // };

  useEffect(() => {
    const getCharacterId = async () => {
      const currentCharacterId = await getCurrentCharacterIdMud();
      if (currentCharacterId) {
        console.log("currentCharacterId", currentCharacterId);
        setcurrentCharacterId(currentCharacterId?.["from"]);
      }
    };

    getCharacterId();
  }, []);

  useEffect(() => {
    const allCharactersData = {};
    if (characterIds.length !== 0) {
      let numberOfOnlineCharacters = 0;
      characterIds.map((id) => {
        const loadedPlayerData = getComponentValueStrict(Character, id);
        // console.log("loadedPlayerData", id, loadedPlayerData);
        allCharactersData[id] = loadedPlayerData;

        if (loadedPlayerData["isOnline"]) {
          numberOfOnlineCharacters++;
        }
      });

      updateNumberOfOnlineCharacters(numberOfOnlineCharacters);
    }
    // console.log("allCharactersData", allCharactersData);
  }, [characterIds]);

  // TODO : Only needed if the character get's removed from chain once it's logged out
  // TODO : Multiple players seems to remove the character each other states
  const updated = useRef(false);
  useEffect(() => {
    // console.log(currentCharacterId, characterIds, updated.current);
    if (
      currentCharacterId &&
      characterIds.length !== 0 &&
      !updated.current &&
      counter
    ) {
      console.log(currentCharacterId, characterIds);
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

        allowUpdate(true);
        updated.current = true;
      } else {
        console.log("character not found in the list, adding new character");
        addCharacterMud(0, 0);
        allowUpdate(true);
        updated.current = true;
      }
    }

    if (
      currentCharacterId &&
      characterIds.length === 0 &&
      !updated.current &&
      counter
    ) {
      console.log("adding new character");
      addCharacterMud(0, 0);
      allowUpdate(true);
      updated.current = true;
    }
  }, [currentCharacterId, characterIds]);

  // Debounce position updates
  useEffect(() => {
    const subId = setInterval(() => {
      if (currentCharacterId && updated.current) {
        // updateCharacterId(currentCharacterId.toLowerCase());

        updateCharacterPositionMud(
          currentCharacterId,
          Math.floor(characterState.position[0]),
          Math.floor(characterState.position[2]),
          true
        );
      }
    }, 1000);

    return () => {
      clearInterval(subId);
    };
  }, [currentCharacterId, updated]);

  // updatePosition(position);
  return <></>;
};
