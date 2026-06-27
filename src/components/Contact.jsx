import React, { useState } from 'react';
import '../styles/Contact.css';

// ── Edit contact details here ──
const CONTACT_INFO = [
  {
    icon: '📧',
    label: 'Email',
    value: <a href="mailto:sales.corexenterprises@gmail.com">sales.corexenterprises@gmail.com</a>,
  },
  {
    icon: '📱',
    label: 'Mobile',
    value: 'Contact us for details',   // ← replace with actual number
  },
  {
    icon: '📍',
    label: 'Address',
    value: 'India',                    // ← replace with actual address
  },
  {
    icon: '🪪',
    label: 'GST No.',
    value: '—',                        // ← replace with GST number
  },
];

const PRODUCT_OPTIONS = [
  'Cables & Wires',
  'Cable Management (Trays / Ladders)',
  'Industrial Supply',
  'Metals & Metal Products',
  'Other / Multiple',
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      e.target.reset();
    }, 3500);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__header">
        <span className="section-label">Get in Touch</span>
        <h2 className="section-title">
          Contact <span className="accent">Us</span>
        </h2>
      </div>

      <div className="contact__wrapper">
        {/* Left — info */}
        <div className="reveal-left">
          <p className="contact__info-desc">
            Reach out for product enquiries, pricing, or bulk project
            requirements. Our team will respond promptly.
          </p>

          {CONTACT_INFO.map((item) => (
            <div className="contact__item" key={item.label}>
              <div className="contact__icon-box" aria-hidden="true">
                {item.icon}
              </div>
              <div>
                <div className="contact__label">{item.label}</div>
                <div className="contact__value">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right — form */}
        <form className="contact__form reveal-right" onSubmit={handleSubmit}>
          <div className="contact__form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input id="name" type="text" placeholder="Rajesh Kumar" required />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input id="mobile" type="tel" placeholder="+91 98765 43210" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="you@company.com" />
          </div>

          <div className="form-group">
            <label htmlFor="product">Product Requirement</label>
            <select id="product">
              <option value="">Select a category</option>
              {PRODUCT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              placeholder="Tell us about your requirement, quantity, and project details…"
            />
          </div>

          <button
            type="submit"
            className={`contact__submit ${sent ? 'sent' : ''}`}
          >
            {sent ? '✓ Enquiry Sent!' : 'Send Enquiry →'}
          </button>
        </form>
      </div>
    </section>
  );
}
