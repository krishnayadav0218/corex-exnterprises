import { useEffect } from 'react';

/**
 * Adds an interactive 3D tilt (rotateX/rotateY) + lift effect to the element
 * referenced by `ref`, driven by pointer position. Pure CSS transform,
 * no external dependency — mutates the DOM node directly via rAF so React
 * never re-renders during pointer move (keeps it silky smooth).
 */
export default function useTilt3D(ref, options = {}) {
  const {
    max = 10,        // max rotation in degrees
    scale = 1.025,    // hover scale
    lift = 8,         // px translateY lift on hover
    perspective = 1000,
    glare = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // respect users who prefer reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let frame = null;

    const applyIdle = () => {
      el.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
      if (glare) el.style.setProperty('--glare-opacity', '0');
    };

    const handleEnter = () => {
      el.style.zIndex = 20;
      el.style.transition = 'transform 0.08s linear';
    };

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-${lift}px) scale(${scale})`;
        if (glare) {
          el.style.setProperty('--glare-x', `${px * 100}%`);
          el.style.setProperty('--glare-y', `${py * 100}%`);
          el.style.setProperty('--glare-opacity', '1');
        }
      });
    };

    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      applyIdle();
      setTimeout(() => { el.style.zIndex = ''; }, 400);
    };

    el.addEventListener('pointerenter', handleEnter);
    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);

    return () => {
      el.removeEventListener('pointerenter', handleEnter);
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, max, scale, lift, perspective, glare]);
}
