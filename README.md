# CoreX Enterprises – Website

React + CSS website for CoreX Enterprises.

---

## Folder Structure

```
corex/
├── public/
│   └── index.html          ← HTML template (title, fonts)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       ← Fixed top navigation
│   │   ├── Hero.jsx         ← Landing hero section
│   │   ├── Products.jsx     ← Product cards grid
│   │   ├── WhyCorex.jsx     ← "Why Choose Us" cards
│   │   ├── Contact.jsx      ← Contact info + enquiry form
│   │   ├── Footer.jsx       ← Footer with links
│   │   └── useScrollReveal.js  ← Scroll animation hook
│   ├── styles/
│   │   ├── global.css       ← CSS variables, reset, utilities
│   │   ├── Navbar.css
│   │   ├── Hero.css
│   │   ├── Products.css
│   │   ├── WhyCorex.css
│   │   ├── Contact.css
│   │   └── Footer.css
│   ├── App.jsx              ← Root component
│   └── index.js             ← React entry point
└── package.json
```

---

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open in browser
# http://localhost:3000
```

## How to Build for Production

```bash
npm run build
```
This creates a `build/` folder — upload its contents to any web host.

---

## How to Edit Content

| What to change          | Where to edit                      |
|-------------------------|------------------------------------|
| Hero headline / text    | `src/components/Hero.jsx`          |
| Product categories      | `src/components/Products.jsx`      |
| Why CoreX cards         | `src/components/WhyCorex.jsx`      |
| Contact info (mobile, address, GST) | `src/components/Contact.jsx` |
| Footer links / text     | `src/components/Footer.jsx`        |
| Colors / fonts          | `src/styles/global.css` (`:root`)  |
| Section layout/spacing  | Each component's `.css` file       |

---

## Colors (edit in `src/styles/global.css`)

| Variable        | Value     | Use              |
|-----------------|-----------|------------------|
| `--navy`        | `#0D1F3C` | Primary dark     |
| `--orange`      | `#F47320` | Brand accent     |
| `--orange-light`| `#FF8C3A` | Hover state      |
| `--white`       | `#FFFFFF` | Background       |
| `--off-white`   | `#F5F7FA` | Section BG       |
