import React from 'react';
import '../styles/Hero.css';

const HERO_TAGS = [
  'Electrical Materials',
  'Cables & Wires',
  'Cable Trays',
  'Metals',
  'Industrial Raw Materials',
];

const PARTICLES = [
  { size: 120, left: '15%', duration: '18s', delay: '0s' },
  { size: 60,  left: '70%', duration: '14s', delay: '3s' },
  { size: 90,  left: '40%', duration: '22s', delay: '6s' },
  { size: 45,  left: '85%', duration: '16s', delay: '1s' },
  { size: 70,  left: '55%', duration: '20s', delay: '9s' },
];

// Splits a word into animated <span> letters, starting delay at `startIdx`
// Returns [jsx, nextStartIdx]
function AnimatedWord({ word, startIdx, isAccent }) {
  const letters = word.split('');
  const spans = letters.map((ch, i) => (
    <span
      key={i}
      className="letter"
      style={{ animationDelay: `${0.55 + (startIdx + i) * 0.045}s` }}
    >
      {ch}
    </span>
  ));

  if (isAccent) {
    return (
      <span className="accent" data-text={word}>
        {spans}
      </span>
    );
  }
  return <>{spans}</>;
}

export default function Hero() {
  // Title lines: each word gets staggered letter drops
  // Line 1: "SUPPLYING"       idx 0–8   (9 letters)
  // Line 2: "THE" + "CORE"   idx 9–11, 12–15
  // Line 3: "OF" + "INDUSTRY" idx 16–17, 18–25
  return (
    <section className="hero" id="hero">
      <div className="hero__slash" aria-hidden="true" />

      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="hero__particle"
          aria-hidden="true"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      <div className="hero__content">
        <p className="hero__eyebrow">CoreX Enterprises</p>

        <h1 className="hero__title">
          {/* Line 1 */}
          <span className="hero__title-line">
            <AnimatedWord word="SUPPLYING" startIdx={0} />
          </span>
          <br />

          {/* Line 2 */}
          <span className="hero__title-line">
            <AnimatedWord word="THE" startIdx={9} />
            <span className="letter-space" />
            <AnimatedWord word="CORE" startIdx={12} isAccent />
          </span>
          <br />

          {/* Line 3 */}
          <span className="hero__title-line">
            <AnimatedWord word="OF" startIdx={16} />
            <span className="letter-space" />
            <AnimatedWord word="INDUSTRY" startIdx={18} />
          </span>
        </h1>

        <p className="hero__subtitle">
          Your trusted partner for electrical materials, cables &amp; wires,
          cable management systems, metals, and industrial raw materials.
        </p>

        <div className="hero__actions">
          <a
            href="#products"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Explore Products
          </a>
          <a
            href="#contact"
            className="btn-outline"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Get a Quote
          </a>
        </div>

        <div className="hero__tags">
          {HERO_TAGS.map((tag) => (
            <span key={tag} className="hero__tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
