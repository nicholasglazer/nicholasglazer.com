//const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px',
    },
    opacity: {
      '0': '0',
      '15': '0.15',
      '30': '0.30',
      '60': '0.6',
      '90': '0.9',
      '100': '1',
    },
    fontSize: {
      xs: ['12px', '24px'],
      sm: ['14px', '24px'],
      base: ['15px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    },
    extend: {
      colors: {
        blackD      : "#212222",
        black       : "#222323",
        blackL      : "#262727",
        grayD       : "#323335",
        gray        : "#3e3d31",
        grayL       : "#64645e",
        red         : "#e03a3a",
        maroon      : "#f92672",
        green       : "#3ae03a",
        greenL      : "#a6e22e",
        blue        : "#63b8ff",
        blueD       : "#1e90ff",
        orange      : "#fd971f",
        yellow      : "#e6db74",
        magenta     : "#fd5ff0",
        violet      : "#ae81ff",
        cyan        : "#a1efe4",
        cyanD       : "#3ae0e0",
        white       : "#f9f9f2",
        textColor   : "#fffacd",
        textColorA  : "#ffdead",
      },
      spacing: {
        px: '1px',
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen'],
        serif: ['Playfair Display', 'serif', 'Solway', 'Cambria'],
        mono: ['monospace', 'Anonymus Pro', 'Cutive Mono', 'Menlo'],
        display: ['Gilroy', 'Oswald','sans-serif'],
        main: ['Source Serif Pro'],
        body: ['Graphik', 'Roboto', 'sans-serif'],
      },
    },
  },
  variants: {},
}

// fontFamily: {
//   sans: ['Inter var', ...defaultTheme.fontFamily.sans],
// },
