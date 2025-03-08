import { defineConfig, envField } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public"
      }),
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret"
      }),
    }
  },
  publicDir: 'public',
  output: 'server',
  adapter: vercel(),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [tailwind()],
  pages: {
    extensions: ['astro', 'md', 'ts', 'tsx', 'json']
  },
  optimizeDeps: {
    include: ['firebase/app']
  },
});