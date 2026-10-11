// Pings IndexNow (Bing/Yandex/Seznam/Naver) with every URL from the live
// sitemap. Run after bigger content changes: `npm run indexnow`.
// `npm run indexnow -- --dry` lists the URLs without submitting.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const SITE = 'https://cudoteka.pl';
const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');

// The IndexNow key lives as a public/<key>.txt file whose name equals its content.
function findKey() {
  for (const file of readdirSync(join(root, 'public'))) {
    if (!/^[A-Za-z0-9-]{8,128}\.txt$/.test(file)) continue;
    const name = file.replace(/\.txt$/, '');
    if (readFileSync(join(root, 'public', file), 'utf8').trim() === name) return file;
  }
  return null;
}

const keyFile = findKey();
if (!keyFile) {
  console.error('No IndexNow key found: expected a public/<key>.txt file whose content equals its name.');
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/, '');
const keyLocation = `${SITE}/${keyFile}`;

const liveKey = await fetch(keyLocation);
if (!liveKey.ok || (await liveKey.text()).trim() !== key) {
  console.error(`Key not live at ${keyLocation} (status ${liveKey.status}) — deploy first.`);
  process.exit(1);
}
console.log(`key: ${key} (verified live)`);

const index = await (await fetch(`${SITE}/sitemap-index.xml`)).text();
const shard = index.match(/<loc>([^<]+)<\/loc>/)?.[1];
if (!shard) {
  console.error('sitemap-index.xml has no shard URL.');
  process.exit(1);
}
const sitemap = await (await fetch(shard)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`sitemap: ${urlList.length} urls`);

if (process.argv.includes('--dry')) {
  console.log(urlList.join('\n'));
  process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) {
  console.error((await res.text()).slice(0, 500));
  process.exit(1);
}
