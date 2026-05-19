import React, { Suspense, lazy, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

const SceneManager = lazy(() => import('./core/SceneManager'));
const CameraController = lazy(() => import('./core/CameraController'));
import Overlay from './components/ui/Overlay';
import Cursor from './components/Cursor';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { useAppStore } from './store/useAppStore';
import gsap from 'gsap';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import './styles.css';

/* ─── LOADING SCREEN ─── */
function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => setHidden(true), 900);
      return () => clearTimeout(timer);
    }
  }, [ready]);

  if (hidden) return null;

  return (
    <div className={`loading-screen ${ready ? 'hidden' : ''}`}>
      <div className="loading-grid" ref={gridRef} />
      <div className="loading-rings">
        <div className="loading-ring ring-1" />
        <div className="loading-ring ring-2" />
      </div>
      <div className="loading-logo">MK</div>
      <p className="loading-tagline">Creative Developer</p>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" />
      </div>
    </div>
  );
}

/* ─── POST-PROCESSING ─── */
function PostProcessingEffects() {
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const aberrationRef = useRef();

  useEffect(() => {
    if (!aberrationRef.current) return;

    if (isTransitioning) {
      gsap.to({ val: 0 }, {
        val: 0.004,
        duration: 0.4,
        onUpdate: function () {
          if (aberrationRef.current) {
            aberrationRef.current.offset.set(this.targets()[0].val, this.targets()[0].val);
          }
        },
      });
    } else {
      gsap.to({ val: aberrationRef.current.offset.x }, {
        val: 0,
        duration: 0.7,
        onUpdate: function () {
          if (aberrationRef.current) {
            aberrationRef.current.offset.set(this.targets()[0].val, this.targets()[0].val);
          }
        },
      });
    }
  }, [isTransitioning]);

  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={200} intensity={1.2} />
      <Noise opacity={0.04} />
      <Vignette eskil={false} offset={0.1} darkness={0.45} />
      <ChromaticAberration ref={aberrationRef} offset={[0, 0]} radial={false} />
    </EffectComposer>
  );
}

/* ─── APP ─── */
export default function App() {
  useScrollNavigation();

  return (
    <>
      <LoadingScreen />
      <Cursor />

      {/* 3D Render Layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 1.6, 5], fov: 50 }} dpr={[1, 1.5]}>
          <color attach="background" args={['#05070a']} />
          <Suspense fallback={null}>
            <SceneManager />
            <CameraController />
            <PostProcessingEffects />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML UI Layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10, pointerEvents: 'none' }}>
        <Overlay />
      </div>
    </>
  );
}
