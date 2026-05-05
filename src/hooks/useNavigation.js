import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { sections } from '../config/sections';

const clamp = (value) => Math.max(0, Math.min(value, sections.length - 1));

export default function useNavigation({ enabled = true } = {}) {
  const setSection = useAppStore((state) => state.setSection);

  useEffect(() => {
    if (!enabled) return;

    let lock = false;
    let timeoutId;

    const onWheel = (event) => {
      if (lock) return;
      if (Math.abs(event.deltaY) < 6) return;

      lock = true;
      setSection((prev) => clamp(prev + (event.deltaY > 0 ? 1 : -1)));
      timeoutId = window.setTimeout(() => {
        lock = false;
      }, 550);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.clearTimeout(timeoutId);
    };
  }, [enabled, setSection]);
}
