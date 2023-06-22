/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
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
        gray:'#121212',
      }
    },
  },
  plugins: [],
}
