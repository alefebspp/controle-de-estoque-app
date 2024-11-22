const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        graphite: {
          400: '#516d96',
          500: '#2e3242',
          600: '#232632',
        },
        primary: {
          'super-light': colors.blue[200],
          light: colors.blue[500],
          dark: colors.blue[600],
        },
        secondary: {
          neon: '#44bf9f',
          light: colors.green[500],
          dark: colors.green[600],
        },
      },
    },
  },
  plugins: [],
};
