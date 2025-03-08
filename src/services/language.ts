// Cambiar el idioma de la página a español
export const getSpain = () => {
  window.location.href = "/";
};

// Cambiar el idioma de la página a inglés
export const getEnglish = () => {
  window.location.href = "/en";
};

// Declaramos los tipos de las las funciones globales
declare global {
  interface Window {
    getSpain: (event: Event) => void;
    getEnglish: (event: Event) => void;
  }
}

window.getSpain = getSpain;
window.getEnglish = getEnglish;
