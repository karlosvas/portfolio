/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
  darkMode: "class",
  content: ["./src/**/*.astro", "./src/**/*.html"],
  theme: {
    extend: {
      colors: {
        whitePal: "#f1f5f9",
        blackPal: "#030712",
        purplePal: "#6366F1",
      },
      scale: ["hover"],
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        fraunces: ["Fraunces", "serif"],
      },
    },
    transitionProperty: {
      color: "color",
      bg: "background-color",
    },
  },
  plugins: [
    forms,
    typography,
    aspectRatio,
    function ({ addBase, config }) {
      addBase({
        "*::selection": { backgroundColor: config("theme.colors.purple.400") },
        "@font-face": [
          {
            fontFamily: "Inter",
            src: 'url("/fonts/InterVariable.woff2") format("woff2-variations")',
            fontWeight: "100 900",
            fontStyle: "normal",
          },
          {
            fontFamily: "Fraunces",
            src: 'url("/fonts/FrauncesVariable.ttf") format("truetype-variations")',
            fontWeight: "100 900",
            fontStyle: "normal",
          },
        ],
      });
    },
  ],
};
