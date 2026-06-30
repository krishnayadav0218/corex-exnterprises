import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import '../styles/Testimonials.css';

export default function Testimonials() {
  const { data } = useSiteData();
  const list = data.testimonials;
  const [active, setActive] = useState(0);
  if (!list || list.length === 0) return null;
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__inner">
        <div className="testimonials__header">
          <span className="section-label">What Clients Say</span>
          <h2 className="section-title section-title--light">Client <span className="accent">Testimonials</span></h2>
        </div>
        <div className="testi-card reveal">
          <div className="testi-stars">{'★'.repeat(list[active].rating || 5)}</div>
          <p className="testi-text">"{list[active].text}"</p>
          <div className="testi-author">
            <strong>{list[active].name}</strong>
            <span>{list[active].company}</span>
          </div>
        </div>
        <div className="testi-dots">
          {list.map((_, i) => (
            <button key={i} className={`testi-dot ${i === active ? 'active' : ''}`} onClick={() => setActive(i)} aria-label={`Testimonial ${i+1}`}/>
          ))}
        </div>
      </div>
    </section>
  );
}
