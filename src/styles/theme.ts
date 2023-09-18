import { DefaultTheme } from 'styled-components';

const colors = {
  primary: '#ffcb09',
  border: '#f2f2f2',
  shadow: '#021856',
  white: '#ffffff',
  black: '#1D1B26',

  card: {
    accent: '#FFCB09',
    border: '10px solid #3267B1',
    shadow: '5px 5px 0 0 #021856',
  },
};

const fontSize = {
  title: '20px',
  subTitle: '16px',
  text: '14px',
};

const size = {
  header: '56px',
  nav: '56px',
};

export type ColorType = typeof colors;
export type FontSizeType = typeof fontSize;
export type SizeType = typeof size;

const theme: DefaultTheme = {
  colors,
  fontSize,
  size,
};

export default theme;
