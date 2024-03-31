/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
   darkMode: 'class',
   content: ['./views/*.html'],
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
   purge: ['./src/**/*.{astro,js}'],
=======
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
>>>>>>> 3acaa41fef8f521d244c2844e7c3b91bd8df8be1
}

