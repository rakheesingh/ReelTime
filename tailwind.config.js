const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Include .ts and .tsx files
  theme: {
    extend: {
      colors: {
        "brand-darkBlue": "rgb(3,37,65)",
        "brand-lightGrey": "rgb(227,227,227)",
        "brand_lightBlue": "rgb(1,180,228)",
        "brand_black": "#000",
      },
    },
  },
  plugins: [],
};
