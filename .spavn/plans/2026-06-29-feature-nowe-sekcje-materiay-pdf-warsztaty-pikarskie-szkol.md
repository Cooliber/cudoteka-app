---
title: "Nowe sekcje: Materiały PDF, Warsztaty piłkarskie, Szkolenia logopedyczne"
type: feature
created: 2026-06-29T20:03:05.866Z
status: approved
updated: 2026-06-29T20:04:01.898Z
---

# Nowe sekcje: Materiały PDF, Warsztaty piłkarskie, Szkolenia logopedyczne

## Cel
Rozszerzenie strony Cudoteka o trzy nowe elementy:
1. **Materiały do pobrania** — strona z plikami PDF (wyzwania wakacyjne, artykulacja głosków)
2. **Warsztaty piłkarskie** — nowy warsztat w istniejącej kolekcji
3. **Szkolenia z opóźnionego rozwoju mowy** — dedykowana podstrona

Wszystkie trzy widoczne w nawigacji Header + Footer.

---

## Zmiana 1: Materiały do pobrania (`/materialy/`)

### Nowa kolekcja content: `downloads`
- **Plik:** `src/content.config.ts` — dodać kolekcję `downloads`
- **Schema:**
  - `title: z.string()` — np. "Wyzwania wakacyjne"
  - `slug: z.string()`
  - `description: z.string()` — krótki opis
  - `category: z.enum(['wakacje', 'artykulacja', 'logopedia', 'inne'])`
  - `file: z.string()` — ścieżka do PDF w `public/materialy/`
  - `fileSize: z.string()` — np. "2.4 MB"
  - `icon: z.string()` — emoji
  - `metaTitle: z.string()`
  - `metaDescription: z.string()`

### Nowe pliki content (8 szt.):
- `src/content/downloads/wyzwania-wakacyjne.md`
- `src/content/downloads/artykulacja-szereg-szumiaci.md`
- `src/content/downloads/artykulacja-szereg-ciszacy.md`
- `src/content/downloads/artykulacja-szereg-syczacy.md`
- `src/content/downloads/kappacyzm.md`
- `src/content/downloads/gammacyzm.md`
- `src/content/downloads/rotacyzm.md`
- `src/content/downloads/lambdacyzm.md`

### Nowe pliki w `public/materialy/`
- Placeholder-y PDF (puste pliki instrukcja "dodaj tutaj PDF")

### Nowa strona: `src/pages/materialy.astro`
- Lista materiałów z przyciskami pobierania
- Layout: sekcja + grid kart (double-bezel pattern)
- Każda karta: ikona, tytuł, opis, rozmiar pliku, przycisk "Pobierz PDF"
- Filtrowanie po kategorii (wakacje / artykulacja / logopedia)
- SEO: title, description, schema DigitalDocument

### Komponent: `src/components/downloads/DownloadCard.astro`
- Karta z ikoną, tytułem, opisem, przyciskiem pobierania
- Pattern double-bezel-outer/inner

---

## Zmiana 2: Warsztaty piłkarskie

### Nowy plik content:
- `src/content/workshops/warsztaty-pilkarskie.md`
- **Kategoria:** `integracja` (istniejąca) lub nowa `sport` — do ustalenia
- **Dane:**
  - title: "Warsztaty piłkarskie"
  - slug: "warsztaty-pilkarskie"
  - category: "integracja" (lub nowa)
  - shortDescription: "Treningi prowadzone przez czynnego piłkarza ligi z Serocka"
  - fullDescription: (do uzupełnienia)
  - ageRange: (do ustalenia, np. "6+ lat")
  - duration: (do ustalenia, np. "60 min")
  - featured: true (widoczny na stronie głównej)

### Pytanie: Czy potrzebna nowa kategoria "Sport"?
Jeśli tak → dodać `src/content/categories/sport.md` z ikoną ⚽ i kolorem mint.

### Brakujące dane:
- Imię i nazwisko trenera
- Wiek uczestników
- Czas trwania
- Szczegóły programu

---

## Zmiana 3: Szkolenia z opóźnionego rozwoju mowy (`/szkolenia/`)

### Nowa strona: `src/pages/szkolenia.astro`
- Dedykowana podstrona z opisem szkoleń
- Sekcje:
  1. **Hero** — tytuł, opis, CTA do kontaktu
  2. **Dla kogo** — rodzice, nauczyciele, logopedzi
  3. **Szkolenie online** — opis, format, cena, CTA
  4. **Szkolenie stacjonarne** — opis, lokalizacja, cena, CTA
  5. **Co zyskasz** — lista korzyści
  6. **FAQ** — najczęstsze pytania
  7. **CTA końcowe** — formularz kontaktowy / telefon

### SEO:
- title: "Szkolenia z opóźnionego rozwoju mowy | Cudoteka"
- Schema: Course lub Event JSON-LD

### Brakujące dane:
- Program szkolenia
- Ceny (online vs stacjonarne)
- Terminy / forma zapisów
- Informacje o prowadzącym

---

## Zmiana 4: Nawigacja (Header + Footer)

### Header (`src/components/layout/Header.astro`)
- Dodać do `navLinks`:
  - `{ href: '/materialy/', label: 'Materiały' }`
  - `{ href: '/szkolenia/', label: 'Szkolenia' }`

### Footer (`src/components/layout/Footer.astro`)
- Dodać do `offerLinks`:
  - `{ href: '/materialy/', label: 'Materiały do pobrania' }`
  - `{ href: '/szkolenia/', label: 'Szkolenia' }`
  - `{ href: '/warsztaty/warsztaty-pilkarskie/', label: 'Warsztaty piłkarskie' }`

---

## Kolejność implementacji

1. Dodać kolekcję `downloads` do `src/content.config.ts`
2. Utworzyć pliki content dla materiałów PDF (8 plików `.md`)
3. Dodać placeholder PDF w `public/materialy/`
4. Stworzyć komponent `DownloadCard.astro`
5. Stworzyć stronę `materialy.astro`
6. Dodać workshop `warsztaty-pilkarskie.md` (+ opcjonalnie kategorię `sport`)
7. Stworzyć stronę `szkolenia.astro`
8. Zaktualizować Header — nowe linki
9. Zaktualizować Footer — nowe linki
10. Build test: `npm run build` — 0 błędów

---

## Weryfikacja

- [ ] `npm run build` — 0 błędów
- [ ] Nowa liczba stron: 42 + 2 (materialy, szkolenia) = 44
- [ ] Linki w Header działają (materiały, szkolenia)
- [ ] Linki w Footer działają
- [ ] Workshop warsztaty-pilkarskie widoczny w /warsztaty/
- [ ] Strona /materialy/ wyświetla listę PDF z przyciskami pobierania
- [ ] Strona /szkolenia/ wyświetla informacje o szkoleniach
- [ ] SEO meta tags poprawne na nowych stronach

---

## Dane do uzupełnienia przez użytkownika

| Element | Brakujące dane |
|---------|---------------|
| Warsztaty piłkarskie | Imię i nazwisko trenera, wiek, czas trwania, program |
| Szkolenia | Program, ceny, terminy, prowadzący, formularz zapisów |
| Materiały PDF | Faktyczne pliki PDF do umieszczenia w public/materialy/ |
| Materiały PDF | Opisy poszczególnych materiałów (lub generyczne) |
