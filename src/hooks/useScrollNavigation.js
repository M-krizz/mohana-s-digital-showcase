import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useScrollNavigation() {
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const nextSection = useAppStore((state) => state.nextSection);
  const prevSection = useAppStore((state) => state.prevSection);
  
  const scrollAcc = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    const handleWheel = (e) => {
      // Don't interrupt a transition in progress
      if (isTransitioning) return;
      
      const now = Date.now();
      // Shorter cooldown for better responsiveness
      if (now - lastScrollTime.current < 200) {
        scrollAcc.current += e.deltaY;
        return;
      }

      // Threshold check
      if (Math.abs(e.deltaY) < 10) return;

      if (e.deltaY > 20) {
        nextSection();
        lastScrollTime.current = now;
      } else if (e.deltaY < -20) {
        prevSection();
        lastScrollTime.current = now;
      }
    };

    // Add touch support for smoother mobile/trackpad experience
    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e) => {
      if (isTransitioning) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSection();
        else prevSection();
        lastScrollTime.current = Date.now();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isTransitioning, nextSection, prevSection]);
}
