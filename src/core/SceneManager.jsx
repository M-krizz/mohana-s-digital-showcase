import React from 'react';
import LightSetup from '../components/3d/LightSetup';
import CorridorSegment from '../components/3d/CorridorSegment';
import { sections } from '../config/sections';

export default function SceneManager() {
  return (
    <>
      <LightSetup />
      
      {/* 
        The CorridorSegment now contains the entire continuous tunnel
      */}
      <CorridorSegment />
      
    </>
  );
}
