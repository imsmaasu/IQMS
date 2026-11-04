# SerajUlMaymar

Umbrella website for **SerajUlMaymar** — three divisions (Construction, Software, Education) under one brand, built with React + Vite.

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build → dist/
npm run preview      # preview production build
```

## Project Structure

```
src/
├── config/siteConfig.js     ← brand, contacts, stats, WhatsApp helper
├── data/
│   ├── divisions.js         ← THE REGISTRY — drives nav, routes, footer, home
│   ├── projects.js          ← construction photo gallery entries
│   ├── levels.js            ← education academic levels
│   └── subjects.js          ← education subject catalog
├── components/              ← shared UI (Header, Footer, DivisionForm, etc.)
├── pages/                   ← one page per route
└── styles/index.css         ← all design tokens, division themes, textures
```

## How to Edit Config

Open `src/config/siteConfig.js` and change:

- `brandName`, `tagline` — appears in the header, footer, and hero.
- `whatsappNumber` — shared by all division forms (digits only, no `+`).
- `email` — shown in the footer and contact page.
- `stats` — the facts strip on the home page. Set `value: null` to hide a stat.

## How to Add Project Photos (Construction)

1. Compress images to **WebP**, keep each under **300 KB**.
2. Put files in `public/projects/construction/`.
3. Register each photo in `src/data/projects.js`:

```js
{
  id: 'my-project-1',
  src: '/projects/construction/my-photo.webp',
  alt: 'Front elevation of a villa in DHA Phase 6',
  caption: 'DHA Phase 6 — 500 sq yd villa',
},
```

The gallery grid renders automatically. The empty-state placeholder disappears once you add at least one entry.

## How to Add a New Division

Adding a 4th (or 5th, ...) division requires only two changes:

### 1. Add an entry in `src/data/divisions.js`

Copy the template at the bottom of that file and fill in the fields:

```js
{
  id: 'new-division',
  slug: 'new-division',        // becomes the URL: /new-division
  number: '04',
  name: 'New Division',
  tagline: 'One-line tagline.',
  summary: 'Two-sentence description.',
  accentKey: 'new-division',
  services: ['Service 1', 'Service 2', 'Service 3', 'Service 4'],
  heroCopy: { eyebrow: '...', headline: '...', description: '...' },
  formConfig: {
    title: 'Form Title',
    submitLabel: 'Submit',
    messagePrefix: 'PREFIX',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, placeholder: '' },
      { name: 'whatsapp', label: 'WhatsApp', type: 'tel', required: true, placeholder: '' },
      { name: 'notes', label: 'Notes', type: 'textarea', required: false, placeholder: '' },
    ],
  },
  seo: { title: 'New Division — SerajUlMaymar', description: '...' },
},
```

### 2. Add an accent block in `src/styles/index.css`

```css
[data-division="new-division"] {
  --accent:     #HEX500;
  --accent-100: #HEX100;
  --accent-700: #HEX700;
}
```

### 3. (Optional) Custom page override

By default the generic `DivisionPage` template will render. If you want a custom layout, create a page in `src/pages/` and add a route in `src/App.jsx`.

The header nav, footer columns, home page division rows, and contact quick-links **all update automatically** from `divisions.js`.

## Deployment

### Vercel

Push to GitHub, import in Vercel. The included `vercel.json` rewrites all routes to `index.html` for client-side routing.

### Netlify

Create a `public/_redirects` file:

```
/*    /index.html   200
```

## Design System

- **Display font:** Fraunces (semibold, tight tracking)
- **Body font:** Instrument Sans
- **Mono labels:** JetBrains Mono (uppercase, 11-12px, 0.12em tracking)
- **Base colors:** Navy #07142A / #0B1B33, Ivory #FBF8F1 / #F4EEE0, Gold #C6A15B
- **Division accents:** Construction amber, Software blue, Education teal
- **Max width:** 1200px, 8px spacing grid
- **Icons:** lucide-react, stroke 1.5, used sparingly
