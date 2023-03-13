const colors = require("tailwindcss/colors")
const withDefaultColour = (colours) => ({ ...colours, DEFAULT: colours[500] })

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      borderRadius: {
        sm: "0.2rem",
        DEFAULT: "0.4rem",
        lg: "0.6rem",
        xl: "0.8rem",
        "2xl": "1.0rem",
        "3xl": "1.2rem",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
      colors: {
        green: withDefaultColour({
          100: "#e5ffef",
          200: "#b5f5ce",
          300: "#6de89c",
          400: "#35de76",
          500: "#00d150",
          600: "#12b04e",
          700: "#1d8f46",
          800: "#216e3d",
          900: "#1f4d30",
        }),
        gray: withDefaultColour({
          100: "#fafcfb",
          200: "#f2f7f5",
          300: "#e9f0ec",
          400: "#d5e0db",
          500: "#aebfb7",
          600: "#968984",
          700: "#596961",
          800: "#3a4741",
          900: "#2e3833",
        }),
        red: withDefaultColour(colors.red),
        yellow: withDefaultColour(colors.yellow),
        orange: withDefaultColour(colors.orange),
        blue: withDefaultColour(colors.blue),
        indigo: withDefaultColour(colors.indigo),
        purple: withDefaultColour(colors.purple),
        pink: withDefaultColour(colors.pink),
      },
      flex: {
        2: "2 2 0%",
      },
      inset: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        10: "2.5rem",
        20: "5rem",
        40: "10rem",
        "1/4": "25%",
        "1/2": "50%",
      },
      maxWidth: {
        "4xs": "8rem",
        "3xs": "12rem",
        "2xs": "16rem",
      },
      scale: {
        101: "1.01",
        102: "1.02",
        103: "1.03",
        104: "1.04",
      },
      transitionDuration: {
        2000: "2000ms",
      },
      width: {
        "w-4/7": "57%",
        50: "12.5rem",
        60: "15rem",
        70: "17.5rem",
        80: "20rem",
        90: "22.5rem",
        100: "25rem",
      },
      height: {
        50: "12.5rem",
        60: "15rem",
        70: "17.5rem",
        80: "20rem",
        90: "22.5rem",
        100: "25rem",
      },
      zIndex: {
        max: "2147483647",
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ["focus"],
      borderWidth: ["focus"],
      cursor: ["disabled"],
      display: ["group-hover"],
      margin: ["focus"],
      opacity: ["disabled"],
      scale: ["active", "group-hover"],
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
}
