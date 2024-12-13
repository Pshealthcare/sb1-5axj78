/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f4f8',
          100: '#efe9f1',
          200: '#dfd3e3',
          300: '#c7b2ce',
          400: '#ab8bb4',
          500: '#8e6799',
          600: '#744e7f',
          700: '#5e3f66',
          800: '#3F1E43', // Main brand color
          900: '#2d1631',
        },
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      fontSize: {
        'xxs': '0.625rem',
      },
      maxHeight: {
        '128': '32rem',
      },
      minHeight: {
        'screen-75': '75vh',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}