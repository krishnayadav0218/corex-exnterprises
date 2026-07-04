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

const FONT_STACKS = {
  default: "'Inter', sans-serif",
  modern: "'Poppins', 'Inter', sans-serif",
  classic: "'Georgia', 'Times New Roman', serif",
};

function GlobalThemeApplier() {
  const { data } = useSiteData();
  const theme = data.globalTheme || {};

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--global-font-scale', (theme.fontSizeScale || 100) / 100);

    if (theme.headingColor) root.style.setProperty('--global-heading-color', theme.headingColor);
    else root.style.removeProperty('--global-heading-color');

    if (theme.bodyColor) root.style.setProperty('--global-body-color', theme.bodyColor);
    else root.style.removeProperty('--global-body-color');

    root.style.setProperty('--global-accent-color', theme.linkAccentColor || '#F47320');
    root.style.setProperty('--global-font-family', FONT_STACKS[theme.fontFamily] || FONT_STACKS.default);
  }, [theme]);

  return null;
}

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
      <GlobalThemeApplier />
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
