# Checklist dla Założycielki — wszystkie TODO w kodzie

> **Cel:** Jeden plik ze wszystkimi konkretnymi miejscami w kodzie, które wymagają Twoich danych.
> **Szczegółowy kwestionariusz:** zobacz `docs/dane-dla-zalozycielki.md` (8 sekcji, 327 linii).
> **Status każdej pozycji:** [ ] = do wypełnienia, [x] = gotowe.

---

## A) Pliki kodu — bezpośrednie edycje

### A1. `src/lib/seo.ts` (schema.org LocalBusiness)

| # | Linia | Co wpisać | Status |
|---|-------|-----------|--------|
| 1 | 29 | `twitter:site` (handle po @, np. "@cudoteka") — patrz `dane-dla-zalozycielki.md` § 1.3 | [ ] |
| 2 | 43-67 | `streetAddress`, `postalCode`, `geo` (lat/lng), `openingHoursSpecification` — patrz `dane-dla-zalozycielki.md` § 1.1, § 1.2 | [ ] |

### A2. `src/pages/o-nas.astro` (Person schema + bio)

| # | Linia | Co wpisać | Status |
|---|-------|-----------|--------|
| 3 | 8 | Rozbudowa credentials w obiekcie `founder` (education, certs, years) | [ ] |
| 4 | 29 | Lista rzeczywistych certyfikatów (tabela wyświetlana na stronie) | [ ] |
| 5 | 121 | Kierunek studiów, uczelnia, rok ukończenia — § 2.1 | [ ] |
| 6 | 131 | Rozszerzenie listy certyfikatów (max 5) — § 2.2 | [ ] |
| 7 | 140 | Liczba lat doświadczenia — § 2.3 | [ ] |
| 8 | 153 | Misja Cudoteki (2-3 zdania Twoimi słowami) — § 2.4 | [ ] |

---

## B) Warsztaty — widełki cenowe (33 pliki)

Każdy warsztat w `src/content/workshops/*.md` wymaga dodania dwóch linii w frontmatter:

```yaml
priceFrom: 150      # minimalna cena (PLN)
priceTo: 250        # maksymalna cena (PLN) — opcjonalne
priceNote: "od dziecka"   # alternatywa dla priceFrom/priceTo (np. dla eventów)
```

### B1. Warsztaty sensoryczne / plastyczne (wysoki popyt)

| Plik | priceFrom | priceTo | Status |
|------|-----------|---------|--------|
| `src/content/workshops/sensoplastyka.md` | ___ | ___ | [ ] |
| `src/content/workshops/ceramika.md` | ___ | ___ | [ ] |
| `src/content/workshops/plastyka-ekspresywna.md` | ___ | ___ | [ ] |
| `src/content/workshops/warsztaty-plastyczne.md` | ___ | ___ | [ ] |
| `src/content/workshops/malowanie-palcami.md` | ___ | ___ | [ ] |
| `src/content/workshops/malowanie-twarzy.md` | ___ | ___ | [ ] |
| `src/content/workshops/masa-solna.md` | ___ | ___ | [ ] |
| `src/content/workshops/las-w-sloiku.md` | ___ | ___ | [ ] |
| `src/content/workshops/eko-torby.md` | ___ | ___ | [ ] |
| `src/content/workshops/personalizowane-przypinki.md` | ___ | ___ | [ ] |

### B2. Warsztaty edukacyjne / eksperymentalne

| Plik | priceFrom | priceTo | Status |
|------|-----------|---------|--------|
| `src/content/workshops/eksperymenty.md` | ___ | ___ | [ ] |
| `src/content/workshops/wulkany.md` | ___ | ___ | [ ] |
| `src/content/workshops/muzyka-z-butelek.md` | ___ | ___ | [ ] |
| `src/content/workshops/zajecia-edukacyjne.md` | ___ | ___ | [ ] |
| `src/content/workshops/warsztaty-kulinarne.md` | ___ | ___ | [ ] |
| `src/content/workshops/eko-kosmetyki.md` | ___ | ___ | [ ] |

### B3. Animacje eventowe (cena często "od eventu")

| Plik | priceFrom | priceTo | Status |
|------|-----------|---------|--------|
| `src/content/workshops/animacje-ruchowe.md` | ___ | ___ | [ ] |
| `src/content/workshops/animacje-tematyczne.md` | ___ | ___ | [ ] |
| `src/content/workshops/chusta-animacyjna.md` | ___ | ___ | [ ] |
| `src/content/workshops/tatuaze-brokatowe.md` | ___ | ___ | [ ] |
| `src/content/workshops/pokaz-baniek-dymnych-i-ogniowych.md` | ___ | ___ | [ ] |
| `src/content/workshops/banki-mydlane-xxl.md` | ___ | ___ | [ ] |
| `src/content/workshops/zaplatanie-warkoczykow.md` | ___ | ___ | [ ] |

### B4. Urodziny i programy (pakiety)

| Plik | priceFrom | priceTo | Status |
|------|-----------|---------|--------|
| `src/content/workshops/programy-urodzinowe.md` | ___ | ___ | [ ] |
| `src/content/workshops/bajkowe-urodziny.md` | ___ | ___ | [ ] |

### B5. Sport / integracja / escape room

| Plik | priceFrom | priceTo | Status |
|------|-----------|---------|--------|
| `src/content/workshops/warsztaty-pilkarskie.md` | ___ | ___ | [ ] |
| `src/content/workshops/zawody-sportowe.md` | ___ | ___ | [ ] |
| `src/content/workshops/integracja-dzieci.md` | ___ | ___ | [ ] |
| `src/content/workshops/integracja-doroslych.md` | ___ | ___ | [ ] |
| `src/content/workshops/escape-room.md` | ___ | ___ | [ ] |
| `src/content/workshops/gra-terenowa.md` | ___ | ___ | [ ] |
| `src/content/workshops/warsztaty-swiateczne.md` | ___ | ___ | [ ] |

### B6. Strefa malucha

| Plik | priceFrom | priceTo | Status |
|------|-----------|---------|--------|
| `src/content/workshops/strefa-malucha.md` | ___ | ___ | [ ] |

---

## C) Kategorie — widełki (opcjonalne, w skali kategorii)

`src/content/categories/*.md` — te same pola co warsztaty, ale dla całej kategorii:

| Plik | priceFrom | priceTo | Status |
|------|-----------|---------|--------|
| `src/content/categories/animacje-i-atrakcje.md` | ___ | ___ | [ ] |
| `src/content/categories/integracja.md` | ___ | ___ | [ ] |
| `src/content/categories/nauka-przez-zabawe.md` | ___ | ___ | [ ] |
| `src/content/categories/programy-pod-klucz.md` | ___ | ___ | [ ] |
| `src/content/categories/sport.md` | ___ | ___ | [ ] |
| `src/content/categories/strefa-malucha.md` | ___ | ___ | [ ] |
| `src/content/categories/tworczosc-i-sztuka.md` | ___ | ___ | [ ] |

---

## D) FAQ — pełne odpowiedzi (homepage)

Odpowiedzi w `src/pages/index.astro` (sekcja FAQ) — obecnie draft z istniejącego contentu strony. Wymaga przeglądu przez Ciebie:

| # | Pytanie | Co sprawdzić | Status |
|---|---------|--------------|--------|
| 1 | "Dla jakich grup wiekowych są warsztaty?" | Poprawność widełek 3-14 lat, wzmianka o animacjach bez ograniczeń | [ ] |
| 2 | "Czy materiały są bezpieczne dla dzieci?" | Czy wspomnieć o OC, przeszkoleniu, certyfikatach? | [ ] |
| 3 | "Jaki jest obszar dojazdu i koszt transportu?" | Czy "do 30 km" się zgadza? Lista miast | [ ] |
| 4 | "Ile trwają warsztaty?" | (jeszcze nie dodane — rozważ dodanie) | [ ] |
| 5 | "Jak zarezerwować termin?" | (jeszcze nie dodane — rozważ dodanie) | [ ] |
| 6 | "Co dzieci zabierają z warsztatów?" | (jeszcze nie dodane — rozważ dodanie) | [ ] |

---

## E) Inne decyzje jednorazowe

| # | Temat | Decyzja | Status |
|---|-------|---------|--------|
| E1 | Wielojęzyczność (EN) | TAK / NIE — patrz § 8.1 | [ ] |
| E2 | Usunięcie nieużywanego Tailwind | TAK / NIE — patrz § 8.2 | [ ] |
| E3 | Adres fizyczny w stopce | TAK / NIE — patrz § 1.1 | [ ] |
| E4 | Numer WhatsApp / Telegram | TAK / NIE — patrz § 5 | [ ] |

---

## ⏱️ Priorytety (w kolejności wpływu na SEO)

1. **KRYTYCZNE** (blokuje 90+ SEO):
   - A1.1: streetAddress + postalCode (LocalBusiness schema)
   - A1.2: openingHoursSpecification
   - A2.6: misja Cudoteki
   - A2.7: lata doświadczenia

2. **WYSOKIE** (poprawia AI Visibility):
   - A2.3-5: education + certs (Person schema)
   - D1-6: FAQ odpowiedzi (FAQ schema)

3. **ŚREDNIE** (poprawia konwersję):
   - B1-6: priceFrom/priceTo dla wszystkich 33 warsztatów
   - A1.3: twitter:site (opcjonalne)

4. **NISKIE** (nice to have):
   - E1: wielojęzyczność
   - E2: Tailwind cleanup
   - Sekcja 7 (materiały dodatkowe, social, dodatkowe zdjęcia)

---

## 📤 Jak przesłać dane?

### Opcja 1: Wypełnij ten plik (checkboxy)
1. Zaznacz [x] przy każdym wypełnionym punkcie
2. Wpisz wartości obok `___`
3. Zapisz jako `docs/CHECKLIST-zalozycielka-wypelnione.md`
4. Commit do repozytorium

### Opcja 2: Wypełnij `dane-dla-zalozycielki.md`
Pełniejszy kwestionariusz, 8 sekcji, bardziej opisowy. Wybierz tę opcję jeśli wolisz kontekst.

### Opcja 3: Osobno
- FAQ: napisz swoje odpowiedzi i wklej do mnie
- Cennik: wyślij mi tabelę (Excel/CSV/PDF)
- Social: wyślij listę URL-i

---

*Plik wygenerowany 2026-07-05 przez Ultra (AxiomaticWorkflow Tier 4).*
*Cross-ref: `docs/dane-dla-zalozycielki.md` (szczegółowy kwestionariusz).*
*Format: UTF-8 (bez BOM), LF line endings — MacOS / Linux / Unix-friendly.*
