/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./resources/**/*.jsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter"],
            },
            backgroundImage: {
                blueMain: 'url("/resources/images/6897143.jpg")',
            },
        },
    },
    plugins: [],
};
