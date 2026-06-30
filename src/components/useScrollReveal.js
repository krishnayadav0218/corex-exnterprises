import { useEffect } from 'react';

/**
 * useScrollReveal
 * Attaches an IntersectionObserver to any elements with class
 * "reveal", "reveal-left", or "reveal-right" and adds "visible"
 * when they enter the viewport.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right';
    const elements = document.querySelectorAll(selectors);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
