import React from 'react';
import { Edges } from '@react-three/drei';
import { sections } from '../../config/sections';
import { useSketchTexture } from '../../utils/sketchTextures';
import WallContent from '../WallContent';
import RoomDecor from '../RoomDecor';

const skills = sections.find((section) => section.name === 'skills');

export default function SkillsRoom() {
  const floorTexture = useSketchTexture({ scale: 5, rotation: 0.1 });
  const wallTexture = useSketchTexture({ scale: 6, rotation: 0.28, lineColor: '#d0c8bd' });
  if (!skills) return null;

  return (
    <group position={skills.roomPosition}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial map={floorTexture} color="#f6f2ea" roughness={0.98} />
      </mesh>

      <mesh position={[0, 1.7, -2.2]}>
        <boxGeometry args={[10.4, 6, 0.6]} />
        <meshStandardMaterial map={wallTexture} color="#fdfbf7" roughness={0.9} />
        <Edges color="#2b2723" />
      </mesh>


      <RoomDecor />

      <WallContent sectionName="skills" position={[0, 1.6, -2.05]} />
    </group>
  );
}
