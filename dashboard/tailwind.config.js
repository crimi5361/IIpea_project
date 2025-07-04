/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx,jsx}"], // Suppression de l'espace en trop
  theme: {
    extend: {
      fontFamily: {
        tinos: ["Tinos", "serif"], // Correction de la syntaxe
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
