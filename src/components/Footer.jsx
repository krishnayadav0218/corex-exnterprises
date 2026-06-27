import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Brand */}
        <div>
          <div className="footer__brand-name">CORE<span>X</span></div>
          <div className="footer__tagline">Supplying the Core of Industry</div>
          <p className="footer__desc">
            Trusted supplier of electrical materials, cables, cable management
            systems, metals and industrial raw materials across India.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div className="footer__col-title">Quick Links</div>
          <ul className="footer__links">
            <li><a href="#hero"     onClick={(e) => { e.preventDefault(); scrollTo('hero');     }}>Home</a></li>
            <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollTo('products'); }}>Products</a></li>
            <li><a href="#why"      onClick={(e) => { e.preventDefault(); scrollTo('why');      }}>Why CoreX</a></li>
            <li><a href="#contact"  onClick={(e) => { e.preventDefault(); scrollTo('contact');  }}>Contact</a></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <div className="footer__col-title">Products</div>
          <ul className="footer__links">
            <li><a href="#products">Cables &amp; Wires</a></li>
            <li><a href="#products">Cable Management</a></li>
            <li><a href="#products">Electrical Products</a></li>
            <li><a href="#products">Metal Products</a></li>
            <li><a href="#products">Industrial Supply</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">
          © {new Date().getFullYear()} <strong>CoreX Enterprises</strong>. All rights reserved.
        </p>
        <div className="footer__email">
          <a href="mailto:sales.corexenterprises@gmail.com">
            sales.corexenterprises@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
