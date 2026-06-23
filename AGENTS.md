# Cudoteka Astro MVP — AGENTS.md

**Status:** MVP implementation complete (2026-06-23)  
**Deployed:** Static Astro 5+ site on Netlify/Vercel  
**Language:** TypeScript, Astro, Vanilla CSS  

---

## Purpose

Cudoteka (formerly E-CUD) is a SEO-first, static marketing website for a creative workshop and event animation business. The site showcases 24+ workshops, 6 service categories, testimonials, blog posts, and a contact form. All content is managed via Astro Content Collections (Markdown/JSON + Zod validation) enabling non-technical content updates without code changes.

**Core Goal:** Deliver a fast, accessible, indexable single-tenant website for a Warszawa-based business targeting parents, schools, and event organizers.

---

## Ownership

- **Repository Owner:** `cudoteka-app/` (local workspace root)
- **Package Name:** `cudoteka-app` (v0.0.1)
- **Framework:** Astro 5.0.2 + TypeScript strict mode
- **Build Output:** Static HTML (`output: 'static'`)
- **Deployment Target:** Netlify or Vercel (free tier compatible)

---

## Local Contracts

### Tech Stack (Immutable)
- **Framework:** Astro 5+ with TypeScript
- **Styling:** Vanilla CSS (design system in `src/styles/variables.css`)
- **Fonts:** Fraunces (serif headers) + Nunito Sans (body) from Google Fonts
- **SEO:** `@astrojs/sitemap` + schema.org (LocalBusiness, Service) + Open Graph meta
- **Forms:** Formspree (MVP) or Netlify Forms
- **Deployment:** Static pre-rendered HTML; no backend runtime needed

### Content Model
- **Collections:** `workshops`, `categories`, `testimonials`, `posts`, `gallery`
- **Schema Validation:** Zod (enforced in `src/content.config.ts`)
- **Markdown Format:** YAML frontmatter + markdown body
- **Routes Generated:** Dynamic via `getStaticPaths()` during build

### Route Structure
```
/ (home)
/o-nas/ (about)
/oferta/ (offer listing)
/oferta/[category]/ (category detail + workshops)
/warsztaty/ (workshops listing with filter)
/warsztaty/[workshop]/ (workshop detail)
/blog/ (blog listing)
/blog/[post]/ (blog post detail)
/galeria/ (gallery grid with filter)
/opinie/ (testimonials)
/kontakt/ (contact form)
/polityka-prywatnosci/ (privacy)
/404.astro (custom 404)
```

### Design System (Constraints)
- **Color Palette:** Cream (#FBF7F1), Ink (#36323B), Blue (#3E89B0), Peach (#EF9E80), Mint (#7FC4A6), Gold (#E7B85C)
- **Spacing:** 96px section padding (96px 0), 30px card gaps
- **Border Radius:** 30px standard (--radius), 18px compact (--radius-sm)
- **Motion:** Cubic-bezier(0.32, 0.72, 0, 1) for all ease; 300–800ms durations
- **Shadow:** --shadow (0 22px 48px -22px) for depth
- **Double-Bezel Card:** Outer shell with padding 6px + inner card with padding 28px

### Build Output Requirements
- **Sitemap:** Auto-generated at `/sitemap-index.xml` (production only)
- **Robots:** Manual `public/robots.txt` points to sitemap
- **Canonical URLs:** Implicit per Astro (site URL: `https://cudoteka.pl`)
- **Image Optimization:** `src/assets/images/` only; use `loading="lazy"` / `loading="eager"`

---

## Work Guidance

### Adding New Content
1. **Workshop:** Create `src/content/workshops/[slug].md` with schema from `content.config.ts`
2. **Blog Post:** Create `src/content/posts/[slug].md` with date, excerpt, category, image, markdown body
3. **Category:** Create `src/content/categories/[slug].md` with icon, description, color tag
4. **Testimonial:** Create `src/content/testimonials/[slug].md` with author, role, rating, content
5. **Gallery:** Create `src/content/gallery/[slug].md` with image path, alt, category, featured flag

All content files are scanned from their collection folder during build and validated against Zod schemas.

### Adding New Pages
1. Create `.astro` file in `src/pages/` (static route) or `src/pages/[param]/` (dynamic)
2. Import `BaseLayout` from `src/layouts/BaseLayout.astro`
3. Pass `title`, `description`, `image`, `canonical` props for SEO
4. Use `reveal-fade-up` class on sections for scroll animations
5. Use `double-bezel-outer` + `double-bezel-inner` for card styling
6. Build test: `npm run build` must complete with 0 errors

### Modifying Styles
- Global variables: `src/styles/variables.css` (CSS custom properties)
- Global resets + typography: `src/styles/global.css`
- Utility classes + animations: `src/styles/utilities.css`
- Page-specific styles: Scoped `<style>` blocks in `.astro` components
- No Tailwind; no external CSS frameworks

### Updating SEO
1. **Per-page meta:** Pass via BaseLayout props (`title`, `description`, `image`, `canonical`, `type`)
2. **Schema:** Auto-included LocalBusiness in BaseLayout; add `@context`, `@type` JSON-LD if needed
3. **Sitemap:** Automatic for all `.astro` routes in `src/pages/`; build generates `/sitemap-index.xml`

### Mobile Responsiveness
- Breakpoints: 980px (desktop→tablet), 680px (tablet→mobile)
- Responsive prefix: `@media (max-width: 980px)` and `@media (max-width: 680px)`
- Images: `min-h-[100dvh]` (not `h-screen`), flexible grids with `minmax()`
- No fixed widths; all text responsive via `clamp()` for font sizes

### Development Server
```bash
npm run dev          # Start Astro dev server on localhost:4321
npm run build        # Static build to dist/
npm run preview      # Preview built site locally
```

---

## Verification

### Pre-commit Checks
1. **Build:** `npm run build` completes with 0 errors and all routes generated
2. **Route Count:** Confirm page count = 42 (1 home + 6 offer + 24 workshops + 6 category pages + 2 blog posts + 1 blog list + 1 gallery + 1 testimonials + 1 about + 1 contact + 1 privacy + 1 404)
3. **Sitemap:** Post-build: verify `dist/sitemap-index.xml` and individual sitemaps exist
4. **No Console Errors:** Run `npm run preview` and check browser console for errors
5. **Image Assets:** All images resolve from `public/` or `src/assets/images/`

### Performance Baseline
- **LCP:** < 2.5s (Largest Contentful Paint)
- **CLS:** < 0.1 (Cumulative Layout Shift)
- **INP:** < 200ms (Interaction to Next Paint)
- **No Unused CSS:** Verify no unreferenced utility classes in built CSS

### SEO Spot Checks
- **Homepage Meta:** `<title>`, `<meta name="description">`, OG tags present
- **Blog Post Meta:** Unique title/description per post, og:image present
- **Canonical:** Each page has implicit canonical URL per site config
- **JSON-LD:** LocalBusiness schema present in `<head>`

### Content Validation
- All workshops have: title, slug, category reference, shortDescription, fullDescription, ageRange, duration, metaTitle, metaDescription
- All blog posts have: title, slug, pubDate, category, excerpt, metaTitle, metaDescription
- All gallery items have: image path, alt text, category, featured flag
- No broken internal links in markdown body or nav

---

## Child DOX Index

### Folder: `src/`
- **Purpose:** Source code root
- **Contents:** Astro components, layouts, pages, content collections, styling, utilities
- **Child Files:** [See tree below]

### Folder: `src/pages/`
- **Purpose:** Route definitions (file = URL path)
- **Contracts:** Every `.astro` file here generates a page; dynamic routes use `getStaticPaths()`
- **Files:**
  - `index.astro` — home page (aggregates featured workshops, testimonials, gallery)
  - `o-nas.astro` — about page (founder bio, values)
  - `oferta.astro` — offer index (category cards)
  - `oferta/[category].astro` — category detail + workshops in category
  - `warsztaty.astro` — workshop listing with client-side filter tabs
  - `warsztaty/[workshop].astro` — workshop detail page
  - `blog.astro` — blog index (card grid, sorted by date)
  - `blog/[post].astro` — blog post detail with markdown render
  - `galeria.astro` — gallery grid with category filter
  - `opinie.astro` — testimonial cards grid
  - `kontakt.astro` — contact form (Formspree placeholder)
  - `polityka-prywatnosci.astro` — privacy policy page
  - `404.astro` — custom 404 page

### Folder: `src/layouts/`
- **Purpose:** Reusable page templates
- **Files:**
  - `BaseLayout.astro` — master template (header, footer, SEO meta, fonts, schema, IntersectionObserver for reveals)

### Folder: `src/components/`
- **Purpose:** Reusable UI and business logic components
- **Subfolders:**
  - `layout/` — Header, Footer (sticky pill nav, mobile burger)
  - `workshops/` — WorkshopList (filter tabs), WorkshopCard (double-bezel)

### Folder: `src/content/`
- **Purpose:** Markdown-backed content collections (managed via Content Collections API)
- **Subfolders:**
  - `categories/` — Service categories (6 items)
  - `workshops/` — Workshop definitions (24 items)
  - `posts/` — Blog articles (2 MVP items, expandable)
  - `testimonials/` — Customer reviews (3+ items)
  - `gallery/` — Photo grid items (5+ items)

### Folder: `src/styles/`
- **Purpose:** Global design system and utilities
- **Files:**
  - `variables.css` — CSS custom properties (colors, radius, shadows, motion)
  - `global.css` — Resets, typography, base button styles
  - `utilities.css` — Helper classes (.wrap, .section, .btn, .eyebrow, .double-bezel-*, .reveal-fade-up)

### Folder: `src/lib/`
- **Purpose:** Utility functions and helpers
- **Files:**
  - `seo.ts` — SEO helper (title, meta tags, Open Graph, LocalBusiness schema)

### Folder: `public/`
- **Purpose:** Static assets served as-is
- **Files:**
  - `robots.txt` — SEO directives (disallow none, sitemap URL)
  - `favicon.ico`, `favicon.svg` — Browser icons

### Folder: `src/assets/images/`
- **Purpose:** Optimized images (Astro Image component processing)
- **Subfolders:**
  - `hero/` — Homepage hero image
  - `about/` — About page founder photo
  - `workshops/` — Workshop category images (24+)
  - `gallery/` — Gallery item photos (5+)

### Config Files
- **astro.config.mjs** — Astro runtime (site URL, static output, sitemap integration)
- **tsconfig.json** — TypeScript strict mode
- **package.json** — Dependencies, build scripts
- **src/content.config.ts** — Content Collection schemas (Zod)

---

## User Preferences & Decisions

- **No Framework Components:** React/Vue islands avoided; pure Astro + vanilla JS for interactivity
- **Motion Priority:** Premium scroll reveals (reveal-fade-up), button hover feedback, card morphing
- **CSS-First Design:** No utility-first framework; explicit, understandable class names tied to brand
- **Static Only:** No dynamic routes at runtime; all routes pre-rendered at build time for maximum performance
- **Markdown for Content:** Non-technical users can edit workshops, posts, testimonials without touching code
- **Forms without Backend:** MVP uses Formspree or Netlify Forms; no backend infrastructure needed