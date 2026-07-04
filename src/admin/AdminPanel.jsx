import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import './AdminPanel.css';

const TABS = [
  { id: 'globaltheme', label: '🌐 Global Theme' },
  { id: 'hero',        label: '🏠 Hero' },
  { id: 'about',       label: '📖 About' },
  { id: 'products',    label: '📦 Products' },
  { id: 'services',    label: '🛠 Services' },
  { id: 'team',        label: '👥 Team' },
  { id: 'testimonials',label: '💬 Testimonials' },
  { id: 'projects',    label: '🏗 Projects' },
  { id: 'blog',        label: '📝 Blog' },
  { id: 'contact',     label: '📞 Contact' },
  { id: 'social',      label: '🔗 Social Links' },
  { id: 'seo',         label: '🔍 SEO' },
  { id: 'legal',       label: '⚖️ Legal' },
  { id: 'branding',    label: '🎨 Branding' },
];

/* ─── Shared field components ─── */
function Field({ label, value, onChange, type = 'text', rows }) {
  if (type === 'textarea') {
    return (
      <div className="adm-field">
        <label>{label}</label>
        <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows || 4} />
      </div>
    );
  }
  return (
    <div className="adm-field">
      <label>{label}</label>
      <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

function ColorPicker({ label, value, onChange }) {
  const safeHex = /^#[0-9A-Fa-f]{6}$/.test(value) ? value : '#000000';
  return (
    <div className="adm-field adm-color-field">
      <label>{label}</label>
      <div className="adm-color-row">
        <input type="color" value={safeHex} onChange={e => onChange(e.target.value)} />
        <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="#000000" />
      </div>
    </div>
  );
}

/* ─── Global Theme Tab ─── */
function GlobalThemeTab({ data, updateSection }) {
  const defaults = { fontSizeScale: 100, headingColor: '', bodyColor: '', linkAccentColor: '#F47320', fontFamily: 'default' };
  const [t, setT] = useState({ ...defaults, ...(data.globalTheme || {}) });
  const [saved, setSaved] = useState(false);

  const applyLive = (newT) => {
    const r = document.documentElement;
    r.style.setProperty('--global-font-scale', (newT.fontSizeScale || 100) / 100);
    if (newT.headingColor) r.style.setProperty('--global-heading-color', newT.headingColor);
    else r.style.removeProperty('--global-heading-color');
    if (newT.bodyColor) r.style.setProperty('--global-body-color', newT.bodyColor);
    else r.style.removeProperty('--global-body-color');
    r.style.setProperty('--global-accent-color', newT.linkAccentColor || '#F47320');
    const fonts = { default:"'Inter',sans-serif", modern:"'Poppins',sans-serif", classic:"Georgia,serif" };
    r.style.setProperty('--global-font-family', fonts[newT.fontFamily] || fonts.default);
  };

  const upd = (k, v) => { const n = { ...t, [k]: v }; setT(n); applyLive(n); };

  const save = () => {
    updateSection('globalTheme', t);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const reset = () => {
    setT(defaults);
    updateSection('globalTheme', defaults);
    applyLive(defaults);
  };

  const pct = Math.round((((t.fontSizeScale || 100) - 80) / 60) * 100);

  return (
    <div>
      <h3>🌐 Global Theme</h3>
      <p className="adm-hint">Yeh settings <strong>poori website</strong> par ek saath apply hoti hain. Slider hilate hi <strong>live preview</strong> milega.</p>

      {/* Font Size */}
      <div className="adm-card adm-style-card">
        <h4 className="adm-style-card__title">📏 Font Size (Poori Website)</h4>
        <div className="adm-field">
          <label>Text Size — <strong style={{color:'#F47320'}}>{t.fontSizeScale || 100}%</strong></label>
          <input
            type="range" min="80" max="140" step="5"
            value={t.fontSizeScale || 100}
            onChange={e => upd('fontSizeScale', Number(e.target.value))}
            className="adm-range"
            style={{'--val': `${pct}%`}}
          />
          <div className="adm-range-labels"><span>80% (Chhota)</span><span>100% (Default)</span><span>140% (Bada)</span></div>
        </div>
      </div>

      {/* Font Family */}
      <div className="adm-card adm-style-card">
        <h4 className="adm-style-card__title">🔤 Font Family</h4>
        <div className="adm-font-options">
          {[
            { val: 'default', name: 'Inter',    sample: 'Clean & Modern' },
            { val: 'modern',  name: 'Poppins',  sample: 'Rounded & Friendly' },
            { val: 'classic', name: 'Georgia',  sample: 'Traditional Serif' },
          ].map(f => (
            <div
              key={f.val}
              className={`adm-font-card ${(t.fontFamily || 'default') === f.val ? 'selected' : ''}`}
              onClick={() => upd('fontFamily', f.val)}
            >
              <span className="adm-font-name">{f.name}</span>
              <span className="adm-font-sample">{f.sample}</span>
              {(t.fontFamily || 'default') === f.val && <span className="adm-font-check">✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="adm-card adm-style-card">
        <h4 className="adm-style-card__title">🎨 Colors (Poori Website)</h4>
        <div className="adm-color-grid">
          <ColorPicker label="Headings Color" value={t.headingColor} onChange={v => upd('headingColor', v)} />
          <ColorPicker label="Body Text Color" value={t.bodyColor} onChange={v => upd('bodyColor', v)} />
          <ColorPicker label="Accent / Button Color" value={t.linkAccentColor} onChange={v => upd('linkAccentColor', v)} />
        </div>
        <p className="adm-hint" style={{marginTop:'0.75rem'}}>
          💡 Heading/Body color <strong>khaali chodoge</strong> to section ka apna default color rahega.
        </p>
      </div>

      <div style={{display:'flex',gap:'1rem',alignItems:'center',flexWrap:'wrap',marginTop:'0.5rem'}}>
        <button className="adm-save" onClick={save}>{saved ? '✅ Saved!' : 'Save Theme'}</button>
        <button className="adm-add" onClick={reset}>↺ Reset Default</button>
        {saved && <span style={{color:'#1FAE5C',fontSize:'0.85rem',fontWeight:600}}>Permanently saved!</span>}
      </div>
    </div>
  );
}

/* ─── Hero Tab ─── */
function HeroTab({ data, updateSection }) {
  const [h, setH] = useState({ ...data.hero });
  const save = () => { updateSection('hero', h); alert('✅ Hero saved!'); };
  const upd = k => v => setH(p => ({ ...p, [k]: v }));
  return (
    <div>
      <h3>🏠 Hero Section</h3>
      <Field label="Eyebrow Text" value={h.eyebrow} onChange={upd('eyebrow')} />
      <Field label="Subtitle" value={h.subtitle} onChange={upd('subtitle')} type="textarea" />
      <Field label="CTA Button 1" value={h.cta1} onChange={upd('cta1')} />
      <Field label="CTA Button 2" value={h.cta2} onChange={upd('cta2')} />
      <button className="adm-save" onClick={save}>Save Hero</button>
    </div>
  );
}

/* ─── About Tab ─── */
function AboutTab({ data, updateSection }) {
  const [a, setA] = useState({ ...data.about });
  const save = () => { updateSection('about', a); alert('✅ About saved!'); };
  const upd = k => v => setA(p => ({ ...p, [k]: v }));
  return (
    <div>
      <h3>📖 About Us</h3>
      <Field label="Label" value={a.label} onChange={upd('label')} />
      <Field label="Title" value={a.title} onChange={upd('title')} />
      <Field label="Body Text" value={a.body} onChange={upd('body')} type="textarea" rows={5} />
      <Field label="Founded Year" value={a.founded} onChange={upd('founded')} />
      <Field label="City / Location" value={a.city} onChange={upd('city')} />
      <Field label="Tagline" value={a.tagline} onChange={upd('tagline')} />
      <button className="adm-save" onClick={save}>Save About</button>
    </div>
  );
}

/* ─── Products Tab ─── */
function ProductsTab({ data, updateSection }) {
  const [items, setItems] = useState([...data.products]);
  const save = () => { updateSection('products', items); alert('✅ Products saved!'); };
  const upd = (idx, k) => v => setItems(p => p.map((it, i) => i === idx ? { ...it, [k]: v } : it));
  const updItems = idx => v => upd(idx, 'items')(v.split('\n'));
  const del = idx => setItems(p => p.filter((_, i) => i !== idx));
  const add = () => setItems(p => [...p, { id: Date.now(), icon: '📦', title: '', items: [] }]);
  return (
    <div>
      <h3>📦 Products</h3>
      {items.map((prod, idx) => (
        <div key={prod.id || idx} className="adm-card">
          <Field label="Icon (emoji)" value={prod.icon} onChange={upd(idx, 'icon')} />
          <Field label="Title" value={prod.title} onChange={upd(idx, 'title')} />
          <Field label="Items (ek line mein ek)" value={(prod.items || []).join('\n')} onChange={updItems(idx)} type="textarea" rows={4} />
          <button className="adm-delete" onClick={() => del(idx)}>🗑 Delete</button>
        </div>
      ))}
      <button className="adm-add" onClick={add}>+ Add Product</button>
      <button className="adm-save" onClick={save}>Save Products</button>
    </div>
  );
}

/* ─── Generic List Tab ─── */
function ListTab({ sectionKey, label, fields, data, updateSection }) {
  const [items, setItems] = useState([...(data[sectionKey] || [])]);
  const save = () => { updateSection(sectionKey, items); alert(`✅ ${label} saved!`); };
  const upd = (idx, k) => v => setItems(p => p.map((it, i) => i === idx ? { ...it, [k]: v } : it));
  const del = idx => setItems(p => p.filter((_, i) => i !== idx));
  const add = () => setItems(p => [...p, { id: Date.now(), ...Object.fromEntries(fields.map(f => [f.key, ''])) }]);
  return (
    <div>
      <h3>{label}</h3>
      {items.map((item, idx) => (
        <div key={item.id || idx} className="adm-card">
          {fields.map(f => (
            <Field key={f.key} label={f.label} value={item[f.key]} onChange={upd(idx, f.key)} type={f.type} rows={f.rows} />
          ))}
          <button className="adm-delete" onClick={() => del(idx)}>🗑 Delete</button>
        </div>
      ))}
      <button className="adm-add" onClick={add}>+ Add</button>
      <button className="adm-save" onClick={save}>Save {label}</button>
    </div>
  );
}

/* ─── Contact Tab ─── */
function ContactTab({ data, updateSection }) {
  const [c, setC] = useState({ ...data.contact });
  const save = () => { updateSection('contact', c); alert('✅ Contact saved!'); };
  const upd = k => v => setC(p => ({ ...p, [k]: v }));
  return (
    <div>
      <h3>📞 Contact Details</h3>
      <Field label="Email" value={c.email} onChange={upd('email')} type="email" />
      <Field label="Mobile" value={c.mobile} onChange={upd('mobile')} />
      <Field label="Address" value={c.address} onChange={upd('address')} type="textarea" rows={2} />
      <Field label="GST Number" value={c.gst} onChange={upd('gst')} />
      <Field label="WhatsApp Number (country code ke saath, e.g. 919876543210)" value={c.whatsapp} onChange={upd('whatsapp')} />
      <button className="adm-save" onClick={save}>Save Contact</button>
    </div>
  );
}

/* ─── Social Tab ─── */
function SocialTab({ data, updateSection }) {
  const [s, setS] = useState({ ...data.social });
  const save = () => { updateSection('social', s); alert('✅ Social Links saved!'); };
  const upd = k => v => setS(p => ({ ...p, [k]: v }));
  return (
    <div>
      <h3>🔗 Social Media Links</h3>
      <p className="adm-hint">Blank chodne par woh button hide ho jayega.</p>
      <Field label="WhatsApp URL" value={s.whatsapp} onChange={upd('whatsapp')} />
      <Field label="Instagram URL" value={s.instagram} onChange={upd('instagram')} />
      <Field label="LinkedIn URL" value={s.linkedin} onChange={upd('linkedin')} />
      <Field label="Facebook URL" value={s.facebook} onChange={upd('facebook')} />
      <Field label="Twitter / X URL" value={s.twitter} onChange={upd('twitter')} />
      <Field label="YouTube URL" value={s.youtube} onChange={upd('youtube')} />
      <Field label="Telegram URL" value={s.telegram} onChange={upd('telegram')} />
      <button className="adm-save" onClick={save}>Save Social Links</button>
    </div>
  );
}

/* ─── SEO Tab ─── */
function SEOTab({ data, updateSection }) {
  const [s, setS] = useState({ ...data.seo });
  const save = () => { updateSection('seo', s); alert('✅ SEO saved!'); };
  const upd = k => v => setS(p => ({ ...p, [k]: v }));
  return (
    <div>
      <h3>🔍 SEO & Meta Tags</h3>
      <Field label="Page Title" value={s.title} onChange={upd('title')} />
      <Field label="Meta Description" value={s.description} onChange={upd('description')} type="textarea" rows={3} />
      <Field label="Keywords (comma separated)" value={s.keywords} onChange={upd('keywords')} />
      <Field label="Open Graph Image URL" value={s.ogImage} onChange={upd('ogImage')} />
      <Field label="Google Analytics ID (e.g. G-XXXXXXX)" value={s.gaId} onChange={upd('gaId')} />
      <button className="adm-save" onClick={save}>Save SEO</button>
    </div>
  );
}

/* ─── Legal Tab ─── */
function LegalTab({ data, updateSection }) {
  const [l, setL] = useState({ ...data.legal });
  const save = () => { updateSection('legal', l); alert('✅ Legal pages saved!'); };
  const upd = k => v => setL(p => ({ ...p, [k]: v }));
  return (
    <div>
      <h3>⚖️ Legal Pages</h3>
      <p className="adm-hint">Markdown formatting use kar sakte ho (# Heading, ## Subheading).</p>
      <Field label="Privacy Policy" value={l.privacyPolicy} onChange={upd('privacyPolicy')} type="textarea" rows={12} />
      <Field label="Terms & Conditions" value={l.termsConditions} onChange={upd('termsConditions')} type="textarea" rows={12} />
      <button className="adm-save" onClick={save}>Save Legal Pages</button>
    </div>
  );
}

/* ─── Branding Tab ─── */
function BrandingTab({ data, updateSection }) {
  const [b, setB] = useState({ ...data.branding });
  const save = () => { updateSection('branding', b); alert('✅ Branding saved!'); };
  const upd = k => v => setB(p => ({ ...p, [k]: v }));
  return (
    <div>
      <h3>🎨 Branding</h3>
      <Field label="Logo URL (blank = text logo)" value={b.logo} onChange={upd('logo')} />
      <Field label="Favicon URL" value={b.favicon} onChange={upd('favicon')} />
      <Field label="Primary Color (hex)" value={b.primaryColor} onChange={upd('primaryColor')} />
      <button className="adm-save" onClick={save}>Save Branding</button>
    </div>
  );
}

/* ─── Main AdminPanel ─── */
const ADMIN_PASSWORD = 'corex@admin2024';

export default function AdminPanel() {
  const { data, updateSection, resetAll, cloudStatus, USE_CLOUD } = useSiteData();
  const [tab, setTab] = useState('globaltheme');
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState(false);

  const cloudBadge =
    !USE_CLOUD              ? '⚠️ Local Only' :
    cloudStatus === 'saving' ? '☁️ Saving…' :
    cloudStatus === 'saved'  ? '✅ Cloud Saved!' :
    cloudStatus === 'error'  ? '❌ Save Failed' :
                               '☁️ Cloud Sync ON';

  if (!auth) {
    return (
      <div className="adm-login">
        <div className="adm-login-grid" aria-hidden="true" />
        <div className="adm-login-box">
          <div className="adm-login-icon">🔒</div>
          <div className="adm-login-logo">CORE<span>X</span></div>
          <p className="adm-login-sub">Admin Control Panel</p>
          <input
            type="password" placeholder="Enter password" value={pw}
            onChange={e => { setPw(e.target.value); setPwErr(false); }}
            onKeyDown={e => { if (e.key === 'Enter') { if (pw === ADMIN_PASSWORD) setAuth(true); else setPwErr(true); } }}
          />
          {pwErr && <p className="adm-login-err">Incorrect password</p>}
          <button onClick={() => { if (pw === ADMIN_PASSWORD) setAuth(true); else setPwErr(true); }}>Login →</button>
          <div className="adm-login-divider">Secure Access</div>
          <a href="/" className="adm-login-back">← Back to Website</a>
          <p className="adm-login-footer-tag">CoreX Enterprises · Supplying the Core of Industry</p>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-root">
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">CORE<span>X</span><br /><small>Admin Panel</small></div>
        <div className="adm-sidebar-section">Sections</div>
        {TABS.map(t => (
          <button key={t.id} className={`adm-tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
        <div className="adm-sidebar-footer">
          <a href="/" className="adm-tab-btn" style={{textDecoration:'none'}}>🌐 View Site</a>
          <button className="adm-tab-btn adm-danger" onClick={() => { if (window.confirm('Reset ALL data?')) { resetAll(); alert('Done!'); } }}>🔄 Reset All</button>
        </div>
      </aside>

      <main className="adm-main">
        <div className="adm-topbar">
          <span className="adm-topbar-title">{TABS.find(t => t.id === tab)?.label || ''}</span>
          <span className={`adm-topbar-badge ${cloudStatus === 'error' ? 'adm-badge--error' : cloudStatus === 'saved' ? 'adm-badge--saved' : USE_CLOUD ? '' : 'adm-badge--warn'}`}>
            {cloudBadge}
          </span>
        </div>

        {!USE_CLOUD && (
          <div className="adm-cloud-notice">
            ⚠️ <strong>Cloud setup nahi hua hai</strong> — data sirf is browser mein save ho raha hai. Refresh ke baad ja sakta hai. JSONBin setup karo permanent save ke liye.
          </div>
        )}

        <div className="adm-content" key={tab}>
          {tab === 'globaltheme'  && <GlobalThemeTab data={data} updateSection={updateSection} />}
          {tab === 'hero'         && <HeroTab data={data} updateSection={updateSection} />}
          {tab === 'about'        && <AboutTab data={data} updateSection={updateSection} />}
          {tab === 'products'     && <ProductsTab data={data} updateSection={updateSection} />}
          {tab === 'services'     && <ListTab sectionKey="services" label="🛠 Services" data={data} updateSection={updateSection}
            fields={[{key:'icon',label:'Icon (emoji)'},{key:'title',label:'Title'},{key:'desc',label:'Description',type:'textarea',rows:3}]} />}
          {tab === 'team'         && <ListTab sectionKey="team" label="👥 Team Members" data={data} updateSection={updateSection}
            fields={[{key:'name',label:'Name'},{key:'role',label:'Role'},{key:'bio',label:'Bio',type:'textarea',rows:3}]} />}
          {tab === 'testimonials' && <ListTab sectionKey="testimonials" label="💬 Testimonials" data={data} updateSection={updateSection}
            fields={[{key:'name',label:'Client Name'},{key:'company',label:'Company'},{key:'text',label:'Review',type:'textarea',rows:3},{key:'rating',label:'Rating (1-5)'}]} />}
          {tab === 'projects'     && <ListTab sectionKey="projects" label="🏗 Projects" data={data} updateSection={updateSection}
            fields={[{key:'title',label:'Project Title'},{key:'client',label:'Client'},{key:'year',label:'Year'},{key:'desc',label:'Description',type:'textarea',rows:3}]} />}
          {tab === 'blog'         && <ListTab sectionKey="blog" label="📝 Blog Posts" data={data} updateSection={updateSection}
            fields={[{key:'title',label:'Title'},{key:'date',label:'Date (YYYY-MM-DD)'},{key:'excerpt',label:'Excerpt',type:'textarea',rows:2},{key:'content',label:'Full Content',type:'textarea',rows:8},{key:'image',label:'Image URL'}]} />}
          {tab === 'contact'      && <ContactTab data={data} updateSection={updateSection} />}
          {tab === 'social'       && <SocialTab data={data} updateSection={updateSection} />}
          {tab === 'seo'          && <SEOTab data={data} updateSection={updateSection} />}
          {tab === 'legal'        && <LegalTab data={data} updateSection={updateSection} />}
          {tab === 'branding'     && <BrandingTab data={data} updateSection={updateSection} />}
        </div>
      </main>
    </div>
  );
}
