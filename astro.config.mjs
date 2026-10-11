// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Sitemap `lastmod` only where we have a real, verifiable date (Google trusts
// lastmod "if consistently and verifiably accurate"; priority/changefreq are
// ignored by Googlebot entirely). Posts use `updated` ?? `pubDate`; materials
// use their `updated`. Everything else reads the committed map generated from
// git history by scripts/gen-lastmod.mjs — never file mtimes or build time.
function readLastmodMap(contentDir) {
  const dir = fileURLToPath(new URL(contentDir, import.meta.url));
  const map = new Map();
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const raw = readFileSync(`${dir}/${file}`, 'utf8');
    const slug = raw.match(/^slug:\s*['"]?([^'"\n\r]+)['"]?/m)?.[1]?.trim();
    const pubDate = raw.match(/^pubDate:\s*['"]?(\d{4}-\d{2}-\d{2})/m)?.[1];
    const updated = raw.match(/^updated:\s*['"]?(\d{4}-\d{2}-\d{2})/m)?.[1];
    if (slug && (updated || pubDate)) map.set(slug, updated ?? pubDate);
  }
  return map;
}

function readStaticLastmod() {
  try {
    const raw = readFileSync(new URL('./src/data/lastmod.json', import.meta.url), 'utf8');
    return new Map(Object.entries(JSON.parse(raw)));
  } catch {
    return new Map();
  }
}

const postLastmod = readLastmodMap('./src/content/posts/');
const downloadLastmod = readLastmodMap('./src/content/downloads/');
const staticLastmod = readStaticLastmod();

const SITE = 'https://cudoteka.pl';

// Crawlers and tools probe `/sitemap.xml` by convention; the integration only
// emits `sitemap-index.xml`, so mirror it into place after the build.
function sitemapXmlAlias() {
  return {
    name: 'sitemap-xml-alias',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const dist = fileURLToPath(dir);
        copyFileSync(`${dist}/sitemap-index.xml`, `${dist}/sitemap.xml`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [
    sitemap({
      serialize(item) {
        const match = item.url.match(/\/(blog|materialy)\/([^/]+)\/?$/);
        if (match) {
          const map = match[1] === 'blog' ? postLastmod : downloadLastmod;
          const lastmod = map.get(match[2]);
          if (lastmod) return { ...item, lastmod };
        }
        const path = item.url.slice(SITE.length);
        const fallback = staticLastmod.get(path);
        return fallback ? { ...item, lastmod: fallback } : item;
      },
    }),
    sitemapXmlAlias(),
  ],
  // Image service is `sharp` by default in Astro 5+.
  // Per-component `formats={['avif', 'webp']}` opts into modern formats.
});
