/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

export const darkMode = "class";
export const content = ["./src/**/*.astro", "./src/**/*.html"];
export const theme = {
  extend: {
    colors: {
      whitePal: "#f1f5f9",
      blackPal: "#030712",
      purplePal: "#6366F1",
    },
    scale: ["hover"],
  },
  transitionProperty: {
    color: "color",
    bg: "background-color",
  },
};
export const plugins = [
  forms,
  typography,
  aspectRatio,
  function ({ addBase, config }) {
    addBase({
      "*::selection": { backgroundColor: config("theme.colors.purple.500") },
    });
  },
];