import { Edges, GradientTexture, useGLTF } from "@react-three/drei";
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
                <meshPhongMaterial color="#333" />
              </Edges>

              {/* <meshPhongMaterial color={color} /> */}

              {/* <Edges scale={1} renderOrder={1}>
                <meshPhongMaterial>
                  <GradientTexture
                    stops={[0, 1]} // As many stops as you want
                    colors={["#de9954", "#d1b07d"]} // Colors need to match the number of stops
                    size={1024} // Size is optional, default = 1024
                  />
                </meshPhongMaterial>
              </Edges> */}
            </mesh>
          );
        })}
      </group>
    </RigidBody>
  );
};
