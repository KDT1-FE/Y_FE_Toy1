import { DefaultTheme } from 'styled-components';

const colors = {
  // primary:
  // secondary:
  border: '#f2f2f2',
  white: '#ffffff',
  black: '#1D1B26',
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
