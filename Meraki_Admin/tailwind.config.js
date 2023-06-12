/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#FFBA98',
      background: '#121212',
      PrimaryText: '#121212',
      SecondaryText: '#FFFFFF',
      greenText: '#29CC97',
      backgroundhighlight: 'rgba(255, 0, 0, 0.1)',
      textHighlight: '#FB2448',
      success: '#29CC97',
      error: '#FB2448',
    },
    extend: {},
  },
  plugins: [],
}