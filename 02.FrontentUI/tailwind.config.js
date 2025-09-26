/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        "error-primary": "#FEF3F2",
        "error-subtle": "#FDA29B",
        "secondary-on-brand": "#D7D4F9",
        "button-tertiary-error-fg": "#B42318",
        "placeholder": "#717680",
      },

    },
  },
  plugins: [],
}

