import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const GroundMaterial = shaderMaterial(
  {
    bladeHeight: 1,
    map: null,
    alphaMap: null,
    time: 0,
    tipColor: new THREE.Color(0.0, 0.6, 0.0).convertSRGBToLinear(),
    bottomColor: new THREE.Color(0.0, 0.1, 0.0).convertSRGBToLinear(),
  },
  `  varying vec2 vUv;

  void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  `
  varying vec3 vUv;

  void main() { 
      float factor = vUv.y / 50.0 + 0.5;
      gl_FragColor = mix(vec4(0.1, 0.9, 0.1, 1.0), vec4(0.5, 1.0, 0.5, 1.0), factor);
  }`,
  (self) => {
    self.side = THREE.DoubleSide;
  }
);

extend({ GroundMaterial });
