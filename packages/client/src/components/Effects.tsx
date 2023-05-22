import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import React, { forwardRef, useMemo } from "react";
import { Uniform, Vector2 } from "three";
import { Effect } from "postprocessing";
import { useThree } from "@react-three/fiber";

export const Effects = () => {
  return (
    <EffectComposer>
      <Noise opacity={0.4} premultiply />
      <Vignette eskil={false} offset={0.1} darkness={0.3} />

      {/* <NPRShader /> */}
    </EffectComposer>
  );
};

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D tDiffuse;
// uniform vec2 resolution;

// varying vec2 vUv;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float factor = vUv.y / 50.0 + 0.5;
    outputColor = mix(vec4(0.1, 0.9, 0.1, 1.0), vec4(0.5, 1.0, 0.5, 1.0), factor);
}
`;

// let _uParam;

// Effect implementation
class MyCustomEffectImpl extends Effect {
  constructor({ resolution } = {}) {
    super("MyCustomEffect", fragmentShader, {
      //   uniforms: new Map([["resolution", new Uniform(new Vector2(1920, 1080))]]),
      //   vertexShader,
    });

    // _uParam = resolution;
  }

  //   update(renderer, inputBuffer, deltaTime) {
  // this.uniforms.get("param").value = _uParam;
  //   }
}

// Effect component
export const NPRShader = forwardRef(({ resolution }, ref) => {
  const effect = useMemo(
    () => new MyCustomEffectImpl({ resolution }),
    [resolution]
  );
  return <primitive ref={ref} object={effect} dispose={null} />;
});

NPRShader.displayName = "NPRShader";
