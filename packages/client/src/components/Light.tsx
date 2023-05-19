import { memo } from "react";

export const Light = memo(() => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        castShadow
        intensity={1}
        position={[100, 100, 100]}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          left={-20}
          right={20}
          top={20}
          bottom={-20}
        />
      </directionalLight>
    </>
  );
});
