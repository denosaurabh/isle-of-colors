import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { KeyboardControls } from "@react-three/drei";

import { UI } from "./ui";

import { Perf } from "r3f-perf";
import { Effects } from "./components/Effects";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  // const {
  //   systemCalls: { updateCharacterOnlineStatusMud },
  // } = useMUD();

  // useEffect(() => {
  //   return () => {
  //     // updateCharacterOnlineStatus();
  //     updateCharacterOnlineStatusMud(characterState.id, false);
  //   };
  // }, []);

  return (
    <div className="w-screen h-screen absolute top-0 left-0">
      <div className="ui absolute z-10">
        <UI />
      </div>

      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          id="canvas"
          shadows
          orthographic
          camera={{ position: [10, 10, 10], zoom: 50, near: 0.0, far: 150 }}
        >
          <Perf position="top-left" />

          <color attach="background" args={["#d0d0d0"]} />

          <Suspense>
            <Physics gravity={[0, -9.8, 0]}>
              {children}

              <axesHelper scale={100} />

              <Effects />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
};
