/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            colors: {
                bgprimary: '#07050a',
                bgsecondary: '#120c18',
                bgtertiary: '#21162c',
                bgquaternary: '#24172f',
                textprimary: '#ffffff',
                textsecondary: '#40324e',
                texttertiary: '#2b2038',
                pinkprimary: '#e42575',
            },
            fontSize: {
                xxs: ['0.6rem', '0.8rem'],
            },
        },
    },
    plugins: [],
};
