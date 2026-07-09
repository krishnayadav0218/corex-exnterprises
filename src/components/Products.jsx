import React from 'react';
import '../styles/Products.css';
import { useSiteData } from '../context/SiteDataContext';
import useSectionStyle from './useSectionStyle';
import TiltCard from './TiltCard';

export default function Products() {
  const sectionStyle = useSectionStyle('products');
  const { data } = useSiteData();
  const products = data.products;
  return (
    <section className="products sec-styled" id="products" style={sectionStyle}>
      <div className="products__header">
        <span className="section-label">What We Supply</span>
        <h2 className="section-title">Our <span className="accent">Product</span> Range</h2>
      </div>
      <div className="products__grid">
        {products.map((prod, i) => (
          <TiltCard key={prod.id || prod.title} className={`prod-card reveal delay-${(i%4)+1}`} max={9} lift={4}>
            <div className="prod-card__bar" />
            <div className="prod-card__icon" aria-hidden="true">{prod.icon}</div>
            <h3 className="prod-card__title">{prod.title}</h3>
            <ul className="prod-card__items">
              {(prod.items||[]).map(item => <li key={item} className="prod-card__item">{item}</li>)}
            </ul>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
