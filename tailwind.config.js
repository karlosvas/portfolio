/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./*.html'],
  theme: {
    extend: {
      scale: ['hover'],
    },
    transitionProperty: {
      'color': 'color',
      'bg': 'background-color'
    }
  },
  plugins: [],
}

