/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      backgroundImage: {
        app: 'url(/lines-bg.png)'
      },
      colors: {
        black: {
          800: '#121214'
        },
        yellow: {
          500: '#F7DD43'
        },
        ignite: {
          500: '#129E57'
        },
        gray: {
          600: '#323238',
          800: '#202024'
        }
      }
    },
  },
  plugins: [],
}
