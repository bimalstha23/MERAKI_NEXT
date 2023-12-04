import { nextui } from "@nextui-org/react";
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        merakigray: 'rgba(255, 255, 255, 0.50)',
        merakiblack: '#121212',
        merakimain: '#FFBA98',
        merakired: '#FB2448',
        merakigreen: '#29CC97',
        merakiTextGray: '#5E5E5E',
        swevenvisuals: "#29CC97",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'meraki': '0px 0px 10px 0px rgba(0, 0, 0, 0.50);',
        'innershadow': '1px 3px 4px 0px rgba(0, 0, 0, 0.42) inset',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]

}
export default config