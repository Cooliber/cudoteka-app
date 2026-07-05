// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cudoteka.pl',
  output: 'static',
  integrations: [sitemap()],
  // Image service is `sharp` by default in Astro 5+.
  // Per-component `formats={['avif', 'webp']}` opts into modern formats.
});
