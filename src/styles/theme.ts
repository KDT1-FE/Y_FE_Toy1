import { DefaultTheme } from 'styled-components';

const colors = {
  primary: '#ffcb09',
  border: '#eee',
  shadow: '#021856',
  white: '#ffffff',
  black: '#1D1B26',

  card: {
    accent: '#FFCB09',
    border: '1px solid #f2f2f2',
    shadow: '0 0 15px 0 rgba(0, 0, 0, 0.1)',
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
  footer: '58px',
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
