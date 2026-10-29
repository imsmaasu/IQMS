# IQMS STEM SEED PARKS — Web Portal (Phase 1)

Welcome to the **IQMS STEM SEED PARKS** tutor marketplace web application. This is the **Phase 1 Launch Version**, engineered to be clean, academic, fast, mobile-first, and structured for seamless expansion (tutor directories, profiles, reviews, dashboards) without rewrites.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The website will be live at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory.

---

## ⚙️ How to Edit WhatsApp Number & Brand Content

All contact numbers, brand names, taglines, and emails are centralized in **one single file**:

### 👉 File: `src/config/siteConfig.js`
Open `src/config/siteConfig.js` to customize:

```javascript
export const siteConfig = {
  brandName: "IQMS STEM SEED PARKS",
  tagline: "Cultivating Academic Excellence in STEM & Beyond",
  
  // 🔴 Centralized WhatsApp Number:
  whatsappNumber: "923642044330", 
  displayPhone: "+92 364 2044330",
  email: "info@iqms-stemseedparks.com",
  supportEmail: "admissions@iqms-stemseedparks.com",
  officeHours: "Monday – Saturday: 9:00 AM – 9:00 PM (PKT)",
  ...
};
```

---

## 📚 How to Add / Edit Academic Levels & Subjects

The content is 100% data-driven and lives outside the markup:

1. **Levels:** `src/data/levels.js`
   - Edit Matric/FSc, O/A Levels, ECAT/MDCAT, or University entries.
   - Add new grades, syllabus highlights, or exam streams.
2. **Subjects:** `src/data/subjects.js`
   - Add new subject categories, topics, descriptions, and exam links.

---

## 🎨 Changing Logo & Design

- **Logo Component:** `src/components/Logo.jsx`
  - When you receive your finalized graphic logo, simply replace the inline SVG inside `src/components/Logo.jsx` with an `<img src="/logo.png" alt="IQMS STEM SEED PARKS" />`.
- **Colors & Typography:** `src/styles/index.css`
  - All color tokens (`--color-primary-navy`, `--color-teal-accent`, `--color-warm-amber`, etc.) are declared at `:root`.

---

## 🌐 Free Deployment (Vercel & Netlify)

### Deploying on Vercel (Recommended)
1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **Add New... > Project** and import this repository.
4. Framework preset will automatically be detected as **Vite**.
5. Click **Deploy**. Your site will be live on a secure free `.vercel.app` domain with SSL!

### Deploying on Netlify
1. Log in to [netlify.com](https://netlify.com).
2. Click **Add new site > Import an existing project**.
3. Choose your repository.
4. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy IQMS STEM SEED PARKS**.
6. *(Optional)* Add a `_redirects` file in `public/` containing `/* /index.html 200` to ensure direct page refreshes route smoothly through React Router.

---

## 📁 Architecture Overview

```
├── index.html                   # SEO tags, Google Fonts, and favicon
├── package.json                 # React 18, Vite, React Router, Lucide icons
├── vite.config.js               # Vite config
├── src/
│   ├── main.jsx                 # Entry point with BrowserRouter
│   ├── App.jsx                  # Main router and layout shell
│   ├── config/
│   │   └── siteConfig.js        # Centralized WhatsApp & brand settings
│   ├── data/
│   │   ├── levels.js            # Academic levels, grades, highlights
│   │   └── subjects.js          # Categorized subjects catalog
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky nav with mobile drawer & WhatsApp CTA
│   │   ├── Footer.jsx           # Academic footer with links & contact
│   │   ├── Logo.jsx             # Reusable wordmark + sprout icon
│   │   ├── Button.jsx           # Reusable button with variants
│   │   ├── Card.jsx             # Clean card with hover states
│   │   ├── SectionHeading.jsx   # Consistent section headings
│   │   ├── EnrollForm.jsx       # Validated form with WhatsApp link generator
│   │   ├── WhatsAppButton.jsx   # Floating & inline WhatsApp actions
│   │   └── ScrollToTop.jsx      # Auto-scroll on route change
│   ├── pages/
│   │   ├── Home.jsx             # Hero, 3-step process, benefits, levels, CTA
│   │   ├── SubjectsLevels.jsx   # Comprehensive level & subject guide
│   │   ├── Enroll.jsx           # Enrollment form + contact sidebar
│   │   └── NotFound.jsx         # 404 error page
│   └── styles/
│       └── index.css            # Complete design system & custom properties
```

---

## 🔮 Phase 2 Extension Points
The codebase includes structured slots for upcoming features:
- Tutor Directory & Profile pages (`/tutors/:id`)
- Tutor Application / Registration Form (`/become-a-tutor`)
- Testimonials & Parent Reviews carousel
- Student & Tutor authentication portals
