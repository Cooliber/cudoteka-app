# Cudoteka — Design Doc: Astro MVP (SEO-first)

**Data:** 2026-06-23  
**Status:** Zaakceptowany  
**Cel:** Przeniesienie istniejącego prototypu HTML Cudoteki do nowoczesnej, statycznej aplikacji Astro z naciskiem na SEO i łatwą rozbudowę treści.

---

## 1. Cel projektu

Stworzyć reprezentacyjną, szybką i dobrze indeksowaną stronę dla marki **Cudoteka** (dawniej E-CUD). Strona ma być:
- **SEO-optimized** — wiele podstron, semantyczny HTML, sitemap, meta dane, JSON-LD.
- **Łatwa w rozbudowie treści** — warsztaty, opinie, wpisy bloga i galeria zarządzane przez Content Collections.
- **Szybka i lekka** — statyczny build Astro, minimalny JS, zoptymalizowane obrazy.
- **Gotowa do wdrożenia** — deploy na Netlify/Vercel z darmowego tiera.

---

## 2. Zakres MVP

### W zakresie MVP:
- Nowa aplikacja Astro 5+ oparta na istniejącym prototypie HTML.
- Przeniesienie identyfikacji wizualnej: paleta "pastelowej pracowni", typografia Fraunces + Nunito Sans.
- Multi-page layout z osobnymi podstronami dla każdego warsztatu i kategorii.
- Content Collections dla warsztatów, kategorii, opinii, wpisów bloga i galerii.
- Formularz kontaktowy podpięty pod Formspree / Netlify Forms.
- Podstawowy SEO: meta tagi, Open Graph, sitemap, JSON-LD.

### Poza MVP (do przodu):
- Headless CMS (np. Sanity, Decap CMS) do edycji treści przez właścicielkę.
- Własny backend do formularza (Astro API route + Resend).
- Wielojęzyczność (i18n).
- Zaawansowane animacje i efekty wizualne.
- Sklep / rezerwacje online.

---

## 3. Architektura techniczna

| Warstwa | Wybór | Uzasadnienie |
|---------|-------|--------------|
| Framework | Astro 5+ | Statyczny SSG, zero JS domyślnie, świetne SEO, komponenty Astro jako nadzbiór HTML. |
| Język | TypeScript | Type-safety, lepsza utrzymywalność, wsparcie dla Content Collections. |
| Renderowanie | `output: 'static'` | Najlepsza wydajność i indeksowalność dla strony wizytówki. |
| Treści | Content Collections (Markdown/JSON + Zod) | Walidacja schema, łatwe dodawanie nowych warsztatów/blogów bez grzebania w kodzie. |
| Style | Vanilla CSS + CSS variables | Przeniesienie istniejącego design systemu, mniej zależności niż Tailwind. |
| Obrazy | `src/assets/` + `<Image />` / `<Picture />` | Automatyczna optymalizacja, lazy loading, responsywne obrazy. |
| Ikony | SVG inline / Lucide | Lekkie, skalowalne ikony. |
| Formularz | Formspree / Netlify Forms | Brak backendu w MVP, działa od razu. |
| Hosting | Netlify / Vercel | Darmowy tier, automatyczny deploy z git, szybki CDN. |

---

## 4. Motion & Micro-interactions

MVP zachowuje ciepły, pastelowy klimat Cudoteki, ale wprowadza premium motion choreography inspirowaną k+ agency work.

### 4.1. Nawigacja — "Floating Island"
- Header nie jest przyklejony do górnej krawędzi ekranu — unosi się jako szklana pigułka (`floating pill`) z górnym marginesem, `rounded-full`, `backdrop-blur`.
- Hamburger (mobilny) morphuje płynnie w `X` przez rotację linii, a nie przez ich zniknięcie.
- Rozwijane menu to pełnoekranowy overlay ze szklistym tłem i linkami wchodzącymi ze staggrem (`translate-y-12 opacity-0` → `translate-y-0 opacity-100`).

### 4.2. Przyciski — "Magnetic / Nested"
- Główne CTA to zaokrąglone pigułki (`rounded-full`) z ikoną/arrow zagnieżdżoną we własnym kółku.
- Hover: lekkie `active:scale-[0.98]`, ikona przesuwa się po przekątnej (`translate-x-1 -translate-y-[1px]`) i lekko rośnie.
- Transition: custom cubic-bezier `cubic-bezier(0.32, 0.72, 0, 1)`, duration 500–700 ms.

### 4.3. Karty — "Double-Bezel"
- Większe karty (oferta, warsztaty, opinie) budowane jako nested shell + inner core:
  - Outer: padding `p-1.5`, subtelne tło (`bg-black/[0.03]`), hairline border, `rounded-[2rem]`.
  - Inner: właściwa zawartość, własne tło, `rounded-[calc(2rem-0.375rem)]`, inner highlight.

### 4.4. Scroll reveals
- Sekcje i karty wchodzą do viewportu z lekkim fade-up + blur (`translate-y-16 blur-md opacity-0` → `translate-y-0 blur-0 opacity-100`).
- Wykorzystujemy `IntersectionObserver` (lub Framer Motion `whileInView` jeśli React island), nigdy `window.onscroll`.
- Duration: 800 ms+, custom cubic-bezier.

### 4.5. Performance guardrails
- Animujemy wyłącznie `transform` i `opacity`.
- `backdrop-blur` tylko na pływającej nawigacji / overlayu, nigdy na scrollujących kontenerach.
- Mobile: layouty asymetryczne agresywnie padają do single-column (`w-full`, `px-4`), usuwanie rotacji i nakładek.
- `min-h-[100dvh]` zamiast `h-screen`.

---

## 5. Mapa strony

```
/
/o-nas/
/oferta/
/oferta/[kategoria]/
  └── tworczosc-i-sztuka/
  └── nauka-przez-zabawe/
  └── animacje-i-atrakcje/
  └── strefa-malucha/
  └── integracja/
  └── programy-pod-klucz/
/warsztaty/
/warsztaty/[warsztat]/
  └── sensoplastyka/
  └── plastyka-ekspresywna/
  └── malowanie-twarzy/
  └── ... (24 warsztaty)
/blog/
/blog/[slug]/
/galeria/
/opinie/
/kontakt/
/polityka-prywatnosci/
```

---

## 6. Content Collections

Plik konfiguracyjny: `src/content.config.ts`

### `workshops`
```ts
{
  title: string,
  slug: string,
  category: reference('categories'),
  shortDescription: string,
  fullDescription: string,
  ageRange: string,
  duration: string,
  materials: string[],
  image: image(),
  imageAlt: string,
  featured: boolean,
  metaTitle: string,
  metaDescription: string,
}
```

### `categories`
```ts
{
  title: string,
  slug: string,
  icon: string,
  description: string,
  color: 'blue' | 'mint' | 'peach' | 'gold' | 'lilac',
  metaTitle: string,
  metaDescription: string,
}
```

### `testimonials`
```ts
{
  author: string,
  role: string,
  content: string,
  rating: number,
  source: string,
}
```

### `posts`
```ts
{
  title: string,
  slug: string,
  pubDate: date,
  category: string,
  excerpt: string,
  image: image(),
  imageAlt: string,
  body: string, // Markdown
  metaTitle: string,
  metaDescription: string,
}
```

### `gallery`
```ts
{
  image: image(),
  alt: string,
  category: string,
  featured: boolean,
}
```

---

## 7. Struktura projektu

```
cudoteka-astro/
├── public/
│   ├── fonts/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── hero/
│   │       ├── workshops/
│   │       ├── gallery/
│   │       └── about/
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
│   │   ├── oferta/
│   │   │   └── [category].astro
│   │   ├── warsztaty.astro
│   │   ├── warsztaty/
│   │   │   └── [workshop].astro
│   │   ├── blog.astro
│   │   ├── blog/
│   │   │   └── [slug].astro
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

## 8. Kluczowe komponenty

- **BaseLayout** — wspólny szkielet HTML, meta tagi, Google Fonts, schema.org.
- **Header** — nawigacja desktop + mobile hamburger.
- **Footer** — linki, kontakt, social media.
- **Hero** — sekcja powitalna z CTA.
- **OfferGrid** — siatka kategorii oferty.
- **WorkshopCard** — karta warsztatu.
- **FeaturedWorkshops** — 3-4 wyróżnione warsztaty.
- **WhyUs** — 6 kart z korzyściami.
- **Testimonials** — opinie rodziców.
- **ContactForm** — formularz z walidacją.
- **GalleryGrid** — galeria zdjęć.
- **SEO** — helper do generowania meta tagów i JSON-LD.

---

## 9. SEO strategy

### On-page SEO
- Unikalne `<title>` i `<meta name="description">` na każdej podstronie.
- Open Graph: `og:title`, `og:description`, `og:image`, `og:type`, `og:url`.
- Twitter Cards.
- Canonical URLs.
- Semantyczny HTML (`<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`).
- Atrybuty `alt` dla wszystkich obrazów.
- Wewnętrzne linkowanie między warsztatami a kategoriami.

### Structured data (JSON-LD)
- `LocalBusiness` — dane firmy (nazwa, telefon, email, obszar).
- `Service` / `Offer` — dla kategorii i warsztatów.
- `Event` — dla warsztatów/eventów (opcjonalnie).
- `BreadcrumbList` — na podstronach.

### Technical SEO
- `@astrojs/sitemap` — automatyczna mapa strony.
- `robots.txt` — zezwolenie na indeksowanie + wskazanie sitemap.
- Szybki build i optymalizacja obrazów.
- Core Web Vitals: CLS, LCP, INP.

---

## 10. Formularz kontaktowy

### MVP
- Formspree lub Netlify Forms.
- Pola: imię i nazwisko, telefon/email, rodzaj wydarzenia, wiadomość.
- Potwierdzenie wysłania bez przeładowania strony (AJAX).

### Przyszłość
- Astro API route (`src/pages/api/contact.ts`) + Resend / SendGrid.
- Walidacja po stronie serwera i ochrona przed spamem (honeypot / reCAPTCHA).

---

## 11. Hosting i deploy

- **Netlify** (preferowane) lub **Vercel**.
- Deploy po każdym pushu do `main`.
- Branch preview dla Pull Requestów.
- Custom domain w przyszłości (np. `cudoteka.pl`).

---

## 12. Roadmapa MVP

### Faza 1 — Setup i struktura (dzień 1)
- `npm create astro@latest`
- Konfiguracja TypeScript, ESLint, Prettier.
- Setup folderów i Content Collections.
- Przeniesienie zmiennych CSS i fontów.

### Faza 2 — Layout i komponenty (dzień 2-3)
- BaseLayout, Header, Footer.
- Komponenty strony głównej.
- Mobilne menu hamburger.

### Faza 3 — Treści (dzień 3-4)
- Migracja 24 warsztatów do Content Collections.
- Migracja kategorii, opinii, galerii.
- Generowanie podstron `[category].astro` i `[workshop].astro`.

### Faza 4 — SEO i obrazy (dzień 4-5)
- Meta tagi, Open Graph, JSON-LD.
- `@astrojs/sitemap`, `robots.txt`.
- Optymalizacja obrazów (`<Image />`, `<Picture />`).

### Faza 5 — Formularz i deploy (dzień 5-6)
- Formularz kontaktowy.
- Testy responsywności i wydajności.
- Deploy na Netlify/Vercel.

---

## 13. Decyzje do potwierdzenia

1. **Nazwa domeny:**cudoteka.pl`  juz zakupiona
2. **Formularz:** Formspree czy Netlify Forms?
3. **Hosting:** vercel
4. **Realne zdjęcia:** czy będą dostępne do podmiany wygenerowanych grafik?
5. **Blog:** czy od razu tworzymy pierwsze 2-3 wpisy, czy zostawiamy pusty szkielet?

---

## 14. Następne kroki

Po akceptacji design docu:
1. Utworzenie szczegółowego planu implementacji (writing-plans).
2. Rozpoczęcie fazy 1 — setup projektu Astro.
