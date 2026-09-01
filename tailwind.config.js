import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Bricolage Grotesque"', ...defaultTheme.fontFamily.sans],

                // Khai báo thêm 2 font kia để dùng cho các chỗ nhấn nhá (như Tiêu đề)
                montserrat: ['Montserrat', 'sans-serif'],
                raleway: ['Raleway', 'sans-serif'],
            },
        },
    },

    plugins: [forms],
};
