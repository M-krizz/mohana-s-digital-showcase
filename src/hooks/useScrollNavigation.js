import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useScrollNavigation() {
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const nextSection = useAppStore((state) => state.nextSection);
  const prevSection = useAppStore((state) => state.prevSection);
  
  const lastScrollTime = useRef(0);
  const SCROLL_COOLDOWN = 1000; // Hard debounce to prevent glitchy rapid scrolling

  useEffect(() => {
    const handleWheel = (e) => {
      // Don't interrupt a transition in progress
      if (isTransitioning) return;
      
      const now = Date.now();
      
      // Hard debounce: Ignore any scroll events if we recently scrolled
      if (now - lastScrollTime.current < SCROLL_COOLDOWN) {
        return;
      }

      // Threshold check to avoid accidental micro-scrolls
      if (Math.abs(e.deltaY) < 15) return;

      if (e.deltaY > 15) {
        nextSection();
        lastScrollTime.current = now;
      } else if (e.deltaY < -15) {
        prevSection();
        lastScrollTime.current = now;
      }
    };

    // Add touch support for smoother mobile/trackpad experience
    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e) => {
      if (isTransitioning) return;
      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSection();
        else prevSection();
        lastScrollTime.current = now;
      }
    };

    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

      if (e.key === 'ArrowDown' || e.key === 'j') {
        nextSection();
        lastScrollTime.current = now;
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        prevSection();
        lastScrollTime.current = now;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTransitioning, nextSection, prevSection]);
}
