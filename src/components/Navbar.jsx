import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : 'top'}`}>
        {/* Logo */}
        <div className="navbar__logo" onClick={() => scrollTo('hero')} style={{ cursor: 'pointer' }}>
          CORE<span>X</span>
          <span className="navbar__tagline">Enterprises</span>
        </div>

        {/* Desktop links */}
        <ul className="navbar__links">
          <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollTo('products'); }}>Products</a></li>
          <li><a href="#why"      onClick={(e) => { e.preventDefault(); scrollTo('why'); }}>Why CoreX</a></li>
          <li>
            <a
              href="#contact"
              className="navbar__cta"
              onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            >
              Get a Quote
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`navbar__mobile ${menuOpen ? 'open' : ''}`}>
        <a href="#products" onClick={(e) => { e.preventDefault(); scrollTo('products'); }}>Products</a>
        <a href="#why"      onClick={(e) => { e.preventDefault(); scrollTo('why'); }}>Why CoreX</a>
        <a href="#contact"  onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Get a Quote</a>
      </div>
    </>
  );
}
