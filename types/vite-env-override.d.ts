  // vite-env-override.d.ts
  
  declare module 'vite/client' {
    interface ImportMetaEnv {
      VITE_APP_TITLE: string;
      VITE_API_URL: string;
    }
  }
  
  // vite-env-override.d.ts
  declare module '*.svg' {
    const content: string;
    export default content;
  }
  