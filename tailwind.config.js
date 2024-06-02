/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
   content: ['./src/**/*.astro', './src/**/*.html'],
   theme: {
      extend: {
         colors: {
            'whitePal': '#f1f5f9',
            'blackPal': '#030712',
            'purplePal': '#6366F1',
         },
         scale: ['hover'],
      },
      transitionProperty: {
         'color': 'color',
         'bg': 'background-color'
      }
   },
   plugins: [
      function ({ addBase, config }) {
         addBase({
            '*::selection': { backgroundColor: config('theme.colors.purple.500') },
         })
      },
   ],
}