import React, { useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../store/useAppStore';

export default function Door({ position, label, targetSection }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const isTransitioning = useAppStore((state) => state.isTransitioning);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isTransitioning) return;
    setActiveSection(targetSection);
  };

  useFrame(() => {
    if (meshRef.current) {
      // Gentle pulsing when hovered
      const scale = hovered && !isTransitioning ? 1.05 : 1;
      meshRef.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[0.2, 3, 1.5]} />
        <meshStandardMaterial 
          color={hovered ? "#48CAE4" : "#2A3B8F"} 
          emissive={hovered ? "#48CAE4" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
          roughness={0.5} 
        />
      </mesh>
      
      {/* Door Label */}
      <Text
        position={[position[0] > 0 ? -0.15 : 0.15, 0, 0]}
        rotation={[0, position[0] > 0 ? -Math.PI/2 : Math.PI/2, 0]}
        fontSize={0.3}
        color={hovered ? "#FFFFFF" : "#48CAE4"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}
