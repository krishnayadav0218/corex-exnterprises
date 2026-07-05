import React, { useState } from 'react';
import '../styles/Contact.css';
import { useSiteData } from '../context/SiteDataContext';
import useSectionStyle from './useSectionStyle';

// Web3Forms — verify karo web3forms.com pe info.corexenterprises@gmail.com
const WEB3FORMS_KEY = '9d6d7144-c61c-48b0-a86b-30415be23b79';

const SOCIAL_ICONS = {
  whatsapp: { label: 'WhatsApp', color: '#25D366', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  instagram: { label: 'Instagram', color: '#E1306C', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  linkedin: { label: 'LinkedIn', color: '#0A66C2', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  facebook: { label: 'Facebook', color: '#1877F2', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  twitter: { label: 'Twitter/X', color: '#000000', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.735-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  youtube: { label: 'YouTube', color: '#FF0000', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
  telegram: { label: 'Telegram', color: '#26A5E4', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
};

const PRODUCT_OPTIONS = [
  'Cables & Wires','Cable Management (Trays / Ladders)','Industrial Supply','Metals & Metal Products','Other / Multiple',
];

export default function Contact() {
  const sectionStyle = useSectionStyle('contact');
  const { data } = useSiteData();
  const c = data.contact;
  const s = data.social;
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: 'New Enquiry — CoreX Enterprises Website',
      from_name: 'CoreX Website',
      name: form.name?.value || '',
      mobile: form.mobile?.value || '',
      email: form.email?.value || '',
      product: form.product?.value || '',
      message: form.message?.value || '',
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('Web3Forms error:', result);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const activeSocials = Object.entries(s || {}).filter(([_, v]) => v && v !== '#');

  return (
    <section className="contact sec-styled" id="contact" style={sectionStyle}>
      <div className="contact__header">
        <span className="section-label">Get in Touch</span>
        <h2 className="section-title">Contact <span className="accent">Us</span></h2>
      </div>
      <div className="contact__wrapper">
        <div className="reveal-left">
          <p className="contact__info-desc">Reach out for product enquiries, pricing, or bulk project requirements. Our team will respond promptly.</p>
          {[
            { icon: '📧', label: 'Email', value: <a href={`mailto:${c.email}`}>{c.email}</a> },
            { icon: '📱', label: 'Mobile', value: c.mobile },
            { icon: '📍', label: 'Address', value: c.address },
            { icon: '🪪', label: 'GST No.', value: c.gst },
          ].map(item => (
            <div className="contact__item" key={item.label}>
              <div className="contact__icon-box">{item.icon}</div>
              <div>
                <div className="contact__label">{item.label}</div>
                <div className="contact__value">{item.value}</div>
              </div>
            </div>
          ))}
          {activeSocials.length > 0 && (
            <div className="contact__social">
              <p className="contact__social-label">Follow Us</p>
              <div className="contact__social-row">
                {activeSocials.map(([key, url]) => {
                  const meta = SOCIAL_ICONS[key];
                  if (!meta) return null;
                  return (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                      className="social-btn" style={{'--sc': meta.color}} aria-label={meta.label}>
                      {meta.icon}<span>{meta.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <form className="contact__form reveal-right" onSubmit={handleSubmit}>
          {status === 'success' && (
            <div className="contact__toast contact__toast--success">
              ✅ Enquiry sent! We'll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="contact__toast contact__toast--error">
              ❌ Form submit failed. Please email us at {c.email}
            </div>
          )}
          <div className="contact__form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input id="name" name="name" type="text" placeholder="Rajesh Kumar" required />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input id="mobile" name="mobile" type="tel" placeholder="+91 98765 43210" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="form-group">
            <label htmlFor="product">Product Requirement</label>
            <select id="product" name="product">
              <option value="">Select a category</option>
              {PRODUCT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" placeholder="Tell us about your requirement…" />
          </div>
          <button type="submit" className={`contact__submit ${status==='success'?'sent':''}`} disabled={status==='sending'}>
            {status==='sending' ? '⏳ Sending…' : status==='success' ? '✓ Sent!' : 'Send Enquiry →'}
          </button>
        </form>
      </div>
    </section>
  );
}
