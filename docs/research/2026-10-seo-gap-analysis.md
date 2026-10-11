# Cudoteka — analiza luk SEO (2026-10)

**Zakres:** audyt techniczny/on-page (repo = źródło prawdy + stan live) oraz luki treściowo-frazowe dla dwóch lejków: (A) warsztaty/animacje i logopedia dla klienta indywidualnego, (B) placówki (przedszkola, szkoły) i szkolenia.

**Stan wejściowy:**
- Repo: `F:\code\logopedia\cudoteka-app`, branch `master`, commit `d53722b` (worktree: `cudoteka-app-materialy`, branch `design/materialy-good-css`).
- Live: `https://cudoteka.pl` — Astro static na Vercel (`server: Vercel`, HTTP/2, HSTS), sitemap 104 URL-i.
- Data analizy: **2026-10-11**.
- Ograniczenie: brak dostępu do Search Console (API/eksport) — patrz sekcja 7 „Czego nie udało się zweryfikować”.

---

## 1. Streszczenie — top 10 wniosków

1. **Zdjęcia OG wpisów blogowych są zepsute na całej witrynie.** JSON-LD wpisu ma `"image":"https://cudoteka.pl/[object%20Object]"` — błąd wynika z kodu (`new URL(post.data.image, Astro.site)` na obiekcie `ImageMetadata`). Dowód: `src/pages/blog/[post].astro:13` oraz live `/blog/karty-pracy-jak-wybrac-i-pracowac/`. To psuje social previews, `BlogPosting.image` i podgląd w AI/Discover dla **53 wpisów**.
2. **95 z 104 stron ma tytuł z podwójnym brandem („… | Cudoteka | Cudoteka”), 80 ma > 60 znaków.** Przyczyna w `src/lib/seo.ts:12-14` (funkcja dokleja `| Cudoteka`, a `metaTitle` w content już ten sufiks zawiera). Google przepisuje/ucina takie tytuły — patrz `title-link` i `snippet` w Google Search Central.
3. **Formularz kontaktowy i zapis na newsletter w produkcji wysyłają na `https://formspree.io/f/YOUR_FORM_ID`.** Każde zapytanie i każdy zapis = utracony lead (dowód: live `/kontakt/`, `/materialy/`; to samo w `src/pages/kontakt.astro` i `src/pages/materialy.astro`). To nie jest „SEO”, ale zniekształca wszystkie dane o zachowaniu użytkowników i konwersji, którymi chcą sterować.
4. **`www.cudoteka.pl` nie przekierowuje na wersję bez `www`** — serwuje placeholder (title „cudoteka.pl”, `<meta name="robots" content="noindex">`, 108 kB, 2 linki, `Server: LiteSpeed` = inne hostingi niż Vercel; w repo `raport audtyu seo.md` widać ślad starego hostingu: `v=spf1 … include:spf.hostido.pl`). Reguła 301 istnieje tylko w repo (`vercel.json`, `public/_redirects`, `netlify.toml`) i **nie działa na produkcji**, bo domena WWW nie jest podpięta do projektu. Google traktuje wersje `www`/non-www jako ten sam podmiot tylko w zakresie site name (`site-names`), ale kanonizacja wymaga 301 (`consolidate-duplicate-urls`).
5. **Brak analityki czegokolwiek:** 0 wystąpień `gtag`, `googletagmanager`, `google-analytics` w HTML 104 stron i w całym `src/`. Bez GA4/eventów nie da się zmierzyć „Pobierz PDF”, „Umów wizytę”, formularza — a są to jedyne sensowne KPI tego serwisu.
6. **Stopka i schema bez NAP:** na każdej stronie widnieje `ul. ___________` i `__-___` (`src/components/layout/Footer.astro:29-30`), a `LocalBusiness` w `src/lib/seo.ts:44-88` ma zakomentowane `streetAddress`, `postalCode`, `geo`, `openingHoursSpecification` i `sameAs`. Bez tego nie ma szans na Local Pack dla „sensoplastyka Warszawa” i pokrewnych (relevance/prominence wg `improve local ranking`).
7. **Structured data jest w 80% na miejscu, ale brakuje trzech fundamentów:** `WebSite` (site name), `Organization` (logo, `sameAs`, spójny `@id`) oraz `BreadcrumbList` na stronach statycznych (`/oferta/`, `/materialy/`, `/szkolenia/`, `/warsztaty/`, `/o-nas/`, `/opinie/` — tam jest tylko `LocalBusiness`). `BlogPosting` istnieje, ale z `author: Organization` zamiast osoby (`src/pages/blog/[post].astro:37`) — dla treści logopedycznych to najdroższy brak E-E-A-T.
8. **Materiały PDF nie mają stron docelowych.** 12 plików PDF jest linkowanych wyłącznie z jednej strony `/materialy/`; brak URL-i typu `/materialy/rotacyzm/`. W polskim SERP fraz typu „rotacyzm karty pracy do wydruku”, „ćwiczenia głoski R PDF” królują **pojedyncze strony materiałów** (lemioo.pl, biblioteka.teczka-logopedy.pl, terapia-mowy.pl, pliki PDF szkół/przedszkoli). To najtańsza do wygrania luka w całym projekcie — treść już istnieje.
9. **Sitemap nie ma `lastmod`** (0 z 104 URL-i), a `sitemap-index.xml` też nie ma daty sitemap. Google używa `lastmod` **jeśli jest wiarygodny**; `priority` i `changefreq` ignoruje — więc nie dodawaj ich, tylko rzetelny `lastmod` (`build-sitemap`).
10. **Brakuje treści „pod frazy komercyjne lokalne”:** cennika/pakietów urodzinowych, strony „warsztaty dla przedszkoli i szkół w Warszawie”, oraz osobnych stron szkoleń z terminami. W SERP te frazy obsadzają konkurenci ze stronami ofertowymi **z cenami i terminami** (kamayu-art.pl/cennik, krolestwoimprez.pl, milakraina.pl, tipikamp.pl, mali-naukowcy.pl, cognitus.pl).

---

## 2. Stan obecny — co już jest (z dowodami)

### 2.1 Inwentaryzacja treści i tras

| Element | Ile | Dowód |
|---|---|---|
| URL-i w sitemapie | **104** | live `https://cudoteka.pl/sitemap-0.xml` (54 blog, 34 warsztaty, 8 oferta, 8 statycznych) |
| Wpisy blogowe | **53** | `src/content/posts/*.md` (53 pliki); spis w sekcji 4.1 |
| Warsztaty | **33** | `src/content/workshops/*.md` (33 pliki) |
| Kategorie oferty | **7** | `src/content/categories/*.md` |
| Darmowe materiały PDF | **12** | `src/content/downloads/*.md` + `public/materialy/*.pdf` (12 plików) |
| Opinie | **10** | `src/content/testimonials/*.md` |
| Galeria | **5** | `src/content/gallery/*.md` |
| Trasy widoków | 15 plików | `src/pages/**` (`index`, `o-nas`, `oferta`, `oferta/[category]`, `warsztaty`, `warsztaty/[workshop]`, `blog`, `blog/[post]`, `materialy`, `szkolenia`, `galeria`, `opinie`, `kontakt`, `polityka-prywatnosci`, `404`) |

Uwaga: `AGENTS.md` opisuje wersję sprzed dodania `/materialy/` i `/szkolenia/`; te dwie trasy są w kodzie i na live, ale **nie są wymienione w DOX** (`AGENTS.md` → „Route Structure”).

### 2.2 Structured data — inwentarz faktyczny

| Typ | Gdzie | Dowód |
|---|---|---|
| `LocalBusiness` (z `OfferCatalog`, `knowsAbout`, `founder`) | **każda** strona | `src/lib/seo.ts:46-160`; live: home |
| `FAQPage` (6 pytań) | home | `src/pages/index.astro:51-59`; live home |
| `BreadcrumbList` | tylko `blog/[post]`, `oferta/[category]`, `warsztaty/[workshop]` | `src/pages/blog/[post].astro:21`, `src/pages/oferta/[category].astro:28`, `src/pages/warsztaty/[workshop].astro:50` |
| `ItemList` | tylko `oferta/[category]` | `src/pages/oferta/[category].astro:37` |
| `BlogPosting` | wpisy | `src/pages/blog/[post].astro:30-39` (autor = Organization) |
| `Service` | strony warsztatów | `src/pages/warsztaty/[workshop].astro:59-66` |
| `Person` (+ `hasCredential`) | tylko `/o-nas/` | `src/pages/o-nas.astro:12-49` |
| `Course` + `FAQPage` | `/szkolenia/` | `src/pages/szkolenia.astro:7-18`, `:20-60` |

Live potwierdza brak dodatkowych typów: `/oferta/`, `/galeria/`, `/opinie/`, `/warsztaty/`, `/materialy/` → wyłącznie `LocalBusiness`.

### 2.3 Meta, canonicals, indeksowalność (pełny crawler 104 URL-i, 2026-10-11)

| Kontrola | Wynik |
|---|---|
| Canonical = faktyczny URL strony | **104/104 zgodne** |
| `<h1>` na stronie | **104/104 dokładnie jeden** |
| Meta description obecny | **104/104** (0 pustych) |
| Unikalne tytuły | 103/104 (1 duplikat — patrz P0-3) |
| Tytuły > 60 znaków | **80** (z tego 31 > 70) |
| Opisy > 165 znaków | **26** |
| `noindex` w treści | brak |
| `hreflang` | brak (OK — witryna jednojęzyczna, `lang="pl"`) |
| Trailing slash | `https://cudoteka.pl/materialy` → **308** → `/materialy/` (spójne z canonicalami) |
| `http://` → `https://` | **308** na `https://cudoteka.pl/` |
| 404 | `/nieistniejaca-strona/` → **404** (poprawny status) |
| Obrazy | `srcset` + `loading="lazy"`/`eager` + `width/height` (bez CLS); **0 `<picture>`, 0 AVIF** |
| Fonty | `preload` + `onload="this.media='all'"` + `<noscript>` → nieblokujące |
| Analityka | **0 skryptów** |

### 2.4 Co jest realnie dobre (nie ruszaj)

- Architektura URL-i płaska i czytelna (`/warsztaty/<slug>/`, `/blog/<slug>/`, `/oferta/<kategoria>/`) — zgodna z `url-structure`.
- Kanonizacja wewnętrzna spójna (canonical + trailing slash + 404 + brak parametrów).
- `robots.txt` z `Sitemap:` (`public/robots.txt`, live) — poprawnie.
- Treść bloga jest merytoryczna, z cytowanymi źródłami naukowymi (np. `src/content/posts/karty-pracy-jak-wybrac-i-pracowac.md` → PNAS 2012, BMJ Open Quality 2022) — to materiał pod E-E-A-T, brakuje mu tylko podpisu autora.
- Wpisy mają gęste linkowanie wewnętrzne (blok „Zobacz również” w każdym wpisie) — dobre dla klastrów.

---

## 3. Braki techniczne — priorytetyzowane

Legenda: **P0** = blokuje wynik / psuje to, co już jest; **P1** = wysoki zwrot, tanie; **P2** = porządki.

### 3.1 P0

| # | Problem | Dowód | Konkretna naprawa |
|---|---|---|---|
| P0-1 | `BlogPosting.image` i `og:image` = `https://cudoteka.pl/[object%20Object]` (53 wpisy) | `src/pages/blog/[post].astro:13` — `new URL(post.data.image, Astro.site)`, gdzie `post.data.image` to obiekt `ImageMetadata` (schema `image()` w `src/content.config.ts`, kolekcja `posts`); live: `/blog/karty-pracy-jak-wybrac-i-pracowac/` | `const postImage = post.data.image ? new URL(post.data.image.src, Astro.site).toString() : undefined;` (wzorzec poprawny już jest w `src/pages/warsztaty/[workshop].astro:29`: `workshopImage.src`). Po deployu sprawdzić `og:image` i `BlogPosting.image` na 2–3 wpisach. Wymogi dla `image` w `BlogPosting`: dokumentacja Article |
| P0-2 | Podwójny sufiks brandu w `<title>`: 95/104 strony (np. „Materiały do pobrania … | Cudoteka | Cudoteka”) | `src/lib/seo.ts:11-13` + `metaTitle` w content (np. `src/content/downloads/rotacyzm.md` → `metaTitle: "Rotacyzm - ćwiczenia logopedyczne PDF | Cudoteka"`); pomiar: crawl 104 URL-i | Zmienić `seo()` tak, aby nie doklejał sufiksu, gdy `title` już zawiera „Cudoteka”; docelowo trzymać tytuły ≤ 60 znaków. Google i tak generuje title linki z wielu źródeł i potrafi je przepisać (`title-link`) |
| P0-3 | Zduplikowany tytuł na 2 URL-ach: `/blog/warsztaty-pilkarskie-dlaczego-warto/` i `/warsztaty/warsztaty-pilkarskie/` (identyczny tekst) | crawl 104 URL-i | Ujednolicić `metaTitle` wpisu blogowego (np. „Warsztaty piłkarskie dla dzieci – dlaczego warto zapisać | Cudoteka”) |
| P0-4 | `www.cudoteka.pl` → **200 + noindex placeholder**, brak 301 na wersję kanoniczną | `curl -I https://www.cudoteka.pl/` → `200`; treść: `<title>cudoteka.pl</title>`, `meta robots noindex`; repo zawiera nieaktywne reguły: `vercel.json` (redirect host `www.cudoteka.pl`) i `public/_redirects` | Podpiąć `www.cudoteka.pl` do projektu Vercel (domena + certyfikat) i zostawić regułę 301 z `vercel.json`; sprawdzić `A`/`CNAME` (obecnie WWW obsługuje inny host). Test po zmianie: `curl -I https://www.cudoteka.pl/` → `301` → `https://cudoteka.pl/`. Kanonizacja: `consolidate-duplicate-urls` |
| P0-5 | Formularz kontaktowy i newsletter na produkcji wskazują `formspree.io/f/YOUR_FORM_ID` | live `/kontakt/`, `/materialy/`; `src/pages/kontakt.astro`, `src/pages/materialy.astro` | Podmienić `action` na realny endpoint (Formspree/Formbricks/własny) i **przetestować wysyłkę**; dodać zdarzenie konwersji (GA4/GTM lub Vercel Analytics). To warunek sensownego pomiaru „leadów z SEO” |
| P0-6 | Brak NAP w treści i w schema; w stopce widoczne placeholdery | `src/components/layout/Footer.astro:27-56` (`streetAddress=''`, `postalCode=''` → renderuje `ul. ___________`, `__-___`); live stopka każdej podstrony; `src/lib/seo.ts:44-88` (TODO) | Uzupełnić `streetAddress`, `postalCode`, `geo`, `openingHoursSpecification`, `sameAs` (decyzje biznesowe: `docs/CHECKLIST-zalozycielka.md` A1.1–A1.2). Jeśli firma nie przyjmuje klientów pod adresem → w GB ustawić **obszar działania** bez adresu, ale w schema podać obsługiwany obszar (`areaServed` już jest) + miasto. Wymagane pola `LocalBusiness`: `address`, `name`; zalecane: `geo`, `openingHoursSpecification`, `priceRange`, `telephone`, `url` — `structured-data/local-business` |
| P0-7 | Zero analityki | `grep` po `src/` (brak `analytics`, `gtag`); HTML 104 stron (0 wystąpień) | GA4 + integracja z GSC (`google-analytics-search-console`) albo Vercel Analytics; zdarzenia: `lead_form_submit`, `download_pdf`, `click_bookero`, `click_phone`. Bez tego wszystkie niżej opisane eksporty GSC są jedynym źródłem prawdy o popycie |

### 3.2 P1

| # | Problem | Dowód | Naprawa |
|---|---|---|---|
| P1-1 | Brak `WebSite` (site name) i `Organization` | brak typu `WebSite` w `src/`; `Site Names` wymaga JSON-LD `WebSite` z `name` + `url` **na stronie głównej**, `alternateName` opcjonalnie | Dodać do `BaseLayout.astro` (lub `index.astro`) blok `WebSite` + `Organization` (`@id: https://cudoteka.pl/#organization`, `logo`, `sameAs`, `contactPoint`) i podpiąć `LocalBusiness` jako `parentOrganization`/`@id` referencje. Źródła: `site-names`, `structured-data/organization` |
| P1-2 | `BlogPosting.author` = `Organization` „Cudoteka” — brak autora-osoby | `src/pages/blog/[post].astro:37` | Dodać `author: { '@type':'Person', '@id':'https://cudoteka.pl/o-nas/#aleksandra', name:'Aleksandra Dąbrowska', jobTitle:'logopeda, pedagog' }` + jako `Article`/`BlogPosting` z `datePublished` (już jest) i `image` (po P0-1). Wzmocnić /o-nas/ (realne certyfikaty, uczelnia, lata) — `docs/CHECKLIST-zalozycielka.md` A2. Dla treści medyczno-rozwojowych E-E-A-T ma bezpośrednie przełożenie: `creating-helpful-content` |
| P1-3 | `BreadcrumbList` tylko na 3 typach tras | live: `/oferta/`, `/materialy/`, `/szkolenia/`, `/warsztaty/`, `/o-nas/`, `/opinie/` → tylko `LocalBusiness` | Dodać breadcrumby na statycznych (Home › Materiały; Home › Szkolenia) **i wizualne** (na stronach wpisów jest tylko „← Wróć do listy wpisów”). Uwaga: breadcrumbs w wynikach są tylko desktop (`breadcrumb` — availability) |
| P1-4 | Sitemap bez `lastmod` | live `sitemap-0.xml`: 104 `<loc>`, **0 `<lastmod>`**; `sitemap-index.xml` bez dat | W `astro.config.mjs` → `sitemap({ serialize(item){…} })`: mapować `/blog/<slug>/` → `pubDate`, `/warsztaty/<slug>/`, `/oferta/<kategoria>/`, `/materialy/` → data modyfikacji pliku/commita. Tylko rzetelne daty — Google używa `lastmod` „if consistently and verifiably accurate” i **ignoruje** `priority`/`changefreq` (`build-sitemap`) |
| P1-5 | 80/104 tytułów > 60 znaków; 26 opisów > 165 znaków | crawl | Przy okazji P0-2 skrócić tytuły do ~50–60 znaków, opisy do ~140–158; traktować jako hipotezę do weryfikacji na CTR w GSC (`title-link`, `snippet`) |
| P1-6 | Wszystkie 33 warsztaty pokazują „Zapytaj o cenę”; brak `Offer`/`Product` | live `/warsztaty/sensoplastyka/`; `src/content/workshops/*.md` bez `priceFrom/priceTo` (`CHECKLIST-zalozycielki.md` B1–B6) | Uzupełnić widełki cen. Wtedy: `Service` + `offers: Offer` z `price`, `priceCurrency:'PLN'`, `priceSpecification`, oraz pokazanie widełek w kartach kategorii. Świadomie: **nie** dodawać `aggregateRating`/`review` dla własnych opinii — Google dopuszcza je tylko dla stron zbierających opinie o innych firmach (`local-business`) |
| P1-7 | 12 PDF-ów bez stron docelowych, brak `ItemList` na `/materialy/` | `src/pages/materialy.astro` (jedna lista), `src/components/downloads/DownloadCard.astro` (link `href={file} download`) | Nowe trasy `/materialy/[slug]/` (lub `/karty-pracy/[slug]/`) — po jednej na materiał, z opisem, „jak używać”, FAQ, linkami do warsztatów i pobraniem. Zob. klaster A w sekcji 4 |
| P1-8 | `/szkolenia/` bez terminów, zapisów i opinii; `Course` bez `hasCourseInstance` | `src/pages/szkolenia.astro` (ceny 79/199 zł, CTA → `/kontakt/?subject=…`) | Dodać terminy (`CourseInstance`/`Event` z `startDate`, `location`, `offers`) i/LUB osobne strony per szkolenie. Uwaga: rich results dla `Course` zostały wycofane (docs usunięte 2025-09-09) — markup zostaje tylko jako sygnał encji |
| P1-9 | AVIF nie jest serwowany, choć kod deklaruje `formats={['avif','webp']}` | live HTML: 0 wystąpień `avif`, 0 `<picture>`, 0 `<source>`; `src/pages/index.astro` (`<Image formats={…}>`) | Astro `formats` działa dla `<Picture>`, nie `<Image>`. Jeśli AVIF ma być: zamienić na `Picture` (albo zostawić WebP — różnica przy 32 kB HTML jest drugorzędna). LCP hero bez `fetchpriority="high"` — dodać na obrazie hero (`src/pages/index.astro`, hero) |
| P1-10 | Linki „Dodaj opinię na Google / Facebooku” prowadzą do `https://www.google.com/` i `https://www.facebook.com/` (nie do profilu) | `src/pages/opinie.astro` (sekcja `leave-opinion`), `src/components/layout/Footer.astro` (Facebook) | Podstawić realne URL-e profilu i **krótkiego linku do wystawienia opinii Google** (z GBP). Opinie = prominence w rankingu lokalnym (`improve local ranking`) |

### 3.3 P2

| # | Problem | Dowód | Naprawa |
|---|---|---|---|
| P2-1 | `/status` → `https://status.cudoteka.pl` w `public/_redirects` (Netlify), prawdopodobnie nieistniejąca subdomena; dodatkowo repo obsługuje **dwa** targety deployu (Netlify + Vercel), co już raz się rozjechało (P0-4) | `public/_redirects`, `netlify.toml`, `vercel.json` | Wybrać jeden target (produkcja = Vercel), usunąć martwą regułę lub utrzymywać oba pliki spójnie |
| P2-2 | `twitter:site` brak (TODO) | `src/lib/seo.ts:26-28` | Ustawić, jeśli konto X istnieje; w PL priorytetem są FB/IG — dodać je do `sameAs` |
| P2-3 | `AGENTS.md`/DOX nie opisuje `/materialy/` i `/szkolenia/`; `status.md` mówi o 42 stronach (jest 104) | `AGENTS.md`, `status.md` | Aktualizacja dokumentacji (ryzyko, że kolejne prace „odkryją” istniejące trasy) |
| P2-4 | Brak `Product`/`Offer` pod planowany sklep z materiałami | `docs/superpowers/plans/2026-10-03-sklep-materialow-logopedycznych-plan.md` (status: propozycja) | Przy wdrożeniu: `Product` + `Offer` (+ `priceValidUntil`, jeśli promocja) i strefa `sklep/` w sitemapie. Dokumentacja: `structured-data/product`, `structured-data/product-snippet`, `structured-data/merchant-listing` |
| P2-5 | Brak paginacji/hubów kategorii bloga (53 wpisy na jednej siatce) | `src/pages/blog.astro`; tytuł kategorii = zwykły tekst, brak tras `/blog/kategoria/<x>/` | Huby kategorii jako strony-indeksy klastrów (zob. sekcja 4, klastry D i G). Przy 53 wpisach jeden listing wystarcza technicznie, ale nie buduje tematycznych hubów |

---

## 4. Luki treściowe i plan klastrów

### 4.1 Co już istnieje (mapa treści)

- **Blog (53 wpisy)** — dominują dwie kategorie: `Rozwój dziecka` (logopedia/rozwój mowy: 7 sygnałów, ORM, jąkanie, AAC/PECS, dwujęzyczność, ekrany, sen, motoryka, słuch fonemowy, rymowanki…) oraz `Porady dla rodziców` (karty pracy, motywacja, krótko-i-często, granice, emocje, przedszkole, jedzenie a mowa, ekrany bez wojny). Mniejsze: `Organizowanie imprez` (urodziny ×2, weekend rodzinny), `Dla placówek` (1 wpis: eko-warsztaty), `Animacje i atrakcje` (1), `Sport` (1), `Twórczość i sztuka` (1), `Strefa Malucha` (1).
- **Materiały (12 PDF)**: `wyzwania-wakacyjne`, `jesien/lato/wiosna/zima`, `artykulacja-szereg-ciszacy|syczacy|szumiaci`, `kappacyzm`, `gammacyzm`, `lambdacyzm`, `rotacyzm` — wszystkie linkowane z `/materialy/`.
- **Oferta**: 7 kategorii + 33 warsztaty, `/szkolenia/` (1 strona, 2 warianty szkolenia).

### 4.2 SERP — co wygrywa (badanie 2026-10-11, zapytania PL; narzędzie zwraca wyniki organiczne, bez Local Packa)

| Fraza | Dominujący typ wyników | Przykłady konkurentów z SERP | Co wygrywa |
|---|---|---|---|
| „karty pracy logopedyczne do druku” | blogi logopedów + „material hubs” + sklepy z PDF | lemioo.pl, biblioteka.teczka-logopedy.pl, logopestka.pl, niekazmuliczyc.pl, zamienmyslowo.pl, logodomi.pl | jedna strona = jedna głoska/zestaw, darmowy PDF bez rejestracji, autor-logopeda z bio, nawigacja „po głoskach” |
| „ćwiczenia logopedyczne do druku pdf” | jw. + pliki PDF na stronach szkół/przedszkoli | spgrodek.edu.pl, przedszkoleglinno.pl, przytuly.szkola.pl, literka.pl | dokładnie dopasowany tytuł „Karta pracy … PDF”, natychmiastowy pobór pliku |
| „ćwiczenia na rotacyzm karty pracy do wydruku” | PDF-farmy + płatne sklepy | ps29gdynia.pl (PDF), spgrodek.edu.pl (PDF), lemioo.pl („13 ćwiczeń … PDF A4, pobierz bez rejestracji”), terapia-mowy.pl (płatne karty), biblioteka.teczka-logopedy.pl | landing per głoska + liczba ćwiczeń + format + wiek |
| „jak nauczyć dziecko wymawiać głoskę R” | blogi poradnikowe (wysoka konkurencja) | infantylny.pl, terazmamy.pl, czasrodzica.pl, mamamowi.pl, parent.pl, domologo.pl, salp.pl | poradnik krok-po-kroku + zestaw ćwiczeń + PDF do pobrania |
| „zabawy logopedyczne dla przedszkolaków / gimnastyka buzi i języka” | blogi + plakaty/PDF | dlarodzinki.pl, kapitannauka.pl, wkawiarence.pl, smart-sens.org, pomyslynazabawy.pl | gotowe scenariusze („10 ćwiczeń”), plakaty do druku, wersje dla nauczyciela |
| „szkolenia dla nauczycieli / logopedia online (ORM)” | dedykowane platformy szkoleniowe z koszykiem | cognitus.pl, teczka-logopedy.pl, akademialogopedy.pl, instytutlogopedyczny.pl, odm-metris.pl, terapia-mowy.pl | strona kursu z terminem, ceną, programem, zaświadczeniem, opiniami; zapis online |
| „warsztaty dla dzieci Warszawa” | firmy lokalne + marketplace’y + portale zleceń | krolestwoimprez.pl, milakraina.pl, swiatwrazen.pl, oferteo.pl, kidos.pl, kidoteka.com | kompletność profilu lokalnego (GBP) + strony usług z cenami, dzielnicami, opiniami |
| „sensoplastyka Warszawa” | dostawcy zajęć z podziałem na dzielnice + marketplace | kidstherapy.pl (Ochota/Wilanów), centrumdladzieci.pl, wytrenowani.com.pl, karuzelazmyslow.pl (Ursus), siedem-zmyslow.pl, kidos.pl | dedykowana podstrona usługi + lokalizacja/dzielnica + cena + grafik |
| „animacje urodzinowe dla dzieci Warszawa cennik” | firmy z jawnym cennikiem/pakietami | kamayu-art.pl/cennik (pakiety 350/500/650 zł), swiatwrazen.pl, lubimyzabawe.pl, krolestwoimprez.pl, wypozyczalniaatrakcji.pl, kids4fun.pl | pakiety z ceną i zakresem, „dojazd do klienta”, galeria, opinie |
| „warsztaty dla przedszkoli i szkół Warszawa” | dedykowane strony B2B placówek | tipikamp.pl, mali-naukowcy.pl (osobne /dla-przedszkoli), incaplay.pl, sztukarnia.pl, klubkoko.pl, muzeumwarszawy.pl | oddzielna strona „oferta dla szkół i przedszkoli”, lista programów, logistyka, cena/faktura |
| „sensoplastyka szkolenie dla nauczycieli” | szkolenia certyfikacyjne + WODN | inkubatorinspiracji.pl, kwitnaceumysly.pl, kursor.edu.pl, charezinska.pl, stanowska-szkolenia.pl | program godzinowy, uprawnienia/certyfikat, forma online+stacjonarnie, cena |
| „urodziny w domu pomysły / kreatywne urodziny” | blogi parentingowe | (Cudoteka ma 2 wpisy z tej grupy) | listy pomysłów + printable; to jedyny obszar „imprezowy”, gdzie Cudoteka jest już widoczna treściowo |

**Wniosek:** Cudoteka ma mocną treść informacyjną o rozwoju mowy (53 wpisy!), ale:
1) nie ma **stron materiałów** (a materiały to najbardziej „łapczywy” typ wyniku w tym SERP),
2) nie ma **stron komercyjnych lokalnych** (cennik, placówki, dzielnice),
3) nie ma **stron szkoleń z terminami**,
4) nie ma **hubów klastrów** spinających istniejące wpisy.

### 4.3 Plan klastrów (priorytet → praca → efekt)

**Klaster A — „Materiały do druku” (P0 treściowy; najwyższy ROI, treść już istnieje)**
- Struktura: hub `/materialy/` (rozbudowany: intro, kryteria, kategorie, `ItemList`, breadcrumby) + **12 stron `/materialy/<slug>/`** generowanych z kolekcji `downloads` (`src/content.config.ts` → kolekcja `downloads` jest gotowa; potrzebna trasa `src/pages/materialy/[slug].astro` i rozszerzenie schematu o pola SEO/„jak używać”/`updated`).
- Tytuły (przykłady, ≤ 60 znaków): „Rotacyzm – karty pracy do druku (PDF)”, „Kappacyzm – ćwiczenia głoski K do druku”, „Gammacyzm – karty pracy PDF”, „Lambdacyzm – ćwiczenia głoski L”, „Szereg syczący – karty pracy PDF”, „Szereg szumiący – ćwiczenia (sz, ż, cz, dż)”, „Szereg ciszacy – ćwiczenia (ś, ź, ć, dź)”, „Jesień – ćwiczonka logopedyczne do druku”, „Zima / Wiosna / Lato – ćwiczonka do druku”, „Wyzwania wakacyjne – 30 pomysłów PDF”.
- Dlaczego: konkurencja w tym SERP wygrywa pojedynczymi stronami materiałów; obecnie 12 PDF-ów ma **jeden** URL do rankowania. Poza ruchem organicznym da to naturalne linki (materiały są linkowane przez nauczycieli).
- Dodatkowo: strona „Jak korzystać z materiałów” (linkowana z każdej strony materiału) — buduje E-E-A-T i linkowanie wewnętrzne.

**Klaster B — „Gimnastyka buzi i języka” (P1; fraza wysoko wolumenowa, słabo pokryta)**
- Pillar: „Gimnastyka buzi i języka – 15 ćwiczeń z obrazkami (PDF)”, „Ćwiczenia języka i warg – zestaw do wydruku”, „Zabawy logopedyczne dla 3-latka / 4-latka / 5-latka”, „Ćwiczenia oddechowe – plakat do druku”.
- Powiązania: linkować do istniejących wpisów (`cwiczenia-oddechowe-dla-dzieci`, `dziecko-myli-gloski-zabawy-sluchowe`, `rymowanki-i-wyliczanki`, `motyka-mala-i-oralna`).

**Klaster C — „Głoska po głosce” (P1; artykulacja, wysoka intencja)**
- „Jak nauczyć dziecko mówić R – krok po kroku (z kartami pracy)”, „Głoska S – ćwiczenia i karty do druku”, „Sz, ż, cz, dż – od czego zacząć”, „Różnicowanie s–sz i z–ż”, „Mowa bezdźwięczna – ćwiczenia”, „Seplenienie – kiedy do logopedy”.
- Każdy wpis linkuje do właściwego PDF (klaster A) i odwrotnie — domknięcie pętli konwersyjnej (pobranie → kontakt).

**Klaster D — „Rozwój mowy 0–7 lat” (P1; hub dla istniejących 30+ wpisów)**
- Pillar: „Rozwój mowy dziecka – kompletny przewodnik (0–7 lat)” z tabelą etapów i linkami do wszystkich wpisów; osobne huby: „Opóźniony rozwój mowy (ORM)”, „Emocje i zachowanie”, „Adaptacja w przedszkolu”, „Ekrany a dziecko”.
- Dlaczego: 53 wpisy bez strony-huba to zbiór mocnych stron bez „wejścia” — hub zbiera autorytet tematu i linkuje do money page’y (`/szkolenia/`, `/materialy/`, `/kontakt/`).

**Klaster E — „Urodziny i eventy” (P1; komercyjny, lokalny)**
- „Urodziny dla dzieci w Warszawie – pakiety i ceny”, „Animacje urodzinowe – co zawiera pakiet”, „Urodziny w domu czy w sali? Porównanie”, „Bańki XXL na festyn – jak to wygląda w praktyce” (case study z galerią), „Ile kosztują animacje na urodziny w Warszawie (cennik 2026)”.
- Dlaczego: w SERP „…cennik” rankują strony z **jawnymi cenami** (kamayu-art.pl/cennik); Cudoteka pokazuje „Zapytaj o cenę”. Bez widełek (P1-6) ta fraza jest nie do wzięcia.

**Klaster F — „Dla placówek” (P1; B2B, wysoka wartość zlecenia)**
- „Warsztaty dla przedszkoli w Warszawie – oferta dla placówek”, „Warsztaty dla szkół podstawowych”, „Dzień kreatywny / półkolonie w przedszkolu”, „Eko-warsztaty dla placówek”, „Sensoplastyka dla grupy przedszkolnej”, „Jak rozliczyć warsztaty w placówce (faktura, logistyka)”.
- Dlaczego: 8/10 wyników to dedykowane strony B2B; obecnie cała oferta dla placówek jest schowana w `/oferta/` + 1 wpisie. Sekcja „Dla placówek” jest naturalnym miejscem na długi ogon typu „warsztaty dla przedszkola Warszawa cena”.

**Klaster G — „Szkolenia” (P1/P2; wymaga decyzji biznesowej)**
- „Opóźniony rozwój mowy – szkolenie online (terminy, program, zaświadczenie)”, „Sensoplastyka w przedszkolu – szkolenie dla nauczycieli”, „Karty pracy w terapii – warsztat praktyczny”, „Jak czytać sygnały opóźnienia mowy – szkolenie dla nauczycieli przedszkola”.
- Dlaczego: konkurenci mają strony kursów z terminami i koszykiem; `/szkolenia/` (jedna strona, 2 warianty) nie ma jak wygrać długiego ogona. Wymaga danych od założycielki (terminy, certyfikacja).

**Klaster H — „Sklep / pakiety materiałów” (P2; po decyzji o VAT i Stripe)**
- „Pakiety kart pracy dla logopedów”, „Licencja dla przedszkola na karty pracy”, „E-book: Gimnastyka buzi i języka”.
- Powiązanie: `docs/superpowers/plans/2026-10-03-sklep-materialow-logopedycznych-plan.md`; przy starcie dodać `Product`/`Offer` i osobny sitemap dla `sklep/`.

**Zasada wspólna dla klastrów:** każdy wpis kończy się blokiem CTA do materiału i do `/kontakt/` (już częściowo jest: bloki „Zobacz również” + CTA w `src/pages/blog/[post].astro`), a każda strona materiału linkuje do 2–3 wpisów tematycznych → zamyka się pętla „informacja → materiał → zapytanie”.

---

## 5. Local SEO / Google Business Profile — checklista

Ranking lokalny = relevance + distance + prominence (`improve local ranking`; ta sama strona mówi wprost, że przy wyszukiwaniu firmy „w pobliżu” wyniki lokalne pojawiają się w Maps i Search). Dla firmy „przyjeżdżamy do klienta” (brak obsługi pod adresem) zapytania typu „warsztaty dla dzieci Warszawa”, „sensoplastyka Warszawa”, „animacje urodzinowe Warszawa” mają komponent lokalny, więc sam ranking organiczny strony nie wystarczy — potrzebny kompletny profil i spójne dane.

**Profil (do zrobienia od zera/poprawy):**
- [ ] **Weryfikacja** profilu (bez niej brak szans na ekspozycję) — `verify your business`.
- [ ] Typ lokalizacji: **obszar działania (service area)**, nie „firma z adresem” — jeśli nie przyjmujecie klientów pod adresem, adres należy ukryć; zarządzanie adresem: `manage your business address`.
- [ ] **Kategoria główna** + kategorie dodatkowe dobrane z listy Google (dla tego profilu: organizacja zajęć/imprez dla dzieci, usługi edukacyjne — do wyboru w panelu; `manage your business category`).
- [ ] **Obszar działania**: Warszawa + konkretne miejscowości z FAQ na stronie (Pruszków, Legionowo, Piaseczno, Otwock, Wołomin — te nazwy już są w treści FAQ: `src/pages/index.astro`, FAQ #3). To samo w GBP, żeby dane były spójne z witryną.
- [ ] **Godziny** (w tym specjalne) — spójne z `openingHoursSpecification` w schema (`edit your hours`).
- [ ] **Usługi (Services)** = nazwy 1:1 z ofertą na stronie (Sensoplastyka®, ceramika, malowanie twarzy, bańki XXL, animacje urodzinowe, warsztaty dla placówek). Spójność nazw usług = relevance; brak na stronie = brak dopasowania.
- [ ] **Telefon** 607 370 777 (identyczny w GBP, w stopce i w schema — obecnie schema: `+48-607-370-777`, stopka: `tel:607370777`; ujednolicić format).
- [ ] **Strona www i link do rezerwacji**: `cudoteka.pl` (nie www) jako strona główna profilu; dla wizyt indywidualnych — Bookero (`https://atypowi.bookero.pl/`, `src/lib/booking.ts`).
- [ ] **Opisy/atrybuty** (dostępność dla dzieci, dojazd, płatność) — `manage your business attributes`.
- [ ] **Zdjęcia i wideo** — min. kilkanaście zdjęć z realizacji (te same, co w `/galeria/`), regularnie; `manage photos or videos`.
- [ ] **Opinie** — prosić po każdym evencie, odpowiadać na wszystkie (`manage customer reviews`, `get more Google reviews`); link do wystawienia opinii wstawić na `/opinie/` (dziś prowadzi do `google.com` – P1-10) i w mailu potwierdzającym.
- [ ] **Posty/Q&A** — publikować 1–2×/mies. (sezon: bal karnawałowy, ferie, dzień dziecka, półkolonie).
- [ ] **Spójność NAP w sieci** (prominence): katalogi dla rodziców, portale zajęć dodatkowych (kidos.pl, kidoteka.com – tam są Wasze konkurenci), strony dzielnicowe przedszkoli, wydarzenia miejskie. Te same dane: nazwa „Cudoteka”, telefon, obszar, URL.
- [ ] **E-mail w domenie**: `biuro@e-cud.waw.pl` przy marce „Cudoteka” (dowód: stopka, live) — rozważyć `biuro@cudoteka.pl` dla spójności encji (i mniej mylące w GBP).
- [ ] **Uwaga o opiniach w schema**: nie dodawać `Review`/`aggregateRating` dla własnych opinii (Google wspiera je tylko dla stron zbierających opinie o innych firmach — `local-business`); opinie budować w GBP, nie markupem.

**Strona pod Local SEO (techniczne):**
- [ ] Dodać podstronę „Warsztaty w Warszawie i okolicach” z listą dzielnic/miast + mapą obszaru (obecnie informacja o dojeździe jest tylko w FAQ i akapitach).
- [ ] `LocalBusiness` uzupełnić o `address`, `geo`, `openingHoursSpecification`, `sameAs`, `priceRange` (już jest) i **spójny `@id`** (`#business` już jest).

---

## 6. Google Search Console — workflow i eksporty („co wyeksportować, żeby ruszyć z optymalizacją”)

Punkt wyjścia: witryna zweryfikowana, brak API. Poniżej kolejność działań + dokładne raporty i to, co z nich wyciągnąć **dla tego serwisu**. Każdy raport ma przycisk eksportu (CSV/Arkusz Google) — wartości `~`/`-` w eksporcie są zerami (`performance report`, `page indexing`, `core web vitals`, `links`).

### 6.1 Performance (Skuteczność) — `support.google.com/webmasters/answer/7576553`
Wymiary: Queries, Pages, Countries, Devices, **Search appearance**, Dates; filtry: zakres dat, typ wyszukiwania (Web: tekstowe, Web: multimodalne, Image, Video, News); metryki: kliknięcia, wyświetlenia, CTR, średnia pozycja.

Co wyeksportować i po co (dla Cudoteki konkretnie):
1. **Zapytania, 3 mies., sort po wyświetleniach → CSV.** Filtr „pozycja 5–20” i ≥ 100 wyświetleń = lista „striking distance” do szybkich wygranych (najczęściej: warianty „ćwiczenia/karty pracy <głoska>”, „warsztaty <temat> warszawa”). Dla każdej frazy: dopisz brakującą stronę (klaster A/C) albo popraw tytuł/opis (P0-2/P1-5).
2. **Zapytania z wysokim CTR vs. niskim CTR przy podobnej pozycji → druga lista.** CTR < 1–2% przy pozycji ≤ 10 to sygnał tytułu/opisu do przepisania (`title-link`, `snippet`).
3. **Strony (Pages) → CSV.** Szukaj: strony z wyświetleniami > 0 i kliknięciami 0 (do przemyślenia: intencja vs treść), oraz **stron z zerem wyświetleń** = kandydaci na problemy z indeksacją/linkowaniem (weryfikacja w 6.2).
4. **Urządzenia (Devices) → CSV.** Sprawdź udział mobile vs desktop i osobno pozycję/CTR na mobile — od tego zależy, czy priorytetem jest szerokość tytułu, pierwszy ekran i prędkość (dla zapytań „urodziny/warsztaty w Warszawie” mobile bywa dominujący, ale to potwierdź danymi, nie założeniem).
5. **Search appearance → CSV.** Sprawdzasz, czy w ogóle łapiecie jakikolwiek rich result (po wdrożeniach z sekcji 3: `BlogPosting`, `BreadcrumbList`). Jeśli typy nie występują — nie ma z czym porównywać, patrz 6.5.
6. **Zapytania zawierające „logopeda/logopedia/ćwiczenia” i osobno „warsztaty/urodziny/animacje”** — dwa pliki = dwa lejki; to jest podstawa priorytetyzacji klastrów A–H.
7. **Eksport „porównaj” (compare)** 3 mies. do 3 mies. przed i po wdrożeniu P0 — jedyny sensowny sposób raportowania zmian bez API.

### 6.2 Indexing → Pages (Indeksowanie → Strony) — `support.google.com/webmasters/answer/7440203`
Co wyeksportować: tabelę „Dlaczego strony nie są zindeksowane” + „Ulepsz doświadczenie strony”, filtry **Sitemap** (All submitted / Unsubmitted only / konkretna sitemap).
Dla tego serwisu oczekiwane/istotne statusy: `Crawled – currently not indexed` (najczęstszy dla 53 wpisów wygenerowanych w krótkim czasie), `Discovered – currently not indexed`, `Duplicate without user-selected canonical`, `Alternate page with proper canonical tag` (OK), `Page with redirect` (oczekiwane po P0-4), `Soft 404`, `Not found (404)` (sprawdzić tylko własne linki i sitemap).
Działanie: filtr „Unsubmitted pages only” → znajdź URL-e, które Google zna, a których nie ma w sitemapie (mogą to być śmieci po starych buildach) i odwrotnie. Po naprawach: `Validate fix` (per sitemap — szybsza walidacja). Pamiętaj: **nie wszystkie URL-e mają być zindeksowane** i nie oczekuj 100% coverage.

### 6.3 Sitemaps (Sitemapy) — `support.google.com/webmasters/answer/7451001`
Co sprawdzić/eksportować: status „Sukces”, data ostatniego odczytu, liczba wykrytych URL-i (**powinno być 104; jeśli więcej — coś generuje nadmiarowe URL-e**), liczba URL-i z indeksem, błędy.
Działanie: po dodaniu `lastmod` (P1-4) resubmitować `sitemap-index.xml`; rozważyć **osobny sitemap dla materiałów i sklepu** (do śledzenia skuteczności w GSC). Sitemapy można też wysyłać przez API: `webmaster-tools/v1/sitemaps/submit`.

### 6.4 Experience → Core Web Vitals — `support.google.com/webmasters/answer/9205520`
Progi (na 75. percentylu, dane terenowe z CrUX): LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. Raport pokazuje grupy URL-i osobno mobile/desktop; „No data available” jest **normalne** dla niskoruchowej witryny (wtedy pracować na PageSpeed Insights/Lighthouse).
Co wyeksportować: tabele „Why URLs aren’t good” dla mobile i desktop (CSV).
Co zrobić przy tej witrynie: (a) potwierdzić brak problemów na froncie (hero bez `fetchpriority="high"` → do dodania, P1-9), (b) po każdej większej zmianie UI (np. redesign `/materialy/` z worktree) uruchomić `Start tracking` (28 dni monitoringu).

### 6.5 Wyniki rozszerzone / Rich results (Enhancements)
W GSC szukaj pozycji raportów dla typów, które **realnie są** na stronie: `BlogPosting` (Article), `BreadcrumbList`, oraz komunikatów o `LocalBusiness`/`FAQPage` (oba nie dają już rich results: `LocalBusiness` nie jest typem rich result, a FAQ rich result został wycofany — dokumentacja FAQ usunięta 2026-06-15, feature wyłączony od 2026-05-07; źródło: `search/updates`). Wnioski praktyczne:
- nie licz na rich result z FAQ — schemę trzymaj jako sygnał dla AI/encji, nie jako cel,
- `Course` (rich result wycofany, docs usunięte 2025-09-09) — traktuj jako sygnał, nie cel,
- walidacja markupu: Rich Results Test + Schema Markup Validator + URL Inspection (test live URL).

### 6.6 Links (Linki) — `support.google.com/webmasters/answer/9049606`
Co wyeksportować:
- **External → Top linked pages** (CSV / Arkusz Google, do 100 000 wierszy dla „Latest links”): które podstrony zdobywają linki (prawdopodobnie PDF-y i wpisy o ORM) — to wskazuje, gdzie warto dołożyć treści i CTA.
- **Top linking sites**: odróżnić wartościowe (przedszkola, portale dla rodziców, lokalne media) od spamu; spam → ewentualnie disavow.
- **Top linking text**: czy anchor text mówi „Cudoteka”/„materiały logopedyczne” (jeśli dominuje „kliknij tutaj” — poprosić partnerów o doprecyzowanie linków).
- **Internal → Top linked pages**: wykryć **strony słabo linkowane wewnętrznie** (kandydaci na sieroty — np. nowe wpisy, `/szkolenia/`), i dopisać linki z hubów (klaster D).

### 6.7 URL Inspection + request indexing — `support.google.com/webmasters/answer/9012289`
Dla pojedynczych URL-i: status indeksu, **użytkownik vs Google-selected canonical** (kluczowe po P0-3 i P0-4), data ostatniego crawla, dostępność, dane strukturalne, test live URL. „Request indexing” używać selektywnie (nowe/zmienione strony: nowe strony materiałów, poprawione tytuły); szersze wytyczne: `ask-google-to-recrawl`.

### 6.8 API (opcja, gdy ręczne eksporty przestaną wystarczać)
- **Search Analytics API** — `POST https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/searchAnalytics/query`, ciało: `startDate`, `endDate`, `dimensions` (`query`, `page`, `device`, `country`, `date`, `searchAppearance`), `dimensionFilterGroups` (filtry `contains`/`equals`/`notContains`/regex, max 4096 znaków), `rowLimit` **1–25 000** (domyślnie 1000), `startRow` do stronicowania, `dataState: "all"` = dane świeże. Dokładnie ta sama struktura co eksport z UI — można automatyzować listy „striking distance”.
- **Sitemaps API** — `webmaster-tools/v1/sitemaps` (+ `submit`) do automatycznego zgłaszania sitemap po deployu.
- **Autoryzacja**: `webmaster-tools/v1/how-tos/authorizing`.
  - *Service account* (zalecane dla automatyzacji bez człowieka): projekt w Google Cloud → włącz Search Console API → utwórz konto serwisowe → **dodaj e-mail konta serwisowego jako użytkownika w Search Console** (uprawnienie „Pełny” lub „Ograniczony”) → użyj JSON klucza lokalnie / w CI. Zakres: `webmasters.readonly`.
  - *OAuth* (gdy potrzebny dostęp do wielu usług Google lub interaktywny): utwórz OAuth client ID + consent screen, zakres `webmasters.readonly`, refresh token w sekrecie.
- Twarde ograniczenie do zapamiętania: API „does not guarantee to return all data rows but rather top ones” — do pełnych, długich ogonów używaj eksportu z UI/`rowLimit` + `startRow`.

### 6.9 Kolejność wdrożenia (propozycja)
1. Eksport 6.1 (queries+pages) i 6.2 (Pages) → zapisz jako baseline w tym folderze (`docs/research/`) z datą.
2. Napraw P0-1…P0-5 (kod/domena/formularz) → zgłoś URL-e do sprawdzenia (6.7).
3. Dodaj `lastmod` + `WebSite`/`Organization`/`BreadcrumbList` + autora (P1-1…P1-4), potem resubmit sitemap (6.3).
4. Klaster A (strony materiałów) jako pierwszy deliverable treściowy — bo istnieje popyt, treść i wewnętrzne linkowanie.
5. Po 4–6 tygodniach: ponowny eksport queries → weryfikacja czy nowe URL-e łapią frazy „…PDF / karty pracy / do druku”.

---

## 7. Załącznik

### 7.1 Metodologia
**Repo (odczyt, bez modyfikacji kodu i bez buildów):** `src/lib/seo.ts`, `src/layouts/BaseLayout.astro`, `src/components/layout/{Header,Footer}.astro`, `src/components/downloads/DownloadCard.astro`, `src/pages/*.astro` + `/blog/[post].astro`, `/warsztaty/[workshop].astro`, `/oferta/[category].astro`, `src/content.config.ts` + `src/content/**` (inwentarz przez `glob`/`grep`), `astro.config.mjs`, `vercel.json`, `netlify.toml`, `public/robots.txt`, `public/_redirects`, `docs/**`, `AGENTS.md`, `status.md`, `raport audtyu seo.md`, `package.json`, `git log`/`git worktree list` oraz diff `master…design/materialy-good-css`.
**Live:** 104 URL-e z `sitemap-0.xml` pobrane i przeanalizowane (title/description/canonical/H1 — pełny crawl 2026-10-11); ręcznie sprawdzone: `/`, `/materialy/`, `/kontakt/`, `/oferta/`, `/warsztaty/sensoplastyka/`, `/o-nas/`, `/opinie/`, `/galeria/`, `/szkolenia/`, `/blog/karty-pracy-jak-wybrac-i-pracowac/`, `/robots.txt`, `/sitemap-index.xml`, `/sitemap-0.xml`, `/nieistniejaca-strona/`, `https://www.cudoteka.pl/`, nagłówki HTTP (`curl -I`).
**SERP:** 12 zapytań PL (2026-10-11) przez wyszukiwarkę zewnętrzną; analiza typów wyników i konkurentów. **Narzędzie nie pokazuje Local Packa/Maps** — obecność pakietu lokalnego oceniana pośrednio (zestaw konkurentów to w większości firmy lokalne z profilami GBP i stronami usług).
**Dokumentacja Google:** wszystkie rekomendacje oparte o strony oficjalne (poniżej), pobrane 2026-10-11.

### 7.2 Źródła oficjalne (Google)
- Structured data: LocalBusiness — https://developers.google.com/search/docs/appearance/structured-data/local-business
- Structured data: Organization — https://developers.google.com/search/docs/appearance/structured-data/organization
- Structured data: Article/BlogPosting — https://developers.google.com/search/docs/appearance/structured-data/article
- Structured data: Breadcrumb — https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Structured data: FAQPage (wycofane) — https://developers.google.com/search/docs/appearance/structured-data/faqpage → zmiany: https://developers.google.com/search/updates
- Structured data: Course info (wycofane) — https://developers.google.com/search/docs/appearance/structured-data/course-info
- Structured data: Product / Product snippet / Merchant listing — https://developers.google.com/search/docs/appearance/structured-data/product , https://developers.google.com/search/docs/appearance/structured-data/product-snippet , https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Structured data: Review snippet — https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Structured data: Event — https://developers.google.com/search/docs/appearance/structured-data/event
- Site names (WebSite schema) — https://developers.google.com/search/docs/appearance/site-names
- Sitemapy (budowa, `lastmod`, ignorowane `priority`/`changefreq`) — https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Kanonizacja / duplikaty URL — https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Title linki — https://developers.google.com/search/docs/appearance/title-link
- Snippety/opisy — https://developers.google.com/search/docs/appearance/snippet
- Obrazy (alt, formaty, preferowany obraz) — https://developers.google.com/search/docs/appearance/google-images
- Proszenie o ponowne zindeksowanie — https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Treści przyjazne ludziom / E-E-A-T — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- AI features i optymalizacja pod AI — https://developers.google.com/search/docs/appearance/ai-features , https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- GSC: Performance report — https://support.google.com/webmasters/answer/7576553
- GSC: Page indexing report — https://support.google.com/webmasters/answer/7440203
- GSC: Sitemaps report — https://support.google.com/webmasters/answer/7451001
- GSC: Core Web Vitals report — https://support.google.com/webmasters/answer/9205520
- GSC: Links report — https://support.google.com/webmasters/answer/9049606
- GSC: URL Inspection — https://support.google.com/webmasters/answer/9012289
- GSC: zgłoszenie do indeksowania — https://support.google.com/webmasters/answer/6065812
- GSC API: Search Analytics query — https://developers.google.com/webmaster-tools/v1/searchanalytics/query
- GSC API: autoryzacja — https://developers.google.com/webmaster-tools/v1/how-tos/authorizing
- GSC API: Sitemaps — https://developers.google.com/webmaster-tools/v1/sitemaps
- GSC + GA4 razem — https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console
- Google Business Profile: ranking lokalny — https://support.google.com/business/answer/7091
- GBP: weryfikacja — https://support.google.com/business/answer/7107242 ; edycja profilu — https://support.google.com/business/answer/3039617 ; adres — https://support.google.com/business/answer/2853879 ; kategoria — https://support.google.com/business/answer/7249669 ; atrybuty — https://support.google.com/business/answer/9049526 ; zdjęcia — https://support.google.com/business/answer/6103862 ; opinie — https://support.google.com/business/answer/3474050 , https://support.google.com/business/answer/7035772
- Wydajność (linkowane z raportu CWV): https://web.dev/articles/lcp , https://web.dev/articles/inp , https://web.dev/articles/cls

### 7.3 Czego nie udało się zweryfikować (i co jest potrzebne)
1. **Realne dane GSC** (pozycje, CTR, indeksacja, CWV terenowe, linki) — brak dostępu do API. Potrzebne: eksporty z sekcji 6 (queries/pages CSV, Pages, Sitemaps, CWV, Links) albo konto serwisowe z uprawnieniem do property.
2. **Zgodność `www` z konfiguracją DNS/hostingiem** — potwierdzone tylko objawowo (200 + placeholder + noindex). Do potwierdzenia w panelu Vercel/rejestratorze: czy `www` jest dodane jako domena projektu i jaki rekord DNS wskazuje.
3. **GBP: kategoria, godziny, weryfikacja, liczba opinii** — nie da się odczytać publicznie w sposób wiarygodny tym narzędziem (brak wglądu w panel i brak Local Packa w wynikach).
4. **Core Web Vitals z pola (CrUX)** — serwis prawdopodobnie nie ma wystarczającego ruchu, żeby GSC pokazał dane („No data available”); potrzebny raport z GSC albo PSI.
5. **Czy strona `www` ma osobny ruch/historyczne linki** — wymaga danych z GSC (Links report, filtr po URL) przed/po dodaniu 301.
6. **Ceny i terminy** (warsztaty, szkolenia, pakiety urodzinowe) — brak danych biznesowych; bez nich P1-6 i klaster E/G są zablokowane (`docs/CHECKLIST-zalozycielki.md` B1–B6, sekcja 3).
7. **Wpływ redesignu `/materialy/` z worktree** — diff obejmuje wyłącznie `src/pages/materialy.astro` i `src/components/downloads/DownloadCard.astro` (zmiany UI), więc **nie wnosi nowych URL-i ani markupu**; nie deployowany (live `/materialy/` = stan `master`).
8. **Konkurencja: dane ilościowe (wolumen, trudność, backlinki)** — badanie SERP było jakościowe (typy wyników, przykłady); do priorytetyzacji liczbowej potrzebny tool SEO z wolumenami albo dane GSC po pierwszych miesiącach.
