import { useSnapshot } from "valtio";
import { PlayersState, playersState } from "../state/players";
import { memo, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const getPlayerMeshName = (name: string) => `player-${name}`;

const pos = new Vector3();

export const Players = () => {
  const { players } = useSnapshot(playersState);

  const { scene } = useThree();

  const positionsMap = players.map((p) => p.position);
  useEffect(() => {
    players.map((p) => {
      const playerObj = scene.getObjectByName(getPlayerMeshName(p.name));

      if (playerObj) {
        playerObj.position.lerp(
          pos.set(p.position[0], p.position[1], p.position[2]),
          1
        );
      }
    });
  }, [positionsMap]);

  return <PlayersMap players={players} />;
};

const PlayersMap = memo(
  ({ players }: { players: PlayersState["players"] }) => {
    return (
      <>
        {players.map((p, i) => {
          return (
            <mesh
              key={i}
              name={getPlayerMeshName(p.name)}
              // name={p.name}
              // position={p.position}
            >
              <boxGeometry args={[0.5, 1, 0.3]} />
              <meshBasicMaterial color="orange" />
            </mesh>
          );
        })}
      </>
    );
  },
  // only update playersMap if no of players has updated
  (oldProps, newProps) => oldProps.players.length === newProps.players.length
);

PlayersMap.displayName = "PlayersMap";
