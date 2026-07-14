import React, { useEffect, useRef } from 'react';

/**
 * Business-themed 3D scene for a Cables / Electrical Materials / Cable Tray
 * supplier: a rotating twisted-pair cable helix with glowing "current"
 * pulses travelling along the strands, plus a faint conduit/cable-tray
 * grid in the background. Pure <canvas> + hand-rolled 3D math —
 * no three.js / no extra dependency, so `npm install` stays exactly
 * as it was.
 */
export default function HeroScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const WHITE = [235, 240, 250];
    const ORANGE = [244, 115, 32];

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── Build the twisted-pair cable helix (two strands, 180° out of phase,
    //    exactly how real twisted cable / control cable pairs are wound) ──
    const STRAND_POINTS = 160;
    const TURNS = 4.5;
    const RADIUS = 0.5;
    const SPAN = 1.7; // vertical extent of the coil

    function buildStrand(phase) {
      const pts = [];
      for (let i = 0; i < STRAND_POINTS; i++) {
        const t = i / (STRAND_POINTS - 1);
        const angle = phase + t * TURNS * Math.PI * 2;
        pts.push({
          x: Math.cos(angle) * RADIUS,
          y: (t - 0.5) * SPAN,
          z: Math.sin(angle) * RADIUS,
        });
      }
      return pts;
    }

    const strandA = buildStrand(0);
    const strandB = buildStrand(Math.PI);

    // Current pulses travelling along each strand (t position + speed).
    const pulses = [
      { strand: strandA, t: 0.0, speed: 0.10 },
      { strand: strandA, t: 0.33, speed: 0.10 },
      { strand: strandA, t: 0.66, speed: 0.10 },
      { strand: strandB, t: 0.15, speed: 0.085 },
      { strand: strandB, t: 0.5, speed: 0.085 },
      { strand: strandB, t: 0.82, speed: 0.085 },
    ];

    // Faint background conduit grid (cable-tray look) — static ring positions.
    const GRID_RINGS = 5;

    let rotY = 0;
    let rotX = 0.18;
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
      targetTiltY = px * 0.5;
      targetTiltX = -py * 0.3;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointer);

    const project = (p, cx, cy, scale, fov, cosY, sinY, cosX, sinX) => {
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
    };

    let raf;
    const render = () => {
      rotY += reduceMotion ? 0 : 0.0032;
      tiltX += (targetTiltX - tiltX) * 0.04;
      tiltY += (targetTiltY - tiltY) * 0.04;

      const isMobile = width < 640;
      // On mobile the hero stacks full-width and the section is very tall
      // (min-height: 100vh), so using the raw width/height like on desktop
      // pushes the coil into the middle of the text. Recenter it higher up,
      // shrink it, and cap the effective height so it stays compact.
      const effHeight = isMobile ? Math.min(height, width * 1.3) : height;
      const cx = isMobile ? width * 0.5 : width * 0.74;
      const cy = isMobile ? effHeight * 0.34 : height * 0.5;
      const scale = Math.min(width, effHeight) * (isMobile ? 0.34 : 0.4);
      const fov = 2.4;

      const cosX = Math.cos(rotX + tiltX);
      const sinX = Math.sin(rotX + tiltX);
      const cosY = Math.cos(rotY + tiltY);
      const sinY = Math.sin(rotY + tiltY);

      ctx.clearRect(0, 0, width, height);

      // ── faint conduit / cable-tray rings behind the coil ──
      for (let ring = 0; ring < GRID_RINGS; ring++) {
        const ry = (ring / (GRID_RINGS - 1) - 0.5) * SPAN * 1.05;
        ctx.beginPath();
        let first = true;
        for (let a = 0; a <= 32; a++) {
          const ang = (a / 32) * Math.PI * 2;
          const p = project(
            { x: Math.cos(ang) * RADIUS * 1.45, y: ry, z: Math.sin(ang) * RADIUS * 1.45 },
            cx, cy, scale, fov, cosY, sinY, cosX, sinX
          );
          if (first) { ctx.moveTo(p.x, p.y); first = false; } else { ctx.lineTo(p.x, p.y); }
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── project + draw the two cable strands ──
      const drawStrand = (strand, baseColor) => {
        const projected = strand.map((p) =>
          project(p, cx, cy, scale, fov, cosY, sinY, cosX, sinX)
        );
        for (let i = 0; i < projected.length - 1; i++) {
          const a = projected[i];
          const b = projected[i + 1];
          const depth = (a.z + b.z) / 2;
          const alpha = Math.max(0.06, 0.35 + depth * 0.45);
          ctx.strokeStyle = `rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${alpha})`;
          ctx.lineWidth = Math.max(1, 2.4 * ((a.s + b.s) / 2));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        return projected;
      };

      drawStrand(strandA, WHITE);
      drawStrand(strandB, ORANGE);

      // ── travelling current pulses (glowing dots + trail) ──
      pulses.forEach((pulse) => {
        if (!reduceMotion) {
          pulse.t += pulse.speed * 0.016;
          if (pulse.t > 1) pulse.t -= 1;
        }
        const idx = Math.min(STRAND_POINTS - 1, Math.floor(pulse.t * (STRAND_POINTS - 1)));
        const point3d = pulse.strand[idx];
        const p = project(point3d, cx, cy, scale, fov, cosY, sinY, cosX, sinX);
        const glowAlpha = Math.max(0.25, 0.5 + p.z * 0.5);

        // trailing glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14 * p.s);
        grad.addColorStop(0, `rgba(244,115,32,${0.75 * glowAlpha})`);
        grad.addColorStop(1, 'rgba(244,115,32,0)');
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, 14 * p.s, 0, Math.PI * 2);
        ctx.fill();

        // bright core
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,235,210,${glowAlpha})`;
        ctx.arc(p.x, p.y, 2.6 * p.s, 0, Math.PI * 2);
        ctx.fill();
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
