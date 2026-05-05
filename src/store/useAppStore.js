import { create } from 'zustand';
import { sections } from '../config/sections';

const clamp = (value) => Math.max(0, Math.min(value, sections.length - 1));

export const useAppStore = create((set) => ({
  sectionIndex: 0,
  isTransitioning: false,
  
  // Directly set the section (e.g. from nav buttons if needed)
  setSectionIndex: (index) => set({ sectionIndex: clamp(index) }),
  
  // Move forward/backward via scroll
  nextSection: () => set((state) => ({ sectionIndex: clamp(state.sectionIndex + 1) })),
  prevSection: () => set((state) => ({ sectionIndex: clamp(state.sectionIndex - 1) })),
  
  setIsTransitioning: (status) => set({ isTransitioning: status }),
}));
