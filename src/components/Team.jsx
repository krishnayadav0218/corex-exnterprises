import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import '../styles/Team.css';
import useSectionStyle from './useSectionStyle';

export default function Team() {
  const sectionStyle = useSectionStyle('team');
  const { data } = useSiteData();
  const members = data.team;
  if (!members || members.length === 0) return null;
  return (
    <section className="team sec-styled" id="team" style={sectionStyle}>
      <div className="team__inner">
        <div className="team__header">
          <span className="section-label">Our People</span>
          <h2 className="section-title">Meet the <span className="accent">Team</span></h2>
        </div>
        <div className="team__grid">
          {members.map((m, i) => (
            <div key={m.id} className={`team-card reveal delay-${(i % 4) + 1}`}>
              <div className="team-card__avatar">{m.name.charAt(0)}</div>
              <h3 className="team-card__name">{m.name}</h3>
              <p className="team-card__role">{m.role}</p>
              <p className="team-card__bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
