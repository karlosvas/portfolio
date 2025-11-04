// Cambiar el idioma de la página a español
export const getSpain = () => {
  console.log("Redirecting to Spanish version");
  globalThis.location.href = "/";
};

// Cambiar el idioma de la página a inglés
export const getEnglish = () => {
  console.log("Redirecting to English version");
  globalThis.location.href = "/en";
};

// Declaramos los tipos de las las funciones globales
declare global {
  interface GlobalThis {
    getSpain: (event: Event) => void;
    getEnglish: (event: Event) => void;
  }
}

(globalThis as any).getSpain = getSpain;
(globalThis as any).getEnglish = getEnglish;
