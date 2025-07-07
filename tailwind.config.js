/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
  extend: {
     maxWidth: {
        '5xl': '72rem', // for wide mega menu
      },
    fontFamily: {
      inter: ['Inter', 'system-ui', 'sans-serif'],
    }
  }
},
  plugins: [],
}

