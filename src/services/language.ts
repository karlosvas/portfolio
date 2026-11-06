const goTo = (path: string): void => {
  globalThis.location.href = `${path}${globalThis.location.hash}`;
};

export const getSpain = (): void => goTo("/");
export const getEnglish = (): void => goTo("/en");

globalThis.getSpain = getSpain;
globalThis.getEnglish = getEnglish;
