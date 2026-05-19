import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../store/useAppStore';
import { sections } from '../../config/sections';
import { Float, Edges } from '@react-three/drei';

const TUNNEL_LENGTH = 80;
const TUNNEL_RADIUS = 5;
const TUNNEL_CENTER = -35;

export default function SpaceshipCorridor() {
  const sectionIndex = useAppStore((state) => state.sectionIndex);
  const hullGeometry = useMemo(
    () => new THREE.CylinderGeometry(TUNNEL_RADIUS, TUNNEL_RADIUS, TUNNEL_LENGTH, 8, 1, true),
    []
  );

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
          <meshStandardMaterial
            color="#48CAE4"
            emissive="#48CAE4"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* ── INTERACTIVE SECTION HUBS ── */}
      {sections.map((sec, i) => (
        <SectionHub
          key={sec.id}
          section={sec}
          isActive={sectionIndex === i}
        />
      ))}

      {/* ── ENGINE CORE LIGHT ── */}
      <pointLight position={[0, 0, -75]} color="#FF006E" intensity={15} distance={30} />
      <mesh position={[0, 0, -79]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial
          color="#FF006E"
          emissive="#FF006E"
          emissiveIntensity={5}
          toneMapped={false}
        />
      </mesh>

      {/* ── STARFIELD ── */}
      <Stars count={2000} radius={100} depth={50} />

      {/* ── PARTICLES & EFFECTS ── */}
      <DustParticles count={150} />
      <SpeedLines count={30} />

      {/* ── DECORATIVE FLOATING SHAPES ── */}
      <FloatingTech count={10} />

      {/* ── PULSING ENERGY BEAM ── */}
      <EnergyBeam />
    </group>
  );
}

/* ─── SECTION HUB ─── */
function SectionHub({ section, isActive }) {
  const z = section.position[2];

  const dotPositions = useMemo(() =>
    Array.from({ length: 6 }, () => [
      (Math.random() - 0.5) * 1.5,
      (Math.random() - 0.5) * 0.8,
    ]),
    []
  );

  return (
    <group position={[0, 0, z]}>
      {isActive && (
        <>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[TUNNEL_RADIUS - 1, 1, 0]}>
              <octahedronGeometry args={[0.2]} />
              <meshStandardMaterial color="#48CAE4" emissive="#48CAE4" emissiveIntensity={3} toneMapped={false} />
            </mesh>
          </Float>
          <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[-(TUNNEL_RADIUS - 1), 2, -1]}>
              <boxGeometry args={[0.1, 0.3, 0.1]} />
              <meshStandardMaterial color="#48CAE4" emissive="#48CAE4" emissiveIntensity={2} toneMapped={false} />
            </mesh>
          </Float>
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <mesh position={[2, 3, 0.5]}>
              <tetrahedronGeometry args={[0.15]} />
              <meshStandardMaterial color="#A78BFA" emissive="#A78BFA" emissiveIntensity={2} toneMapped={false} />
            </mesh>
          </Float>
        </>
      )}

      <pointLight position={[0, 2, 0]} color="#48CAE4" intensity={isActive ? 8 : 2} distance={12} />
      {isActive && <pointLight position={[0, -1, 0]} color="#7B61FF" intensity={3} distance={8} />}

      {[-4.8, 4.8].map((x, side) => (
        <group key={side} position={[x, 1.5, 0]} rotation={[0, side === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
          <mesh>
            <planeGeometry args={[2, 1.2]} />
            <meshStandardMaterial
              color="#48CAE4" emissive="#48CAE4"
              emissiveIntensity={isActive ? 1 : 0.3}
              transparent opacity={isActive ? 0.2 : 0.05}
              side={THREE.DoubleSide}
            />
          </mesh>
          {dotPositions.map(([dx, dy], dot) => (
            <mesh key={dot} position={[dx, dy, 0.01]}>
              <planeGeometry args={[0.05, 0.05]} />
              <meshStandardMaterial color="#48CAE4" emissive="#48CAE4" emissiveIntensity={2} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ─── AIRLOCK GATE FRAME ─── */
function SectionRing({ z }) {
  const nodesRef = useRef([]);
  const W = 3.8;   // half-width of gate
  const H = 3.2;   // half-height of gate
  const BEAM = 0.06; // beam thickness

  useFrame((state) => {
    const pulse = 0.4 + Math.sin(state.clock.elapsedTime * 1.5 + z) * 0.6;
    nodesRef.current.forEach((m) => {
      if (m) m.material.emissiveIntensity = pulse * 3;
    });
  });

  const beamMat = (
    <meshStandardMaterial
      color="#1a2a4a" emissive="#48CAE4"
      emissiveIntensity={0.6} metalness={0.9} roughness={0.3}
      transparent opacity={0.7}
    />
  );

  const nodeMat = (
    <meshStandardMaterial
      color="#48CAE4" emissive="#48CAE4"
      emissiveIntensity={2} toneMapped={false}
    />
  );

  // Corner positions
  const corners = [
    [-W, H], [W, H], [W, -H + 1], [-W, -H + 1],
  ];

  return (
    <group position={[0, 0, z - 5]}>
      {/* Horizontal beams (top + bottom) */}
      <mesh position={[0, H, 0]}>
        <boxGeometry args={[W * 2, BEAM, BEAM]} />
        {beamMat}
      </mesh>
      <mesh position={[0, -H + 1, 0]}>
        <boxGeometry args={[W * 2, BEAM, BEAM]} />
        {beamMat}
      </mesh>
      {/* Vertical beams (left + right) */}
      <mesh position={[-W, (H + (-H + 1)) / 2, 0]}>
        <boxGeometry args={[BEAM, H + H - 1, BEAM]} />
        {beamMat}
      </mesh>
      <mesh position={[W, (H + (-H + 1)) / 2, 0]}>
        <boxGeometry args={[BEAM, H + H - 1, BEAM]} />
        {beamMat}
      </mesh>
      {/* Glowing corner nodes */}
      {corners.map(([cx, cy], i) => (
        <mesh key={i} position={[cx, cy, 0]} ref={(el) => (nodesRef.current[i] = el)}>
          <sphereGeometry args={[0.08, 8, 8]} />
          {nodeMat}
        </mesh>
      ))}
      {/* Faint center accent light */}
      <pointLight position={[0, 1, 0]} color="#48CAE4" intensity={1.5} distance={6} />
    </group>
  );
}

/* ─── ENERGY BEAM ─── */
function EnergyBeam() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    meshRef.current.material.emissiveIntensity = pulse * 2;
    meshRef.current.material.opacity = 0.1 + pulse * 0.1;
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, TUNNEL_CENTER]}>
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

/* ─── FLOATING TECH ─── */
function FloatingTech({ count = 10 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const items = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
        z: Math.random() * -70,
        scale: 0.1 + Math.random() * 0.3,
        rotSpeed: 0.005 + Math.random() * 0.01,
        rotX: 0,
        rotY: 0,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    items.forEach((item, i) => {
      item.rotX += item.rotSpeed;
      item.rotY += item.rotSpeed;
      dummy.position.set(item.x, item.y, item.z);
      dummy.rotation.set(item.rotX, item.rotY, 0);
      dummy.scale.setScalar(item.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#48CAE4"
        emissive="#48CAE4"
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </instancedMesh>
  );
}

/* ─── ASTEROIDS ─── */
function Asteroids({ count = 40 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const asteroids = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 15 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      temp.push({
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 40,
        z: Math.random() * -100,
        scale: 0.5 + Math.random() * 2.5,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    asteroids.forEach((a, i) => {
      a.rotation[0] += a.rotationSpeed;
      a.rotation[1] += a.rotationSpeed;
      dummy.position.set(a.x, a.y, a.z);
      dummy.rotation.set(a.rotation[0], a.rotation[1], a.rotation[2]);
      dummy.scale.setScalar(a.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#444" roughness={0.9} />
    </instancedMesh>
  );
}

/* ─── DUST PARTICLES ─── */
function DustParticles({ count = 150 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
        z: Math.random() * -80,
        speed: 0.02 + Math.random() * 0.05,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    const isTransitioning = useAppStore.getState().isTransitioning;
    particles.forEach((p, i) => {
      const currentSpeed = isTransitioning ? p.speed * 12 : p.speed;
      p.z += currentSpeed;
      if (p.z > 5) p.z = -75;
      dummy.position.set(p.x, p.y, p.z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.015, 6, 6]} />
      <meshStandardMaterial
        color="#48CAE4"
        emissive="#48CAE4"
        emissiveIntensity={3}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}

/* ─── SPEED LINES ─── */
function SpeedLines({ count = 30 }) {
  const meshRef = useRef();
  const opacityRef = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 4.5;
      const angle = Math.random() * Math.PI * 2;
      temp.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * -80,
        speed: 0.5 + Math.random() * 0.5,
        length: 2 + Math.random() * 5,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const isTransitioning = useAppStore.getState().isTransitioning;
    const targetOpacity = isTransitioning ? 0.6 : 0.3;
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, 0.1);

    // Update material opacity directly (no React re-render)
    meshRef.current.material.opacity = opacityRef.current;

    if (opacityRef.current < 0.01) return;

    lines.forEach((line, i) => {
      const speedMulti = isTransitioning ? 6 : 1;
      line.z += line.speed * speedMulti;
      
      // Loop relative to camera position
      if (line.z > state.camera.position.z + 10) {
        line.z = state.camera.position.z - 80;
      }
      
      dummy.position.set(line.x, line.y, line.z);
      
      // Warp speed stretch effect
      const currentLength = isTransitioning ? line.length * 4 : line.length;
      dummy.scale.set(1, 1, currentLength);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
      <boxGeometry args={[0.04, 0.04, 2]} />
      <meshStandardMaterial
        color="#48CAE4"
        emissive="#48CAE4"
        emissiveIntensity={5}
        transparent
        opacity={0}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

/* ─── STARS ─── */
function Stars({ count = 2000, radius = 100, depth = 50 }) {
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const r = radius + Math.random() * depth;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    return new Float32Array(pos);
  }, [count, radius, depth]);

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="white"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
