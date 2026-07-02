import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import './AdminPanel.css';

const TABS = [
  { id: 'globaltheme', label: '🌐 Global Theme' },
  { id: 'hero', label: '🏠 Hero' },
  { id: 'about', label: '📖 About' },
  { id: 'products', label: '📦 Products' },
  { id: 'services', label: '🛠 Services' },
  { id: 'team', label: '👥 Team' },
  { id: 'testimonials', label: '💬 Testimonials' },
  { id: 'projects', label: '🏗 Projects' },
  { id: 'blog', label: '📝 Blog' },
  { id: 'contact', label: '📞 Contact' },
  { id: 'social', label: '🔗 Social Links' },
  { id: 'seo', label: '🔍 SEO' },
  { id: 'legal', label: '⚖️ Legal' },
  { id: 'branding', label: '🎨 Branding' },
  { id: 'styling', label: '🎚 Design & Fonts' },
];

function ColorField({ label, value, onChange }) {
  return (
    <div className="adm-field adm-color-field">
      <label>{label}</label>
      <div className="adm-color-row">
        <input type="color" value={/^#[0-9A-Fa-f]{6}$/.test(value) ? value : '#000000'} onChange={e => onChange(e.target.value)} />
        <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="#000000 or rgba(...)" />
      </div>
    </div>
  );
}

function GlobalThemeTab({ data, updateSection }) {
  const [t, setT] = useState({ ...data.globalTheme });
  const [saved, setSaved] = useState(false);

  // Live preview — apply to root immediately as slider/picker changes
  const applyLive = (newT) => {
    const root = document.documentElement;
    const scale = (newT.fontSizeScale || 100) / 100;
    root.style.setProperty('--global-font-scale', scale);
    if (newT.headingColor) root.style.setProperty('--global-heading-color', newT.headingColor);
    else root.style.removeProperty('--global-heading-color');
    if (newT.bodyColor) root.style.setProperty('--global-body-color', newT.bodyColor);
    else root.style.removeProperty('--global-body-color');
    root.style.setProperty('--global-accent-color', newT.linkAccentColor || '#F47320');
    const stacks = { default:"'Inter',sans-serif", modern:"'Poppins','Inter',sans-serif", classic:"Georgia,serif" };
    root.style.setProperty('--global-font-family', stacks[newT.fontFamily] || stacks.default);
  };

  const upd = (k, v) => {
    const newT = { ...t, [k]: v };
    setT(newT);
    applyLive(newT);
  };

  const save = () => {
    updateSection('globalTheme', t);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const reset = () => {
    const defaults = { fontSizeScale: 100, headingColor: '', bodyColor: '', linkAccentColor: '#F47320', fontFamily: 'default' };
    setT(defaults);
    updateSection('globalTheme', defaults);
    applyLive(defaults);
  };

  return (
    <div>
      <h3>🌐 Global Theme</h3>
      <p className="adm-hint">
        Yeh settings <strong>poori website</strong> par ek saath apply hoti hain — Hero, About, Products, Testimonials, Footer, sab kuch.
        Slider hilate hi <strong>live preview</strong> dikhega. Save karo to permanently store ho jaayega.
      </p>

      {/* FONT SIZE */}
      <div className="adm-card adm-style-card">
        <h4 className="adm-style-card__title">📏 Site-wide Font Size</h4>
        <div className="adm-field">
          <label>Text Size — <strong style={{color:'#F47320'}}>{t.fontSizeScale || 100}%</strong></label>
          <input
            type="range" min="80" max="140" step="5"
            value={t.fontSizeScale || 100}
            onChange={e => upd('fontSizeScale', Number(e.target.value))}
            className="adm-range"
            style={{ '--val': `${(((t.fontSizeScale || 100) - 80) / 60) * 100}%` }}
          />
          <div className="adm-range-labels"><span>80% (Small)</span><span>100% (Default)</span><span>140% (Large)</span></div>
        </div>
      </div>

      {/* FONT FAMILY */}
      <div className="adm-card adm-style-card">
        <h4 className="adm-style-card__title">🔤 Font Family (Puri Website)</h4>
        <div className="adm-font-options">
          {[
            { val: 'default', label: 'Inter', sample: 'Clean & Modern', style: { fontFamily: "'Inter',sans-serif" } },
            { val: 'modern',  label: 'Poppins', sample: 'Rounded & Friendly', style: { fontFamily: "'Poppins','Inter',sans-serif" } },
            { val: 'classic', label: 'Georgia', sample: 'Traditional Serif', style: { fontFamily: "Georgia,serif" } },
          ].map(f => (
            <div
              key={f.val}
              className={`adm-font-card ${(t.fontFamily || 'default') === f.val ? 'selected' : ''}`}
              onClick={() => upd('fontFamily', f.val)}
            >
              <span className="adm-font-name" style={f.style}>{f.label}</span>
              <span className="adm-font-sample" style={f.style}>{f.sample}</span>
              {(t.fontFamily || 'default') === f.val && <span className="adm-font-check">✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* COLORS */}
      <div className="adm-card adm-style-card">
        <h4 className="adm-style-card__title">🎨 Site-wide Colors</h4>
        <div className="adm-color-grid">
          <div className="adm-field adm-color-field">
            <label>Headings Color <small>(titles, section names)</small></label>
            <div className="adm-color-row">
              <input type="color"
                value={/^#[0-9A-Fa-f]{6}$/.test(t.headingColor) ? t.headingColor : '#0D1F3C'}
                onChange={e => upd('headingColor', e.target.value)} />
              <input type="text" value={t.headingColor || ''} onChange={e => upd('headingColor', e.target.value)}
                placeholder="Leave empty = section default" />
            </div>
          </div>
          <div className="adm-field adm-color-field">
            <label>Body Text Color <small>(paragraphs, descriptions)</small></label>
            <div className="adm-color-row">
              <input type="color"
                value={/^#[0-9A-Fa-f]{6}$/.test(t.bodyColor) ? t.bodyColor : '#5A6478'}
                onChange={e => upd('bodyColor', e.target.value)} />
              <input type="text" value={t.bodyColor || ''} onChange={e => upd('bodyColor', e.target.value)}
                placeholder="Leave empty = section default" />
            </div>
          </div>
          <div className="adm-field adm-color-field">
            <label>Accent Color <small>(buttons, links, highlights)</small></label>
            <div className="adm-color-row">
              <input type="color"
                value={/^#[0-9A-Fa-f]{6}$/.test(t.linkAccentColor) ? t.linkAccentColor : '#F47320'}
                onChange={e => upd('linkAccentColor', e.target.value)} />
              <input type="text" value={t.linkAccentColor || '#F47320'} onChange={e => upd('linkAccentColor', e.target.value)}
                placeholder="#F47320" />
            </div>
          </div>
        </div>
        <p className="adm-hint" style={{marginTop:'1rem'}}>
          💡 Heading/Body color <strong>khaali chodoge</strong> to section ka default color rahega. Accent color hamesha buttons aur links par lagta hai.
        </p>
      </div>

      <div style={{display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap', marginTop:'0.5rem'}}>
        <button className="adm-save" onClick={save}>
          {saved ? '✅ Saved!' : 'Save Theme'}
        </button>
        <button className="adm-add" onClick={reset}>↺ Reset to Default</button>
        {saved && <span style={{color:'#1FAE5C', fontSize:'0.85rem', fontWeight:600}}>Changes saved permanently!</span>}
      </div>
    </div>
  );
}

function SectionStylingCard({ label, sectionKey, value, onChange }) {
  const upd = k => v => onChange({ ...value, [k]: v });
  return (
    <div className="adm-card adm-style-card">
      <h4 className="adm-style-card__title">{label}</h4>
      <div className="adm-field">
        <label>Font Size — {value.fontSize || 100}%</label>
        <input
          type="range" min="70" max="160" step="5"
          value={value.fontSize || 100}
          onChange={e => upd('fontSize')(Number(e.target.value))}
          className="adm-range"
          style={{ '--val': `${(((value.fontSize || 100) - 70) / 90) * 100}%` }}
        />
        <div className="adm-range-labels"><span>Small</span><span>Normal</span><span>Large</span></div>
      </div>
      <div className="adm-color-grid">
        <ColorField label="Heading Color" value={value.titleColor} onChange={upd('titleColor')}/>
        <ColorField label="Text Color" value={value.textColor} onChange={upd('textColor')}/>
        <ColorField label="Background Color" value={value.bgColor} onChange={upd('bgColor')}/>
      </div>
    </div>
  );
}

const STYLING_SECTIONS = [
  { key: 'hero', label: 'Hero Section' },
  { key: 'about', label: 'About Us' },
  { key: 'products', label: 'Products' },
  { key: 'why', label: 'Why CoreX' },
  { key: 'projects', label: 'Projects' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'team', label: 'Team' },
  { key: 'blog', label: 'Blog' },
  { key: 'contact', label: 'Contact' },
  { key: 'footer', label: 'Footer' },
];

function StylingTab({ data, updateSection }) {
  const [styles, setStyles] = useState({ ...data.styling });
  const save = () => { updateSection('styling', styles); alert('✅ Design settings saved! Refresh the site to see changes.'); };
  const updSection = key => val => setStyles(prev => ({ ...prev, [key]: val }));
  return (
    <div>
      <h3>🎚 Design & Fonts</h3>
      <p className="adm-hint">Customize font size and colors for each section of your website. Changes apply instantly after saving.</p>
      {STYLING_SECTIONS.map(sec => (
        <SectionStylingCard
          key={sec.key}
          label={sec.label}
          sectionKey={sec.key}
          value={styles[sec.key] || {}}
          onChange={updSection(sec.key)}
        />
      ))}
      <button className="adm-save" onClick={save}>Save Design Settings</button>
    </div>
  );
}


  if (type === 'textarea') {
    return (
      <div className="adm-field">
        <label>{label}</label>
        <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows || 4}/>
      </div>
    );
  }
  return (
    <div className="adm-field">
      <label>{label}</label>
      <input type={type} value={value || ''} onChange={e => onChange(e.target.value)}/>
    </div>
  );
}

function HeroTab({ data, updateSection }) {
  const [h, setH] = useState({ ...data.hero });
  const save = () => { updateSection('hero', h); alert('✅ Hero saved!'); };
  const upd = k => v => setH(prev => ({ ...prev, [k]: v }));
  return (
    <div>
      <h3>Hero Section</h3>
      <Field label="Eyebrow Text" value={h.eyebrow} onChange={upd('eyebrow')}/>
      <Field label="Subtitle" value={h.subtitle} onChange={upd('subtitle')} type="textarea"/>
      <Field label="CTA Button 1" value={h.cta1} onChange={upd('cta1')}/>
      <Field label="CTA Button 2" value={h.cta2} onChange={upd('cta2')}/>
      <button className="adm-save" onClick={save}>Save Hero</button>
    </div>
  );
}

function AboutTab({ data, updateSection }) {
  const [a, setA] = useState({ ...data.about });
  const save = () => { updateSection('about', a); alert('✅ About saved!'); };
  const upd = k => v => setA(prev => ({ ...prev, [k]: v }));
  return (
    <div>
      <h3>About Us</h3>
      <Field label="Label" value={a.label} onChange={upd('label')}/>
      <Field label="Title" value={a.title} onChange={upd('title')}/>
      <Field label="Body Text" value={a.body} onChange={upd('body')} type="textarea" rows={5}/>
      <Field label="Founded Year" value={a.founded} onChange={upd('founded')}/>
      <Field label="City / Location" value={a.city} onChange={upd('city')}/>
      <Field label="Tagline" value={a.tagline} onChange={upd('tagline')}/>
      <button className="adm-save" onClick={save}>Save About</button>
    </div>
  );
}

function ListTab({ sectionKey, label, fields, data, updateSection }) {
  const [items, setItems] = useState([...data[sectionKey]]);
  const save = () => { updateSection(sectionKey, items); alert(`✅ ${label} saved!`); };
  const upd = (idx, k) => v => setItems(prev => prev.map((it, i) => i === idx ? { ...it, [k]: v } : it));
  const del = idx => setItems(prev => prev.filter((_, i) => i !== idx));
  const add = () => setItems(prev => [...prev, { id: Date.now(), ...Object.fromEntries(fields.map(f => [f.key, ''])) }]);
  return (
    <div>
      <h3>{label}</h3>
      {items.map((item, idx) => (
        <div key={item.id || idx} className="adm-card">
          {fields.map(f => (
            <Field key={f.key} label={f.label} value={item[f.key]} onChange={upd(idx, f.key)} type={f.type} rows={f.rows}/>
          ))}
          <button className="adm-delete" onClick={() => del(idx)}>🗑 Delete</button>
        </div>
      ))}
      <button className="adm-add" onClick={add}>+ Add {label.replace(/s$/, '')}</button>
      <button className="adm-save" onClick={save}>Save {label}</button>
    </div>
  );
}

function ProductsTab({ data, updateSection }) {
  const [items, setItems] = useState([...data.products]);
  const save = () => { updateSection('products', items); alert('✅ Products saved!'); };
  const upd = (idx, k) => v => setItems(prev => prev.map((it, i) => i === idx ? { ...it, [k]: v } : it));
  const updItems = idx => v => upd(idx, 'items')(v.split('\n'));
  const del = idx => setItems(prev => prev.filter((_, i) => i !== idx));
  const add = () => setItems(prev => [...prev, { id: Date.now(), icon: '📦', title: '', items: [] }]);
  return (
    <div>
      <h3>Products</h3>
      {items.map((p, idx) => (
        <div key={p.id || idx} className="adm-card">
          <Field label="Icon (emoji)" value={p.icon} onChange={upd(idx, 'icon')}/>
          <Field label="Title" value={p.title} onChange={upd(idx, 'title')}/>
          <Field label="Items (one per line)" value={(p.items || []).join('\n')} onChange={updItems(idx)} type="textarea" rows={4}/>
          <button className="adm-delete" onClick={() => del(idx)}>🗑 Delete</button>
        </div>
      ))}
      <button className="adm-add" onClick={add}>+ Add Product</button>
      <button className="adm-save" onClick={save}>Save Products</button>
    </div>
  );
}

function ContactTab({ data, updateSection }) {
  const [c, setC] = useState({ ...data.contact });
  const save = () => { updateSection('contact', c); alert('✅ Contact saved!'); };
  const upd = k => v => setC(prev => ({ ...prev, [k]: v }));
  return (
    <div>
      <h3>Contact Details</h3>
      <Field label="Email" value={c.email} onChange={upd('email')} type="email"/>
      <Field label="Mobile" value={c.mobile} onChange={upd('mobile')}/>
      <Field label="Address" value={c.address} onChange={upd('address')} type="textarea" rows={2}/>
      <Field label="GST Number" value={c.gst} onChange={upd('gst')}/>
      <Field label="WhatsApp Number (with country code, e.g. 919876543210)" value={c.whatsapp} onChange={upd('whatsapp')}/>
      <button className="adm-save" onClick={save}>Save Contact</button>
    </div>
  );
}

function SocialTab({ data, updateSection }) {
  const [s, setS] = useState({ ...data.social });
  const save = () => { updateSection('social', s); alert('✅ Social Links saved!'); };
  const upd = k => v => setS(prev => ({ ...prev, [k]: v }));
  return (
    <div>
      <h3>Social Media Links</h3>
      <p className="adm-hint">Leave blank to hide a platform button.</p>
      <Field label="WhatsApp URL" value={s.whatsapp} onChange={upd('whatsapp')}/>
      <Field label="Instagram URL" value={s.instagram} onChange={upd('instagram')}/>
      <Field label="LinkedIn URL" value={s.linkedin} onChange={upd('linkedin')}/>
      <Field label="Facebook URL" value={s.facebook} onChange={upd('facebook')}/>
      <Field label="Twitter / X URL" value={s.twitter} onChange={upd('twitter')}/>
      <Field label="YouTube URL" value={s.youtube} onChange={upd('youtube')}/>
      <Field label="Telegram URL" value={s.telegram} onChange={upd('telegram')}/>
      <button className="adm-save" onClick={save}>Save Social Links</button>
    </div>
  );
}

function SEOTab({ data, updateSection }) {
  const [s, setS] = useState({ ...data.seo });
  const save = () => { updateSection('seo', s); alert('✅ SEO saved! Update index.html meta tags manually for static build.'); };
  const upd = k => v => setS(prev => ({ ...prev, [k]: v }));
  return (
    <div>
      <h3>SEO & Meta Tags</h3>
      <Field label="Page Title" value={s.title} onChange={upd('title')}/>
      <Field label="Meta Description" value={s.description} onChange={upd('description')} type="textarea" rows={3}/>
      <Field label="Keywords (comma separated)" value={s.keywords} onChange={upd('keywords')}/>
      <Field label="Open Graph Image URL" value={s.ogImage} onChange={upd('ogImage')}/>
      <Field label="Google Analytics ID (e.g. G-XXXXXXX)" value={s.gaId} onChange={upd('gaId')}/>
      <button className="adm-save" onClick={save}>Save SEO</button>
    </div>
  );
}

function LegalTab({ data, updateSection }) {
  const [l, setL] = useState({ ...data.legal });
  const save = () => { updateSection('legal', l); alert('✅ Legal pages saved!'); };
  const upd = k => v => setL(prev => ({ ...prev, [k]: v }));
  return (
    <div>
      <h3>Legal Pages</h3>
      <p className="adm-hint">You can use Markdown formatting in these fields.</p>
      <Field label="Privacy Policy" value={l.privacyPolicy} onChange={upd('privacyPolicy')} type="textarea" rows={12}/>
      <Field label="Terms & Conditions" value={l.termsConditions} onChange={upd('termsConditions')} type="textarea" rows={12}/>
      <button className="adm-save" onClick={save}>Save Legal Pages</button>
    </div>
  );
}

function BrandingTab({ data, updateSection }) {
  const [b, setB] = useState({ ...data.branding });
  const save = () => { updateSection('branding', b); alert('✅ Branding saved!'); };
  const upd = k => v => setB(prev => ({ ...prev, [k]: v }));
  return (
    <div>
      <h3>Branding</h3>
      <Field label="Logo URL (leave blank to use text logo)" value={b.logo} onChange={upd('logo')}/>
      <Field label="Favicon URL" value={b.favicon} onChange={upd('favicon')}/>
      <Field label="Primary Color (hex)" value={b.primaryColor} onChange={upd('primaryColor')}/>
      <button className="adm-save" onClick={save}>Save Branding</button>
    </div>
  );
}

const ADMIN_PASSWORD = 'corex@admin2024';

export default function AdminPanel() {
  const { data, updateSection, resetAll } = useSiteData();
  const [tab, setTab] = useState('hero');
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState(false);

  if (!auth) {
    return (
      <div className="adm-login">
        <div className="adm-login-grid" aria-hidden="true"/>
        <div className="adm-login-box">
          <div className="adm-login-icon" aria-hidden="true">
            {data.branding?.logo ? <img src={data.branding.logo} alt="Logo" style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:'14px'}}/> : '🔒'}
          </div>
          <div className="adm-login-logo">CORE<span>X</span></div>
          <p className="adm-login-sub">Admin Control Panel</p>
          <input type="password" placeholder="Enter password" value={pw} onChange={e => { setPw(e.target.value); setPwErr(false); }}
            onKeyDown={e => { if (e.key === 'Enter') { if (pw === ADMIN_PASSWORD) setAuth(true); else setPwErr(true); }}}/>
          {pwErr && <p className="adm-login-err">Incorrect password</p>}
          <button onClick={() => { if (pw === ADMIN_PASSWORD) setAuth(true); else setPwErr(true); }}>Login →</button>
          <div className="adm-login-divider">Secure Access</div>
          <a href="/" className="adm-login-back">← Back to Website</a>
          <p className="adm-login-footer-tag">CoreX Enterprises · Supplying the Core of Industry</p>
        </div>
      </div>
    );
  }

  const currentTabLabel = TABS.find(t => t.id === tab)?.label || '';

  return (
    <div className="adm-root">
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">CORE<span>X</span><br/><small>Admin Panel</small></div>
        <div className="adm-sidebar-section">Content</div>
        {TABS.map(t => (
          <button key={t.id} className={`adm-tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
        <div className="adm-sidebar-footer">
          <a href="/" className="adm-tab-btn" style={{textDecoration:'none',display:'flex',padding:0,marginBottom:'0.5rem'}}>🌐 View Site</a>
          <button className="adm-tab-btn adm-danger" style={{padding:0}} onClick={() => { if (window.confirm('Reset ALL data to defaults?')) { resetAll(); alert('Reset done!'); }}}>🔄 Reset All</button>
        </div>
      </aside>
      <main className="adm-main">
        <div className="adm-topbar">
          <span className="adm-topbar-title">{currentTabLabel}</span>
          <span className="adm-topbar-badge">Live Editing</span>
        </div>
        <div className="adm-content" key={tab}>
          {tab === 'globaltheme' && <GlobalThemeTab data={data} updateSection={updateSection}/>}
          {tab === 'hero' && <HeroTab data={data} updateSection={updateSection}/>}
          {tab === 'about' && <AboutTab data={data} updateSection={updateSection}/>}
          {tab === 'products' && <ProductsTab data={data} updateSection={updateSection}/>}
          {tab === 'services' && <ListTab sectionKey="services" label="Services" data={data} updateSection={updateSection}
            fields={[{key:'icon',label:'Icon (emoji)'},{key:'title',label:'Title'},{key:'desc',label:'Description',type:'textarea',rows:3}]}/>}
          {tab === 'team' && <ListTab sectionKey="team" label="Team Members" data={data} updateSection={updateSection}
            fields={[{key:'name',label:'Name'},{key:'role',label:'Role'},{key:'bio',label:'Bio',type:'textarea',rows:3}]}/>}
          {tab === 'testimonials' && <ListTab sectionKey="testimonials" label="Testimonials" data={data} updateSection={updateSection}
            fields={[{key:'name',label:'Client Name'},{key:'company',label:'Company'},{key:'text',label:'Review',type:'textarea',rows:3},{key:'rating',label:'Rating (1-5)'}]}/>}
          {tab === 'projects' && <ListTab sectionKey="projects" label="Projects" data={data} updateSection={updateSection}
            fields={[{key:'title',label:'Project Title'},{key:'client',label:'Client'},{key:'year',label:'Year'},{key:'desc',label:'Description',type:'textarea',rows:3}]}/>}
          {tab === 'blog' && <ListTab sectionKey="blog" label="Blog Posts" data={data} updateSection={updateSection}
            fields={[{key:'title',label:'Title'},{key:'date',label:'Date (YYYY-MM-DD)'},{key:'excerpt',label:'Excerpt',type:'textarea',rows:2},{key:'content',label:'Full Content',type:'textarea',rows:8},{key:'image',label:'Image URL'}]}/>}
          {tab === 'contact' && <ContactTab data={data} updateSection={updateSection}/>}
          {tab === 'social' && <SocialTab data={data} updateSection={updateSection}/>}
          {tab === 'seo' && <SEOTab data={data} updateSection={updateSection}/>}
          {tab === 'legal' && <LegalTab data={data} updateSection={updateSection}/>}
          {tab === 'branding' && <BrandingTab data={data} updateSection={updateSection}/>}
          {tab === 'styling' && <StylingTab data={data} updateSection={updateSection}/>}
        </div>
      </main>
    </div>
  );
}
