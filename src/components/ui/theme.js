const colors = {
  offWhite: '#efefef',
  offBlack: '#222',
  tomato: 'hsl(9, 100%, 70%)',
  blue: 'hsl(195, 100%, 50%)',
  green: 'hsl(150, 100%, 50%)',
  fuchsia: 'hsl(300, 100%, 65%)',
  lightGrey: '#cccccc',
  darkGrey: '#333333'
};

const theme = {
  colors: {
    ...colors,
    background: colors.offWhite,
    foreground: colors.offBlack
  },
  inputBorderRadius: `0.5rem`,
  borderRadius: '0.2rem'
};

export default theme;
