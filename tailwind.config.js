import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@shadcn/ui/**/*.js",
  ],
  darkMode: ["class"],
  plugins: [tailwindcssAnimate],
  theme: {
    extend: {},
  },
};
