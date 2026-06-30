import React from 'react';
import '../styles/Products.css';
import { useSiteData } from '../context/SiteDataContext';

export default function Products() {
  const { data } = useSiteData();
  const products = data.products;
  return (
    <section className="products" id="products">
      <div className="products__header">
        <span className="section-label">What We Supply</span>
        <h2 className="section-title">Our <span className="accent">Product</span> Range</h2>
      </div>
      <div className="products__grid">
        {products.map((prod, i) => (
          <div key={prod.id || prod.title} className={`prod-card reveal delay-${(i%4)+1}`}>
            <div className="prod-card__bar" />
            <div className="prod-card__icon" aria-hidden="true">{prod.icon}</div>
            <h3 className="prod-card__title">{prod.title}</h3>
            <ul className="prod-card__items">
              {(prod.items||[]).map(item => <li key={item} className="prod-card__item">{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
