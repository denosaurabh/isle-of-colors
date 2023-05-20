import { RigidBody } from "@react-three/rapier";
import { Geometry, Base, Subtraction } from "@react-three/csg";
import { Ocean } from "react-three-ocean";

import { Ice } from "./Ice";
import * as THREE from "three";
import { Reflector } from "@react-three/drei";

export const Ground = () => {
  return (
    <RigidBody type="fixed" colliders="hull">
      <mesh userData={{ ground: true }} position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[200, 0, 200]} />
        <meshPhongMaterial color="#999" />
      </mesh>
    </RigidBody>
  );

  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[10, 10]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      scale={[100, 100, 1]}
    >
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.4}
          // roughnessMap={floor}
          // normalMap={normal}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );

  return (
    <>
      {/* <Ice /> */}
      <Ocean
        dimensions={[10000, 10000]}
        normals="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
        distortionScale={20}
        size={10}
        options={{
          // defaults
          clipBias: 0,
          alpha: 1,
          // waterNormals: null, // automatically set to provided texture from "normals" prop
          sunDirection: new THREE.Vector3(0.70707, 0.70707, 0),
          sunColor: 0xffffff,
          // waterColor: 0x001e0f,
          waterColor: 0x0ea5e9,
          eye: new THREE.Vector3(0, 0, 0),
          // distortionScale: 3.7, // automatically set from "distortionScale" prop
          side: THREE.FrontSide,
          fog: false,
        }}
      >
        {(water) => {
          console.log(water); // children function is passed `Water` instance for manual manipulation (e.g. sunDirection, animated waterColor, etc.)
          return null;
        }}
      </Ocean>

      <RigidBody type="fixed" colliders="hull">
        <mesh userData={{ ground: true }} position={[0, 0, 0]} receiveShadow>
          <Geometry>
            <Base>
              <boxGeometry args={[200, 1, 200]} />
            </Base>

            <Subtraction position={[0, 0, 0]} scale={10}>
              {/** Geometry can be set by prop or by child, just like any regular <mesh>. */}
              <sphereGeometry />
            </Subtraction>
          </Geometry>

          <meshPhongMaterial color="#999" />
        </mesh>
      </RigidBody>
    </>
  );
};
