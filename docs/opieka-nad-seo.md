# Opieka nad SEO — jak dbać o to dalej (Cudoteka)

Punkt wyjścia: audyt luk z 2026-10 (`docs/research/2026-10-seo-gap-analysis.md`) + wdrożone poprawki.
Ten plik to **praktyczny rytm pracy**: co robić tydzień / miesiąc / kwartał, jak nie psuć tego, co działa, i jak mierzyć efekty.
Źródło prawdy = **Google Search Console** (`search.google.com/search-console`), nie „wydaje się”.

## 0. Zasada nadrzędna

- Każda zmiana to **hipoteza + pomiar**. Nie zmieniaj pięciu rzeczy naraz na jednej stronie.
- Pracujemy w trzech pętlach: **tydzień** (reakcje), **miesiąc** (treść + wdrożenia), **kwartał** (strategia + audyt).
- Lepiej brak danych niż dane zmyślone: bez adresu/sociali nie wstawiamy placeholderów (patrz antywzorce).

## 1. Co już jest zrobione (stan: 2026-10-11)

- [x] `og:image` / `BlogPosting.image` na 53 wpisach (był `[object Object]`)
- [x] tytuły bez podwójnego sufiksu „| Cudoteka”
- [x] encje: `WebSite` + `Organization` + `Person` (autorka) + `BreadcrumbList` na stronach statycznych
- [x] sitemap z wiarygodnym `lastmod` (wpisy); hero jako AVIF/WebP + `fetchpriority=high`
- [x] stopka bez placeholderów NAP, telefon w formacie E.164, `parentOrganization`
- [x] raport luk z pełną listą źródeł Google: `docs/research/2026-10-seo-gap-analysis.md`

## 2. Pierwsze 30 dni — kolejność (od największego zwrotu)

1. **Formularz + newsletter** — podpiąć realny endpoint (Formspree/Formbricks/własny); **przetestować wysyłkę leada**. Bez tego każde „SEO” kończy się w pustce.
2. **`www.cudoteka.pl` → Vercel** — dodać domenę do projektu (teraz to placeholder z `noindex`); reguła 301 już czeka w `vercel.json`. Test: `curl -I https://www.cudoteka.pl/` ma dać `301`.
3. **Analityka** — GA4 albo Vercel Analytics. Zdarzenia: `lead_form_submit`, `download_pdf`, `click_bookero`, `click_phone`. Bez tego nie wiadomo, co konwertuje.
4. **Eksport bazowy z GSC** (sekcja 6 raportu): Zapytania + Strony (3 mies.), Pages, Sitemaps, Links → CSV do `docs/research/` z datą w nazwie.
5. **Profil Google Business** (GBP) — weryfikacja, kategoria, obszar działania Warszawa + okolice, usługi 1:1 z ofertą, zdjęcia. Opinie: prosić po każdym evencie i odpowiadać na wszystkie.
6. **Klaster A: strony materiałów** — `/materialy/<slug>/` × 12 z kolekcji `downloads` (treść i PDF-y już są). To najtańsza wygrana: w tym SERP wygrywają pojedyncze strony materiałów.

## 3. Rytm tygodniowy (~15 min)

**GSC → Skuteczność (Performance):**

- [ ] 7 dni vs poprzednie 7: co skoczyło/spadło >20%? Jedna notatka przyczyny
- [ ] nowe zapytania na pozycjach 1–10 z CTR ~0 → przepisz tytuł/opis (najszybsza wygrana)
- [ ] strony z wyświetleniami i zerem kliknięć → sprawdź intencję (czy snippet odpowiada)

**GSC → Indeksowanie → Strony:**

- [ ] „Discovered / Crawled – currently not indexed” starsze niż 2 tyg → kontrola URL + zgłoszenie do indeksowania
- [ ] nowe błędy (404 poza sitemapą, soft 404) → napraw

**Operacyjne:**

- [ ] test formularza i newslettera (lead dochodzi?)
- [ ] GBP: odpowiedzi na nowe opinie; 1 zdjęcie/post przy okazji realizacji

## 4. Rytm miesięczny (2–3 h)

**Dane (eksport do `docs/research/`, z datą):**

- [ ] Zapytania + Strony → lista **„striking distance”**: pozycja 5–20, ≥100 wyświetleń. Dla każdej frazy jedna decyzja:
  - brak strony → dopisz treść (klaster z raportu),
  - słaby CTR → nowy tytuł/opis (≤60 / ≤155 znaków),
  - dobre dopasowanie → dołóż linki wewnętrzne z huba/wpisu.

**Treść (1–2 sztuki/miesiąc, wg klastrów A–H z raportu):**

- [ ] nowa treść: przejdź checklistę z sekcji 6
- [ ] odświeżenie 2–3 starszych wpisów: uzupełnij treść, dodaj `updated: RRRR-MM-DD` w frontmatter → sitemap sam dostanie nowy `lastmod`
- [ ] domknij pętlę: wpis ↔ strona materiału ↔ `/kontakt/`

**Technika i lokalne:**

- [ ] PSI (mobile) na 3 najważniejsze URL-e po każdej większej zmianie UI
- [ ] GBP: 1–2 posty sezonowe (ferie, bal karnawałowy, dzień dziecka), świeże zdjęcia

## 5. Rytm kwartalny (~pół dnia)

- [ ] mini-audyt: crawl wszystkich URL-i z sitemapy — canonicale, dokładnie jeden H1, unikalne tytuły ≤60, brak `[object]`/placeholderów
- [ ] Core Web Vitals: raport w GSC + PSI dla 5 najważniejszych URL
- [ ] walidacja danych strukturalnych: Rich Results Test + Schema Markup Validator na: home, wpis blogowy, warsztat, `/materialy/`
- [ ] Linki (GSC): kto linkuje (szkoły, portale dla rodziców?) → doprecyzuj anchor text u partnerów; strony bez linków wewnętrznych → dołóż z hubów
- [ ] przegląd klastrów vs plan; nowa wersja raportu luk z datą (co ubyło, co doszło)
- [ ] przegląd 10 fraz konkurencyjnych: kto awansował, jaki format wygrywa (ceny? terminy? PDF-y?)
- [ ] cele na kwartał: 1 KPI główny + 2 poboczne

## 6. Checklist nowej treści (dla redakcji)

**Przed publikacją:**

- [ ] jedna fraza główna + intencja (informacyjna czy komercyjna) — jedna na stronę
- [ ] title ≤ 60 znaków i **unikalny w całym serwisie** (nie powtarzaj tytułu strony usługi we wpisie — tak powstał duplikat piłkarski, już naprawiony)
- [ ] meta description ≤ 155 znaków: korzyść + konkrety („4 strony do druku”)
- [ ] jeden H1; H2 odpowiadają na pytania z SERP
- [ ] pierwszy akapit = konkretna odpowiedź (szansa na featured snippet i cytowanie w AI)
- [ ] podpisany autor (E-E-A-T), źródła naukowe linkowane
- [ ] 3–5 linków wewnętrznych (materiały / warsztaty / kontakt)
- [ ] obraz: sensowny `alt`, ≤200 kB, WebP
- [ ] CTA na końcu (pobierz materiał / zapytaj o termin)

**Po publikacji:**

- [ ] GSC → kontrola URL → „poproś o zindeksowanie” (selektywnie, tylko wartościowe strony)
- [ ] wpis blogowy: sprawdź w Rich Results Test (`BlogPosting` + `BreadcrumbList`)

**Zasady twarde:**

- [ ] nigdy nie zmieniaj slug bez przekierowania 301 (`vercel.json`)
- [ ] zmieniasz treść → dodaj `updated:` (to jedyne źródło `lastmod` w sitemapie)
- [ ] nie duplikuj tytułów/opisów między wpisem a stroną usługi

## 7. Kiedy wystartuje sklep z materiałami (klaster H)

- `Product` + `Offer` na stronach produktów, osobna sekcja URL i sitemapy
- Merchant Center = osobny kanał (feed); ceny na stronie i w feedzie muszą być spójne 1:1
- **bez** `Review`/`aggregateRating` dla własnych opinii (Google dopuszcza tylko opinie o innych firmach) — opinie budujemy w GBP

## 8. Antywzorce — czego świadomie nie robimy

- schema `FAQPage` „na rich result” — feature wycofany (2026-05-07); FAQ zostaje jako treść i sygnał, nie cel
- kupowanie linków / masowe wymiany — spam policies
- hurtowe treści AI bez weryfikacji — scaled content abuse
- placeholdery w danych firmy (adres, social) — lepiej brak niż fikcja; uzupełniać w `docs/dane-dla-zalozycielki.md`
- zmiany tytułów/URL-i „bo tak” bez pomiaru — najpierw hipoteza, potem GSC

## 9. Kto za co odpowiada

| Obszar | Kto | Gdzie |
|---|---|---|
| Treść, GBP, opinie | Aleksandra / redakcja | wpisy, profil Google |
| Dane firmowe: adres, godziny, social, ceny | Aleksandra | `docs/dane-dla-zalozycielki.md` → schema + stopka |
| Technika, deploy, schematy | dev | repo; checklist deploy poniżej |
| GSC: eksporty, priorytety, striking distance | ops | `docs/research/` |

### Checklist po każdym deployu

- [ ] build przechodzi (`npm run build`), w dist brak `[object]` i placeholderów
- [ ] zmienione typy stron: 1× Rich Results Test
- [ ] nowe/zmienione URL-e: kontrola URL + zgłoszenie do indeksowania
- [ ] zmieniły się URL-e → resubmit sitemapy w GSC

## 10. Mierniki (co raportujemy)

| KPI | Źródło | Rytm |
|---|---|---|
| Kliknięcia i wyświetlenia organiczne | GSC | co miesiąc |
| Średnia pozycja dla klastrów (A, C, E) | GSC (filtr zapytań) | co miesiąc |
| CTR stron money (`/materialy/`, `/szkolenia/`, urodziny) | GSC | co miesiąc |
| % URL-i zaindeksowanych | GSC → Strony | co miesiąc |
| Leady (formularz, telefon, Bookero) | GA4 / analytics | co tydzień |
| Pobrania PDF | GA4 (event `download_pdf`) | co miesiąc |
| Core Web Vitals (LCP/INP/CLS) | GSC / PSI | co kwartał |

Raport miesięczny = 1 strona: eksporty (CSV) + 3 wnioski + 3 działania na kolejny miesiąc.

## 11. Skróty i linki

- Raport luk (źródła Google, workflow GSC per raport): `docs/research/2026-10-seo-gap-analysis.md`
- Brakujące dane firmowe: `docs/dane-dla-zalozycielki.md`
- Search Console: https://search.google.com/search-console
- Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev/
- Schema Markup Validator: https://validator.schema.org/
- Zmiany w dokumentacji Google (obserwować raz w miesiącu): https://developers.google.com/search/updates
