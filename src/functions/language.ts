export const getSpain = () => {
   window.location.href = '/';
};
export const getEnglish = () => {
   window.location.href = '/en';
};

declare global {
   interface Window {
      getSpain: (event: Event) => void;
      getEnglish: (event: Event) => void;
   }
}

window.getSpain = getSpain;
window.getEnglish = getEnglish;