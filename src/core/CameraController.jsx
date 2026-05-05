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
  const lookAtRef = useRef({ x: 0, y: 1.6, z: -5 }); // initial lookAt for home

  useEffect(() => {
    const target = sections[sectionIndex];
    if (!target) return;

    setIsTransitioning(true);

    const tl = gsap.timeline();
    
    // Set transitioning state
    setIsTransitioning(true);

    // 1. Brief 'Pull Back' anticipation
    tl.to(camera.position, {
      z: camera.position.z + 0.4,
      duration: 0.3,
      ease: 'power2.out'
    });

    // 2. Main High-Speed Flight
    tl.to(camera.position, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      duration: 1.6,
      ease: 'expo.inOut',
      onUpdate: () => {
        // Trigger UI entrance early (at 80% of the way)
        if (tl.progress() > 0.8 && useAppStore.getState().isTransitioning) {
          setIsTransitioning(false);
        }
      }
    }, "-=0.1");

    // FOV Zoom Effect
    gsap.to(camera, {
      fov: 65, // Slight zoom out during move for speed feel
      duration: 1,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(camera, {
          fov: 50, // Back to normal focus
          duration: 1,
          ease: 'power2.out',
        });
      },
      onUpdate: () => camera.updateProjectionMatrix()
    });

    // 3. Animate LookAt Target (Sync with flight)
    tl.to(lookAtRef.current, {
      x: target.lookAt[0],
      y: target.lookAt[1],
      z: target.lookAt[2],
      duration: 1.8,
      ease: 'expo.inOut',
      onUpdate: () => {
        camera.lookAt(lookAtRef.current.x, lookAtRef.current.y, lookAtRef.current.z);
      }
    }, "<");
  }, [sectionIndex, camera, setIsTransitioning]);

  // Mouse parallax state
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!setIsTransitioning) return; // Wait for initialization
    
    const isTransitioning = useAppStore.getState().isTransitioning;

    if (!isTransitioning) {
      // Subtle parallax movement when settled
      const targetX = sections[sectionIndex].position[0] + mouse.current.x * 0.5;
      const targetY = sections[sectionIndex].position[1] - mouse.current.y * 0.5;
      
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
      
      // Keep looking at the target even during parallax
      camera.lookAt(lookAtRef.current.x, lookAtRef.current.y, lookAtRef.current.z);
    }
  });

  return null; // Logic only, no render
}
