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
                slugGreenDark: 'rgba(146, 230, 67, 0.5)',
            }
        },
    },
    plugins: [],
};
