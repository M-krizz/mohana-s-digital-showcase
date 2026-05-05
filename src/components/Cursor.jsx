import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Immediate dot follow
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      // Smooth ring follow using anime
      animate(ring, {
        left: x,
        top: y,
        duration: 150,
        easing: 'easeOutQuad'
      });
    };

    const onMouseDown = () => {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    };

    const onMouseUp = () => {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    };

    const onMouseOver = (e) => {
      if (e.target.closest('button, a, .hub-icon-btn')) {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('button, a, .hub-icon-btn')) {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="c-dot" />
      <div ref={ringRef} className="c-ring" />
    </>
  );
};

export default Cursor;
