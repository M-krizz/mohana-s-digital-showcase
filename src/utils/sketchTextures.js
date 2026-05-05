import { useMemo } from 'react';
import * as THREE from 'three';

const drawHatch = (ctx, size, spacing, jitter, color, angle) => {
  ctx.save();
  ctx.translate(size / 2, size / 2);
  ctx.rotate(angle);
  ctx.translate(-size / 2, -size / 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  for (let y = -size; y < size * 2; y += spacing) {
    const offset = (Math.random() - 0.5) * spacing * jitter;
    ctx.beginPath();
    ctx.moveTo(-size, y + offset);
    ctx.lineTo(size * 2, y + offset);
    ctx.stroke();
  }

  ctx.restore();
};

const drawSpeckle = (ctx, size, density, color) => {
  ctx.fillStyle = color;
  for (let i = 0; i < density; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.2 + 0.3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
};

export const useSketchTexture = ({
  size = 256,
  scale = 6,
  spacing = 10,
  jitter = 0.35,
  bgColor = '#fbf9f4',
  lineColor = '#bfb8ae',
  rotation = 0.08,
  speckle = 220,
  speckleColor = 'rgba(0, 0, 0, 0.05)',
} = {}) =>
  useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    drawHatch(ctx, size, spacing, jitter, lineColor, rotation);
    drawHatch(ctx, size, spacing * 1.35, jitter * 0.6, lineColor, rotation + 0.9);
    drawSpeckle(ctx, size, speckle, speckleColor);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(scale, scale);
    texture.center.set(0.5, 0.5);
    texture.rotation = rotation;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;

    return texture;
  }, [size, scale, spacing, jitter, bgColor, lineColor, rotation]);
