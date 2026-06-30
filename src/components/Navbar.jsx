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
        <div className="navbar__logo" onClick={() => scrollTo('hero')} style={{ cursor: 'pointer' }}>
          CORE<span>X</span>
          <span className="navbar__tagline">Enterprises</span>
        </div>
        <ul className="navbar__links">
          <li><a href="#about"    onClick={(e)=>{e.preventDefault();scrollTo('about');}}>About</a></li>
          <li><a href="#products" onClick={(e)=>{e.preventDefault();scrollTo('products');}}>Products</a></li>
          <li><a href="#why"      onClick={(e)=>{e.preventDefault();scrollTo('why');}}>Why CoreX</a></li>
          <li><a href="#blog"     onClick={(e)=>{e.preventDefault();scrollTo('blog');}}>Blog</a></li>
          <li>
            <a href="#contact" className="navbar__cta" onClick={(e)=>{e.preventDefault();scrollTo('contact');}}>
              Get a Quote
            </a>
          </li>
        </ul>
        <button className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`navbar__mobile ${menuOpen ? 'open' : ''}`}>
        <a href="#about"    onClick={(e)=>{e.preventDefault();scrollTo('about');}}>About</a>
        <a href="#products" onClick={(e)=>{e.preventDefault();scrollTo('products');}}>Products</a>
        <a href="#why"      onClick={(e)=>{e.preventDefault();scrollTo('why');}}>Why CoreX</a>
        <a href="#blog"     onClick={(e)=>{e.preventDefault();scrollTo('blog');}}>Blog</a>
        <a href="#contact"  onClick={(e)=>{e.preventDefault();scrollTo('contact');}}>Get a Quote</a>
      </div>
    </>
  );
}
