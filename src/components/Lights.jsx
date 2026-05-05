import React from 'react';

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <hemisphereLight skyColor="#ffffff" groundColor="#efe8dd" intensity={0.45} />
      <directionalLight position={[6, 12, 6]} intensity={0.3} />
      <spotLight position={[0, 10, -30]} angle={0.45} penumbra={0.7} intensity={0.6} color="#fdf7ee" />
      <pointLight position={[0, 3, -14]} intensity={0.45} color="#fdf7ee" />
      <pointLight position={[0, 3, -34]} intensity={0.42} color="#fdf7ee" />
      <pointLight position={[0, 3, -50]} intensity={0.42} color="#fdf7ee" />
      <pointLight position={[0, 3, -66]} intensity={0.45} color="#fdf7ee" />
      <pointLight position={[0, 3, -82]} intensity={0.45} color="#fdf7ee" />
    </>
  );
}
