import React, { useEffect } from 'react';
import './styles/global.css';

import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import useScrollReveal from './components/useScrollReveal';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import About        from './components/About';
import Products     from './components/Products';
import WhyCorex     from './components/WhyCorex';
import Testimonials from './components/Testimonials';
import Blog         from './components/Blog';
import Team         from './components/Team';
import Projects     from './components/Projects';
import Contact      from './components/Contact';
import Footer       from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminPanel   from './admin/AdminPanel';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';



function Router() {
  const path = window.location.pathname;
  if (path === '/admin') return <AdminPanel />;
  if (path === '/privacy-policy') return <PrivacyPolicy />;
  if (path === '/terms') return <TermsConditions />;
  return <MainSite />;
}

function MainSite() {
  useScrollReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <WhyCorex />
        <Projects />
        <Testimonials />
        <Team />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <Router />
    </SiteDataProvider>
  );
}
