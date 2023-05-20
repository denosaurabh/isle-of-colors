import { useSnapshot } from "valtio";
import { playersState } from "../state/players";

export const Players = () => {
  const { players } = useSnapshot(playersState);

  return (
    <>
      {players.map((p, i) => {
        return (
          <mesh key={i} name={`player-${i}`} position={p}>
            <boxGeometry args={[0.5, 1, 0.3]} />
            <meshBasicMaterial color="orange" />
          </mesh>
        );
      })}
    </>
  );
};
