import React from 'react';

export default function LightSetup() {
  return (
    <>
      {/* Dark Ambient Light */}
      <ambientLight color="#05070a" intensity={0.2} />
      
      {/* Directional light for top-down subtle depth */}
      <directionalLight color="#48CAE4" position={[0, 10, 0]} intensity={0.1} />

      <fog attach="fog" args={['#05070a', 10, 80]} />
    </>
  );
}
