// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['firebase/app']
  }
});
