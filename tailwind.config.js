/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1.0625rem", // 17px
      lg: ["1.187rem", "1.21"], // 19px
      xl: "1.3125rem", // 21px
      "2xl": "1.5rem", //24px
      "3xl": "1.75rem", // 28px
      "4xl": ["2.5rem", "1.1"], // 40px
      "5xl": ["4.5rem", "1.05"] // 72px
    },
    keyframes: {
      "carousel-move": {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      }
    },
    animation: {
      "carousel-move": "carousel-move var(--duration,90s) infinite",
    },
    fontFamily: {
      sans: [
        "SF Pro Display",
        "Helvetica",
        "Arial",
        "sans-serif"
      ],
    },
    extend: {
      backgroundImage: {
        'radial-gradient': 'radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
      },
      colors: {
        white: "#fff",
        backgroundDark: "#000",
        backgroundContrast: "#111",
        textBlack: "#1d1d1f",
        loginBlue: "#207be5",
        loginBlueDark: "#0541C1",
        grey2: "#171717",
        grey1: "#282828",
        grey: "#f2f2f2",
        red1: "#ff0000",
      },
    },
  },
  darkMode: "class",
  plugins: [],
}