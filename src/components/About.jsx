import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import '../styles/About.css';
import useSectionStyle from './useSectionStyle';
import TiltCard from './TiltCard';

export default function About() {
  const sectionStyle = useSectionStyle('about');
  const { data } = useSiteData();
  const a = data.about;
  return (
    <section className="about sec-styled" id="about" style={sectionStyle}>
      <div className="about__inner">
        <div className="about__text reveal-left">
          <span className="section-label">{a.label}</span>
          <h2 className="section-title">{a.title}</h2>
          <p className="about__body">{a.body}</p>
          <div className="about__stats">
            <div className="about__stat"><span>{a.founded}</span><label>Founded</label></div>
            <div className="about__stat"><span>{a.city}</span><label>Location</label></div>
            <div className="about__stat"><span>100%</span><label>Quality</label></div>
          </div>
        </div>
        <div className="about__visual reveal-right">
          <TiltCard className="about__card" max={14} lift={6}>
            <div className="about__card-logo">CORE<span>X</span></div>
            <p className="about__card-tagline">{a.tagline}</p>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
