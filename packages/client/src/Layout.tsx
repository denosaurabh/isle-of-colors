import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { KeyboardControls } from "@react-three/drei";

import { UI } from "./ui";

export const Layout = ({ children }: { children: React.ReactNode }) => {
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
          camera={{ position: [10, 10, 10], zoom: 50, near: 0.0, far: 200 }}
        >
          <color attach="background" args={["#d0d0d0"]} />

          <Suspense>
            <Physics gravity={[0, -9.8, 0]}>
              {children}

              <axesHelper scale={100} />

              <EffectComposer>
                <Noise opacity={0.4} premultiply />
                <Vignette eskil={false} offset={0.1} darkness={0.3} />
              </EffectComposer>
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
};