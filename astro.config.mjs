// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Sitemap `lastmod` only where we have a real, verifiable date (Google trusts
// lastmod "if consistently and verifiably accurate"; priority/changefreq are
// ignored by Googlebot entirely). Blog posts read their frontmatter date;
// everything else ships without lastmod rather than with a guessed one.
const postsDir = fileURLToPath(new URL('./src/content/posts/', import.meta.url));
const postLastmod = new Map();
for (const file of readdirSync(postsDir)) {
  if (!file.endsWith('.md')) continue;
  const raw = readFileSync(`${postsDir}/${file}`, 'utf8');
  const slug = raw.match(/^slug:\s*['"]?([^'"\n\r]+)['"]?/m)?.[1]?.trim();
  const pubDate = raw.match(/^pubDate:\s*['"]?(\d{4}-\d{2}-\d{2})/m)?.[1];
  const updated = raw.match(/^updated:\s*['"]?(\d{4}-\d{2}-\d{2})/m)?.[1];
  if (slug && (updated || pubDate)) postLastmod.set(slug, updated ?? pubDate);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://cudoteka.pl',
  output: 'static',
  integrations: [
    sitemap({
      serialize(item) {
        const match = item.url.match(/\/blog\/([^/]+)\/?$/);
        const lastmod = match ? postLastmod.get(match[1]) : undefined;
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  // Image service is `sharp` by default in Astro 5+.
  // Per-component `formats={['avif', 'webp']}` opts into modern formats.
});
