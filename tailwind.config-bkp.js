module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Alata', 'sans-serif']
    },
    colors: {
      oswapGreen: {
        light: '#1bf2ba',
        DEFAULT: '#18d5bb',
        dark: '#13b4ba',
      },
      oswapBlue: {
        light: '#109dbb',
        DEFAULT: '#0462b3',
        dark: '#077db5',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
