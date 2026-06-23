# Cudoteka — strona Astro

Statyczna, zoptymalizowana pod SEO strona wizytówka marki **Cudoteka** (dawniej E-CUD) — twórcze warsztaty, sensoplastyka i animacje dla dzieci i dorosłych w Warszawie i okolicach.

- **Framework:** Astro 7 + TypeScript (`output: 'static'`)
- **Style:** Vanilla CSS z systemem zmiennych (`src/styles/`)
- **Treści:** Astro Content Collections (Markdown + walidacja Zod)
- **Fonty:** Fraunces (nagłówki) + Nunito Sans (tekst)
- **SEO:** sitemap, kanoniczne URL-e, Open Graph, JSON-LD (LocalBusiness, BreadcrumbList, Service, BlogPosting)
- **Hosting:** Netlify / Vercel (darmowy tier)

## Wymagania

- Node.js `>= 22.12.0`

## Komendy

Wszystkie polecenia uruchamiamy z katalogu głównego projektu:

| Komenda            | Działanie                                          |
| :----------------- | :------------------------------------------------- |
| `npm install`      | Instaluje zależności                               |
| `npm run dev`      | Uruchamia serwer deweloperski na `localhost:4321`  |
| `npm run build`    | Buduje stronę produkcyjną do `./dist/`             |
| `npm run preview`  | Podgląd produkcyjnego buildu lokalnie              |

## Struktura treści (dla osób nietechnicznych)

Treść strony można edytować bez dotykania kodu — wystarczy edytować pliki Markdown w `src/content/`:

- `workshops/` — warsztaty (po jednym pliku `.md` na warsztat)
- `categories/` — kategorie oferty
- `posts/` — wpisy bloga
- `testimonials/` — opinie klientów
- `gallery/` — zdjęcia w galerii

Każdy plik zaczyna się od bloku „frontmatter” (między `---`) z polami opisanymi w `src/content.config.ts`.

### Dodawanie zdjęć

Zdjęcia trzymamy w katalogu `public/images/` i wskazujemy je ścieżką zaczynającą się od `/images/...`, np.:

```
public/images/workshops/sensoplastyka.webp  →  image: "/images/workshops/sensoplastyka.webp"
```

Strona warsztatu automatycznie pokaże zdjęcie `public/images/workshops/<slug>.webp`, jeśli taki plik istnieje. Jeśli go nie ma, wyświetli się estetyczny pastelowy placeholder — nie trzeba nic zmieniać w kodzie.

### Dodanie nowego warsztatu — przykład

1. Utwórz plik `src/content/workshops/nowy-warsztat.md`.
2. Skopiuj frontmatter z istniejącego warsztatu i uzupełnij pola (`title`, `slug`, `category`, `shortDescription`, `fullDescription`, `ageRange`, `duration`, `metaTitle`, `metaDescription`).
3. (Opcjonalnie) wrzuć zdjęcie `public/images/workshops/nowy-warsztat.webp`.
4. Uruchom `npm run build` — nowa podstrona wygeneruje się automatycznie.

## Wdrożenie

Strona jest w pełni statyczna. Po pushu do gałęzi `master`:

- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Vercel:** preset „Astro”, reszta domyślnie.

Produkcyjny adres skonfigurowany jest w `astro.config.mjs` (`site: 'https://cudoteka.pl'`) i wykorzystywany do generowania sitemap oraz kanonicznych URL-i.

## Dokumentacja projektu

- Design doc: `docs/superpowers/specs/2026-06-23-cudoteka-astro-mvp-design.md`
- Plan implementacji: `docs/superpowers/plans/2026-06-23-cudoteka-astro-mvp-plan.md`
- Kontrakty i wskazówki dla agentów: `AGENTS.md`
