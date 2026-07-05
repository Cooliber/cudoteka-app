import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const chromeCandidates = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];

const chromePath = chromeCandidates.find(existsSync);

if (!chromePath) {
  throw new Error('Nie znaleziono Chrome ani Edge do wygenerowania PDF.');
}

const outputDir = resolve('public/materialy');
const htmlDir = resolve('.tmp/materialy-html');

mkdirSync(outputDir, { recursive: true });
mkdirSync(htmlDir, { recursive: true });

const materials = [
  {
    slug: 'wyzwania-wakacyjne',
    title: 'Wyzwania wakacyjne',
    subtitle: '30 kreatywnych aktywności na letnie dni',
    audience: 'Dla dzieci, rodziców i opiekunów',
    accent: '#EF9E80',
    pages: [
      {
        heading: 'Jak korzystać z materiału',
        intro:
          'Wybierzcie jedno wyzwanie dziennie albo potraktujcie listę jak wakacyjne bingo. Najważniejsze są ciekawość, wspólny czas i swoboda tworzenia.',
        items: [
          'Zaznaczcie wykonane aktywności na liście.',
          'Dopiszcie własne pomysły w pustych polach.',
          'Po każdym tygodniu wybierzcie trzy ulubione wspomnienia.',
        ],
      },
      {
        heading: 'Lista 30 wyzwań',
        grid: [
          'Zbuduj bazę z koców lub gałęzi.',
          'Namieszaj naturalne farby z przypraw.',
          'Zrób mapę skarbów najbliższej okolicy.',
          'Ułóż mandalę z liści, kamyków i kwiatów.',
          'Przygotuj piknik dla rodziny.',
          'Stwórz wakacyjny dziennik obrazkowy.',
          'Poszukaj pięciu odcieni zieleni.',
          'Zrób eksperyment z lodem i solą.',
          'Wymyśl tor przeszkód na podwórku.',
          'Narysuj komiks o letniej przygodzie.',
          'Zasadź pestkę lub małą roślinę.',
          'Zaprojektuj własną pocztówkę.',
          'Zorganizuj dzień bez ekranów.',
          'Zrób teatrzyk cieni.',
          'Policz chmury i wymyśl im nazwy.',
          'Stwórz instrument z butelki.',
          'Przygotuj owocowe szaszłyki.',
          'Zrób bańki mydlane domowym sposobem.',
          'Ułóż rodzinny taniec.',
          'Namaluj obraz palcami.',
          'Zaprojektuj odznakę odkrywcy.',
          'Zbuduj łódkę z korka.',
          'Zrób zdjęcie najciekawszej faktury.',
          'Wymyśl wakacyjną grę planszową.',
          'Stwórz kapsułę czasu.',
          'Posłuchaj dźwięków wieczoru.',
          'Przygotuj tor dla autek lub figurek.',
          'Wymyśl hasło lata.',
          'Zrób prezent z recyklingu.',
          'Opowiedz historię z trzech znalezionych rzeczy.',
        ],
      },
      {
        heading: 'Mój wakacyjny tropiciel',
        checklist: [
          'Najzabawniejsza chwila tygodnia',
          'Nowa rzecz, której spróbowałem/spróbowałam',
          'Miejsce, które chcę odwiedzić jeszcze raz',
          'Zapach, który kojarzy mi się z latem',
          'Moje własne wyzwanie na jutro',
        ],
      },
    ],
  },
  {
    slug: 'artykulacja-szereg-syczacy',
    title: 'Artykulacja: szereg syczący',
    subtitle: 'Ćwiczenia głosek S, Z, C, DZ',
    audience: 'Dla rodziców i terapeutów',
    accent: '#3E89B0',
    soundSet: ['s', 'z', 'c', 'dz'],
    words: ['sok', 'sowa', 'ser', 'zamek', 'zupa', 'zegar', 'cebula', 'cytryna', 'klocki', 'dzwon', 'dzwonek', 'rodzynki'],
    rhyme: 'Sowa Sonia sok mieszała, z cytrynami go podała. Cicho dzwoni mały dzwon, dzielny język ćwiczy ton.',
  },
  {
    slug: 'artykulacja-szereg-szumiaci',
    title: 'Artykulacja: szereg szumiący',
    subtitle: 'Ćwiczenia głosek SZ, Ż/RZ, CZ, DŻ',
    audience: 'Dla rodziców i terapeutów',
    accent: '#3E89B0',
    soundSet: ['sz', 'ż', 'cz', 'dż'],
    words: ['szafa', 'szalik', 'kasza', 'żaba', 'żuk', 'róża', 'czapka', 'czekolada', 'klucz', 'dżem', 'dżungla', 'dżokej'],
    rhyme: 'Szara myszka szalik ma, żółta żaba cicho gra. Cztery czapki, dżemu słoik - język ćwiczy, nic się nie boi.',
  },
  {
    slug: 'artykulacja-szereg-ciszacy',
    title: 'Artykulacja: szereg ciszący',
    subtitle: 'Ćwiczenia głosek Ś, Ź, Ć, DŹ',
    audience: 'Dla rodziców i terapeutów',
    accent: '#3E89B0',
    soundSet: ['ś', 'ź', 'ć', 'dź'],
    words: ['siano', 'ślimak', 'miś', 'źrebak', 'źródło', 'gałąź', 'ćma', 'ćwiczy', 'nić', 'dźwig', 'dźwięk', 'niedźwiedź'],
    rhyme: 'Ślimak niesie miękki liść, źrebak patrzy, dokąd iść. Ćma ćwiczenia robi dziś, dźwięcznie mruczy mały miś.',
  },
  {
    slug: 'kappacyzm',
    title: 'Kappacyzm',
    subtitle: 'Ćwiczenia głoski K',
    audience: 'Materiał wspierający pracę logopedyczną',
    accent: '#7FC4A6',
    soundSet: ['k'],
    words: ['kot', 'kura', 'kawa', 'oko', 'mak', 'rak', 'kubek', 'klocki', 'kapusta', 'komin', 'krokodyl', 'cukierek'],
    rhyme: 'Kot Kacper klocki układa, kura koło niego siada. Krok po kroku, lekko, krótko - głoska K brzmi bardzo czyściutko.',
  },
  {
    slug: 'gammacyzm',
    title: 'Gammacyzm',
    subtitle: 'Ćwiczenia głoski G',
    audience: 'Materiał wspierający pracę logopedyczną',
    accent: '#7FC4A6',
    soundSet: ['g'],
    words: ['góra', 'guma', 'gęś', 'ogon', 'waga', 'jagoda', 'garnek', 'gitara', 'globus', 'gruszka', 'droga', 'flaga'],
    rhyme: 'Gęś Genia gra na gitarze, globus kręci się na parze. Głośno, lekko, bez pośpiechu - głoska G ma dużo śmiechu.',
  },
  {
    slug: 'rotacyzm',
    title: 'Rotacyzm',
    subtitle: 'Ćwiczenia głoski R',
    audience: 'Materiał wspierający pracę logopedyczną',
    accent: '#E7B85C',
    soundSet: ['r'],
    words: ['rak', 'ryba', 'rower', 'kora', 'para', 'ser', 'trawa', 'brama', 'kredka', 'droga', 'gruszka', 'motorek'],
    rhyme: 'Rudy rak rowerem rusza, ryba rytm ogonem wzrusza. Tra, dra, bra - język drży, głoska R już w słowach brzmi.',
  },
  {
    slug: 'lambdacyzm',
    title: 'Lambdacyzm',
    subtitle: 'Ćwiczenia głoski L',
    audience: 'Materiał wspierający pracę logopedyczną',
    accent: '#E7B85C',
    soundSet: ['l'],
    words: ['lala', 'lampa', 'lis', 'balon', 'półka', 'fala', 'lody', 'las', 'kolejka', 'motyl', 'cebula', 'kalosze'],
    rhyme: 'Lalka Lila lody lubi, lisek listy w lesie gubi. Leci lekko dźwięczne L, język wysoko, uśmiech też.',
  },
];

const typo = (text) =>
  text.replace(/ (a|i|o|u|w|z|że|czy|bo|lecz|nad|pod|dla|przy) /giu, ' $1\u00A0');

const escapeHtml = (text) =>
  typo(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

function logopediaPages(material) {
  return [
    {
      heading: 'Przygotowanie buzi i języka',
      intro:
        'Ćwiczcie krótko, regularnie i w atmosferze zabawy. Jeśli dziecko jest zmęczone, lepiej wrócić do ćwiczeń później.',
      items: [
        'Uśmiech - dzióbek: 10 spokojnych powtórzeń.',
        'Liczenie ząbków językiem przy otwartej buzi.',
        'Kląskanie jak konik przez 20 sekund.',
        'Oddychanie nosem i powolny wydech ustami.',
      ],
    },
    {
      heading: `Ćwiczona głoska: ${material.soundSet.join(', ').toUpperCase()}`,
      intro: 'Najpierw ćwiczcie głoskę w izolacji, potem w sylabach, wyrazach i krótkich zdaniach.',
      syllables: material.soundSet.flatMap((sound) => [`${sound}a`, `${sound}o`, `${sound}u`, `a${sound}`, `o${sound}`, `u${sound}`]),
      words: material.words,
    },
    {
      heading: 'Wierszyk do powtarzania',
      quote: material.rhyme,
      checklist: [
        'Powiedz wierszyk wolno.',
        'Zakreśl słowa z ćwiczoną głoską.',
        'Powtórz tylko zakreślone słowa.',
        'Ułóż własne zdanie z trzema wybranymi wyrazami.',
      ],
    },
    {
      heading: 'Mini karta obserwacji',
      checklist: [
        'Dziecko próbuje ułożyć język według instrukcji.',
        'Głoska pojawia się w sylabach.',
        'Głoska pojawia się w wyrazach.',
        'Dziecko potrafi samo wskazać najlepiej wypowiedziane słowo.',
      ],
      note:
        'Materiał nie zastępuje diagnozy ani terapii logopedycznej. W razie wątpliwości warto skonsultować się ze specjalistą.',
    },
  ];
}

function pageContent(page) {
  const blocks = [];

  blocks.push(`<h2>${escapeHtml(page.heading)}</h2>`);
  if (page.intro) blocks.push(`<p class="lead">${escapeHtml(page.intro)}</p>`);
  if (page.items) {
    blocks.push(`<ul class="list">${page.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`);
  }
  if (page.grid) {
    blocks.push(`<div class="challenge-grid">${page.grid.map((item, index) => `<div><strong>${index + 1}.</strong> ${escapeHtml(item)}</div>`).join('')}</div>`);
  }
  if (page.syllables) {
    blocks.push(`<div class="tiles">${page.syllables.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>`);
  }
  if (page.words) {
    blocks.push(`<div class="words">${page.words.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>`);
  }
  if (page.quote) {
    blocks.push(`<blockquote>${escapeHtml(page.quote)}</blockquote>`);
  }
  if (page.checklist) {
    blocks.push(`<div class="checklist">${page.checklist.map((item) => `<label><span></span>${escapeHtml(item)}</label>`).join('')}</div>`);
  }
  if (page.note) {
    blocks.push(`<p class="note">${escapeHtml(page.note)}</p>`);
  }

  return blocks.join('\n');
}

function render(material) {
  const pages = material.pages ?? logopediaPages(material);

  return `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(material.title)} | Cudoteka</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #36323B;
      background: #FBF7F1;
      font-family: "Nunito Sans", "Segoe UI", Arial, sans-serif;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 18mm;
      page-break-after: always;
      position: relative;
      background:
        radial-gradient(circle at 100% 0%, ${material.accent}22 0, transparent 42mm),
        linear-gradient(180deg, #FBF7F1 0%, #F4ECE0 100%);
    }
    .cover {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12mm;
    }
    .brand {
      position: absolute;
      top: 14mm;
      left: 18mm;
      font-weight: 900;
      color: #296A8E;
      letter-spacing: 0.02em;
    }
    .tag {
      display: inline-block;
      width: fit-content;
      padding: 7px 13px;
      border-radius: 999px;
      background: #fff;
      color: #296A8E;
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.09em;
    }
    h1 {
      margin: 0;
      max-width: 150mm;
      color: #36323B;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 42px;
      line-height: 1.05;
    }
    h2 {
      margin: 0 0 8mm;
      color: #296A8E;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 29px;
      line-height: 1.15;
    }
    .subtitle {
      max-width: 130mm;
      color: #6E6774;
      font-size: 18px;
      line-height: 1.45;
    }
    .lead, p, li, label {
      font-size: 15px;
      line-height: 1.65;
    }
    .lead { color: #6E6774; max-width: 155mm; }
    .meta {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8mm;
      margin-top: 8mm;
    }
    .box, .challenge-grid div, .words span, .tiles span, blockquote, .checklist label {
      background: rgba(255,255,255,0.78);
      border: 1px solid rgba(62,137,176,0.14);
      border-radius: 14px;
      box-shadow: 0 18px 34px -28px rgba(41,106,142,0.45);
    }
    .box { padding: 7mm; }
    .box strong {
      display: block;
      margin-bottom: 2mm;
      color: #296A8E;
    }
    .list { padding-left: 18px; }
    .challenge-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4mm;
    }
    .challenge-grid div { min-height: 18mm; padding: 4mm; font-size: 13px; line-height: 1.4; }
    .tiles, .words {
      display: flex;
      flex-wrap: wrap;
      gap: 4mm;
      margin: 7mm 0;
    }
    .tiles span {
      min-width: 22mm;
      padding: 4mm 5mm;
      text-align: center;
      font-size: 20px;
      font-weight: 900;
      color: #296A8E;
    }
    .words span {
      padding: 4mm 5mm;
      font-size: 15px;
      font-weight: 800;
    }
    blockquote {
      margin: 8mm 0;
      padding: 8mm;
      border-left: 6px solid ${material.accent};
      font-family: Georgia, "Times New Roman", serif;
      font-size: 24px;
      line-height: 1.35;
    }
    .checklist {
      display: grid;
      gap: 4mm;
      margin-top: 8mm;
    }
    .checklist label {
      display: grid;
      grid-template-columns: 8mm 1fr;
      align-items: center;
      gap: 4mm;
      padding: 4mm;
    }
    .checklist span {
      width: 7mm;
      height: 7mm;
      border: 2px solid ${material.accent};
      border-radius: 6px;
      background: #fff;
    }
    .note {
      margin-top: 9mm;
      padding: 5mm;
      border-radius: 12px;
      color: #6E6774;
      background: rgba(255,255,255,0.6);
      font-size: 12px;
    }
    .footer {
      position: absolute;
      left: 18mm;
      right: 18mm;
      bottom: 10mm;
      display: flex;
      justify-content: space-between;
      color: #6E6774;
      font-size: 11px;
    }
  </style>
</head>
<body>
  <section class="page cover">
    <div class="brand">Cudoteka</div>
    <div>
      <span class="tag">Materiał PDF</span>
      <h1>${escapeHtml(material.title)}</h1>
      <p class="subtitle">${escapeHtml(material.subtitle)}</p>
    </div>
    <div class="meta">
      <div class="box"><strong>Dla kogo?</strong>${escapeHtml(material.audience)}</div>
      <div class="box"><strong>Jak pracować?</strong>Krótko, regularnie i z dobrym humorem. Wydrukuj materiał albo korzystaj z niego na ekranie.</div>
    </div>
    <div class="footer"><span>cudoteka.pl</span><span>${escapeHtml(material.title)}</span></div>
  </section>
  ${pages
    .map(
      (page, index) => `<section class="page">
    <div class="brand">Cudoteka</div>
    ${pageContent(page)}
    <div class="footer"><span>cudoteka.pl</span><span>${index + 2}</span></div>
  </section>`,
    )
    .join('\n')}
</body>
</html>`;
}

for (const material of materials) {
  const htmlPath = resolve(htmlDir, `${material.slug}.html`);
  const pdfPath = resolve(outputDir, `${material.slug}.pdf`);
  writeFileSync(htmlPath, render(material), 'utf8');
  execFileSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--print-to-pdf-no-header',
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href,
  ]);
  const sizeKb = Math.max(1, Math.round(statSync(pdfPath).size / 1024));
  console.log(`${material.slug}.pdf - ${sizeKb} KB`);
}

