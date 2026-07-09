import React, { useRef } from 'react';
import '../styles/Hero.css';
import { useSiteData } from '../context/SiteDataContext';
import useSectionStyle from './useSectionStyle';
import HeroScene from './HeroScene';
import useTilt3D from './useTilt3D';

const PARTICLES = [
  { size: 120, left: '15%', duration: '18s', delay: '0s' },
  { size: 60,  left: '70%', duration: '14s', delay: '3s' },
  { size: 90,  left: '40%', duration: '22s', delay: '6s' },
  { size: 45,  left: '85%', duration: '16s', delay: '1s' },
  { size: 70,  left: '55%', duration: '20s', delay: '9s' },
];

const HERO_TAGS = [
  'Electrical Materials','Cables & Wires','Cable Trays','Metals','Industrial Raw Materials',
];

function AnimatedWord({ word, startIdx, isAccent }) {
  const letters = word.split('');
  const spans = letters.map((ch, i) => (
    <span key={i} className="letter" style={{ animationDelay: `${0.55+(startIdx+i)*0.045}s` }}>{ch}</span>
  ));
  if (isAccent) return <span className="accent" data-text={word}>{spans}</span>;
  return <>{spans}</>;
}

export default function Hero() {
  const sectionStyle = useSectionStyle('hero');
  const { data } = useSiteData();
  const h = data.hero;
  const contentRef = useRef(null);
  useTilt3D(contentRef, { max: 3, scale: 1, lift: 0, glare: false });
  return (
    <section className="hero sec-styled" id="hero" style={sectionStyle}>
      <HeroScene />
      {PARTICLES.map((p,i)=>(
        <div key={i} className="hero__particle" aria-hidden="true"
          style={{width:p.size,height:p.size,left:p.left,animationDuration:p.duration,animationDelay:p.delay}}/>
      ))}
      <div className="hero__content" ref={contentRef}>
        <p className="hero__eyebrow">{h.eyebrow}</p>
        <h1 className="hero__title">
          <span className="hero__title-line"><AnimatedWord word="SUPPLYING" startIdx={0}/></span><br/>
          <span className="hero__title-line">
            <AnimatedWord word="THE" startIdx={9}/>
            <span className="letter-space"/>
            <AnimatedWord word="CORE" startIdx={12} isAccent/>
          </span><br/>
          <span className="hero__title-line">
            <AnimatedWord word="OF" startIdx={16}/>
            <span className="letter-space"/>
            <AnimatedWord word="INDUSTRY" startIdx={18}/>
          </span>
        </h1>
        <p className="hero__subtitle">{h.subtitle}</p>
        <div className="hero__actions">
          <a href="#products" className="btn-primary"
            onClick={(e)=>{e.preventDefault();document.getElementById('products')?.scrollIntoView({behavior:'smooth'});}}>
            {h.cta1}
          </a>
          <a href="#contact" className="btn-outline"
            onClick={(e)=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}}>
            {h.cta2}
          </a>
        </div>
        <div className="hero__tags">
          {HERO_TAGS.map(tag=><span key={tag} className="hero__tag">{tag}</span>)}
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line"/>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
