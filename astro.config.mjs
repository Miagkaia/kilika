import { defineConfig } from 'astro/config';

// Bilingual: French is the default (no /fr prefix), English lives under /en
export default defineConfig({
  site: 'https://kilika.netlify.app',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  image: {
    // allow large source images from the catalogs
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
