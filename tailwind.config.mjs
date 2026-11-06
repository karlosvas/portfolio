/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        fg: token("fg"),
        muted: token("muted"),
        line: token("line"),
        accent: token("accent"),
        "accent-fg": token("accent-fg"),
      },
      scale: ["hover"],
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
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
    function ({ addBase }) {
      addBase({
        "*::selection": { backgroundColor: "rgb(var(--accent) / 0.3)" },
        "@font-face": [
          {
            fontFamily: "Inter",
            src: 'url("/fonts/InterVariable.woff2") format("woff2-variations")',
            fontWeight: "100 900",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
          {
            fontFamily: '"IBM Plex Mono"',
            src: 'url("/fonts/IBMPlexMono-400.woff2") format("woff2")',
            fontWeight: "400",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
          {
            fontFamily: '"IBM Plex Mono"',
            src: 'url("/fonts/IBMPlexMono-500.woff2") format("woff2")',
            fontWeight: "500",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
        ],
      });
    },
  ],
};
