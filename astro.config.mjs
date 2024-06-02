import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  renderers: ['@astrojs/renderer-react'],
  types: './types/types.d.ts',
  publicDir: 'public',
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
  integrations: [tailwind()],
  plugins: ['@astro/typescript'],
  pages: {
    extensions: ['astro', 'md', 'ts', 'tsx', 'json']
  },
  optimizeDeps: {
    include: ['firebase/app']
  }
});