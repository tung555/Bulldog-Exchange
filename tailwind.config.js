/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          coiny: ['"Coiny"', 'system-ui'],
          lilita: ['"Lilita One"', 'cursive'],
      },
    },
  },
    plugins: [],
  };
  