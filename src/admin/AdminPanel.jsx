import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import './AdminPanel.css';

const TABS = [
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
];

function Field({ label, value, onChange, type = 'text', rows }) {
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
        <div className="adm-login-box">
          <div className="adm-login-logo">CORE<span>X</span></div>
          <p className="adm-login-sub">Admin Panel</p>
          <input type="password" placeholder="Enter password" value={pw} onChange={e => { setPw(e.target.value); setPwErr(false); }}
            onKeyDown={e => { if (e.key === 'Enter') { if (pw === ADMIN_PASSWORD) setAuth(true); else setPwErr(true); }}}/>
          {pwErr && <p className="adm-login-err">Incorrect password</p>}
          <button onClick={() => { if (pw === ADMIN_PASSWORD) setAuth(true); else setPwErr(true); }}>Login</button>
          <a href="/" className="adm-login-back">← Back to Website</a>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-root">
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">CORE<span>X</span><br/><small>Admin</small></div>
        {TABS.map(t => (
          <button key={t.id} className={`adm-tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
        <hr/>
        <a href="/" className="adm-tab-btn" style={{textDecoration:'none',display:'block',textAlign:'left'}}>🌐 View Site</a>
        <button className="adm-tab-btn adm-danger" onClick={() => { if (window.confirm('Reset ALL data to defaults?')) { resetAll(); alert('Reset done!'); }}}>🔄 Reset All</button>
      </aside>
      <main className="adm-main">
        <div className="adm-content">
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
        </div>
      </main>
    </div>
  );
}
