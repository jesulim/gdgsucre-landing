/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#1F2123',
        red: '#EA4335',
        green: '#34A853',
        blue: '#4285F4',
        yellow: '#FBBC04',
        'yellor-orange': '#F9AB00',
        'yellow-blend': '#FFCB32',
        purple: '#9F6CD4',
        orange: '#F46831',
        white: '#FFFFFF',
        gray: '#EEEEEE',
        black: '#202124',
        teal: '#00DB9F',
        light: {
          background: '#EEEEEE',
          text: '#333333',
        },
        dark: {
          background: '#202124',
          text: '#e2e8f0',
        },
      },
      fontFamily: {
        google: ['Prompt', 'sans-serif'],
        sofia: ['Sofia Sans Variable', 'sans-serif'],
        quantico: ['Quantico', 'sans-serif'],
        russo: ['Russo One', 'sans-serif'],
        emoji: ['Noto Color Emoji', 'Prompt', 'sans-serif']
      }
    }
  }
}
