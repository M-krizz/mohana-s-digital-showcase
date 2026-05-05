import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../store/useAppStore';
import { sections } from '../../config/sections';
import { Float, MeshDistortMaterial, Edges } from '@react-three/drei';

const TUNNEL_LENGTH = 80;
const TUNNEL_RADIUS = 5;
const TUNNEL_CENTER = -35;

export default function SpaceshipCorridor() {
  // Create octagonal geometry for the hull
  const hullGeometry = useMemo(() => new THREE.CylinderGeometry(TUNNEL_RADIUS, TUNNEL_RADIUS, TUNNEL_LENGTH, 8, 1, true), []);
  
  return (
    <group>
      {/* ── OUTER HULL (Octagonal Tube) ── */}
      <mesh 
        rotation={[Math.PI / 2, 0, Math.PI / 8]} 
        position={[0, 0, TUNNEL_CENTER]}
      >
        <primitive object={hullGeometry} />
        <meshStandardMaterial 
          color="#0a1525" 
          roughness={0.2} 
          metalness={0.9} 
          side={THREE.BackSide} 
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* ── INTERIOR SHIP DETAILS (Simplified) ── */}

      {/* ── FLOOR PLATES (Walking path) ── */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -TUNNEL_RADIUS + 0.1, TUNNEL_CENTER]}
        receiveShadow
      >
        <planeGeometry args={[4, TUNNEL_LENGTH]} />
        <meshStandardMaterial color="#05070a" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ── SIDE HOLOGRAPHIC PIPES ── */}
      {[-3.5, 3.5].map((x, i) => (
        <mesh key={i} position={[x, 0, TUNNEL_CENTER]}>
          <boxGeometry args={[0.1, 0.1, TUNNEL_LENGTH]} />
          <meshStandardMaterial color="#48CAE4" emissive="#48CAE4" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* ── INTERACTIVE SECTION HUBS (At each section Z) ── */}
      {sections.map((sec, i) => {
        const z = sec.position[2];
        return (
          <group key={sec.id} position={[0, 0, z]}>
            
            {/* Floating floating tech bits */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <mesh position={[TUNNEL_RADIUS - 1, 1, 0]}>
                <octahedronGeometry args={[0.2]} />
                <meshStandardMaterial color="#48CAE4" emissive="#48CAE4" emissiveIntensity={2} />
              </mesh>
            </Float>
            <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <mesh position={[-(TUNNEL_RADIUS - 1), 2, -1]}>
                <boxGeometry args={[0.1, 0.3, 0.1]} />
                <meshStandardMaterial color="#48CAE4" emissive="#48CAE4" emissiveIntensity={1} />
              </mesh>
            </Float>

            {/* Hub Area Lighting */}
            <pointLight position={[0, 2, 0]} color="#48CAE4" intensity={4} distance={10} />

            {/* Holographic Wall Panels */}
            {[-4.8, 4.8].map((x, side) => (
              <group key={side} position={[x, 1.5, 0]} rotation={[0, side === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
                <mesh>
                  <planeGeometry args={[2, 1.2]} />
                  <meshStandardMaterial 
                    color="#48CAE4" 
                    emissive="#48CAE4" 
                    emissiveIntensity={0.5} 
                    transparent 
                    opacity={0.1} 
                    side={THREE.DoubleSide}
                  />
                </mesh>
                {/* Panel Frame */}
                <Edges color="#48CAE4" />
                {/* Small data dots on panel */}
                {Array.from({ length: 6 }).map((_, dot) => (
                  <mesh key={dot} position={[(Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 0.8, 0.01]}>
                    <planeGeometry args={[0.05, 0.05]} />
                    <meshStandardMaterial color="#48CAE4" emissive="#48CAE4" emissiveIntensity={2} />
                  </mesh>
                ))}
              </group>
            ))}
          </group>
        );
      })}

      {/* ── ENGINE CORE LIGHT (At the end of the ship) ── */}
      <pointLight position={[0, 0, -75]} color="#FF006E" intensity={15} distance={30} />
      <mesh position={[0, 0, -79]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#FF006E" emissive="#FF006E" emissiveIntensity={5} toneMapped={false} />
      </mesh>

      {/* ── STARFIELD BACKGROUND (Simulated with points) ── */}
      <Stars count={5000} radius={100} depth={50} factor={4} saturation={0} fade speed={1} />

      {/* ── INTERNAL DUST & SPEED EFFECTS (The "Magic") ── */}
      <DustParticles count={300} />
      <SpeedLines />

      {/* ── EXTERNAL ASTEROID BELT ── */}
      <Asteroids count={80} />

      {/* ── DECORATIVE FLOATING SHAPES ── */}
      <FloatingTech count={12} />

      {/* ── PULSING ENERGY BEAMS ── */}
      <EnergyBeams />
    </group>
  );
}

function EnergyBeams() {
  const mesh = useRef();
  useFrame((state) => {
    // Pulse intensity
    const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    mesh.current.material.emissiveIntensity = pulse * 2;
    mesh.current.material.opacity = 0.1 + pulse * 0.1;
  });

  return (
    <mesh ref={mesh} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, TUNNEL_CENTER]}>
      <cylinderGeometry args={[0.05, 0.05, TUNNEL_LENGTH, 8]} />
      <meshStandardMaterial 
        color="#48CAE4" 
        emissive="#48CAE4" 
        transparent 
        opacity={0.2} 
        toneMapped={false} 
      />
    </mesh>
  );
}

function FloatingTech({ count = 12 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tech = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = Math.random() * -70;
      const scale = 0.1 + Math.random() * 0.3;
      const rotSpeed = 0.005 + Math.random() * 0.01;
      temp.push({ x, y, z, scale, rotSpeed });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    tech.forEach((item, i) => {
      dummy.position.set(item.x, item.y, item.z);
      dummy.rotation.x += item.rotSpeed;
      dummy.rotation.y += item.rotSpeed;
      dummy.scale.set(item.scale, item.scale, item.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#48CAE4" emissive="#48CAE4" emissiveIntensity={0.5} transparent opacity={0.4} />
    </instancedMesh>
  );
}

function Asteroids({ count = 80 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const asteroids = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 15 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 40;
      const z = Math.random() * -100;
      const scale = 0.5 + Math.random() * 2.5;
      const rotationSpeed = (Math.random() - 0.5) * 0.01;
      temp.push({ x, y, z, scale, rotationSpeed, rotation: [Math.random(), Math.random(), Math.random()] });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    asteroids.forEach((asteroid, i) => {
      let { x, y, z, scale, rotationSpeed, rotation } = asteroid;
      asteroid.rotation[0] += rotationSpeed;
      asteroid.rotation[1] += rotationSpeed;
      
      dummy.position.set(x, y, z);
      dummy.rotation.set(rotation[0], rotation[1], rotation[2]);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#444" roughness={0.9} />
    </instancedMesh>
  );
}

function DustParticles({ count = 300 }) {
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 8;
      const z = Math.random() * -80;
      const speed = 0.02 + Math.random() * 0.05;
      temp.push({ x, y, z, speed });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    particles.forEach((particle, i) => {
      let { x, y, z, speed } = particle;
      // High speed multiplier during transition
      const currentSpeed = isTransitioning ? speed * 12 : speed;
      z += currentSpeed;
      if (z > 5) z = -75;
      particle.z = z;
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.015, 8, 8]} />
      <meshStandardMaterial color="#48CAE4" emissive="#48CAE4" emissiveIntensity={3} transparent opacity={0.5} />
    </instancedMesh>
  );
}

function SpeedLines({ count = 40 }) {
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 4.5;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.random() * -80;
      const speed = 0.5 + Math.random() * 0.5;
      const length = 2 + Math.random() * 5;
      temp.push({ x, y, z, speed, length });
    }
    return temp;
  }, [count]);

  const [opacity, setOpacity] = React.useState(0);

  useFrame((state, delta) => {
    // Fade lines in/out based on transition state
    const targetOpacity = isTransitioning ? 0.8 : 0;
    const newOpacity = THREE.MathUtils.lerp(opacity, targetOpacity, 0.1);
    setOpacity(newOpacity);

    if (newOpacity < 0.01) return;

    lines.forEach((line, i) => {
      let { x, y, z, speed, length } = line;
      z += speed;
      if (z > 5) z = -75;
      line.z = z;
      dummy.position.set(x, y, z);
      dummy.scale.set(1, 1, length);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <boxGeometry args={[0.02, 0.02, 1]} />
      <meshStandardMaterial 
        color="#48CAE4" 
        emissive="#48CAE4" 
        emissiveIntensity={10} 
        transparent 
        opacity={opacity} 
        toneMapped={false}
      />
    </instancedMesh>
  );
}

// Minimal Stars implementation since we don't want to import heavy dependencies if not needed
function Stars({ count = 5000, radius = 100, depth = 50, factor = 4, saturation = 0, fade = true, speed = 1 }) {
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const r = radius + Math.random() * depth;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    }
    return new Float32Array(pos);
  }, [count, radius, depth]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="white" transparent opacity={0.6} sizeAttenuation={true} />
    </points>
  );
}
