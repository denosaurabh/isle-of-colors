import { RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";

export const TreeSpirit = forwardRef((props: any, ref) => {
  const { userData, color, ...otherProps } = props;

  return (
    <mesh
      ref={ref}
      userData={{ treeSpirit: true, ...userData }}
      receiveShadow
      castShadow
      {...otherProps}
    >
      <boxGeometry args={[1, 30, 1]} />
      <meshPhongMaterial
        color={color}
        // map={texture}
        // color="#f9ba8b"
      />
    </mesh>
  );
});

TreeSpirit.displayName = "TreeSpirit";
