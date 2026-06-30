import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import '../styles/Blog.css';

export default function Blog() {
  const { data } = useSiteData();
  const posts = data.blog;
  const [open, setOpen] = useState(null);
  if (!posts || posts.length === 0) return null;
  const selected = posts.find(p => p.id === open);
  return (
    <section className="blog" id="blog">
      <div className="blog__inner">
        <div className="blog__header">
          <span className="section-label">Insights</span>
          <h2 className="section-title">Latest <span className="accent">Blog</span></h2>
        </div>
        {selected ? (
          <div className="blog__post-detail">
            <button className="blog__back" onClick={() => setOpen(null)}>← Back to Blog</button>
            <h3>{selected.title}</h3>
            <p className="blog__post-date">{selected.date}</p>
            <div className="blog__post-body">{selected.content}</div>
          </div>
        ) : (
          <div className="blog__grid">
            {posts.map(post => (
              <div key={post.id} className="blog-card reveal">
                {post.image && <img src={post.image} alt={post.title} className="blog-card__img"/>}
                <div className="blog-card__body">
                  <p className="blog-card__date">{post.date}</p>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <button className="blog-card__link" onClick={() => setOpen(post.id)}>Read More →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
