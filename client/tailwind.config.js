/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        3: 'repeat(3, auto)',
      },
      fontSize: {
        'title': '28px',
        'secondary-title': '24px',
        'p': '14px',
      }
    },
  },
  plugins: [],
}
