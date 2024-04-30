import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
   renderers: ['@astrojs/renderer-react'],
   vite: {
      ssr: true
   },
   buildOptions: {
      renderMode: 'static'
   },
   i18n: {
      defaultLocale: 'es',
      locales: ['es', 'en'],
      routing: {
         prefixDefaultLocale: false
      }
   },
   integrations: []
});