import { RigidBody } from "@react-three/rapier";

export const Ground = () => {
  return (
    <RigidBody type="fixed" colliders="hull">
      <mesh userData={{ ground: true }} position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[200, 1, 100]} />
        <meshPhongMaterial color="#999" />
      </mesh>
    </RigidBody>
  );
};
