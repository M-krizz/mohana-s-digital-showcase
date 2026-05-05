import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useAppStore } from '../store/useAppStore';
import { sections } from '../config/sections';

export default function CameraRig() {
  const { camera } = useThree();
  const section = useAppStore((state) => state.section);
  const lookAtRef = useRef({ x: 0, y: 1.7, z: 0 });

  useEffect(() => {
    const target = sections.find((s) => s.id === section);
    if (!target) return;

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(lookAtRef.current);

    gsap.to(camera.position, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      duration: 1.8,
      ease: 'power3.inOut',
    });

    gsap.to(lookAtRef.current, {
      x: target.lookAt[0],
      y: target.lookAt[1],
      z: target.lookAt[2],
      duration: 1.4,
      ease: 'power3.inOut',
      onUpdate: () => {
        camera.lookAt(lookAtRef.current.x, lookAtRef.current.y, lookAtRef.current.z);
      },
    });
  }, [camera, section]);

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime();
    const floatY = Math.sin(t * 0.4) * 0.02;
    const offsetX = pointer.x * 0.12;
    const offsetY = pointer.y * 0.08;
    camera.lookAt(
      lookAtRef.current.x + offsetX,
      lookAtRef.current.y + offsetY + floatY,
      lookAtRef.current.z
    );
  });

  return null;
}
