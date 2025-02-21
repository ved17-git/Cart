/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/react");
// const {heroui} = require("@heroui/theme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    './node_modules/@heroui/theme/dist/components/(button|snippet|code|input).js'
  ],
  darkMode: ["class", "class"],


  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
      
  	},
    screens: {
      xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "1025px" },
			// => @media (max-width: 1023px) { ... }

			md: { max: "767px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
    },

  },
  
  plugins: [heroui(), require("tailwindcss-animate")],
}