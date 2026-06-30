---
title: "Cudoteka — plan rozwoju: reality-grounding, treść, SEO, interaktywność"
type: feature
created: 2026-06-29T20:22:01.720Z
status: approved
updated: 2026-06-29T20:23:50.085Z
---

# Cudoteka — plan rozwoju: reality-grounding, treść, SEO, interaktywność

## Status: DO ZATWIERDZENIA

## Decyzje użytkownika (potwierdzone)

| Pytanie | Odpowiedź |
|---------|-----------|
| Trener piłkarski | **Konrad Wrzesiński** — potwierdzona współpraca |
| Szkolenia | **TAK** — Cudoteka oferuje szkolenia z rozwoju mowy |
| PDF-y | **NIE** — zmienić na "Wkrótce do pobrania" |
| Formularz | **Vercel** — użyć Formspree (Netlify Forms nie działa na Vercel) |

---

## Faza 1: Reality-Grounding (priorytet: WYSOKI)

### 1.1 Zamiana PDF-ów na "Wkrótce"
- **Zmiana:** Przyciski "Pobierz" → "Wkrótce" + zapis na listę oczekujących (e-mail)
- **Pliki:**
  - `src/components/downloads/DownloadCard.astro` — zmienić link na formularz
  - `src/pages/materialy.astro` — dodać sekcję "Zapisz się, aby otrzymać powiadomienie"
- **Cel:** Nie tracimy leadów, użytkownik wie że materiał będzie dostępny

### 1.2 Potwierdzenie trenera — BRAK ZMIAN
- Konrad Wrzesiński potwierdzony — zostawiamy dane jak są
- **Uwaga:** Dodać informację o współpracy w opisie (już jest: "związany z klubem Sokół Serock")

### 1.3 Obraz warsztatów piłkarskich
- **Działanie:** Dodać placeholder SVG do `public/images/workshops/`
- **Opcjonalnie:** Poprosić użytkownika o prawdziwy obraz

### 1.4 Szkolenia — BRAK ZMIAN
- Strona `/szkolenia/` zostaje — Cudoteka oferuje szkolenia

---

## Faza 2: Nowa treść (priorytet: ŚREDNI)

### 2.1 Nowe warsztaty (cel: 30+)
**Priorytetowe (pasujące do istniejących kategorii):**

| Warsztat | Kategoria | Opis skrócony |
|----------|-----------|---------------|
| Malowanie palcami | tworczosc-i-sztuka | Sensoryczna zabawa farbami dla najmłodszych |
| Masa solna | tworczosc-i-sztuka | Lepienie form z masy solnej + pieczenie |
| Wulkany | nauka-przez-zabawe | Eksperymenty z sodą i octem |
| Muzyka z butelek | nauka-przez-zabawe | Dźwięk i rytm z recyclingu |
| Chusta animacyjna | animacje-i-atrakcje | Zabawy ruchowe z chustą animacyjną |
| Escape room | integracja | Zagadki i łamigłówki dla grup |
| Zawody sportowe | sport | Biegi, skoki, tor przeszkód |
| Bajkowe urodziny | programy-pod-klucz | Kompleksowa organizacja urodzin |

### 2.2 Nowe posty na blog (cel: 10+)
**Priorytetowe:**
1. "Sensoplastyka w domu — 3 przepisy na masy plastyczne"
2. "Jak wybrać warsztaty dla dziecka? Przewodnik dla rodziców"
3. "Warsztaty piłkarskie — dlaczego ruch to podstawa?"
4. "5 pomysłów na urodziny w domu"
5. "Kiedy zareagować? Objawy opóźnionego rozwoju mowy"

### 2.3 Nowe opinie (cel: 8+)
- Dodać 5 nowych opinii (format: autor, rola, treść, 1-5 gwiazdek)

---

## Faza 3: SEO i wydajność (priorytet: ŚREDNI)

### 3.1 Meta tagi — przegląd
- Sprawdzić unikalność title/description na 49 stronach
- Zoptymalizować długość: title 50-60 znaków, description 150-160 znaków

### 3.2 Schema.org — rozszerzenie
- `@type: Workshop` na stronach warsztatów
- `@type: Course` na stronach szkoleń
- `@type: BlogPosting` na postach bloga
- `@type: FAQPage` na stronach z FAQ

### 3.3 Internal linking
- Linki z blogów do powiązanych warsztatów
- "Powiązane warsztaty" na stronach szczegółowych
- Breadcrumbs na wszystkich podstronach

### 3.4 Sitemap
- Upewnić się, że wszystkie nowe strony są w sitemap

---

## Faza 4: Interaktywność (priorytet: NISKI)

### 4.1 Formularz kontaktowy (Formspree)
- Zintegrować z Formspree (darmowy plan: 50 submissions/miesiąc)
- Walidacja JS + potwierdzenie wysłania
- **Plik:** `src/pages/kontakt.astro`

### 4.2 Ulepszone filtry warsztatów
- Filtry: wiek, czas trwania, kategoria
- Animacje przejścia (CSS transitions)

### 4.3 Micro-interactions
- Hover na kartach (scale + shadow)
- Smooth scroll
- Przycisk "powrót do góry"

---

## Kolejność realizacji

| Krok | Faza | Zakres | Szacowany czas |
|------|------|--------|----------------|
| 1 | 1.1 | PDF → "Wkrótce" | 30 min |
| 2 | 1.3 | Obraz placeholder | 10 min |
| 3 | 3.1-3.2 | Meta + Schema | 45 min |
| 4 | 2.1 | Nowe warsztaty (8) | 60 min |
| 5 | 2.2 | Nowe blogi (5) | 60 min |
| 6 | 4.1 | Formularz Formspree | 30 min |
| 7 | 3.3-3.4 | Linking + sitemap | 30 min |
| 8 | 2.3 | Nowe opinie | 20 min |
| 9 | 4.2-4.3 | Filtry + animacje | 40 min |

**Łącznie: ~5-6 godzin pracy**

---

## Pliki do edycji (szacunek)

- Edycja: ~15-20 plików
- Nowe: ~15-20 plików (warsztaty, blogi, opinie)
