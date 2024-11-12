/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        'sponsors-pattern': 'url("./backround-patron.svg")',
        'circuit-light':
          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ffffff"/><circle cx="10" cy="10" r="2" fill="%234283f4"/><circle cx="50" cy="50" r="2" fill="%23db4437"/><circle cx="90" cy="90" r="2" fill="%23f4b400"/><line x1="10" y1="10" x2="50" y2="50" stroke="%234283f4" stroke-width="1"/><line x1="50" y1="50" x2="90" y2="90" stroke="%23db4437" stroke-width="1"/></svg>\')',
        'circuit-dark':
          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23202124"/><circle cx="10" cy="10" r="2" fill="%234283f4"/><circle cx="50" cy="50" r="2" fill="%23db4437"/><circle cx="90" cy="90" r="2" fill="%23f4b400"/><line x1="10" y1="10" x2="50" y2="50" stroke="%234283f4" stroke-width="1"/><line x1="50" y1="50" x2="90" y2="90" stroke="%23db4437" stroke-width="1"/></svg>\')',
      },
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
