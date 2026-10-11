// Generates src/data/lastmod.json — the truthful `lastmod` map for pages that
// have no content collection behind them (plus content pages without dates).
// Dates come from git history (last commit touching the source file) and from
// working-tree modifications (uncommitted change today counts as today).
// Run `npm run lastmod` after editing pages, then commit the JSON.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
const today = new Date().toLocaleDateString('sv');

function git(args) {
  return execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8' }).trim();
}

function lastChanged(rel) {
  const dirty = git(['status', '--porcelain', '--', rel]);
  if (dirty) return today;
  const date = git(['log', '-1', '--format=%cs', '--', rel]);
  return date || null;
}

function frontmatterDate(rel, key) {
  const raw = readFileSync(join(repo, rel), 'utf8');
  return raw.match(new RegExp(`^${key}:\\s*['"]?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1] ?? null;
}

const map = {};

for (const entry of readdirSync(join(repo, 'src/pages'), { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.astro') || entry.name === '404.astro') continue;
  const url = entry.name === 'index.astro' ? '/' : `/${entry.name.replace(/\.astro$/, '')}/`;
  const date = lastChanged(`src/pages/${entry.name}`);
  if (date) map[url] = date;
}

const collections = [
  { dir: 'posts', url: (slug) => `/blog/${slug}/`, date: (rel) => frontmatterDate(rel, 'updated') ?? frontmatterDate(rel, 'pubDate') ?? lastChanged(rel) },
  { dir: 'downloads', url: (slug) => `/materialy/${slug}/`, date: (rel) => frontmatterDate(rel, 'updated') ?? lastChanged(rel) },
  { dir: 'workshops', url: (slug) => `/warsztaty/${slug}/`, date: (rel) => lastChanged(rel) },
  { dir: 'categories', url: (slug) => `/oferta/${slug}/`, date: (rel) => lastChanged(rel) },
];

for (const collection of collections) {
  for (const file of readdirSync(join(repo, `src/content/${collection.dir}`))) {
    if (!file.endsWith('.md')) continue;
    const rel = `src/content/${collection.dir}/${file}`;
    const slug = readFileSync(join(repo, rel), 'utf8').match(/^slug:\s*['"]?([^'"\n\r]+)/m)?.[1]?.trim();
    if (!slug) continue;
    const date = collection.date(rel);
    if (date) map[collection.url(slug)] = date;
  }
}

const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
mkdirSync(join(repo, 'src/data'), { recursive: true });
writeFileSync(join(repo, 'src/data/lastmod.json'), `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`lastmod.json: ${Object.keys(sorted).length} entries written`);
