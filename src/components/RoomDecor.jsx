import React from 'react';
import { Edges } from '@react-three/drei';
import { useSketchTexture } from '../utils/sketchTextures';

export default function RoomDecor() {
  const wood = useSketchTexture({ scale: 4, rotation: 0.2, lineColor: '#b8b1a6' });
  const soft = useSketchTexture({ scale: 5, rotation: 0.12, lineColor: '#c9c1b5' });

  return (
    <group>
      <group position={[-4.6, 1.2, -0.6]}>
        <mesh>
          <boxGeometry args={[1.4, 2.8, 0.5]} />
          <meshStandardMaterial map={wood} color="#f3eee6" roughness={0.9} />
          <Edges color="#2b2723" />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[1.2, 0.2, 0.45]} />
          <meshStandardMaterial map={wood} color="#f7f2eb" roughness={0.9} />
          <Edges color="#2b2723" />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[1.2, 0.2, 0.45]} />
          <meshStandardMaterial map={wood} color="#f7f2eb" roughness={0.9} />
          <Edges color="#2b2723" />
        </mesh>
      </group>

      <group position={[-5.6, 0.45, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.22, 0.3, 24]} />
          <meshStandardMaterial map={soft} color="#f0ece6" roughness={0.8} />
          <Edges color="#2b2723" />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.28, 20, 20]} />
          <meshStandardMaterial color="#5fb58c" roughness={0.6} />
          <Edges color="#2b2723" />
        </mesh>
      </group>

      <group position={[4.8, 0.9, -0.4]}>
        <mesh>
          <boxGeometry args={[2.4, 0.2, 1.1]} />
          <meshStandardMaterial map={wood} color="#f5f0e8" roughness={0.85} />
          <Edges color="#2b2723" />
        </mesh>
        <mesh position={[0.8, -0.6, 0]}
        >
          <boxGeometry args={[0.2, 1.2, 0.2]} />
          <meshStandardMaterial map={wood} color="#f5f0e8" roughness={0.85} />
          <Edges color="#2b2723" />
        </mesh>
        <mesh position={[-0.8, -0.6, 0]}
        >
          <boxGeometry args={[0.2, 1.2, 0.2]} />
          <meshStandardMaterial map={wood} color="#f5f0e8" roughness={0.85} />
          <Edges color="#2b2723" />
        </mesh>
      </group>

      <group position={[4.6, 1.45, -0.2]}>
        <mesh>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial color="#f0d7c2" roughness={0.7} />
          <Edges color="#2b2723" />
        </mesh>
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.22, 0.26, 0.6, 20]} />
          <meshStandardMaterial color="#f7f3ed" roughness={0.8} />
          <Edges color="#2b2723" />
        </mesh>
      </group>

      <mesh position={[5.4, 2.4, -1.4]}>
        <planeGeometry args={[1.2, 1.5]} />
        <meshStandardMaterial map={soft} color="#fdfbf7" roughness={0.9} />
        <Edges color="#2b2723" />
      </mesh>
    </group>
  );
}