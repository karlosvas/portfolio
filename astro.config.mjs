import { defineConfig } from 'astro/config';

export default defineConfig({
  renderers: ['@astrojs/renderer-react'],
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
  integrations: [],
  plugins: [],
  pages: {
    extensions: ['astro', 'md', 'ts', 'tsx', 'json']
  }
});
