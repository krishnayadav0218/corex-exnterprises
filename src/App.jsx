import React from 'react';
import './styles/global.css';

import useScrollReveal from './components/useScrollReveal';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import Products  from './components/Products';
import WhyCorex  from './components/WhyCorex';
import Contact   from './components/Contact';
import Footer    from './components/Footer';

export default function App() {
  // Activate scroll-reveal animations globally
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <WhyCorex />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
