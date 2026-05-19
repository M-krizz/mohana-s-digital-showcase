import React from 'react';

export default function LightSetup() {
  return (
    <>
      {/* Deep ambient for base visibility */}
      <ambientLight color="#06091a" intensity={0.25} />

      {/* Cool directional light from above */}
      <directionalLight color="#48CAE4" position={[0, 10, 0]} intensity={0.12} />

      {/* Warm accent from behind camera */}
      <pointLight position={[0, 3, 5]} color="#FFE9B3" intensity={0.3} distance={20} />

      {/* Deep space fog for depth */}
      <fog attach="fog" args={['#05070a', 12, 75]} />
    </>
  );
}
