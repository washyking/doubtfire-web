/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  important: true,
  theme: {
    extend: {
      keyframes: {
        ticker: {
          '0%': {transform: 'translateY(0%)'},
          '50%': {transform: 'translateY(-100%)'},
          '100%': {transform: 'translateY(0%)'},
        },
      },
      animation: {
        ticker: 'ticker 3s ease-in-out infinite',
      },
      colors: {
        'formatif-blue': '#3939ff',
        'formatif-blue-lighter': '#e7e7ff',
      },
    },
  },
  plugins: [],
};
