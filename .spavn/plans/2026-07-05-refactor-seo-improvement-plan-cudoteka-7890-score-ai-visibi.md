---
title: "SEO Improvement Plan — Cudoteka (78→90+ score, AI Visibility 68→85+)"
type: refactor
created: 2026-07-05T06:23:48.609Z
status: draft
branch: feature/seo-improvement-2026-q3
---

# SEO Improvement Plan — Cudoteka (78→90+ score, AI Visibility 68→85+)

# Plan Ulepszeń SEO — Cudoteka

> **Bazowy audyt:** 78/100 SEO, 68/100 AI Visibility
> **Cel:** SEO Score ≥ 90, AI Visibility ≥ 85, Trust Signals ≥ 80
> **Metoda:** Tiered approach — Tier 1 (HIGH critical) → Tier 4 (polish)

---

## 0. Teraźniejszość — co już jest dobrze (NIE RUSZAĆ)

- ✅ 246 DOM nodes (znacznie poniżej 1500)
- ✅ HTML 5.24 Kb (po kompresji br, 76% oszczędności)
- ✅ TTFB 0.001s, FCP 0.904s, LCP 0.9s, CLS 0.0122 — **WSZYSTKIE Core Web Vitals na zielono**
- ✅ Sitemap `/sitemap-index.xml`
- ✅ robots.txt
- ✅ LocalBusiness schema + Open Graph + Twitter Card
- ✅ Canonical link per page
- ✅ Meta description per page
- ✅ 100% alt text coverage
- ✅ 25+ media queries w 16+ plikach (w Header/Footer/stronach)
- ✅ Astro 7.0.2 (latest)
- ✅ HTTPS z ważnym certyfikatem (do 22.09.2026)
- ✅ 18+ wątków z structured data

---

## 1. Weryfikacja projektu — co znalazłem

### 1.1 Stan techniczny
```
astro.config.mjs    — site, static, sitemap ✅ (brak compressHTML/compress config)
netlify.toml        — NIE ISTNIEJE ❌
vercel.json         — NIE ISTNIEJE ❌
public/_redirects   — NIE ISTNIEJE ❌
→ BRAK kanonizacji www → non-www
```

### 1.2 BaseLayout.astro (render-blocking)
```html
<!-- Linie 42-44 — RENDER-BLOCKING -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">
```
**Fix:** Async pattern `<link media="print" onload="this.media='all'">` + `<noscript>` fallback.

### 1.3 Strona główna (`index.astro`)
- **0 własnych `@media` w scoped style** — jedyna strona bez! To dlatego audyt mówi "no media queries" na homepage. Inne strony (kontakt, opinie, oferta, warsztaty, blog) mają swoje media queries. Header/Footer też mają.
- 3 plain `<img>` zamiast `<Image>` (Astro `astro:assets`)
- 1 hero img z `loading="eager"` (poprawnie)

### 1.4 Schema.org LocalBusiness (seo.ts)
**Jest:** name, alternateName, description, url, telephone, email, areaServed, priceRange, image, address (city, country)
**Brakuje:** streetAddress, postalCode, openingHours, geo (lat/lng), sameAs (social), founder, employee, knowsAbout, hasOfferCatalog

### 1.5 Obrazy
- Wszystkie `.webp` w `public/images/`
- Brak użycia `astro:assets` (zero importów znalezionych w `*.astro`)
- `og-default.jpg` = 130 KB (można zmniejszyć)
- Warsztaty: 100-240 KB / szt (można zoptymalizować przez Astro `<Image>`)

### 1.6 Braki treściowe (szybkie wygrane z raportu)
- ❌ Brak FAQ na homepage (jest tylko na `szkolenia.astro`)
- ❌ Brak widełek cenowych na stronach oferty
- ❌ Brak rozwinięcia (materiały/czas/przygotowanie) na stronach warsztatów
- ❌ Brak bio założycielki z credentials (tylko wzmianka)
- ❌ Brak adresu fizycznego widocznego na stronie
- ❌ Brak danych zespołu / certyfikatów

---

## 2. Tier 1 — CRITICAL (naprawia 3/3 FAILED HIGH issues)

### T1.1 — URL Canonicalization (HIGH #2)
**Cel:** `https://www.cudoteka.pl/*` → `https://cudoteka.pl/*` (301)
**Dlaczego:** Duplicate content risk, rozcieńczony link equity, obniżony ranking.

**Implementacja (multi-hosting, bo nie wiadomo gdzie hostowane):**

```bash
# Opcja A: Netlify
# Utwórz netlify.toml w root
```

```toml
# netlify.toml
[[redirects]]
  from = "https://www.cudoteka.pl/*"
  to = "https://cudoteka.pl/:splat"
  status = 301
  force = true

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

```json
// Opcja B: vercel.json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "www.cudoteka.pl" }],
      "destination": "https://cudoteka.pl/$1",
      "statusCode": 301
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

```bash
# Opcja C: _redirects w public/ (Netlify fallback)
# https://www.cudoteka.pl/*  https://cudoteka.pl/:splat  301!
```

**Weryfikacja:** `curl -I https://www.cudoteka.pl/` powinno zwrócić 301 + `location: https://cudoteka.pl/`.

---

### T1.2 — Render-Blocking Resources (HIGH #3)
**Cel:** Wyeliminować blokowanie renderowania przez Google Fonts CSS.

**Zmiana w `src/layouts/BaseLayout.astro` (linie 42-44):**

```astro
<!-- PRZED (render-blocking) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:..." rel="stylesheet">

<!-- PO (non-blocking) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Nunito+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Fraunces:...&display=swap"
  media="print"
  onload="this.media='all'"
/>
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?..." />
</noscript>
```

**Optymalizacja bonus:** Astro `compressHTML: true` w config (już domyślnie w Astro 5+).

**Alternatywa zaawansowana (long-term):** Self-host fonts przez Fontsource (npm) — zero third-party DNS, LCP jeszcze lepszy, zero GDPR ryzyka.

---

### T1.3 — Media Queries na Homepage (HIGH #1)
**Cel:** Audyt widzi `@media` w CSS homepage. Rozwiązanie: dodać minimalny, semantyczny responsive CSS bezpośrednio w `index.astro` (nie polegać na dzieciach komponentów).

**W `src/pages/index.astro` dodaj `<style>` z mobile-first overrides:**

```css
/* Responsive adjustments for hero & sections */
@media (max-width: 980px) {
  .hero { grid-template-columns: 1fr; }
  .hero h1 { font-size: clamp(2rem, 6vw, 3.5rem); }
  .about-grid { grid-template-columns: 1fr; }
}

@media (max-width: 680px) {
  .hero-img { aspect-ratio: 4 / 3; }
  .workshops-grid { grid-template-columns: 1fr; }
  section { padding: 48px 0; }
  .section-eyebrow { font-size: 0.75rem; }
}
```

**Weryfikacja:** Po buildzie `dist/index.html` powinno zawierać `@media` w inlined CSS.

---

## 3. Tier 2 — IMAGE OPTIMIZATION (naprawia 2/2 FAILED MEDIUM + Lighthouse image audit)

### T2.1 — Migracja na `astro:assets` `<Image>` / `<Picture>`
**Cel:** Automatyczne WebP/AVIF, `srcset`, `loading="lazy"`, `decoding="async"`, intrinsic dimensions.

**Astro 7 ma wbudowane.** Zmiana per plik:

```astro
---
// src/pages/index.astro
import { Image } from 'astro:assets';
import heroWebp from '../assets/images/hero/hero.webp';
// lub dla public/images: import z astro:assets wymaga przeniesienia do src/assets/images/
---

<Image
  src={heroWebp}
  alt="Dzieci bawiące się podczas warsztatów twórczych w Cudotece"
  width={720}
  height={560}
  loading="eager"
  decoding="async"
  format="webp"
  quality={80}
/>
```

**Pliki do migracji (8 użyć `<img>`):**
- `src/pages/index.astro` (3x)
- `src/pages/o-nas.astro` (1x)
- `src/pages/galeria.astro` (1x)
- `src/pages/blog.astro` (1x)
- `src/pages/blog/[post].astro` (1x)
- `src/pages/warsztaty/[workshop].astro` (1x)

**Krok techniczny:** Przenieś `public/images/` → `src/assets/images/`, dodaj do `content.config.ts` schema dla `image` reference (z użyciem `image()` z `astro:assets`).

### T2.2 — Konwersja na format AVIF + WebP
`<Image>` automatycznie generuje AVIF (mniejszy) + WebP fallback. **Oszczędność: ~30-50% per obraz.**

### T2.3 — Optymalizacja `og-default.jpg`
```bash
# 130 KB → ~30 KB
npx sharp-cli -i public/images/og-default.jpg -o public/images/og-default.webp -f webp --quality 80
# LUB użyj Astro <Image> dla og-image i niech build wygeneruje webp
```

**W `seo.ts`:** zmień fallback na `og-default.webp` (zachowaj `.jpg` jako fallback dla starych crawlerów).

### T2.4 — Napraw image distortion
**Audyt:** "Avoid using distorted images". Przyczyna: `<img>` bez `object-fit: cover` w gridach, aspect-ratio niezdefiniowany.

**W global CSS dodaj:**
```css
img { max-width: 100%; height: auto; }
.gallery-img, .workshop-img, .about-photo { object-fit: cover; aspect-ratio: 4 / 3; }
```

---

## 4. Tier 3 — TRUST & CONTENT (boost: Trust 64→80, Expertise 68→80, AI Visibility 68→85)

### T3.1 — FAQ Schema na homepage (Quick Win #1 z raportu)
**Cel:** Featured snippet w Google + lepsza pozycja w odpowiedziach AI (LLM-y czytają schema FAQ).

**Dodaj do `src/pages/index.astro` w `<head>` (przez BaseLayout `schemas` prop):**

```typescript
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Dla jakich grup wiekowych są warsztaty?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Warsztaty dostosowujemy do grup od 3 do 14 lat. Dla młodszych (3-6) oferujemy sensoplastykę i zajęcia ruchowe, dla starszych (7-14) — ceramikę, eksperymenty, eko-kosmetyki. Animacje eventowe obsługujemy bez ograniczeń wiekowych.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy zapewniacie bezpieczeństwo podczas warsztatów?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Wszystkie materiały są atestowane i bezpieczne dla dzieci. Każdy warsztat prowadzi przeszkolony animator z doświadczeniem w pracy z dziećmi. Posiadamy ubezpieczenie OC.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jaki jest obszar działania?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Realizujemy warsztaty w Warszawie i okolicach do 30 km (Pruszków, Legionowo, Piaseczno, Otwock). Przy większych eventach wyjeżdżamy w całą Polskę — indywidualna wycena.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jak zarezerwować termin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Napisz na biuro@e-cud.waw.pl, zadzwoń +48 607 370 777 lub wypełnij formularz na stronie /kontakt/. Odpowiadamy w ciągu 24 h i przesyłamy ofertę dostosowaną do Twojego eventu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile trwają warsztaty?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standardowe warsztaty: 60-90 minut. Animacje eventowe: 2-3 godziny. Pełne eventy (kilka stref): 3-5 godzin. Czas dostosowujemy do Twojego scenariusza.',
      },
    },
  ],
};
```

**UI:** Dodaj sekcję FAQ w homepage (przed CTA do kontaktu) — `<details>` elementy z `class="faq-item"` (spójne z `szkolenia.astro`).

### T3.2 — Wzbogacenie LocalBusiness Schema
**W `src/lib/seo.ts`:**

```typescript
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cudoteka.pl/#business',
    name: 'Cudoteka',
    alternateName: 'E-CUD',
    description: 'Twórcze warsztaty, sensoplastyka i animacje dla dzieci i dorosłych. Warszawa i okolice.',
    url: 'https://cudoteka.pl',
    telephone: '+48-607-370-777',
    email: 'biuro@e-cud.waw.pl',
    areaServed: [
      { '@type': 'City', name: 'Warszawa' },
      { '@type': 'AdministrativeArea', name: 'Mazowieckie' },
    ],
    priceRange: '$$',
    image: 'https://cudoteka.pl/images/og-default.webp',
    logo: 'https://cudoteka.pl/favicon.svg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Przykładowa 1', // ← DO UZUPEŁNIENIA PRZEZ WŁAŚCICIELKĘ
      addressLocality: 'Warszawa',
      postalCode: '00-000',                // ← DO UZUPEŁNIENIA
      addressCountry: 'PL',
    },
    geo: {                                // ← DO UZUPEŁNIENIA
      '@type': 'GeoCoordinates',
      latitude: 52.2297,
      longitude: 21.0122,
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
      opens: '09:00',
      closes: '18:00',
    }],
    sameAs: [
      'https://www.facebook.com/cudoteka',  // ← DO UZUPEŁNIENIA
    ],
    founder: {
      '@type': 'Person',
      name: 'Aleksandra Dąbrowska',
    },
    knowsAbout: [
      'Sensoplastyka',
      'Edukacja alternatywna',
      'Animacje eventowe dla dzieci',
      'Eko-projekty edukacyjne',
      'Ceramika artystyczna',
    ],
  };
}
```

**⚠️ 3 placeholdery wymagają danych od właścicielki:** adres, koordynaty, link FB.

### T3.3 — Bio założycielki z credentials (Quick Win #3)
**W `src/pages/o-nas.astro`:** Rozwiń sekcję "Aleksandra Dąbrowska" o:
- Wykształcenie (pedagogika / pedagogika twórcza / etc.)
- Certyfikaty / ukończone kursy (sensoplastyka, ceramiczne, etc.)
- Lata doświadczenia
- Misja / wartości

**Dodaj Person schema na stronie:**
```typescript
const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aleksandra Dąbrowska',
  jobTitle: 'Założycielka, pedagog twórcza',
  worksFor: { '@id': 'https://cudoteka.pl/#business' },
  knowsAbout: ['Sensoplastyka', 'Edukacja alternatywna', 'Pedagogika twórcza'],
};
```

### T3.4 — Adres fizyczny w stopce
**W `src/components/layout/Footer.astro`:** Dodaj sekcję z adresem, NIP, REGON (jeśli istnieją). Pomoc dla Local SEO + trust.

### T3.5 — Widełki cenowe na stronach oferty (Quick Win #2)
**W `src/content/categories/*.md` i `src/content/workshops/*.md`:** Dodaj pole `priceFrom`, `priceTo` (lub `priceNote`).

**Schemat:**
```typescript
// content.config.ts
priceFrom: z.number().optional(),
priceTo: z.number().optional(),
priceNote: z.string().optional(), // np. "od 50 zł / dziecko, eventy od 1500 zł"
```

**Wyświetlanie:** Na kartach warsztatów i stronach kategorii badge "od XX zł".

### T3.6 — Rozbudowa stron warsztatów (Quick Win #3)
**W `src/pages/warsztaty/[workshop].astro`:** Dodaj sekcje:
- 🎨 **Materiały** (co dostarczamy, co rodzic musi przygotować)
- ⏱ **Czas trwania i setup** (ile trwa, ile czasu na rozstawienie)
- 👥 **Grupa docelowa** (wiek, optymalna liczba dzieci)
- ✨ **Efekty / co zabierają dzieci** (co dziecko wynosi z warsztatów)
- 📍 **Obszar dojazdu** (Warszawa + okolice, opcja wyjazdu)

---

## 5. Tier 4 — POLISH (naprawia 4 WARNINGS + AI Visibility boost)

### T4.1 — Heading hierarchy audit
**Cel:** Score 62% → 100%. Sprawdź:
- Dokładnie 1 `<h1>` per strona
- H2 → H3 → H4 bez przeskakiwania poziomów
- H1 zawiera główne słowo kluczowe

**Strony do audytu (Top 10):** `/`, `/oferta/`, `/warsztaty/`, `/warsztaty/[workshop]/`, `/o-nas/`, `/kontakt/`, `/blog/`, `/galeria/`, `/opinie/`, `/oferta/[category]/`

**Tool:** Automatyczny grep:
```bash
rg -n '<h[1-6]' src/pages/ --type-add 'astro:*.astro' -t astro
```

### T4.2 — Image Alt Test (78% pass)
**Audyt:** "All img tags from this webpage have the required alt attribute" — 100% według innego miejsca w raporcie. Może false positive. Sprawdź galerię czy `item.data.alt` jest zawsze ustawiony (schema wymaga).

**W `src/content/config.ts`:** Sprawdź czy `alt` jest wymagane (`z.string().min(1)`).

### T4.3 — Page Objects (7% pass — counter-intuitive)
**Audyt:** "This webpage has less than 20 http requests" — to jest DOBRZE, ale tool dał 7% pass. Prawdopodobnie fałszywy sygnał (top 100 może mieć CDN/aggregator). Sprawdź:
```bash
npm run build
# Policz requesty w dist/index.html:
rg -c 'src=|href=' dist/index.html
```

Jeśli > 20 requestów, rozważ inline SVG + critical CSS w `<head>`.

### T4.4 — Social Media test
**Cel:** Upewnij się że Twitter Card i OG są kompletne.
- `og:image:width` / `og:image:height` ← dodaj (np. 1200x630 dla `og-default.jpg`)
- `og:site_name` ← już jest ✅
- Twitter: `twitter:site` (handle firmy) ← DO UZUPEŁNIENIA
- Twitter: `twitter:creator` ← DO UZUPEŁNIENIA

### T4.5 — rel="noopener noreferrer" audit
**Stan:** Znalezione 3 linki — wszystkie mają poprawnie `rel="noopener noreferrer"`. ✅
**Akcja:** Dodaj linting rule (ESLint `react/jsx-no-target-blank` analog dla Astro) — zapobieganie regresji.

### T4.6 — Email protection
**Stan:** Email `biuro@e-cud.waw.pl` jest w schema (OK dla SEO) + plaintext w `polityka-prywatnosci.astro` (wymagane prawnie). Brak realnego zagrożenia — polityka prywatności musi mieć email jawnie.

---

## 6. Roadmapa wdrożenia

### Faza A — Tydzień 1 (krytyczne, 2-4h)
- [ ] **T1.1** Utwórz `netlify.toml` LUB `_redirects` w `public/` (1h)
- [ ] **T1.2** Async font loading w BaseLayout (15 min)
- [ ] **T1.3** Dodaj media queries w `index.astro` (30 min)
- [ ] **T4.4** Uzupełnij OG image dimensions + Twitter handles (15 min)
- [ ] `npm run build` + `npm run preview` + manual smoke test

### Faza B — Tydzień 2 (obrazy, 3-5h)
- [ ] **T2.1** Migracja 8 plików na `astro:assets` `<Image>` (2h)
- [ ] **T2.2** Build → zweryfikuj automatyczną konwersję AVIF/WebP (30 min)
- [ ] **T2.3** Optymalizacja `og-default.jpg` → `.webp` (15 min)
- [ ] **T2.4** Global CSS: `object-fit: cover` + `aspect-ratio` na klasy obrazów (30 min)
- [ ] Porównaj rozmiar `dist/images/` przed/po (sukces: -40%)

### Faza C — Tydzień 3 (content, 4-6h)
- [ ] **T3.1** FAQ schema + UI na homepage (1h)
- [ ] **T3.2** Rozbudowa LocalBusiness schema (30 min, +placeholders do wypełnienia)
- [ ] **T3.3** Bio założycielki + Person schema (1.5h)
- [ ] **T3.4** Adres w stopce (30 min)
- [ ] **T3.5** Widełki cenowe (schema + UI) (1.5h)
- [ ] **T3.6** Rozbudowa stron warsztatów (1.5h)

### Faza D — Tydzień 4 (polish, 2-3h)
- [ ] **T4.1** Heading hierarchy audit (1h)
- [ ] **T4.2** Alt text schema validation (30 min)
- [ ] **T4.5** Lint rule dla `target="_blank"` (30 min)
- [ ] **T4.3** Sprawdź HTTP request count (15 min)
- [ ] Re-run audyt SEO → cel: 88-92/100

---

## 7. Metryki sukcesu (KPIs)

| Metryka | Baseline | Po Faza A | Po Faza B | Po Faza D (cel) |
|---------|----------|-----------|-----------|-----------------|
| **SEO Score** | 78/100 | 82-85 | 86-88 | **≥ 90** |
| **AI Visibility** | 68/100 | 70 | 75-78 | **≥ 85** |
| **Content Trust** | 64% | 64 | 72-75 | **≥ 80** |
| **Subject Expertise** | 68% | 70 | 75 | **≥ 80** |
| **Credibility** | 55% | 60 | 70-75 | **≥ 80** |
| **Failed issues** | 8 | 5 | 3 | **0** |
| **Warnings** | 4 | 3 | 2 | **0-1** |
| **Page weight (dist)** | 100% | 100% | ~60% | **~50%** |

**Walidacja końcowa:** Ponowny audyt (np. SEO Site Checkup) + Google Search Console + Bing Webmaster Tools.

---

## 8. Decyzje architektoniczne (PAF)

1. **DECYZJA:** Migracja z `public/images/` na `src/assets/images/` (astro:assets).
   - **Uzasadnienie:** Build-time optimization, AVIF/WebP, srcset, intrinsic dims.
   - **Odrzucone:** CDN image service (overkill dla 1-tenant site, +$).
   - **Konsekwencje:** Trzeba zaktualizować schema w `content.config.ts`, referencje w 8 plikach.

2. **DECYZJA:** Wdrożenie FAQ schema na homepage (nie tylko na stronach warsztatów).
   - **Uzasadnienie:** Featured snippets + AI citation rate (LLM-y preferują FAQPage schema).
   - **Odrzucone:** Blog z regularnymi postami (długoterminowy projekt, +3-6h).
   - **Konsekwencje:** Content freeze pytań na 6+ miesięcy (FAQ aktualizowane kwartalnie).

3. **DECYZJA:** Self-host fonts (Fontsource) odroczone do TIER 5 (post-MVP).
   - **Uzasadnienie:** Async loading z `media="print"` rozwiązuje render-blocking za darmo.
   - **Konsekwencja:** Tymczasowo zależni od Google Fonts CDN.

4. **DECYZJA:** Tailwind dependency w `package.json` (v4.3.1) — nie jest używany w kodzie (zero importów w `*.astro`).
   - **Uzasadnienie do usunięcia:** Zmniejsza `node_modules`, czystszy `package.json`.
   - **Akcja:** `npm uninstall @tailwindcss/vite tailwindcss` (potwierdzić z userem — może planowane).

---

## 9. Out-of-scope (świadomie pominięte)

- Blog regular content (posty co tydzień) — duży effort, lepiej rozważyć po FAQ + workshop detail
- Wielojęzyczność (i18n) — Warszawa = polski rynek, +ryzyko duplicate content
- Migracja na SSR/hybrid — static jest OK dla 42 stron, build <10s
- Custom CMS — content owner jest nietechniczny ale Markdown + Content Collections OK
- A/B testing — brak budżetu, brak narzędzia, mały ruch

---

## 10. Otwarte pytania (do decyzji z właścicielką)

1. **Adres fizyczny** — pokazać na stronie? (Niektóre biznesy celowo nie pokazują)
2. **Koordynaty GPS** — dla schema geo
3. **Link do Facebooka** — właściwy URL profilu
4. **Twitter/X handle** — jeśli istnieje
5. **Czy usunąć Tailwind z deps** — czy to było planowane?
6. **Czy dodać więcej języków** (EN dla expat eventów w Warszawie)?
7. **Widełki cenowe** — precyzyjne (np. 50-80 zł) czy przybliżone (np. "od XX zł")?

---

## 11. Definition of Done

Plan uznaję za ukończony, gdy:

- ✅ Wszystkie FAILED (8/8) z audytu rozwiązane lub wyjaśnione false-positive
- ✅ Wszystkie WARNINGS (4/4) zaadresowane
- ✅ 3 quick wins z raportu wdrożone
- ✅ `npm run build` → 0 errors, 0 warnings
- ✅ Lighthouse Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95
- ✅ Schema.org validator: LocalBusiness, FAQPage, Person → 0 errors
- ✅ Google Search Console → 0 manual actions, 0 coverage errors
- ✅ Re-audit SEO Site Checkup → score ≥ 90
- ✅ Re-audit AI Visibility → score ≥ 85
- ✅ Dokumentacja w `AGENTS.md` zaktualizowana (nowe dependencies, nowe schema pola, redirect config)

## Tasks

- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
- [ ] [object Object]
