/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // bgprimary: 'var(--bgprimary)'
      },
      screens: {
        laptop: "1100px",
        lg: "999px",
      },
    },
  },
  plugins: [],
};
