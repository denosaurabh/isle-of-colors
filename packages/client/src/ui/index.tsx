import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { characterState } from "../state/character";
import { useSnapshot } from "valtio";
import { useEffect, useRef } from "react";

export const UI = () => {
  const {
    components: { Counter },
    systemCalls: { increment },
    network: { singletonEntity },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  // TODO : all users position stored but hidden ( shared encrypt setup ), only those users will see location which are closem zkp system
  // TODO : Position update function, check distance, make sure no teleportation, make sure no speed hacks, with zkp, and shared encrypt
  // TODO : Adding NFT storage, deploying on optimisim

  const { position } = useSnapshot(characterState);

  // Debounce position updates
  useEffect(() => {
    console.log("update");

    const subId = setInterval(() => {
      console.log("update position", characterState.position);
    }, 1000);

    return () => {
      clearInterval(subId); 
    };
  }, []);

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
