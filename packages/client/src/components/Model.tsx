import { Edges, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

type ModelProps = {
  url: string;

  id?: string;
  color?: string;

  [key: string]: any;
};

export const Model = ({ id, url, color = "#059669", ...props }: ModelProps) => {
  const { userData, ...otherProps } = props;
  const { nodes } = useGLTF(url);

  return (
    <RigidBody
      type="fixed"
      colliders="hull"
      // position={[0, 0, 0]}
    >
      <group
        name={id}
        userData={{ draggable: true, ...userData }}
        position-y={0.5}
        {...otherProps}
      >
        {Object.values(nodes).map((n, i) => {
          if (n.type !== "Mesh") return null;

          return (
            <mesh
              key={i}
              castShadow
              receiveShadow
              geometry={n.geometry}
              position={n.position}
              rotation={n.rotation}
              scale={n.scale}
            >
              <meshPhongMaterial color={color} />

              <Edges scale={1} renderOrder={1}>
                {/* <meshPhongMaterial color={color} /> */}
              </Edges>
            </mesh>
          );
        })}
      </group>
    </RigidBody>
  );
};
