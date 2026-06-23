# Cudoteka Astro MVP Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Przenieść istniejący prototyp HTML Cudoteki do statycznej aplikacji Astro 5+, z osobnymi podstronami warsztatów i kategorii, Content Collections do zarządzania treścią oraz optymalizacją SEO.

**Architecture:** Statyczny build Astro (`output: 'static'`) z Content Collections (Markdown/JSON + Zod) dla warsztatów, kategorii, opinii, wpisów bloga i galerii. Strona główna agreguje treści, a dynamiczne ścieżki generują podstrony SEO-friendly. Minimalny JS, optymalizacja obrazów przez `<Image />`, formularz bez backendu (Formspree/Netlify).

**Tech Stack:** Astro 5+, TypeScript, Content Collections, Zod, Vanilla CSS, `@astrojs/sitemap`, Formspree/Netlify Forms, Netlify/Vercel.

---

## File Structure

```
cudoteka-astro/
├── public/
│   ├── fonts/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/images/
│   │   ├── hero/
│   │   ├── workshops/
│   │   ├── gallery/
│   │   └── about/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── SectionHeader.astro
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── MobileNav.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── TrustBar.astro
│   │   │   ├── AboutTeaser.astro
│   │   │   ├── OfferGrid.astro
│   │   │   ├── FeaturedWorkshops.astro
│   │   │   ├── WhyUs.astro
│   │   │   ├── GalleryTeaser.astro
│   │   │   └── ContactTeaser.astro
│   │   ├── workshops/
│   │   │   ├── WorkshopCard.astro
│   │   │   └── WorkshopList.astro
│   │   └── blog/
│   │       ├── PostCard.astro
│   │       └── PostList.astro
│   ├── content/
│   │   ├── workshops/
│   │   ├── categories/
│   │   ├── testimonials/
│   │   ├── posts/
│   │   └── gallery/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── o-nas.astro
│   │   ├── oferta.astro
│   │   ├── oferta/[category].astro
│   │   ├── warsztaty.astro
│   │   ├── warsztaty/[workshop].astro
│   │   ├── blog.astro
│   │   ├── blog/[slug].astro
│   │   ├── galeria.astro
│   │   ├── opinie.astro
│   │   ├── kontakt.astro
│   │   └── polityka-prywatnosci.astro
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── utilities.css
│   ├── lib/
│   │   └── seo.ts
│   └── content.config.ts
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## Chunk 1: Project Setup

### Task 1.1: Initialize Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `README.md`

- [ ] **Step 1: Create Astro project with TypeScript**

Run:
```bash
npm create astro@latest . -- --template minimal --typescript strict --git false --install
```

Expected: Project scaffolded with `src/pages/index.astro`.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install
npx astro add sitemap
```

Expected: `@astrojs/sitemap` installed and added to `astro.config.mjs`.

- [ ] **Step 3: Configure Astro for static output**

Modify: `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cudoteka.pl',
  output: 'static',
  integrations: [sitemap()],
  image: {
    domains: [],
  },
});
```

- [ ] **Step 4: Update package.json scripts**

Modify: `package.json`

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

- [ ] **Step 5: Verify dev server**

Run:
```bash
npm run dev
```

Expected: Server starts at `http://localhost:4321` with no errors.

- [ ] **Step 6: Commit point**

```bash
git init 2>/dev/null || true
git add .
git commit -m "chore: initialize Astro project with sitemap" || echo "Commit skipped (no git)"
```

---

### Task 1.2: Setup design system CSS

**Files:**
- Create: `src/styles/variables.css`
- Create: `src/styles/global.css`
- Create: `src/styles/utilities.css`
- Modify: `src/layouts/BaseLayout.astro` (created later)

- [ ] **Step 1: Create CSS variables**

Create: `src/styles/variables.css`

```css
:root {
  --cream: #FBF7F1;
  --cream-2: #F4ECE0;
  --ink: #36323B;
  --ink-soft: #6E6774;
  --blue: #3E89B0;
  --blue-deep: #296A8E;
  --blue-soft: #CBE6F1;
  --blue-tint: #EAF5FA;
  --peach: #EF9E80;
  --peach-soft: #FBE0D4;
  --peach-tint: #FDEFE8;
  --mint: #7FC4A6;
  --mint-soft: #D7EDE1;
  --mint-tint: #EBF6F0;
  --gold: #E7B85C;
  --white: #ffffff;
  --shadow: 0 22px 48px -22px rgba(41,106,142,.32);
  --shadow-sm: 0 10px 26px -16px rgba(41,106,142,.4);
  --radius: 30px;
  --radius-sm: 18px;
}
```

- [ ] **Step 2: Create global styles**

Create: `src/styles/global.css`

```css
@import './variables.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Nunito Sans", system-ui, sans-serif;
  color: var(--ink);
  background: var(--cream);
  line-height: 1.65;
  font-size: 17px;
  overflow-x: hidden;
}

h1, h2, h3, h4 {
  font-family: "Fraunces", Georgia, serif;
  line-height: 1.1;
  font-weight: 600;
  color: var(--ink);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

.wrap {
  width: 90%;
  max-width: 1180px;
  margin: 0 auto;
}

.section {
  padding: 96px 0;
  position: relative;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: .55rem;
  font-weight: 800;
  font-family: "Nunito Sans", sans-serif;
  cursor: pointer;
  border: none;
  border-radius: 999px;
  padding: 15px 28px;
  font-size: 1rem;
  transition: transform .2s ease, box-shadow .2s ease;
  text-align: center;
}

.btn-primary {
  background: linear-gradient(135deg, var(--blue), var(--blue-deep));
  color: #fff;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 30px -14px rgba(41,106,142,.6);
}

.btn-ghost {
  background: #fff;
  color: var(--blue-deep);
  box-shadow: inset 0 0 0 2px var(--blue-soft);
}

@media (max-width: 680px) {
  .section {
    padding: 66px 0;
  }
}
```

- [ ] **Step 3: Create utility classes**

Create: `src/styles/utilities.css`

```css
.eyebrow {
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .14em;
  font-size: .78rem;
  color: var(--blue);
  display: inline-flex;
  align-items: center;
  gap: .5rem;
}

.eyebrow::before {
  content: "";
  width: 26px;
  height: 2px;
  background: var(--peach);
  border-radius: 2px;
}

.text-center {
  text-align: center;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 4: Commit point**

```bash
git add .
git commit -m "feat: add design system CSS" || echo "Commit skipped"
```

---

## Chunk 2: Layout and Global Components

### Task 2.1: Create BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/lib/seo.ts`

- [ ] **Step 1: Create SEO helper**

Create: `src/lib/seo.ts`

```ts
interface SeoProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  type?: string;
}

export function seo({ title, description, image, canonical, type = 'website' }: SeoProps) {
  const siteTitle = 'Cudoteka';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  return {
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:image', content: image || '/images/og-default.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image || '/images/og-default.jpg' },
    ],
    canonical,
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cudoteka',
    description: 'Twórcze warsztaty, sensoplastyka i animacje dla dzieci i dorosłych.',
    url: 'https://cudoteka.pl',
    telephone: '+48-607-370-777',
    email: 'biuro@e-cud.waw.pl',
    areaServed: 'Warszawa i okolice',
    priceRange: '$$',
  };
}
```

- [ ] **Step 2: Create BaseLayout**

Create: `src/layouts/BaseLayout.astro`

```astro
---
import '../styles/global.css';
import '../styles/utilities.css';
import { seo, localBusinessSchema } from '../lib/seo';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';

interface Props {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  type?: string;
}

const { title, description, image, canonical, type } = Astro.props;
const seoData = seo({ title, description, image, canonical, type });
const schema = localBusinessSchema();
---

<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{seoData.title}</title>
  {seoData.meta.map(m => <meta {...m} />)}
  {canonical && <link rel="canonical" href={canonical} />}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Nunito+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />
</head>
<body>
  <Header />
  <main id="main-content">
    <slot />
  </main>
  <Footer />
</body>
</html>
```

- [ ] **Step 3: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds with `dist/` folder.

- [ ] **Step 4: Commit point**

```bash
git add .
git commit -m "feat: add BaseLayout and SEO helper" || echo "Commit skipped"
```

---

### Task 2.2: Create Header and Footer

**Files:**
- Create: `src/components/layout/Header.astro`
- Create: `src/components/layout/Footer.astro`
- Create: `src/components/layout/MobileNav.astro`

- [ ] **Step 1: Create Header**

Create: `src/components/layout/Header.astro`

```astro
---
const navLinks = [
  { href: '/o-nas/', label: 'O nas' },
  { href: '/oferta/', label: 'Oferta' },
  { href: '/warsztaty/', label: 'Warsztaty' },
  { href: '/blog/', label: 'Blog' },
  { href: '/galeria/', label: 'Galeria' },
  { href: '/opinie/', label: 'Opinie' },
  { href: '/kontakt/', label: 'Kontakt' },
];
---

<header>
  <div class="wrap nav">
    <a href="/" class="logo" aria-label="Cudoteka">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4c1.6 2.2 1.6 4.6 0 6.8C14.4 8.6 14.4 6.2 16 4Z" fill="#3E89B0"/>
        <path d="M28 16c-2.2 1.6-4.6 1.6-6.8 0 2.2-1.6 4.6-1.6 6.8 0Z" fill="#3E89B0"/>
        <path d="M16 28c-1.6-2.2-1.6-4.6 0-6.8 1.6 2.2 1.6 4.6 0 6.8Z" fill="#3E89B0"/>
        <path d="M4 16c2.2-1.6 4.6-1.6 6.8 0-2.2 1.6-4.6 1.6-6.8 0Z" fill="#3E89B0"/>
        <circle cx="16" cy="16" r="3" fill="#E7B85C"/>
      </svg>
      Cudoteka
    </a>
    <nav class="nav-links" aria-label="Nawigacja główna">
      {navLinks.map(link => (
        <a href={link.href}>{link.label}</a>
      ))}
    </nav>
    <div class="nav-cta">
      <a href="tel:607370777" class="btn btn-ghost">607 370 777</a>
      <a href="/kontakt/" class="btn btn-primary">Zarezerwuj termin</a>
    </div>
    <button class="burger" aria-label="Otwórz menu" aria-expanded="false" aria-controls="mobile-nav">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(12px);
    background: rgba(251,247,241,.82);
    border-bottom: 1px solid rgba(62,137,176,.12);
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: .55rem;
    font-family: "Fraunces", Georgia, serif;
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--blue-deep);
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 30px;
    font-weight: 700;
  }
  .nav-links a {
    color: var(--ink-soft);
    transition: color .2s;
  }
  .nav-links a:hover {
    color: var(--blue-deep);
  }
  .nav-cta {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .nav-cta .btn {
    padding: 11px 20px;
    font-size: .92rem;
  }
  .burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
  }
  .burger span {
    width: 26px;
    height: 3px;
    background: var(--blue-deep);
    border-radius: 3px;
  }
  @media (max-width: 980px) {
    .nav-links, .nav-cta {
      display: none;
    }
    .burger {
      display: flex;
    }
  }
</style>
```

- [ ] **Step 2: Create Footer**

Create: `src/components/layout/Footer.astro`

```astro
<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a href="/" class="logo">Cudoteka</a>
        <p>Twórcze warsztaty, sensoplastyka i animacje dla dzieci i dorosłych. Dawniej E-CUD.</p>
      </div>
      <div>
        <h5>Oferta</h5>
        <a href="/oferta/">Kategorie</a>
        <a href="/warsztaty/">Warsztaty</a>
        <a href="/blog/">Blog</a>
      </div>
      <div>
        <h5>Kontakt</h5>
        <a href="tel:607370777">607 370 777</a>
        <a href="mailto:biuro@e-cud.waw.pl">biuro@e-cud.waw.pl</a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Cudoteka — Aleksandra Dąbrowska</span>
      <a href="/polityka-prywatnosci/">Polityka prywatności</a>
    </div>
  </div>
</footer>

<style>
  footer {
    background: var(--blue-deep);
    color: #fff;
    padding: 54px 0 28px;
  }
  .foot-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 34px;
    margin-bottom: 34px;
  }
  .logo {
    font-family: "Fraunces", Georgia, serif;
    font-weight: 700;
    font-size: 1.5rem;
    display: block;
    margin-bottom: 14px;
  }
  footer p {
    opacity: .82;
    font-size: .95rem;
  }
  footer h5 {
    font-family: "Fraunces", Georgia, serif;
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
  footer a {
    opacity: .85;
    display: block;
    margin-bottom: 8px;
    font-size: .95rem;
  }
  footer a:hover {
    opacity: 1;
  }
  .foot-bottom {
    border-top: 1px solid rgba(255,255,255,.18);
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    font-size: .82rem;
    opacity: .75;
  }
  @media (max-width: 680px) {
    .foot-grid {
      grid-template-columns: 1fr;
    }
    .foot-bottom {
      flex-direction: column;
    }
  }
</style>
```

- [ ] **Step 3: Commit point**

```bash
git add .
git commit -m "feat: add Header and Footer" || echo "Commit skipped"
```

---

### Task 2.3: Motion primitives (floating nav, hamburger, scroll reveals, magnetic buttons)

**Files:**
- Create: `src/components/ui/Button.astro`
- Create: `src/components/ui/Card.astro`
- Create: `src/components/ui/ScrollReveal.astro`
- Create: `src/scripts/nav.ts`
- Modify: `src/components/layout/Header.astro`

- [ ] **Step 1: Create Button component with nested icon**

Create: `src/components/ui/Button.astro`

```astro
---
interface Props {
  href?: string;
  variant?: 'primary' | 'ghost';
  type?: 'button' | 'submit';
}
const { href, variant = 'primary', type = 'button' } = Astro.props;
const Tag = href ? 'a' : 'button';
---
<Tag {href} {type} class:list={['btn-magnetic', variant]}>
  <span class="btn-text"><slot /></span>
  <span class="btn-icon" aria-hidden="true">→</span>
</Tag>

<style>
  .btn-magnetic {
    display: inline-flex;
    align-items: center;
    gap: .75rem;
    font-weight: 800;
    font-family: "Nunito Sans", sans-serif;
    border: none;
    border-radius: 999px;
    padding: 14px 24px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 500ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 500ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  .btn-magnetic.primary {
    background: linear-gradient(135deg, var(--blue), var(--blue-deep));
    color: #fff;
    box-shadow: 0 10px 30px -12px rgba(41,106,142,.45);
  }
  .btn-magnetic.ghost {
    background: #fff;
    color: var(--blue-deep);
    box-shadow: inset 0 0 0 2px var(--blue-soft);
  }
  .btn-magnetic:hover { transform: translateY(-2px); }
  .btn-magnetic:active { transform: scale(0.98); }
  .btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255,255,255,.2);
    transition: transform 500ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  .btn-magnetic:hover .btn-icon {
    transform: translateX(3px) translateY(-1px) scale(1.05);
  }
</style>
```

- [ ] **Step 2: Create Double-Bezel Card**

Create: `src/components/ui/Card.astro`

```astro
---
interface Props {
  class?: string;
}
const { class: className } = Astro.props;
---
<div class:list={['card-shell', className]}>
  <div class="card-core">
    <slot />
  </div>
</div>

<style>
  .card-shell {
    padding: 6px;
    background: rgba(0,0,0,.03);
    border-radius: 2rem;
    box-shadow: inset 0 1px 1px rgba(255,255,255,.6);
  }
  .card-core {
    background: #fff;
    border-radius: calc(2rem - 6px);
    padding: 28px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.8), 0 18px 40px -20px rgba(41,106,142,.25);
  }
</style>
```

- [ ] **Step 3: Create ScrollReveal wrapper**

Create: `src/components/ui/ScrollReveal.astro`

```astro
---
interface Props {
  class?: string;
  delay?: number;
}
const { class: className, delay = 0 } = Astro.props;
---
<div class:list={['reveal', className]} data-reveal-delay={delay}>
  <slot />
</div>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.getAttribute('data-reveal-delay')) || 0;
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>

<style>
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(4px);
    transition: opacity 800ms cubic-bezier(0.32, 0.72, 0, 1),
                transform 800ms cubic-bezier(0.32, 0.72, 0, 1),
                filter 800ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
</style>
```

- [ ] **Step 4: Add nav interaction script**

Create: `src/scripts/nav.ts`

```ts
export function initNav() {
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.nav-overlay');
  if (!burger || !overlay) return;

  burger.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-is-open', isOpen);
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-is-open');
    });
  });
}
```

- [ ] **Step 5: Update Header to floating pill**

Modify: `src/components/layout/Header.astro`

Add floating pill styles:
```css
header {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;
  width: calc(100% - 2rem);
  max-width: 1100px;
  backdrop-filter: blur(16px);
  background: rgba(251,247,241,.82);
  border: 1px solid rgba(62,137,176,.12);
  border-radius: 999px;
  padding: 10px 18px;
}
```

- [ ] **Step 6: Verify motion**

Run:
```bash
npm run dev
```

Expected: Nav floats as pill, buttons hover, scroll reveals trigger on scroll.

- [ ] **Step 7: Commit point**

```bash
git add .
git commit -m "feat: add motion primitives (nav, buttons, cards, scroll reveal)" || echo "Commit skipped"
```

---

## Chunk 3: Content Collections

### Task 3.1: Define content schemas

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/categories/tworczosc-i-sztuka.md`
- Create: `src/content/categories/nauka-przez-zabawe.md`
- Create: `src/content/categories/animacje-i-atrakcje.md`
- Create: `src/content/categories/strefa-malucha.md`
- Create: `src/content/categories/integracja.md`
- Create: `src/content/categories/programy-pod-klucz.md`

- [ ] **Step 1: Create content.config.ts**

Create: `src/content.config.ts`

```ts
import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const categories = defineCollection({
  loader: glob({ base: './src/content/categories', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    icon: z.string(),
    description: z.string(),
    color: z.enum(['blue', 'mint', 'peach', 'gold', 'lilac']),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});

const workshops = defineCollection({
  loader: glob({ base: './src/content/workshops', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: reference('categories'),
    shortDescription: z.string(),
    fullDescription: z.string(),
    ageRange: z.string(),
    duration: z.string(),
    materials: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ base: './src/content/testimonials', pattern: '**/*.md' }),
  schema: z.object({
    author: z.string(),
    role: z.string(),
    content: z.string(),
    rating: z.number().min(1).max(5).default(5),
    source: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});

const gallery = defineCollection({
  loader: glob({ base: './src/content/gallery', pattern: '**/*.md' }),
  schema: z.object({
    image: z.string(),
    alt: z.string(),
    category: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { categories, workshops, testimonials, posts, gallery };
```

- [ ] **Step 2: Create category entries**

Create: `src/content/categories/tworczosc-i-sztuka.md`

```md
---
title: Twórczość i sztuka
slug: tworczosc-i-sztuka
icon: 🎨
description: Zajęcia, na których liczy się proces, emocje i radość tworzenia — każdy wychodzi z własnym dziełem.
color: blue
metaTitle: Twórczość i sztuka dla dzieci | Cudoteka Warszawa
metaDescription: Warsztaty plastyczne, sensoplastyka, ceramika i więcej dla dzieci w Warszawie.
---
```

Repeat for remaining categories with appropriate data.

- [ ] **Step 3: Verify content layer**

Run:
```bash
npm run dev
```

Expected: No schema errors in terminal.

- [ ] **Step 4: Commit point**

```bash
git add .
git commit -m "feat: add content collections and schemas" || echo "Commit skipped"
```

---

### Task 3.2: Migrate workshop content

**Files:**
- Create: `src/content/workshops/*.md` (24 files)

- [ ] **Step 1: Create first workshop entry**

Create: `src/content/workshops/sensoplastyka.md`

```md
---
title: Sensoplastyka
slug: sensoplastyka
category: tworczosc-i-sztuka
shortDescription: Tworzenie i doświadczanie przez dotyk, zapach, kolor i dźwięk — na bezpiecznych, jadalnych składnikach.
fullDescription: |
  Sensoplastyka to zajęcia, podczas których dzieci poznają świat wszystkimi zmysłami. 
  Tworzymy kolorowe masy, eksperymentujemy z fakturami i zapachami, a wszystko to na bezpiecznych, często jadalnych składnikach.
ageRange: 1,5–8 lat
duration: 45–60 min
materials: ["mąka ziemniaczana", "barwniki spożywcze", "płatki", "kasza"]
image: /images/workshops/sensoplastyka.jpg
imageAlt: Dziecko bawiące się kolorową masą sensoryczną
featured: true
metaTitle: Sensoplastyka dla dzieci Warszawa | Cudoteka
metaDescription: Bezpieczne zajęcia sensoryczne dla dzieci w Warszawie. Sensoplastyka na jadalnych składnikach.
---
```

- [ ] **Step 2: Create remaining 23 workshop entries**

Use the list from `working-doc (1).md`:
- Malowanie twarzy, Tatuaże brokatowe, Eksperymenty, Eko-torby, Eko kosmetyki, Plastyka ekspresywna, Warsztaty plastyczne, Warsztaty świąteczne, Animacje ruchowe, Animacje tematyczne, Integracja dorosłych, Integracja dzieci, Ceramika, Las w słoiku, Personalizowane przypinki, Zajęcia edukacyjne, Strefa malucha, Pokaz baniek dymnych i ogniowych, Bańki mydlane XXL, Zaplatanie warkoczyków, Warsztaty kulinarne, Gra terenowa.

Each file: `src/content/workshops/{slug}.md`

- [ ] **Step 3: Verify**

Run:
```bash
npm run build
```

Expected: Build succeeds. If schema errors, fix frontmatter.

- [ ] **Step 4: Commit point**

```bash
git add .
git commit -m "content: migrate 24 workshops" || echo "Commit skipped"
```

---

## Chunk 4: Dynamic Pages

### Task 4.1: Create category pages

**Files:**
- Create: `src/pages/oferta.astro`
- Create: `src/pages/oferta/[category].astro`

- [ ] **Step 1: Create category listing page**

Create: `src/pages/oferta.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const categories = await getCollection('categories');
---

<BaseLayout
  title="Oferta"
  description="Ponad 20 rodzajów warsztatów i animacji dla dzieci i dorosłych w Warszawie."
>
  <section class="section">
    <div class="wrap">
      <div class="sec-head text-center">
        <span class="eyebrow">Nasza oferta</span>
        <h1>Warsztaty i atrakcje na każdą okazję</h1>
        <p>Wybierz kategorię i znajdź idealną atrakcję dla swojego wydarzenia.</p>
      </div>
      <div class="cat-grid">
        {categories.map(cat => (
          <a href={`/oferta/${cat.data.slug}/`} class={`cat ${cat.data.color}`}>
            <div class="ic">{cat.data.icon}</div>
            <h2>{cat.data.title}</h2>
            <p>{cat.data.description}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .sec-head { max-width: 46rem; margin: 0 auto 54px; }
  .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
  .cat {
    background: #fff;
    border-radius: var(--radius);
    padding: 32px 28px;
    box-shadow: var(--shadow);
    transition: transform .25s ease;
  }
  .cat:hover { transform: translateY(-6px); }
  .ic { font-size: 2rem; margin-bottom: 16px; }
  @media (max-width: 980px) { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 680px) { .cat-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 2: Create dynamic category page**

Create: `src/pages/oferta/[category].astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const categories = await getCollection('categories');
  const workshops = await getCollection('workshops');
  return categories.map(cat => ({
    params: { category: cat.data.slug },
    props: {
      category: cat,
      workshops: workshops.filter(w => w.data.category.id === cat.id),
    },
  }));
}

const { category, workshops } = Astro.props;
---

<BaseLayout
  title={category.data.metaTitle}
  description={category.data.metaDescription}
>
  <section class="section">
    <div class="wrap">
      <span class="eyebrow">{category.data.icon} {category.data.title}</span>
      <h1>{category.data.title}</h1>
      <p>{category.data.description}</p>
      <h2>Warsztaty w tej kategorii</h2>
      <ul>
        {workshops.map(w => (
          <li><a href={`/warsztaty/${w.data.slug}/`}>{w.data.title}</a></li>
        ))}
      </ul>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Verify dynamic routes**

Run:
```bash
npm run build
```

Expected: `dist/oferta/tworczosc-i-sztuka/index.html` exists.

- [ ] **Step 4: Commit point**

```bash
git add .
git commit -m "feat: add category pages" || echo "Commit skipped"
```

---

### Task 4.2: Create workshop pages

**Files:**
- Create: `src/pages/warsztaty.astro`
- Create: `src/pages/warsztaty/[workshop].astro`
- Create: `src/components/workshops/WorkshopCard.astro`

- [ ] **Step 1: Create workshop list page**

Create: `src/pages/warsztaty.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import WorkshopList from '../components/workshops/WorkshopList.astro';
---

<BaseLayout
  title="Warsztaty"
  description="Wszystkie warsztaty Cudoteki — sensoplastyka, plastyka, animacje, eksperymenty i więcej."
>
  <section class="section">
    <div class="wrap">
      <div class="sec-head text-center">
        <span class="eyebrow">Warsztaty</span>
        <h1>Odkryj nasze warsztaty</h1>
      </div>
      <WorkshopList />
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Create WorkshopList component**

Create: `src/components/workshops/WorkshopList.astro`

```astro
---
import { getCollection } from 'astro:content';
import WorkshopCard from './WorkshopCard.astro';

const workshops = await getCollection('workshops');
---

<div class="workshop-grid">
  {workshops.map(w => <WorkshopCard workshop={w} />)}
</div>

<style>
  .workshop-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 26px;
  }
</style>
```

- [ ] **Step 3: Create WorkshopCard**

Create: `src/components/workshops/WorkshopCard.astro`

```astro
---
import type { CollectionEntry } from 'astro:content';
interface Props {
  workshop: CollectionEntry<'workshops'>;
}
const { workshop } = Astro.props;
---

<article class="card">
  <h2><a href={`/warsztaty/${workshop.data.slug}/`}>{workshop.data.title}</a></h2>
  <p>{workshop.data.shortDescription}</p>
  <span class="meta">{workshop.data.ageRange} · {workshop.data.duration}</span>
</article>

<style>
  .card {
    background: #fff;
    border-radius: var(--radius);
    padding: 28px;
    box-shadow: var(--shadow-sm);
  }
  h2 { font-size: 1.35rem; margin-bottom: 8px; }
  p { color: var(--ink-soft); margin-bottom: 12px; }
  .meta { font-size: .85rem; color: var(--blue); font-weight: 700; }
</style>
```

- [ ] **Step 4: Create dynamic workshop page**

Create: `src/pages/warsztaty/[workshop].astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const workshops = await getCollection('workshops');
  return workshops.map(w => ({
    params: { workshop: w.data.slug },
    props: { workshop: w },
  }));
}

const { workshop } = Astro.props;
const category = await getEntry(workshop.data.category);
---

<BaseLayout
  title={workshop.data.metaTitle}
  description={workshop.data.metaDescription}
  type="article"
>
  <article class="section">
    <div class="wrap">
      <span class="eyebrow">{category?.data.icon} {category?.data.title}</span>
      <h1>{workshop.data.title}</h1>
      <p class="lead">{workshop.data.shortDescription}</p>
      <div class="meta">
        <span>Wiek: {workshop.data.ageRange}</span>
        <span>Czas: {workshop.data.duration}</span>
      </div>
      <div class="body">
        <p>{workshop.data.fullDescription}</p>
      </div>
      <a href="/kontakt/" class="btn btn-primary">Zapytaj o termin</a>
    </div>
  </article>
</BaseLayout>

<style>
  .lead { font-size: 1.15rem; color: var(--ink-soft); margin: 18px 0; }
  .meta { display: flex; gap: 20px; margin-bottom: 24px; font-weight: 700; }
  .body { max-width: 70ch; margin-bottom: 32px; }
</style>
```

- [ ] **Step 5: Verify**

Run:
```bash
npm run build
```

Expected: `dist/warsztaty/sensoplastyka/index.html` exists.

- [ ] **Step 6: Commit point**

```bash
git add .
git commit -m "feat: add workshop list and detail pages" || echo "Commit skipped"
```

---

## Chunk 5: Home Page and Static Pages

### Task 5.1: Build home page sections

**Files:**
- Create: `src/components/home/*.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Hero component**

Create: `src/components/home/Hero.astro`

```astro
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <span class="eyebrow">Pracownia twórcza • Animacje • Eventy</span>
      <h1>Miejsce, w którym dzieci tworzą <em>cuda</em></h1>
      <p class="lead">Cudoteka to warsztaty rozwojowe i artystyczne, sensoplastyka, animacje i atrakcje na każdą okazję. Bezpiecznie, kreatywnie i z ogromną dawką radości.</p>
      <div class="hero-cta">
        <a href="/kontakt/" class="btn btn-primary">Zarezerwuj termin →</a>
        <a href="/oferta/" class="btn btn-ghost">Zobacz ofertę</a>
      </div>
    </div>
  </div>
</section>

<style>
  .hero { padding: 70px 0 88px; position: relative; overflow: hidden; }
  .hero h1 { font-size: clamp(2.5rem, 5.2vw, 4rem); margin: 18px 0; }
  .hero h1 em { font-style: italic; color: var(--blue-deep); }
  .lead { font-size: 1.18rem; color: var(--ink-soft); max-width: 33rem; }
  .hero-cta { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
</style>
```

- [ ] **Step 2: Create OfferGrid component**

Create: `src/components/home/OfferGrid.astro`

```astro
---
import { getCollection } from 'astro:content';
const categories = await getCollection('categories');
---

<section class="section" id="oferta">
  <div class="wrap">
    <div class="sec-head text-center">
      <span class="eyebrow">Nasza oferta</span>
      <h2>Warsztaty i atrakcje na każdą okazję</h2>
    </div>
    <div class="cat-grid">
      {categories.map(cat => (
        <a href={`/oferta/${cat.data.slug}/`} class={`cat ${cat.data.color}`}>
          <div class="ic">{cat.data.icon}</div>
          <h3>{cat.data.title}</h3>
          <p>{cat.data.description}</p>
        </a>
      ))}
    </div>
  </div>
</section>

<style>
  .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
  .cat { background: #fff; border-radius: var(--radius); padding: 32px 28px; box-shadow: var(--shadow); transition: transform .25s ease; }
  .cat:hover { transform: translateY(-6px); }
  .ic { font-size: 2rem; margin-bottom: 16px; }
  @media (max-width: 980px) { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 680px) { .cat-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 3: Update index.astro**

Modify: `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/home/Hero.astro';
import OfferGrid from '../components/home/OfferGrid.astro';
---

<BaseLayout
  title="Cudoteka — twórcze warsztaty i animacje dla dzieci | Warszawa"
  description="Cudoteka — warsztaty rozwojowe i artystyczne, sensoplastyka, animacje i atrakcje dla dzieci i dorosłych. Warszawa i okolice."
>
  <Hero />
  <OfferGrid />
</BaseLayout>
```

- [ ] **Step 4: Verify home page**

Run:
```bash
npm run dev
```

Open `http://localhost:4321/`. Expected: Hero and offer grid render correctly.

- [ ] **Step 5: Commit point**

```bash
git add .
git commit -m "feat: add home page Hero and OfferGrid" || echo "Commit skipped"
```

---

### Task 5.2: Create remaining static pages

**Files:**
- Create: `src/pages/o-nas.astro`
- Create: `src/pages/kontakt.astro`
- Create: `src/pages/galeria.astro`
- Create: `src/pages/opinie.astro`
- Create: `src/pages/blog.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/pages/polityka-prywatnosci.astro`

- [ ] **Step 1: Create About page**

Create: `src/pages/o-nas.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="O nas"
  description="Poznaj Cudotekę — nową odsłonę E-CUD. Warsztaty dla dzieci prowadzone z pasją i bezpieczeństwem."
>
  <section class="section">
    <div class="wrap">
      <h1>O nas</h1>
      <p>Cudoteka to nowa odsłona E-CUD — Centrum Edukacyjno-Eventowego...</p>
      <p class="sign">Aleksandra Dąbrowska<small>założycielka Cudoteki</small></p>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Create Contact page with form**

Create: `src/pages/kontakt.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Kontakt"
  description="Zarezerwuj termin lub zapytaj o ofertę. Cudoteka — Warszawa i okolice."
>
  <section class="section">
    <div class="wrap contact-grid">
      <div>
        <h1>Zarezerwuj termin</h1>
        <p>Napisz lub zadzwoń — pomożemy dobrać atrakcje.</p>
        <p><a href="tel:607370777">607 370 777</a></p>
        <p><a href="mailto:biuro@e-cud.waw.pl">biuro@e-cud.waw.pl</a></p>
      </div>
      <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
        <label>Imię i nazwisko<input type="text" name="name" required /></label>
        <label>Telefon lub email<input type="text" name="contact" required /></label>
        <label>Rodzaj wydarzenia
          <select name="event">
            <option>Urodziny dziecka</option>
            <option>Festyn / piknik</option>
            <option>Przedszkole / szkoła</option>
            <option>Inne</option>
          </select>
        </label>
        <label>Wiadomość<textarea name="message"></textarea></label>
        <button type="submit" class="btn btn-primary">Wyślij zapytanie</button>
      </form>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Create Privacy Policy page**

Create: `src/pages/polityka-prywatnosci.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Polityka prywatności"
  description="Polityka prywatności Cudoteki."
>
  <section class="section">
    <div class="wrap">
      <h1>Polityka prywatności</h1>
      <p>Administratorem danych osobowych jest Cudoteka...</p>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Create Blog pages**

Create: `src/pages/blog.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('posts')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<BaseLayout title="Blog" description="Pomysły, porady i aktualności z Cudoteki.">
  <section class="section">
    <div class="wrap">
      <h1>Blog</h1>
      {posts.map(post => (
        <article>
          <h2><a href={`/blog/${post.data.slug}/`}>{post.data.title}</a></h2>
          <p>{post.data.excerpt}</p>
        </article>
      ))}
    </div>
  </section>
</BaseLayout>
```

Create: `src/pages/blog/[slug].astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.data.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BaseLayout title={post.data.metaTitle} description={post.data.metaDescription}>
  <article class="section">
    <div class="wrap">
      <h1>{post.data.title}</h1>
      <time>{post.data.pubDate.toLocaleDateString('pl-PL')}</time>
      <Content />
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 5: Create Testimonials page**

Create: `src/pages/opinie.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const testimonials = await getCollection('testimonials');
---

<BaseLayout title="Opinie" description="Co mówią o nas rodzice i partnerzy.">
  <section class="section">
    <div class="wrap">
      <h1>Opinie</h1>
      <div class="tst-grid">
        {testimonials.map(t => (
          <div class="tst">
            <div class="stars">{'★'.repeat(t.data.rating)}</div>
            <p>"{t.data.content}"</p>
            <div class="who">{t.data.author}<small>{t.data.role}</small></div>
          </div>
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 6: Verify all static pages**

Run:
```bash
npm run build
```

Expected: All pages build without errors.

- [ ] **Step 7: Commit point**

```bash
git add .
git commit -m "feat: add static pages (about, contact, blog, testimonials, privacy)" || echo "Commit skipped"
```

---

### Task 5.3: Apply motion choreography to pages

**Files:**
- Modify: `src/components/home/Hero.astro`
- Modify: `src/components/home/OfferGrid.astro`
- Modify: `src/components/workshops/WorkshopCard.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/oferta.astro`
- Modify: `src/pages/warsztaty.astro`

- [ ] **Step 1: Wrap Hero content in ScrollReveal**

Modify: `src/components/home/Hero.astro`

```astro
---
import ScrollReveal from '../ui/ScrollReveal.astro';
---
<section class="hero">
  <div class="wrap hero-grid">
    <ScrollReveal>
      <div class="hero-copy">
        <span class="eyebrow">Pracownia twórcza • Animacje • Eventy</span>
        <h1>Miejsce, w którym dzieci tworzą <em>cuda</em></h1>
        <p class="lead">...</p>
        <div class="hero-cta">
          <Button href="/kontakt/" variant="primary">Zarezerwuj termin</Button>
          <Button href="/oferta/" variant="ghost">Zobacz ofertę</Button>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>
```

- [ ] **Step 2: Wrap category cards in ScrollReveal with stagger**

Modify: `src/components/home/OfferGrid.astro`

```astro
{categories.map((cat, i) => (
  <ScrollReveal delay={i * 100}>
    <a href={`/oferta/${cat.data.slug}/`} class={`cat ${cat.data.color}`}>
      ...
    </a>
  </ScrollReveal>
))}
```

- [ ] **Step 3: Apply double-bezel to WorkshopCard**

Modify: `src/components/workshops/WorkshopCard.astro`

```astro
---
import Card from '../ui/Card.astro';
---
<Card>
  <h2>...</h2>
  <p>...</p>
  <span>...</span>
</Card>
```

- [ ] **Step 4: Verify scroll reveals**

Run:
```bash
npm run dev
```

Scroll home page. Expected: Hero fades up, category cards stagger in.

- [ ] **Step 5: Commit point**

```bash
git add .
git commit -m "feat: apply scroll reveals and double-bezel to pages" || echo "Commit skipped"
```

---

## Chunk 6: Images, SEO, and Deploy

### Task 6.1: Optimize images

**Files:**
- Create: `src/assets/images/` structure
- Modify: components using images

- [ ] **Step 1: Copy existing images to assets**

Run:
```bash
mkdir -p src/assets/images/workshops src/assets/images/gallery src/assets/images/about
# Copy PNG files from project root to appropriate folders
cp /mnt/c/Users/raszi/ola/webpage/*.png src/assets/images/about/ 2>/dev/null || true
```

- [ ] **Step 2: Use Image component in workshop detail**

Modify: `src/pages/warsztaty/[workshop].astro`

```astro
---
import { Image } from 'astro:assets';
// import workshopImage from '../../assets/images/workshops/sensoplastyka.jpg';
---

<!-- <Image src={workshopImage} alt={workshop.data.imageAlt} width={800} /> -->
```

Note: For dynamic images per workshop, use `import.meta.glob()` or store images in `public/` and use URL paths for MVP.

- [ ] **Step 3: Verify image optimization**

Run:
```bash
npm run build
```

Expected: Images processed in `dist/_astro/`.

- [ ] **Step 4: Commit point**

```bash
git add .
git commit -m "feat: optimize images with Astro assets" || echo "Commit skipped"
```

---

### Task 6.2: Final SEO setup

**Files:**
- Create: `public/robots.txt`
- Modify: `astro.config.mjs`
- Modify: `src/lib/seo.ts`

- [ ] **Step 1: Create robots.txt**

Create: `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://cudoteka.pl/sitemap-index.xml
```

- [ ] **Step 2: Add site URL to config**

Modify: `astro.config.mjs`

```js
export default defineConfig({
  site: 'https://cudoteka.pl',
  output: 'static',
  integrations: [sitemap()],
});
```

- [ ] **Step 3: Verify sitemap**

Run:
```bash
npm run build
```

Expected: `dist/sitemap-index.xml` exists.

- [ ] **Step 4: Commit point**

```bash
git add .
git commit -m "feat: add SEO config, sitemap and robots.txt" || echo "Commit skipped"
```

---

### Task 6.3: Deploy

**Files:**
- Create: `netlify.toml` (if Netlify)
- Modify: `README.md`

- [ ] **Step 1: Create Netlify config**

Create: `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 2: Update README**

Create/Modify: `README.md`

```markdown
# Cudoteka Astro

Strona wizytówki Cudoteki zbudowana w Astro 5+.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Push to main on GitHub with Netlify integration.
```

- [ ] **Step 3: Final build check**

Run:
```bash
npm run build
```

Expected: No errors, `dist/` contains all pages.

- [ ] **Step 4: Commit point**

```bash
git add .
git commit -m "chore: add deploy config and README" || echo "Commit skipped"
```

---

### Task 6.4: Motion QA and performance audit

**Files:**
- Review: all CSS/TS motion files
- Modify: any file with layout-triggering animations

- [ ] **Step 1: Audit animations for GPU safety**

Run:
```bash
grep -R "transition:" src/ --include="*.css" --include="*.astro"
```

Expected: No transitions on `width`, `height`, `top`, `left`, `margin`. Only `transform`, `opacity`, `filter`.

- [ ] **Step 2: Verify mobile fallback**

Open DevTools → mobile viewport. Expected:
- Floating nav becomes full-width pill or hamburger.
- No horizontal overflow.
- Asymmetric grids collapse to single column.
- Rotations and negative margins removed below 768px.

- [ ] **Step 3: Lighthouse check**

Run:
```bash
npm run build && npm run preview
```

Open `http://localhost:4321` in Chrome Lighthouse. Expected:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

- [ ] **Step 4: Commit fixes**

```bash
git add .
git commit -m "perf: motion QA and accessibility fixes" || echo "Commit skipped"
```

---

## Verification Checklist

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] Home page renders hero and offer grid
- [ ] `/oferta/` lists all categories
- [ ] `/oferta/tworczosc-i-sztuka/` shows workshops in category
- [ ] `/warsztaty/` lists all workshops
- [ ] `/warsztaty/sensoplastyka/` shows workshop details
- [ ] `/blog/` and `/blog/[slug]/` work
- [ ] `/kontakt/` has working form
- [ ] Sitemap generated in `dist/sitemap-index.xml`
- [ ] All pages have unique title and meta description
- [ ] Site is responsive on mobile
- [ ] Floating nav renders correctly
- [ ] Scroll reveals trigger on viewport entry
- [ ] Magnetic buttons hover smoothly
- [ ] Double-bezel cards render on offer/workshop/testimonial pages
- [ ] No layout-triggering animations in CSS

---

**Plan complete and saved to `docs/superpowers/plans/2026-06-23-cudoteka-astro-mvp-plan.md`. Ready to execute?**
