import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import CameraRig from './CameraRig';
import Lights from './Lights';
import HomeRoom from './Rooms/Home';
import AboutRoom from './Rooms/About';
import SkillsRoom from './Rooms/Skills';
import ProjectsRoom from './Rooms/Projects';
import ExperienceRoom from './Rooms/Experience';
import ContactRoom from './Rooms/Contact';

export default function Scene() {
  return (
    <Canvas className="scene-canvas" camera={{ position: [0, 2, 6], fov: 60 }} dpr={[1, 1.5]} shadows>
      <color attach="background" args={['#f4f1ea']} />
      <fog attach="fog" args={['#f4f1ea', 20, 95]} />
      <Suspense fallback={null}>
        <Lights />
        <CameraRig />
        <HomeRoom />
        <AboutRoom />
        <SkillsRoom />
        <ProjectsRoom />
        <ExperienceRoom />
        <ContactRoom />
        <EffectComposer>
          <Noise opacity={0.06} />
          <Vignette eskil={false} offset={0.2} darkness={0.35} />
        </EffectComposer>
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
