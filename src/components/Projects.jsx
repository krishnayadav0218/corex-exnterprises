import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import '../styles/Projects.css';
import useSectionStyle from './useSectionStyle';

export default function Projects() {
  const sectionStyle = useSectionStyle('projects');
  const { data } = useSiteData();
  const projects = data.projects;
  if (!projects || projects.length === 0) return null;
  return (
    <section className="projects sec-styled" id="projects" style={sectionStyle}>
      <div className="projects__inner">
        <div className="projects__header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title section-title--light">Featured <span className="accent">Projects</span></h2>
        </div>
        <div className="projects__grid">
          {projects.map((p, i) => (
            <div key={p.id} className={`proj-card reveal delay-${(i % 4) + 1}`}>
              <div className="proj-card__year">{p.year}</div>
              <h3 className="proj-card__title">{p.title}</h3>
              <p className="proj-card__client">Client: {p.client}</p>
              <p className="proj-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
