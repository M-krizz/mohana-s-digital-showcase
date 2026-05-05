import React, { useEffect } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import SceneContainer from '../components/SceneContainer';
import FrontWall from '../components/FrontWall';
import Workspace from '../components/Workspace';
import Cursor from '../components/Cursor';
import { content } from '../content';

export default function Home() {
  useEffect(() => {
    // Entrance Animations
    const tl = createTimeline({
      defaults: { easing: 'easeOutExpo' }
    });

    // Reveal Line Masks (itomdev style)
    tl.add('.hub-header .li', {
      translateY: ['110%', '0%'],
      duration: 1200,
      delay: stagger(100, { start: 500 })
    })
    .add('.hub-panel', {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      delay: stagger(200)
    }, '-=800')
    .add('.hub-panel .li', {
      translateY: ['110%', '0%'],
      duration: 800,
      delay: stagger(50)
    }, '-=1000')
    .add('.workspace-container', {
      opacity: [0, 1],
      translateX: [100, 0],
      duration: 1000,
    }, '-=800');

    // Idle Animations
    animate('.icon-bulb', {
      translateY: [-5, 5],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 2000
    });

    animate('.avatar-img', {
      translateY: [-3, 3],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 3000
    });
  }, []);

  return (
    <>
      <Cursor />
      <SceneContainer>
        <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <FrontWall content={content} />
          <Workspace />
        </div>
      </SceneContainer>
    </>
  );
}