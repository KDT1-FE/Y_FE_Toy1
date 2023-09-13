import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
      format('woff');
  }
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Pretendard-Regular"
    }
  html, body {
      background-color: white;
      color: black;
  }
  button,
  img,
  a {
      color:black;
      text-decoration: none;
      cursor: pointer;
  }
`;

export default GlobalStyle;
