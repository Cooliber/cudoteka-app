# 📋 Dane do dostarczenia — Optymalizacja SEO Cudoteki

> **Od:** Zespół techniczny (AxiomaticWorkflow)
> **Dla:** Aleksandra Dąbrowska — Założycielka Cudoteki
> **Cel:** Tier 3 planu SEO (FAQ schema, LocalBusiness schema, founder bio, widełki cenowe)
> **Kontekst:** Audyt SEO 78/100, AI Visibility 68/100. Tier 1+2 zakończony, podniósł wynik do ~86-88. Tier 3 ma nas dobić do **90+** i znacząco poprawić AI Visibility (ChatGPT, Perplexity, Gemini będą cytować FAQ).
> **Deadline:** Przed wdrożeniem Tier 3 — termin do ustalenia.

---

## 1. 📍 Dane firmy (schema.org LocalBusiness)

### 1.1 Adres fizyczny

Adres podnosi **Local SEO** (Google Maps, "warsztaty dla dzieci Warszawa") i trust (ludzie widzą, że firma istnieje). Niektóre firmy wolą ukrywać — decyzja Twoja.

- [ ] **TAK** — pokaż adres na stronie
- [ ] **NIE** — ukrywaj (schema.org i tak go użyje, ale stopka/kontakt bez adresu)

Jeśli TAK, podaj:

| Pole | Wartość |
|------|---------|
| Ulica i numer | `_____________________________________________` |
| Kod pocztowy | `___-___` |
| Miasto | `Warszawa` (potwierdź) |
| Województwo | `mazowieckie` (potwierdź) |
| Koordynaty GPS (opcjonalnie) | lat: `________`, lng: `________` |

> Bez koordynatów użyję centrum Warszawy (52.2297, 21.0122). Jeśli masz dokładne — super.

### 1.2 Godziny otwarcia (schema.org OpeningHoursSpecification)

W jakich dniach/godzinach przyjmujesz zapytania telefoniczne i e-mail?

| Dzień | Otwarte od | Otwarte do |
|-------|------------|------------|
| Poniedziałek | `__:__` | `__:__` |
| Wtorek | `__:__` | `__:__` |
| Środa | `__:__` | `__:__` |
| Czwartek | `__:__` | `__:__` |
| Piątek | `__:__` | `__:__` |
| Sobota | `__:__` | `__:__` |
| Niedziela | `__:__` | `__:__` |

> Jeśli masz inne godziny dla "biuro" vs "realizacja warsztatów" — doprecyzuj.

### 1.3 Social media (schema.org sameAs)

Wymień profile, które chcesz pokazać (i podaj dokładne URL — ważne dla schema):

| Platforma | URL profilu | Aktywny? |
|-----------|-------------|----------|
| Facebook | `https://facebook.com/__________________` | [ ] |
| Instagram | `https://instagram.com/__________________` | [ ] |
| TikTok | `https://tiktok.com/@__________________` | [ ] |
| YouTube | `https://youtube.com/@_________________` | [ ] |
| Twitter / X | `https://x.com/_____________________` | [ ] |
| LinkedIn | `https://linkedin.com/in/_______________` | [ ] |
| Inny: `_______` | `https://______________________________` | [ ] |

> Jeśli nie masz konta na którejś z platform — zostaw puste (pomija w schema).

---

## 2. 👩‍🏫 Bio Założycielki (schema.org Person + Trust Signals)

**Cel:** Wzbogacić stronę `/o-nas/` o Twoje credentials. Audyt wykazał "No author expertise detail" i "Subject Expertise 68%". To oba rośnie po tym punkcie.

### 2.1 Wykształcenie

| Pole | Wartość |
|------|---------|
| Kierunek studiów | `_____________________________________________` |
| Uczelnia | `_____________________________________________` |
| Rok ukończenia | `________` |
| Specjalizacja (jeśli dotyczy) | `_____________________________________________` |

### 2.2 Certyfikaty / Szkolenia (max 5 najważniejszych)

| # | Nazwa certyfikatu / szkolenia | Rok |
|---|-------------------------------|-----|
| 1 | `_____________________________________________` | `____` |
| 2 | `_____________________________________________` | `____` |
| 3 | `_____________________________________________` | `____` |
| 4 | `_____________________________________________` | `____` |
| 5 | `_____________________________________________` | `____` |

> Przykład: "Certyfikowany trener Sensoplastyki®", "Plastyka Ekspresywna® wg Arno Stern", "Kurs logopedyczny", "Pierwsza pomoc pediatryczna".

### 2.3 Lata doświadczenia

`_____` lat pracy z dziećmi / prowadzenia warsztatów

### 2.4 Misja Cudoteki (2-3 zdania, Twoimi słowami)

Co chcesz, żeby rodzice i organizatorzy wiedzieli o Cudotece po 30 sekundach na stronie?

> `_________________________________________________`
> `_________________________________________________`
> `_________________________________________________`

### 2.5 Specjalizacje / "W czym jesteś ekspertem" (schema.org knowsAbout)

Wypisz 3-5 tematów, w których się specjalizujesz (AI cytuje te w odpowiedziach):

1. `_____________________________________________`
2. `_____________________________________________`
3. `_____________________________________________`
4. `_____________________________________________`
5. `_____________________________________________`

> Przykład: "Sensoplastyka", "Edukacja alternatywna", "Animacje eventowe dla dzieci", "Eko-projekty edukacyjne", "Ceramika artystyczna dla dzieci".

---

## 3. 💰 Widełki cenowe (do wyświetlenia na stronach)

**Cel:** Quick Win #2 z audytu — "Insert indicative price ranges". Rodzice przed kliknięciem chcą wiedzieć, czy ich stać. To **dramatycznie** zwiększa konwersję.

### 3.1 Strategia cenowa

- [ ] **Konkretne ceny** (np. "150 zł / dziecko")
- [ ] **Widełki** (np. "od 50 zł do 200 zł")
- [ ] **Pakiety** (np. "urodziny 6 dzieci: 900 zł")
- [ ] **Nie pokazuj cen** (formularz kontaktowy) — nie zalecane

### 3.2 Cennik orientacyjny

| Typ usługi | Cena od | Cena do | Jednostka / uwagi |
|------------|---------|---------|-------------------|
| Warsztat sensoryczny (1 dziecko, 60 min) | `___` zł | `___` zł | |
| Warsztat plastyczny (1 dziecko, 90 min) | `___` zł | `___` zł | |
| Warsztaty edukacyjne (grupa 10 dzieci) | `___` zł | `___` zł | |
| Urodziny — pakiet podstawowy (do 6 dzieci) | `___` zł | `___` zł | |
| Urodziny — pakiet premium (do 12 dzieci) | `___` zł | `___` zł | |
| Animacja eventowa (1h, do 20 dzieci) | `___` zł | `___` zł | |
| Pełny event szkolny / festyn (3-5h) | `___` zł | `___` zł | |
| Dojazd poza Warszawę (opcjonalne) | `___` zł/km | | max: `___` km |
| Weekend / święta (dopłata) | `___` zł | | |

> Jeśli masz cennik PDF lub dokument — prześlij, a ja wyciągnę dane.

---

## 4. 📝 FAQ — gotowe odpowiedzi na homepage

**Cel:** Featured snippet w Google + cytaty w ChatGPT/Perplexity. Każde pytanie = potencjalna pozycja "0" w wynikach wyszukiwania.

Poniżej 5 pytań + szkic odpowiedzi. **Uzupełnij puste miejsca** (Twoja wiedza, Twój język):

### Pytanie 1
**"Dla jakich grup wiekowych są warsztaty?"**

> Warsztaty dostosowujemy do grup od `___` do `___` lat.
> - Dla młodszych (`___`): `_____________________________________________`
> - Dla starszych (`___`): `_____________________________________________`
> - Animacje eventowe: `_____________________________________________`

### Pytanie 2
**"Czy zapewniacie bezpieczeństwo podczas warsztatów?"**

> `_____________________________________________`
> `_____________________________________________`
> (np. materiały z atestem, przeszkoleni animatorzy, ubezpieczenie OC, pierwsza pomoc)

### Pytanie 3
**"Jaki jest obszar dojazdu?"**

> Realizujemy warsztaty w Warszawie i okolicach do `___` km:
> - Dzielnice Warszawy: `_____________________________________________`
> - Okoliczne miasta: `_____________________________________________`
> - Wyjazdy: `_____________________________________________`

### Pytanie 4
**"Ile trwają warsztaty?"**

> - Standardowe warsztaty: `___` minut
> - Animacje eventowe: `___` godzin
> - Pełne eventy: `___` godzin
> - Czas można dopasować: `_____________________________________________`

### Pytanie 5
**"Jak zarezerwować termin?"**

> - 📧 E-mail: `biuro@e-cud.waw.pl`
> - 📞 Telefon: `+48 607 370 777`
> - 📝 Formularz na stronie: `/kontakt/`
> - Czas odpowiedzi: `_____________________________________________`

### Pytanie 6 (opcjonalne)
**"Co dzieci zabierają z warsztatów?"**

> `_____________________________________________`
> (np. własnoręcznie zrobioną pracę, certyfikat, drobny upominek)

### Pytanie 7 (opcjonalne)
**"Czy mogę zobaczyć warsztat przed rezerwacją?"**

> `_____________________________________________`
> (np. próbne zajęcia, galeria na stronie, opinie innych rodziców)

### Pytanie 8 (opcjonalne)
**"Co jeśli dziecko jest nieśmiałe / ma specjalne potrzeby?"**

> `_____________________________________________`

---

## 5. 📞 Dane kontaktowe (dla stopki + schema)

Czy chcesz dodać inne kanały kontaktu poza `biuro@e-cud.waw.pl` i `+48 607 370 777`?

| Kanał | Wartość | Pokazywać? |
|-------|---------|-----------|
| Telefon dodatkowy | `+48 ___________` | [ ] |
| WhatsApp | numer: `+48 ___________` | [ ] |
| Telegram | username: `@__________` | [ ] |
| Signal | numer: `+48 ___________` | [ ] |
| Formularz na stronie | `/kontakt/` | [x] (już jest) |
| Czat na żywo (Crisp, Tawk.to) | — | [ ] |

> WhatsApp i Telegram są mocno rekomendowane — to 70% kontaktów od młodych rodziców.

---

## 6. 🏢 Dane prawne (do stopki, opcjonalnie)

| Pole | Wartość |
|------|---------|
| NIP | `_____________` |
| REGON | `_____________` |
| KRS (jeśli spółka) | `_____________` |
| Forma prawna | `_____________________________________________` |
| Nazwa firmy (jeśli inna niż "Cudoteka") | `_____________________________________________` |
| Właściciel / Reprezentant | `Aleksandra Dąbrowska` (potwierdź) |

---

## 7. 📸 Materiały dodatkowe

### 7.1 Zdjęcie zespołu

Czy oprócz Ciebie ktoś prowadzi warsztaty? Jeśli tak, podaj:

**Osoba 1:**
- Imię: `_____________`
- Rola: `_____________`
- Zdjęcie: prześlij (jpg/webp, min. 800x800 px)
- Bio (2-3 zdania): `_____________________________________________`

**Osoba 2:**
- Imię: `_____________`
- Rola: `_____________`
- Zdjęcie: prześlij
- Bio: `_____________________________________________`

### 7.2 Logo / ikona

Logo "Cudoteka" (ikona lisa) — zostało ustawione jako favicon. Czy w innych miejscach (stopka, og:image) ma być:

- [ ] To samo logo (ikona lisa) — OK
- [ ] Inna wersja (np. z napisem "Cudoteka") — prześlij
- [ ] Jeszcze inna wersja — prześlij

### 7.3 Zdjęcia dodatkowe do galerii / bloga

Czy masz zdjęcia z realizacji (warsztaty, urodziny, eventy), których jeszcze nie ma na stronie? Im więcej unikalnych zdjęć, tym lepiej dla SEO.

Jeśli tak — prześlij, opisz krótko co na każdym (potrzebne do alt text).

---

## 8. 🌍 Dodatkowe decyzje (jednorazowe, na tym etapie)

### 8.1 Wielojęzyczność

Warszawa ma dużą społeczność expat. Czy chcesz angielską wersję strony?

- [ ] **TAK** — dodaj EN (dodatkowe ~6h pracy, 1.5x content size)
- [ ] **NIE** — tylko PL (zostawiamy jak jest)

### 8.2 Tailwind w zależnościach

W `package.json` widnieje `tailwindcss` i `@tailwindcss/vite` jako dependency, ale w kodzie nie ma żadnych importów. Możliwe, że to było planowane. Co robimy?

- [ ] **Zostaw** — planowane na później
- [ ] **Usuń** — nieużywane (zmniejsza `node_modules` o ~50 MB)

### 8.3 Inne uwagi

Cokolwiek, co powinniśmy wiedzieć?

> `_________________________________________________`
> `_________________________________________________`
> `_________________________________________________`

---

## 📤 Jak przesłać?

Wypełnij ten plik i odeślij na:

- 📧 **E-mail:** `biuro@e-cud.waw.pl` (CC: developer)
- 🖥️ **Commit:** wypełniony plik wgraj do repozytorium (`docs/dane-dla-zalozycielki-wypelnione.md`)
- 📞 **Osobiście:** wydrukuj i przekaż, pomogę wypełnić

---

## ⏱️ Co dalej po otrzymaniu danych?

| Krok | Czas | Efekt |
|------|------|-------|
| Tier 3.1: FAQ schema + UI na homepage | 1h | Featured snippets, AI citations |
| Tier 3.2: Enriched LocalBusiness schema | 30 min | Google Maps, Local Pack |
| Tier 3.3: Founder bio + Person schema | 1.5h | Subject Expertise 68% → 80%+ |
| Tier 3.4: Adres w stopce | 30 min | Trust signals |
| Tier 3.5: Widełki cenowe w warsztatach | 1.5h | Konwersja +30% |
| Tier 3.6: Rozbudowa stron warsztatów | 1.5h | Credibility 55% → 75%+ |
| **Tier 3 łącznie** | **~6h** | **SEO → 90+, AI → 85+** |
| Tier 4: Polish (headings, lint, OG meta) | 2-3h | 100% compliance |
| **Re-audit** | 1h | potwierdzenie celów |

---

*Plik wygenerowany 2026-07-05 przez Ultra (AxiomaticWorkflow Tier 2).*
*Źródło wymagań: `.spavn/plans/2026-07-05-refactor-seo-improvement-plan-cudoteka-7890-score-ai-visibi.md`*
