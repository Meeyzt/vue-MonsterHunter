module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        backgroundColor: '#111',
        containerColor: '#0c0c0c',
        hoverContainer: '#423d3d',
        purpleColor: '#5727B0',
        allyColor: '#9A75FD',
        enemyColor: '#280659',
        lilla: '#9A75FD',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
