import React from 'react';
import '../styles/Products.css';

// ── Edit this array to add / remove / change products ──
const PRODUCTS = [
  {
    icon: '⚡',
    title: 'Cables & Wires',
    items: [
      'LT / HT Cables',
      'Flexible Cables',
      'FRLS / FRLSH Cables',
      'Control & Instrumentation',
    ],
  },
  {
    icon: '🔩',
    title: 'Cable Management',
    items: [
      'Cable Trays',
      'Ladder Trays',
      'Raceway Systems',
      'Glands & Lugs',
    ],
  },
  {
    icon: '🏭',
    title: 'Industrial Supply',
    items: [
      'Electrical Products',
      'Metal Products',
      'Hardware',
      'Raw Materials',
    ],
  },
];

export default function Products() {
  return (
    <section className="products" id="products">
      <div className="products__header">
        <span className="section-label">What We Supply</span>
        <h2 className="section-title">
          Our <span className="accent">Product</span> Range
        </h2>
      </div>

      <div className="products__grid">
        {PRODUCTS.map((prod, i) => (
          <div
            key={prod.title}
            className={`prod-card reveal delay-${i + 1}`}
          >
            <div className="prod-card__bar" />
            <div className="prod-card__icon" aria-hidden="true">
              {prod.icon}
            </div>
            <h3 className="prod-card__title">{prod.title}</h3>
            <ul className="prod-card__items">
              {prod.items.map((item) => (
                <li key={item} className="prod-card__item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
