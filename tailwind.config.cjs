/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#1F2123',
        red: '#FF5145',
        green: '#38A852',
        blue: '#54A7ED',
        yellow: '#FFBB01',
        white: '#FEFEFE',
        teal: '#00DB9F'
      },
      fontFamily: {
        google: ['Prompt', 'sans-serif'],
        quantico: ['Quantico', 'sans-serif'],
        russo: ['Russo One', 'sans-serif'],
        emoji: ['Noto Color Emoji', 'Prompt', 'sans-serif']
      }
    }
  }
}
