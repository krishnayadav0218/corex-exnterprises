import React, { useState, useEffect, useRef } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import '../styles/Testimonials.css';

const AUTO_PLAY_MS = 5000;

export default function Testimonials() {
  const { data } = useSiteData();
  const list = data.testimonials;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState('next');
  const timerRef = useRef(null);

  const goTo = (idx, dir = 'next') => {
    setDirection(dir);
    setActive(idx);
  };

  const next = () => goTo((active + 1) % list.length, 'next');
  const prev = () => goTo((active - 1 + list.length) % list.length, 'prev');

  useEffect(() => {
    if (!list || list.length <= 1) return;
    timerRef.current = setInterval(() => {
      setDirection('next');
      setActive(prev => (prev + 1) % list.length);
    }, AUTO_PLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [list]);

  const pauseAndRestart = (fn) => {
    clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(() => {
      setDirection('next');
      setActive(prev => (prev + 1) % list.length);
    }, AUTO_PLAY_MS);
  };

  if (!list || list.length === 0) return null;

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__inner">
        <div className="testimonials__header reveal">
          <span className="section-label">What Clients Say</span>
          <h2 className="section-title section-title--light">Client <span className="accent">Testimonials</span></h2>
        </div>

        <div className="testi-stage reveal">
          <button className="testi-arrow testi-arrow--left" onClick={() => pauseAndRestart(prev)} aria-label="Previous testimonial">‹</button>

          <div className="testi-card-wrap">
            <div key={active} className={`testi-card testi-card--${direction}`}>
              <div className="testi-quote-mark" aria-hidden="true">"</div>
              <div className="testi-stars">
                {'★'.repeat(list[active].rating || 5)}
              </div>
              <p className="testi-text">{list[active].text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{(list[active].name || '?').charAt(0)}</div>
                <div>
                  <strong>{list[active].name}</strong>
                  <span>{list[active].company}</span>
                </div>
              </div>
            </div>
          </div>

          <button className="testi-arrow testi-arrow--right" onClick={() => pauseAndRestart(next)} aria-label="Next testimonial">›</button>
        </div>

        <div className="testi-dots">
          {list.map((_, i) => (
            <button
              key={i}
              className={`testi-dot ${i === active ? 'active' : ''}`}
              onClick={() => pauseAndRestart(() => goTo(i, i > active ? 'next' : 'prev'))}
              aria-label={`Testimonial ${i + 1}`}
            >
              {i === active && <span className="testi-dot__progress" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
