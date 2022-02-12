const colors = require('tailwindcss/colors')

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        fontFamily: {
            sans: ['VT323', 'sans-serif'],
        },
        extend: {
            colors: {
                slugGreen: '#92E643',
            }
        },
    },
    plugins: [],
};
