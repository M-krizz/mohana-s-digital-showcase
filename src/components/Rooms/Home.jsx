import React from 'react';
import { Edges } from '@react-three/drei';
import { sections } from '../../config/sections';
import { useSketchTexture } from '../../utils/sketchTextures';
import WallContent from '../WallContent';
import RoomDecor from '../RoomDecor';

const home = sections.find((section) => section.name === 'home');

export default function HomeRoom() {
  const floorTexture = useSketchTexture({ scale: 5, rotation: 0.12 });
  const wallTexture = useSketchTexture({ scale: 7, rotation: 0.35, lineColor: '#d0c8bd' });
  if (!home) return null;

  return (
    <group position={home.roomPosition}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial map={floorTexture} color="#f6f2ea" roughness={0.98} />
      </mesh>

      <mesh position={[0, 1.7, -2.2]}>
        <boxGeometry args={[10.4, 6, 0.6]} />
        <meshStandardMaterial map={wallTexture} color="#fdfbf7" roughness={0.85} />
        <Edges color="#2b2723" />
      </mesh>

      <RoomDecor />

      <WallContent sectionName="home" position={[0, 1.6, -2.05]} />
    </group>
  );
}
