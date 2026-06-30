import React from 'react';
import '../styles/WhyCorex.css';

const REASONS = [
  { icon: '💰', title: 'Competitive Pricing', desc: 'Best market rates without compromising on quality — making bulk procurement economical for every project.' },
  { icon: '🤝', title: 'Reliable Vendor Network', desc: 'Strong relationships with verified manufacturers and distributors across India.' },
  { icon: '✅', title: 'Quality Products', desc: 'Every product we supply meets industry standards — quality you can trust on every order.' },
  { icon: '🚚', title: 'Fast Delivery', desc: 'Timely delivery support to keep your projects on schedule without delays or surprises.' },
  { icon: '📦', title: 'Bulk Project Supply', desc: 'Capable of handling large-scale project requirements with consistent availability.' },
  { icon: '🎯', title: 'Professional Service', desc: 'Dedicated support from inquiry to delivery — we are with you at every step.' },
];

export default function WhyCorex() {
  return (
    <section className="why" id="why">
      <div className="why__header">
        <span className="section-label">Why Choose Us</span>
        <h2 className="section-title section-title--light">Built on <span className="accent">Trust</span> &amp; Performance</h2>
      </div>
      <div className="why__grid">
        {REASONS.map((r,i) => (
          <div key={r.title} className={`why-card reveal delay-${i+1}`}>
            <div className="why-card__icon-box" aria-hidden="true">{r.icon}</div>
            <h3 className="why-card__title">{r.title}</h3>
            <p className="why-card__desc">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
