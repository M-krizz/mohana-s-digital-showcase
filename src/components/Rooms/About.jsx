import React from 'react';
import { Edges } from '@react-three/drei';
import { sections } from '../../config/sections';
import { useSketchTexture } from '../../utils/sketchTextures';
import WallContent from '../WallContent';
import RoomDecor from '../RoomDecor';

const about = sections.find((section) => section.name === 'about');

export default function AboutRoom() {
  const floorTexture = useSketchTexture({ scale: 5, rotation: 0.1 });
  const wallTexture = useSketchTexture({ scale: 6, rotation: 0.3, lineColor: '#d0c8bd' });
  if (!about) return null;

  return (
    <group position={about.roomPosition}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial map={floorTexture} color="#f6f2ea" roughness={0.98} />
      </mesh>
      <mesh position={[0, 1.7, -2.2]}>
        <boxGeometry args={[10.4, 6, 0.6]} />
        <meshStandardMaterial map={wallTexture} color="#fdfbf7" emissive="#cfc8bd" emissiveIntensity={0.04} />
        <Edges color="#2b2723" />
      </mesh>
      <RoomDecor />
      <WallContent sectionName="about" position={[0, 1.6, -2.05]} />
    </group>
  );
}
