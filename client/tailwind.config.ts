import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Karanlık modu bir CSS sınıfı ile etkinleştir
  theme: {
    extend: {
      colors: {
        lightGray: '#F5F5F5',
        mediumGray: "#848889",
        darkGray: '#2A2B2C',
        lightOrange: "#ff8a00",
        darkOrange: "#FF5600",
        darkBlue: '#01030B',
        mediumBlue: '#14547d',
   
        darkModeLightGray: '#A3A8A9',
        darkModeMediumGray: '#727C83',
        darkModeBlue: '#194460',
        darkModeLightBlue: '#485A65',
        darkModeOrange: '#B87A30',
      },
      fontFamily: {
      
        poppins: ["var(--font-poppins)"],
        kanit: ["var(--font-kanit)"],
      },
    },
  },
  plugins: [],
};
export default config;
