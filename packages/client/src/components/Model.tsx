import { Edges, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { nanoid } from "nanoid";
import { memo } from "react";

type ModelProps = {
  url: string;

  id: string;
  color?: string;

  structures?: Record<string, string>;

  onStructureFocusIn?: (meshName: string, currentColor: string) => void;
  onStructureFocusOut?: (meshName: string) => void;

  [key: string]: unknown;
};

export const Model = memo(
  ({
    id,
    url,
    color = "#fff",
    structures = {},
    onStructureFocusIn,
    onStructureFocusOut,
    ...props
  }: ModelProps) => {
    const { userData, ...otherProps } = props;
    const { nodes } = useGLTF(url);

    // return (
    //   <RigidBody
    //     type="fixed"
    //     colliders="hull"
    //     // position={[0, 0, 0]}
    //   >
    //     <Gltf src={url} receiveShadow castShadow />
    //   </RigidBody>
    // );

    return (
      <RigidBody
        type="fixed"
        colliders="hull"
        // position={[0, 0, 0]}
      >
        <group
          name={id}
          userData={userData}
          // position-y={0.5}
          {...otherProps}
        >
          {Object.values(nodes).map((n, i) => {
            if (n.type !== "Mesh") return null;

            const structureColor = structures[n.name];

            const finalColor = structureColor || color;
            const meshName = getStructureName(id, n.name);

            return (
              <mesh
                key={i}
                castShadow
                receiveShadow
                geometry={n.geometry}
                position={n.position}
                rotation={n.rotation}
                name={meshName}
                scale={n.scale}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onStructureFocusIn?.(meshName, finalColor);
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                  onStructureFocusOut?.(meshName);
                }}
                onPointerLeave={(e) => {
                  e.stopPropagation();
                  // console.log("pointer leave");
                  onStructureFocusOut?.(meshName);
                }}
              >
                <meshPhongMaterial color={finalColor} />

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
  },
  (oldProps, newProps) => {
    // don't rerender the component when structures change
    return oldProps.id === newProps.id && oldProps.url === newProps.url;
  }
);

Model.displayName = "Model" + nanoid();

const getStructureName = (groupName: string, meshName: string) =>
  `${groupName}-structure-${meshName}`;
