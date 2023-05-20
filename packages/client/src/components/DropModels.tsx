import { Edges, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSnapshot } from "valtio";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

import { CONTROL_ID, objectState } from "../state/objects";
import { OBJECTS_DATA } from "../data/objects";
import { updateDisableCameraControls } from "../state/camera";
import { nanoid } from "nanoid";

export const AddAndDragObjects = () => {
  const ref = useRef();

  const { draggedObjectId } = useSnapshot(objectState);

  const { scene, camera, gl } = useThree();

  const foundObject = OBJECTS_DATA.find((o) => o.id === draggedObjectId)?.url;

  useEffect(() => {
    if (draggedObjectId) {
      const modelUrl = OBJECTS_DATA.find((o) => o.id === draggedObjectId)?.url;

      if (!modelUrl) return;

      // Instantiate a loader
      const loader = new GLTFLoader();

      // Optional: Provide a DRACOLoader instance to decode compressed mesh data
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
      loader.setDRACOLoader(dracoLoader);

      // Load a glTF resource
      loader.load(
        // resource URL
        modelUrl,
        // called when the resource is loaded
        (gltf) => {
          console.log("dragged model", gltf);

          const name = "draggable-adding-object-" + nanoid();

          const group = new THREE.Group();
          group.name = name;

          gltf.scene.children.forEach((mesh) => {
            if (mesh.type !== "Mesh" || !mesh.geometry) return;

            const edges = new THREE.EdgesGeometry(mesh.geometry);
            const line = new THREE.LineSegments(
              edges,
              new THREE.LineBasicMaterial({ color: 0x333333 })
            );

            const newMesh = new THREE.Mesh(
              mesh.geometry,
              new THREE.MeshPhongMaterial({ color: 0xe29d58 })
            );

            const pos = mesh.position;

            newMesh.position.set(pos.x, pos.y, pos.z);
            newMesh.rotation.set(
              mesh.rotation.x,
              mesh.rotation.y,
              mesh.rotation.z
            );
            newMesh.scale.set(mesh.scale.x, mesh.scale.y, mesh.scale.z);

            group.add(newMesh);
            mesh.add(line);
            // scene.add(line);
          });

          scene.add(group);

          const object = scene.getObjectByName(name);

          if (!object) return;

          const control = new TransformControls(camera, gl.domElement);
          control.name = CONTROL_ID;

          control.attach(object);

          control.addEventListener("mouseDown", () => {
            updateDisableCameraControls(true);
          });

          control.addEventListener("mouseUp", () => {
            updateDisableCameraControls(false);
          });

          control.showY = false;
          scene.add(control);
        },
        (xhr) => {
          // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        (error) => {
          // console.log("An error happened");
        }
      );
    }
  }, [draggedObjectId]);

  const { nodes } = useGLTF(foundObject || "/cabin.glb");

  if (!foundObject) return null;

  return <></>;

  return (
    <>
      {ref.current ? (
        <TransformControls
          object={scene.getObjectByName("draggable-adding-object")}
          mode="translate"
          onMouseDown={() => updateDisableCameraControls(true)}
          onMouseUp={() => updateDisableCameraControls(false)}
          showY={false}
        />
      ) : null}

      <group
        ref={ref}
        name="draggable-adding-object"
        //   position={position}
        //   {...bind()}
        //   position-x={-10}
        //   userData={{ draggable: true }}
      >
        {foundObject
          ? Object.values(nodes).map((n, i) => {
              if (n.type !== "Mesh") return null;

              return (
                <mesh
                  key={i}
                  castShadow
                  receiveShadow
                  geometry={n.geometry}
                  // material={nodes.Cube.material}
                  position={n.position}
                  rotation={n.rotation}
                  scale={n.scale}
                >
                  <meshPhongMaterial color="#e29d58" />
                  {/* <meshStandardMaterial color="#e29d58" metalness={1} /> */}

                  <Edges scale={1} renderOrder={1}>
                    <meshPhongMaterial color="#e29d58" />
                  </Edges>

                  {/* <Edges scale={1} renderOrder={1}>
                <meshPhongMaterial color="#333">
                  <GradientTexture
                    stops={[0, 1]} // As many stops as you want
                    colors={["#de9954", "#d1b07d"]} // Colors need to match the number of stops
                    size={1024} // Size is optional, default = 1024
                  />
                </meshPhongMaterial>
              </Edges> */}
                </mesh>
              );
            })
          : null}
      </group>
    </>
  );
};
