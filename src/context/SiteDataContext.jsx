import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ============================================================
//  JSONBin.io — Free cloud storage (no backend needed)
//  Steps to setup (one time only):
//  1. Go to https://jsonbin.io and Sign Up (free)
//  2. Click "CREATE BIN" → paste {} → Save
//  3. Copy the Bin ID (looks like: 64abc123e3a795...)
//  4. Go to API Keys → copy your Master Key
//  5. Replace the values below:
// ============================================================
const JSONBIN_BIN_ID  = 'YOUR_BIN_ID_HERE';      // e.g. '64abc123e3a795...'
const JSONBIN_API_KEY = 'YOUR_API_KEY_HERE';      // e.g. '$2a$10$...'
const JSONBIN_URL     = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

const USE_CLOUD = JSONBIN_BIN_ID !== 'YOUR_BIN_ID_HERE';

const DEFAULT_DATA = {
  hero: {
    eyebrow: 'CoreX Enterprises',
    title: 'SUPPLYING THE CORE OF INDUSTRY',
    subtitle: 'Your trusted partner for electrical materials, cables & wires, cable management systems, metals, and industrial raw materials.',
    cta1: 'Explore Products',
    cta2: 'Get a Quote',
  },
  about: {
    label: 'About Us',
    title: 'WHO WE ARE',
    body: 'CoreX Enterprises is a trusted supplier of electrical materials, cables & wires, cable management systems, metals, and industrial raw materials across India. We are committed to delivering quality products at competitive prices with reliable service.',
    founded: '2020',
    city: 'India',
    tagline: 'Supplying the Core of Industry',
  },
  contact: {
    email: 'info.corexenterprises@gmail.com',
    mobile: '+91 00000 00000',
    address: 'India',
    gst: '—',
    whatsapp: '+910000000000',
  },
  social: {
    whatsapp: 'https://wa.me/910000000000',
    instagram: 'https://instagram.com/corexenterprises',
    linkedin: 'https://linkedin.com/company/corexenterprises',
    facebook: 'https://facebook.com/corexenterprises',
    twitter: 'https://twitter.com/corexenterprises',
    youtube: '',
    telegram: '',
  },
  products: [
    { id: 1, icon: '⚡', title: 'Cables & Wires', items: ['LT / HT Cables', 'Flexible Cables', 'FRLS / FRLSH Cables', 'Control & Instrumentation'] },
    { id: 2, icon: '🔩', title: 'Cable Management', items: ['Cable Trays', 'Ladder Trays', 'Raceway Systems', 'Glands & Lugs'] },
    { id: 3, icon: '🏭', title: 'Industrial Supply', items: ['Electrical Products', 'Metal Products', 'Hardware', 'Raw Materials'] },
  ],
  services: [
    { id: 1, icon: '📦', title: 'Bulk Supply', desc: 'Large-scale project procurement handled efficiently.' },
    { id: 2, icon: '🚚', title: 'Logistics Support', desc: 'Timely delivery across India with reliable partners.' },
    { id: 3, icon: '💬', title: 'Technical Consultation', desc: 'Expert guidance on product selection for your needs.' },
  ],
  team: [
    { id: 1, name: 'Founder', role: 'CEO & Founder', bio: 'Leading CoreX with a vision to supply quality materials across India.' },
  ],
  testimonials: [
    { id: 1, name: 'Rajesh Kumar', company: 'ABC Constructions', text: 'CoreX Enterprises has been our go-to supplier for all electrical materials. Excellent quality and timely delivery!', rating: 5 },
    { id: 2, name: 'Priya Sharma', company: 'XYZ Industries', text: 'Competitive pricing and professional service. Highly recommended for bulk industrial supply.', rating: 5 },
    { id: 3, name: 'Amit Patel', company: 'Patel & Sons', text: 'Reliable vendor with a wide range of products. Our projects run on schedule thanks to CoreX.', rating: 5 },
  ],
  blog: [
    { id: 1, title: 'Choosing the Right Cable for Industrial Use', date: '2024-06-01', excerpt: 'A guide to selecting the correct cable type for your industrial project needs.', content: 'When selecting cables for industrial applications, consider factors like voltage rating, environmental conditions, and current capacity...', image: '' },
    { id: 2, title: 'Why Quality Matters in Electrical Materials', date: '2024-05-15', excerpt: 'Cutting corners on electrical materials can cost more in the long run.', content: 'Investing in quality electrical materials ensures safety, longevity, and compliance with industry standards...', image: '' },
  ],
  projects: [
    { id: 1, title: 'Industrial Plant Wiring', client: 'XYZ Factory', year: '2023', desc: 'Complete cable supply for a 50,000 sqft industrial plant.' },
    { id: 2, title: 'Commercial Building Supply', client: 'ABC Builders', year: '2023', desc: 'Electrical materials for a 10-floor commercial complex.' },
  ],
  seo: {
    title: 'CoreX Enterprises – Supplying the Core of Industry',
    description: 'CoreX Enterprises – Trusted supplier of electrical materials, cables & wires, cable trays, metals, and industrial raw materials across India.',
    keywords: 'electrical materials, cables wires, cable trays, industrial supply, metals, India',
    ogImage: '',
    gaId: 'G-XXXXXXXXXX',
  },
  branding: { logo: '', favicon: '', primaryColor: '#F47320' },
  globalTheme: {
    fontSizeScale: 100,
    headingColor: '',
    bodyColor: '',
    linkAccentColor: '#F47320',
    fontFamily: 'default',
  },
  styling: {
    hero:         { fontSize: 100, titleColor: '#FFFFFF', textColor: '#C9D2E3', bgColor: '#0D1F3C' },
    about:        { fontSize: 100, titleColor: '#0D1F3C', textColor: '#5A6478', bgColor: '#F5F7FA' },
    products:     { fontSize: 100, titleColor: '#0D1F3C', textColor: '#5A6478', bgColor: '#FFFFFF' },
    why:          { fontSize: 100, titleColor: '#FFFFFF', textColor: '#C9D2E3', bgColor: '#0D1F3C' },
    projects:     { fontSize: 100, titleColor: '#FFFFFF', textColor: '#C9D2E3', bgColor: '#16294D' },
    testimonials: { fontSize: 100, titleColor: '#FFFFFF', textColor: '#C9D2E3', bgColor: '#0D1F3C' },
    team:         { fontSize: 100, titleColor: '#0D1F3C', textColor: '#5A6478', bgColor: '#FFFFFF' },
    blog:         { fontSize: 100, titleColor: '#0D1F3C', textColor: '#5A6478', bgColor: '#F5F7FA' },
    contact:      { fontSize: 100, titleColor: '#0D1F3C', textColor: '#5A6478', bgColor: '#FFFFFF' },
    footer:       { fontSize: 100, titleColor: '#FFFFFF', textColor: 'rgba(255,255,255,0.6)', bgColor: '#0D1F3C' },
  },
  legal: {
    privacyPolicy: `# Privacy Policy\n\nLast updated: June 2024\n\nCoreX Enterprises is committed to protecting your privacy.\n\n## Information We Collect\nWe collect name, email, phone number, and message from our contact form.\n\n## How We Use Your Information\nWe use your information solely to respond to your enquiries.\n\n## Data Security\nYour data is kept secure and never sold to third parties.\n\n## Contact\ninfo.corexenterprises@gmail.com`,
    termsConditions: `# Terms & Conditions\n\nLast updated: June 2024\n\nBy accessing the CoreX Enterprises website, you agree to the following terms.\n\n## Use of Website\nThis website is for informational purposes. All product information is subject to change.\n\n## Enquiries\nSubmitting an enquiry form does not constitute a binding order or contract.\n\n## Intellectual Property\nAll content on this site is the property of CoreX Enterprises.\n\n## Contact\ninfo.corexenterprises@gmail.com`,
  },
};

// Deep merge helper
function deepMerge(defaults, saved) {
  const result = { ...defaults };
  for (const key of Object.keys(saved || {})) {
    if (saved[key] && typeof saved[key] === 'object' && !Array.isArray(saved[key]) && defaults[key] && typeof defaults[key] === 'object') {
      result[key] = { ...defaults[key], ...saved[key] };
    } else if (saved[key] !== undefined) {
      result[key] = saved[key];
    }
  }
  return result;
}

const STORAGE_KEY = 'corex_site_data';
const SiteDataContext = createContext(null);

// --- Cloud save/load ---
async function cloudSave(data) {
  if (!USE_CLOUD) return;
  await fetch(JSONBIN_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_API_KEY },
    body: JSON.stringify(data),
  });
}

async function cloudLoad() {
  if (!USE_CLOUD) return null;
  try {
    const res = await fetch(`${JSONBIN_URL}/latest`, {
      headers: { 'X-Master-Key': JSONBIN_API_KEY },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.record || null;
  } catch { return null; }
}

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(() => {
    // Load from localStorage first (instant, no flicker)
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return deepMerge(DEFAULT_DATA, JSON.parse(stored));
    } catch {}
    return DEFAULT_DATA;
  });
  const [cloudStatus, setCloudStatus] = useState('idle'); // idle | saving | saved | error

  // On mount: if cloud configured, load latest from cloud (overrides localStorage)
  useEffect(() => {
    if (!USE_CLOUD) return;
    cloudLoad().then(cloudData => {
      if (cloudData && Object.keys(cloudData).length > 0) {
        const merged = deepMerge(DEFAULT_DATA, cloudData);
        setData(merged);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch {}
      }
    });
  }, []);

  const updateSection = useCallback((section, value) => {
    setData(prev => {
      const next = { ...prev, [section]: value };
      // Always save to localStorage (instant, works offline)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      // Also save to cloud if configured
      if (USE_CLOUD) {
        setCloudStatus('saving');
        cloudSave(next)
          .then(() => { setCloudStatus('saved'); setTimeout(() => setCloudStatus('idle'), 2000); })
          .catch(() => { setCloudStatus('error'); setTimeout(() => setCloudStatus('idle'), 3000); });
      }
      return next;
    });
  }, []);

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    if (USE_CLOUD) cloudSave(DEFAULT_DATA).catch(() => {});
    setData(DEFAULT_DATA);
  };

  return (
    <SiteDataContext.Provider value={{ data, updateSection, resetAll, DEFAULT_DATA, cloudStatus, USE_CLOUD }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
