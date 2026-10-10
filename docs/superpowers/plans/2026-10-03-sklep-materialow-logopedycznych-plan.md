# Plan: Sklep materiałów logopedycznych (PDF/e-booki)

**Status:** Propozycja — wymaga potwierdzenia ceny, modelu licencji i stawki VAT przed wdrożeniem.

**Data:** 2026-10-03

**Decyzja:** Stripe Checkout + istniejący pipeline PDF, **nie** Shopify. Uzasadnienie i liczby poniżej.

---

## Problem

Cudoteka ma 28 szablonów PDF i generuje karty pracy programowo (`F:\code\logopedia\src\app\api\pdf\[slug]`). Kolekcja `downloads` (8 pozycji) udostępnia je **za darmo**. Nie ma ścieżki płatnej — brak przychodu z najbardziej gotowego produktu, a treści są już napisane.

## Decyzja: dlaczego nie Shopify

Shopify jest platformą do sprzedaży **towarów fizycznych**: magazyn, warianty, wagi, etykiety, integracje kurierskie. Tego nie potrzebujemy — produkt jest plikiem PDF, dostawa to e-mail z linkiem.

| | Shopify Basic | Stripe Checkout |
|---|---|---|
| Abonament | 79 zł/mies. (rocznie 39 zł/mies.) | 0 zł |
| Karta EOG | ~2,4–2,9% + 1,20 zł | 1,5% + 1,00 zł |
| BLIK | ~1,69% + 1,20 zł | 1,6% + 1,00 zł |
| Przelew online | w cenie planu | 1,9% + 1,00 zł |
| Próg rentowności | ~1 100 zł/mies. sprzedaży | — (koszt stały ≈ 0) |

Sprzedaż 10 produktów × 59 zł = **590 zł/mies.** Shopify zjada **~13% przychodu** zanim cokolwiek zarobisz.

Dodatkowy koszt: sklep Shopify wygląda inaczej niż reszta marki Cudoteka. Astro + Tailwind 4 już tu jest.

## Koszt przy 1 produkcie (cena 59 zł)

| Pozycja | Koszt |
|---|---|
| Stripe (karta EOG: 1,5% + 1 zł) | ~1,89 zł / transakcja |
| Hosting Astro (Netlify/Vercel free tier) | 0 zł |
| Domena | ~5 zł/mies. |
| **Razem** | **~7 zł/mies.** |

---

## Ograniczenie do rozwiązania

Astro jest skonfigurowane jako `output: 'static'`. **Webhook Stripe musi działać poza tym buildem.** To jedyna nowa infrastruktura w całym projekcie.

Opcje (wszystkie z darmowym limitem ~100k wywołań/mies.):

- **Netlify Functions** — najprostsze, jeśli deployment idzie na Netlify
- **Vercel Functions** — analogicznie dla Vercel
- **Cloudflare Workers** — najtańsze przy dużym wolumenie

**Wniosek krok 3:** nie wdrażać, dopóki nie ma pierwszego zamówienia. Gdy się pojawi, wybór platformy wynika z tego, gdzie już hostuje się strona.

---

## Świadomie odłożone (YAGNI)

Nie budujemy na pierwszą iterację:

- **Panelu admina** — `price_id` Stripe ustawiamy ręcznie raz, na zawsze
- **Koszyka** — jeden produkt = jeden przycisk „Kup"; Stripe Checkout zbiera komplet danych
- **Kont klientów / logowania** — kupujący dostaje link na e-mail; zwrot = e-mail
- **Signed URL dla PDF** — w 10 sekund później, ale nie wcześniej
- **Panelu zamówień / CRM** — Excel lub Stripto wystarczą

---

## Krok 1 — kolekcja `products`

Nowa kolekcja obok istniejącej `downloads` w `src/content.config.ts`. **Nie modyfikujemy `downloads`** — darmowe pobrania zostają jak są.

**Pliki:**
- `src/content.config.ts` — nowa kolekcja `products`
- `src/content/products/<slug>.md` — po jednym pliku na produkt

**Schemat Zod** (spójny ze stylem istniejącej kolekcji `downloads`):

```ts
const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.enum(['artykulacja', 'logopedia', 'inne']),
    price: z.number(),              // cena brutto w PLN
    vatRate: z.literal(5).or(z.literal(23)),
    priceId: z.string(),            // Stripe price_... — jednoznaczne źródło prawdy
    file: z.string(),
    fileSize: z.string(),
    pageCount: z.number(),          // do copy marketingowego
    icon: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});
```

**Uwaga:** `price` służy **wyłącznie** do wyświetlania na stronie. Płatność musi używać `priceId`, żeby kwota z frontendu nie była źródłem prawdy dla transakcji.

---

## Krok 2 — Stripe Checkout (bez backendu)

**To jest najważniejszy krok: daje sprzedaż dzisiaj, na statycznym Astro, bez nowego serwera.**

**Pliki:**
- `src/lib/checkout.ts` — `productCheckoutHref(product)` budujący URL
- `src/pages/kup/[slug].astro` — przekierowanie do Stripe
- `src/pages/sklep/index.astro` — lista produktów
- `src/components/shop/ProductCard.astro` — karta produktu (styl na wzór `DownloadCard.astro`)

**Mechanizm** — Astro w trybie `static` nie ma server endpoint, ale `redirect` po stronie klienta działa. Wystarczy:

```
/kup/<slug>  →  302 →  https://buy.stripe.com/<session>
```

Link generujemy po stronie klienta lub jako redirect w HTML, z `priceId` pobranym z kolekcji w czasie builda. **Brak webhooka, brak sesji, brak serwera.**

**Krytyczne:** przed wdrożeniem potwierdzić, że Stripe Checkout w trybie `payment` przyjmuje `priceId` i przekierowuje bez sesji serwerowej. Jeśli wymaga sesji — wariant 2 poniżej.

**Akceptacja:** kliknięcie „Kup" na stronie produktu → płatność BLIK/karta na Stripe → zwrot na stronę z podziękowaniem. Bez backendu.

---

## Krok 3 — webhook + dostawa

**Odłożyć do momentu pierwszego zamówienia.** Póki nie ma zamówienia, nie ma po co pisać handlera.

**Pliki:**
- `functions/stripe-webhook.ts` (Netlify) lub `api/webhooks/stripe.ts` (Vercel)
- `src/lib/mail.ts` — wysyłka e-mail z linkiem do PDF

**Flow:**
1. Stripe wysyła `checkout.session.completed`
2. Handler sprawdza podpis (`stripe.webhooks.constructEvent`), **nigdy** nie ufa payloadowi
3. Wyciąga `customer_email` i `priceId`
4. Wysyła e-mail z linkiem do pliku
5. Loguje zamówienie

**Bezpieczeństwo — niedopuszczalne:**
- Handler **musi** weryfikować podpis Stripe. Payload bez weryfikacji to dowolny atakujący, który wysyła fałszywe „zapłaciłem"
- Endpoint **nie** może zwracać pliku bez sprawdzenia `payment_status === 'paid'`
- Nitki z webhooka muszą być idempotentne (te same `event.id` ignorowane)

---

## Krok 4 — dopiero po walidacji

Kandydaci, odłożeni świadomie:

- Signed URL zamiast publicznego linku do PDF
- Logowanie / dostęp po konto (kontrola liczby pobrań)
- Kupony i kody rabatowe
- Automatyczne faktury (Stripto / Fakturownia)

---

## VAT — do potwierdzenia przed pierwszą fakturą

Wyszukiwanie nie daje jednoznacznej odpowiedzi, ale wyłania się istotna różnica:

| Model | Stawka | Podstawa |
|---|---|---|
| Dostawa konkretnej publikacji (PDF) | **5%** | interpretacja KIS `0112-KDSL2-1.440.280.2026.3.SG`, lipiec 2026 |
| Abonament na platformę z e-bookami | **23%** | KIS odmówił 5%, kwalifikacja do PKWiU 63 |

Przy cenie 59 zł różnica to **10,62 zł na sztuce**. Walidacja indywidualnych publikacji → 5%; abonament → 23%.

**Decyzja nie może być podjęta zgadywanką.** Potwierdzić z księgowym przed wystawieniem pierwszej faktury.

---

## Alternatywa do rozważenia po walidacji

Przy produkcie sprzedanym regularnie (kurs + PDF, ceny 200–500 zł) warto porównać **Przelewy24 bezpośrednio** zamiast Stripe:

| Metoda | Stripe | Przelewy24 |
|---|---|---|
| Karta EOG | 1,5% + 1,00 zł | 1,29% + 0,30 zł |
| BLIK | 1,6% + 1,00 zł | 1,29% + 0,30 zł |
| Przelew online | 1,9% + 1,00 zł | 1,29% + 0,30 zł |

BLIK to ponad 63% polskiego e-commerce. Przelewy24 ma niską opłatę stałą (0,30 zł vs 1,00 zł), co przy niskich kwotach daje realną przewagę. Różnica ~0,70 zł/transakcję — nie rozstrzygająca, ale zauważalna przy dużym wolumenie.

---

## Podsumowanie decyzji

**Stripe Checkout + Astro + istniejący pipeline PDF. Bez Shopify.**

Uzasadnienie: Shopify kosztuje 79 zł/mies. + wyższą prowizję i rozwiązuje problem, którego nie mamy (sprzedaż fizyczna). Koszt stały Stripe Checkout ≈ 0 zł, a krok 2 daje sprzedaż na statycznym Astro bez backendu.

**Decyzja podlega ponownemu otwarciu, gdy:** pojawi się sprzedaż fizyczna (rekwizyty, karty do gry), albo przekroczymy ~1100 zł/mies. — wtedy Shopify (lub Przelewy24 bezpośrednio) zaczyna mieć sens.

## Następny krok

**Kroki 1 + 2** (kolekcja `products` + Stripe Checkout bez backendu). Najmniejszy wycinek dający realną sprzedaż, bez decyzji o hostingu i bez webhooka.

## Źródła

- [Shopify — Cennik (PL)](https://www.shopify.com/pl/pricing)
- [Stripe — Cennik Polska](https://stripe.com/en-pl/pricing)
- [Stripe — lokalne metody płatności](https://stripe.com/en-pl/pricing/local-payment-methods)
- [Przelewy24 — tabela prowizji](https://www.przelewy24.pl/oferta/tabela-prowizji-i-oplat)
- [KIS 0112-KDSL2-1.440.280.2026.3.SG (5% VAT dla e-booka)](https://sip.lex.pl/orzeczenia-i-pisma-urzedowe/pisma-urzedowe/0112-kdsl2-1.440.280.2026-3-sg-wis-usluga-dostarczanie-e-185330866)
- [Tabela stawek bramek (odczyt 28.08.2026)](https://policzpomysl.pl/liczby/prowizje-bramek-platnosci-blik-karta/)