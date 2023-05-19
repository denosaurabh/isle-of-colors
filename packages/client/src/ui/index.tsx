import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";

export const UI = () => {
  const {
    components: { Counter },
    systemCalls: { increment },
    network: { singletonEntity },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

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
