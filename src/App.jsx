import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneManager from './core/SceneManager';
import CameraController from './core/CameraController';
import Overlay from './components/ui/Overlay';
import Cursor from './components/Cursor';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { useAppStore } from './store/useAppStore';
import gsap from 'gsap';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import './styles.css';

export default function App() {
  useScrollNavigation();

  return (
    <>
      <Cursor />
      
      {/* 3D Render Layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 1.6, 5], fov: 60 }} dpr={[1, 1.5]}>
          <color attach="background" args={['#05070a']} />
          <Suspense fallback={null}>
            <SceneManager />
            <CameraController />
            
            {/* Cinematic Post-Processing */}
            <PostProcessingEffects />
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

function PostProcessingEffects() {
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const [aberration, setAberration] = React.useState([0, 0]);

  React.useEffect(() => {
    if (isTransitioning) {
      gsap.to({ val: 0 }, {
        val: 0.005,
        duration: 0.5,
        onUpdate: function() { setAberration([this.targets()[0].val, this.targets()[0].val]); }
      });
    } else {
      gsap.to({ val: aberration[0] }, {
        val: 0,
        duration: 0.8,
        onUpdate: function() { setAberration([this.targets()[0].val, this.targets()[0].val]); }
      });
    }
  }, [isTransitioning]);

  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} intensity={1.5} />
      <Noise opacity={0.05} />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
      <ChromaticAberration offset={aberration} radial={false} />
    </EffectComposer>
  );
}
