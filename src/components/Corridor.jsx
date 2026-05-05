import React from 'react';
import { Edges, Text } from '@react-three/drei';
import { sections } from '../config/sections';
import { useSketchTexture } from '../utils/sketchTextures';

export default function Corridor() {
  const length = 190;
  const centerZ = -40;
  const floorTexture = useSketchTexture({ scale: 6, rotation: 0.08 });
  const wallTexture = useSketchTexture({ scale: 8, rotation: 0.22, lineColor: '#cec7bc' });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, centerZ]} receiveShadow>
        <planeGeometry args={[24, length]} />
        <meshStandardMaterial
          map={floorTexture}
          color="#f7f4ee"
          roughness={0.98}
          metalness={0}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, centerZ]}>
        <planeGeometry args={[24, length]} />
        <meshStandardMaterial map={wallTexture} color="#faf7f2" roughness={0.95} metalness={0} />
      </mesh>

      <mesh position={[-10.5, 3, centerZ]}>
        <boxGeometry args={[0.6, 6, length]} />
        <meshStandardMaterial map={wallTexture} color="#efe9df" roughness={0.9} metalness={0} />
        <Edges color="#2a2622" />
      </mesh>
      <mesh position={[10.5, 3, centerZ]}>
        <boxGeometry args={[0.6, 6, length]} />
        <meshStandardMaterial map={wallTexture} color="#efe9df" roughness={0.9} metalness={0} />
        <Edges color="#2a2622" />
      </mesh>

      <mesh position={[-9.2, 0.04, centerZ]}>
        <boxGeometry args={[0.12, 0.05, length]} />
        <meshStandardMaterial
          color="#ece7df"
          emissive="#cfc8bd"
          emissiveIntensity={0.12}
          roughness={0.8}
        />
      </mesh>
      <mesh position={[9.2, 0.04, centerZ]}>
        <boxGeometry args={[0.12, 0.05, length]} />
        <meshStandardMaterial
          color="#ece7df"
          emissive="#cfc8bd"
          emissiveIntensity={0.12}
          roughness={0.8}
        />
      </mesh>

      {sections.map((section) => {
        const frameZ = section.position[2] - 2;
        return (
          <group key={section.id}>
            <mesh position={[-6.6, 2.2, frameZ]}>
              <boxGeometry args={[0.3, 4.8, 0.5]} />
              <meshStandardMaterial map={wallTexture} color="#f4efe7" roughness={0.8} metalness={0} />
              <Edges color="#2f2b26" />
            </mesh>
            <mesh position={[6.6, 2.2, frameZ]}>
              <boxGeometry args={[0.3, 4.8, 0.5]} />
              <meshStandardMaterial map={wallTexture} color="#f4efe7" roughness={0.8} metalness={0} />
              <Edges color="#2f2b26" />
            </mesh>
            <mesh position={[0, 4.6, frameZ]}>
              <boxGeometry args={[13.8, 0.3, 0.5]} />
              <meshStandardMaterial map={wallTexture} color="#f4efe7" roughness={0.8} metalness={0} />
              <Edges color="#2f2b26" />
            </mesh>
            <mesh position={[0, 0.12, frameZ]}>
              <boxGeometry args={[3.2, 0.04, 1.6]} />
              <meshStandardMaterial
                color="#efeae2"
                emissive="#cfc8bd"
                emissiveIntensity={0.12}
                roughness={0.6}
              />
            </mesh>
            <Text
              position={[0, 3.4, frameZ + 0.4]}
              fontSize={0.35}
              color="#2e2b27"
              letterSpacing={0.25}
            >
              {section.label.toUpperCase()}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
