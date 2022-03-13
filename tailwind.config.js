module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
      card: "14px",
      circle: "50%"
    },
    extend: {
      animation: {
        slideDown: "slideDown 300ms ease-out forwards",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-3rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
