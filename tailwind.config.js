/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
			colors: {
				"customBLue": "#4277FB",
				"customLightBlue": "#62ADFC"
			},
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"],
        "ttcommon": ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}
