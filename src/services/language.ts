// Switch page language to Spanish
export const getSpain = () => {
  globalThis.location.href = "/";
};

// Switch page language to English
export const getEnglish = () => {
  globalThis.location.href = "/en";
};

globalThis.getSpain = getSpain;
globalThis.getEnglish = getEnglish;
