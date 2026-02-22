/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Dark athletic base
        dark: {
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
          600: "#475569",
          500: "#64748B",
        },
        // Dynamic school colors (overridden at runtime)
        school: {
          primary: "var(--school-primary)",
          light: "var(--school-light)",
          dark: "var(--school-dark)",
        },
      },
      fontFamily: {
        heading: ["System"],
        body: ["System"],
      },
    },
  },
  plugins: [],
};
