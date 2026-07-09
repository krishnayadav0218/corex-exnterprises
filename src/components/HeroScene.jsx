import React, { useEffect, useRef } from 'react';

/**
 * Lightweight hand-rolled 3D engine (no three.js / no extra deps):
 * renders a rotating sphere of points ("industrial network" look),
 * connects nearby points with fading lines, and gently parallaxes
 * with the pointer position. Pure <canvas> + vanilla JS 3D math.
 */
export default function HeroScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ORANGE = [244, 115, 32];
    const WHITE = [255, 255, 255];

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const POINT_COUNT = 90;
    const RADIUS = 1;
    const LINK_DIST = 0.62;

    // Fibonacci sphere distribution — even spread of points on a sphere.
    const points = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      const y = 1 - (i / (POINT_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = ((1 + Math.sqrt(5)) * Math.PI) * i;
      points.push({
        x: Math.cos(theta) * r * RADIUS,
        y: y * RADIUS,
        z: Math.sin(theta) * r * RADIUS,
      });
    }

    // Precompute links between nearby points (static distances on unit sphere).
    const links = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i];
        const b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        if (d < LINK_DIST) links.push([i, j]);
      }
    }

    let rotX = 0.4;
    let rotY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointer = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = px * 0.6;
      targetTiltX = -py * 0.4;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointer);

    let raf;
    const render = () => {
      rotY += reduceMotion ? 0 : 0.0022;
      rotX = 0.4;
      tiltX += (targetTiltX - tiltX) * 0.04;
      tiltY += (targetTiltY - tiltY) * 0.04;

      const cx = width * 0.72; // orb sits toward the right side of hero
      const cy = height * 0.48;
      const scale = Math.min(width, height) * 0.34;
      const fov = 2.6;

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(rotX + tiltX);
      const sinX = Math.sin(rotX + tiltX);
      const cosY = Math.cos(rotY + tiltY);
      const sinY = Math.sin(rotY + tiltY);

      const projected = points.map((p) => {
        // rotate around Y then X
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const perspective = fov / (fov + z2);
        return {
          x: cx + x1 * scale * perspective,
          y: cy + y1 * scale * perspective,
          z: z2,
          s: perspective,
        };
      });

      // links (drawn first, behind points)
      links.forEach(([i, j]) => {
        const a = projected[i];
        const b = projected[j];
        const depth = (a.z + b.z) / 2; // -1 (far) .. 1 (near)
        const alpha = Math.max(0, 0.5 + depth * 0.5) * 0.18;
        if (alpha <= 0.01) return;
        const c = depth > 0.15 ? ORANGE : WHITE;
        ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // points
      projected.forEach((p) => {
        const depthAlpha = Math.max(0.15, 0.5 + p.z * 0.5);
        const isOrange = p.z > 0.25;
        const c = isOrange ? ORANGE : WHITE;
        const r = Math.max(0.8, 1.9 * p.s);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${depthAlpha * (isOrange ? 0.95 : 0.5)})`;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        if (isOrange && p.z > 0.55) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(244,115,32,${(p.z - 0.55) * 0.35})`;
          ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointer);
    };
  }, []);

  return (
    <div className="hero__scene" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
