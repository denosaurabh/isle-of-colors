export const Character = () => {
  return (
    <>
      <mesh name="character">
        <boxGeometry args={[0.5, 1, 0.3]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </>
  );
};
