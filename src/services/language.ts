// Cambia de idioma conservando la sección (hash) en la que estaba el usuario.
const goTo = (path: string) => {
  globalThis.location.href = `${path}${globalThis.location.hash}`;
};

export const getSpain = () => goTo("/");
export const getEnglish = () => goTo("/en");

globalThis.getSpain = getSpain;
globalThis.getEnglish = getEnglish;
