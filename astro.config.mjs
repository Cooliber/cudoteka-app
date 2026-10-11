// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Sitemap `lastmod` only where we have a real, verifiable date (Google trusts
// lastmod "if consistently and verifiably accurate"; priority/changefreq are
// ignored by Googlebot entirely). Posts use `updated` ?? `pubDate`; materials
// use their `updated`. Everything else ships without lastmod rather than with
// a guessed one.
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

const postLastmod = readLastmodMap('./src/content/posts/');
const downloadLastmod = readLastmodMap('./src/content/downloads/');

// https://astro.build/config
export default defineConfig({
  site: 'https://cudoteka.pl',
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
        return item;
      },
    }),
  ],
  // Image service is `sharp` by default in Astro 5+.
  // Per-component `formats={['avif', 'webp']}` opts into modern formats.
});
