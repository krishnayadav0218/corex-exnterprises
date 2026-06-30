import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import '../styles/LegalPage.css';

function renderMarkdown(text) {
  return text
    .split('\n')
    .map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
      if (line === '') return <br key={i}/>;
      return <p key={i}>{line}</p>;
    });
}

export default function PrivacyPolicy() {
  const { data } = useSiteData();
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <a href="/" className="legal-back">← Back to Website</a>
        <div className="legal-content">{renderMarkdown(data.legal.privacyPolicy)}</div>
      </div>
    </div>
  );
}
