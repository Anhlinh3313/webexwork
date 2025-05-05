/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#0071BC',
        orange: '#FBB03B',
      },
      fontFamily: {
        utmSwiss: ['var(--font-utm-swiss-condensed)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
