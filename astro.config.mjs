import { defineConfig, envField } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel';
import solidJs from '@astrojs/solid-js';

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
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [tailwind(), solidJs()],
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url),
      }
    }
  },
  pages: {
    extensions: ['astro', 'md', 'ts', 'tsx', 'json']
  },
});