import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  RapierCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
  vec3,
} from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { characterState, updateCharacterPosition } from "../state/character";
import { useSnapshot } from "valtio";
import * as THREE from "three";

const useKeyboard = () => {
  const keysDown = useRef({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysDown.current[event.key] = true;

      // console.log(event.key);
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      keysDown.current[event.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keysDown;
};

export const Character = () => {
  const rapier = useRapier();
  const controller = useRef();
  const collider = useRef<RapierCollider>(null);
  const body = useRef<RapierRigidBody>(null);

  const characterRef = useRef();

  const { position } = useSnapshot(characterState);

  const keysdown = useKeyboard();

  const refState = useRef({
    grounded: false,
    jumping: false,
    velocity: vec3(),
  });

  useEffect(() => {
    const c = rapier.world.raw().createCharacterController(0.01);
    c.setApplyImpulsesToDynamicBodies(true);
    c.setCharacterMass(0.2);
    c.enableSnapToGround(0.02);

    controller.current = c;
  }, [rapier]);

  const pos = new THREE.Vector3();

  useEffect(() => {
    if (body.current) {
      body.current.setTranslation(pos.set(position[0], 1, position[2]), true);
    }
  }, [position]);

  useFrame((context, delta) => {
    if (controller.current && body.current && collider.current) {
      try {
        const { velocity } = refState.current;

        const position = vec3(body.current.translation());
        const movement = vec3();

        if (keysdown.current.ArrowUp) {
          movement.z -= 0.07;
        }
        if (keysdown.current.ArrowDown) {
          movement.z += 0.07;
        }
        if (keysdown.current.ArrowLeft) {
          movement.x -= 0.07;
        }
        if (keysdown.current.ArrowRight) {
          movement.x += 0.07;
        }

        if (refState.current.grounded && keysdown.current[" "]) {
          velocity.y = 0.2;
        }

        if (!refState.current.grounded) {
          // Apply gravity
          velocity.y -= (9.807 * delta) / 20;
        }

        movement.add(velocity);

        controller.current.enableAutostep(0.5, 0.2, true);

        controller.current.computeColliderMovement(collider.current, movement);
        refState.current.grounded = controller.current.computedGrounded();

        const correctedMovement = controller.current.computedMovement();
        position.add(vec3(correctedMovement));

        updateCharacterPosition([position.x, position.y, position.z]);

        body.current.setNextKinematicTranslation(position);
      } catch (err) {
        console.log("error updating character position");
      }
    }
  });

  return (
    <RigidBody
      type="kinematicPosition"
      colliders={false}
      ref={body}
      position={[0, 10, 0]}
    >
      <mesh name="character" ref={characterRef}>
        <boxGeometry args={[0.5, 1, 0.3]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* <CapsuleCollider args={[1, 0.5]} ref={collider} /> */}
      <CuboidCollider args={[0.25, 0.5, 0.15]} ref={collider} />
    </RigidBody>
  );
};
