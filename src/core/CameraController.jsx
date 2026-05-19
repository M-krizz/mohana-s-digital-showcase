import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useAppStore } from '../store/useAppStore';
import { sections } from '../config/sections';

export default function CameraController() {
  const { camera } = useThree();
  const sectionIndex = useAppStore((state) => state.sectionIndex);
  const setIsTransitioning = useAppStore((state) => state.setIsTransitioning);
  const lookAtRef = useRef({ x: 0, y: 1.6, z: -5 });
  const mouse = useRef({ x: 0, y: 0 });
  const timelineRef = useRef(null);

  useEffect(() => {
    const target = sections[sectionIndex];
    if (!target) return;

    // Kill any in-progress animations
    if (timelineRef.current) timelineRef.current.kill();

    setIsTransitioning(true);

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // 1. Brief anticipation pull-back
    tl.to(camera.position, {
      z: camera.position.z + 0.3,
      duration: 0.25,
      ease: 'power2.out',
    });

    // 2. High-speed cinematic flight
    tl.to(
      camera.position,
      {
        x: target.position[0],
        y: target.position[1],
        z: target.position[2],
        duration: 1.4,
        ease: 'power4.inOut',
        onComplete: () => {
          setIsTransitioning(false);
        },
      },
      '-=0.1'
    );

    // 3. FOV warp speed effect
    gsap.to(camera, {
      fov: 85,
      duration: 0.7,
      ease: 'power2.in',
      onUpdate: () => camera.updateProjectionMatrix(),
      onComplete: () => {
        gsap.to(camera, {
          fov: 50,
          duration: 0.9,
          ease: 'power2.out',
          onUpdate: () => camera.updateProjectionMatrix(),
        });
      },
    });

    // 4. Animate lookAt target in sync with flight
    tl.to(
      lookAtRef.current,
      {
        x: target.lookAt[0],
        y: target.lookAt[1],
        z: target.lookAt[2],
        duration: 1.5,
        ease: 'power4.inOut',
        onUpdate: () => {
          camera.lookAt(
            lookAtRef.current.x,
            lookAtRef.current.y,
            lookAtRef.current.z
          );
        },
      },
      '<'
    );

    return () => {
      tl.kill();
    };
  }, [sectionIndex, camera, setIsTransitioning]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Idle parallax + breathing sway
  useFrame((state) => {
    const isTransitioning = useAppStore.getState().isTransitioning;
    if (isTransitioning) return;

    const sec = sections[sectionIndex];
    if (!sec) return;

    const t = state.clock.elapsedTime;
    const breatheX = Math.sin(t * 0.3) * 0.04;
    const breatheY = Math.cos(t * 0.2) * 0.03;

    const targetX = sec.position[0] + mouse.current.x * 0.4 + breatheX;
    const targetY = sec.position[1] - mouse.current.y * 0.3 + breatheY;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);

    // Subtle idle roll
    const targetRoll = Math.sin(t * 0.15) * 0.003;
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRoll, 0.02);

    camera.lookAt(
      lookAtRef.current.x,
      lookAtRef.current.y,
      lookAtRef.current.z
    );
  });

  return null;
}
