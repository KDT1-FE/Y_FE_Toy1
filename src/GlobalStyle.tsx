import { createGlobalStyle } from 'styled-components';
import GmarketSansTTFBold from './fonts/GmarketSansTTFBold.ttf';
import GmarketSansTTFMedium from './fonts/GmarketSansTTFMedium.ttf';
import GmarketSansTTFLight from './fonts/GmarketSansTTFLight.ttf';
import YanoljaTTF from './fonts/YanoljaTTF.ttf';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  @font-face {
        font-family: 'GmarketSansTTFBold';
        src: local('GmarketSansTTFBold'), local('GmarketSansTTFBold');
        font-style: normal;
        src: url(${GmarketSansTTFBold}) format('truetype');
  }
  @font-face {
        font-family: 'GmarketSansTTFMedium';
        src: local('GmarketSansTTFMedium'), local('GmarketSansTTFMedium');
        font-style: normal;
        src: url(${GmarketSansTTFMedium}) format('truetype');
  }
  @font-face {
        font-family: 'GmarketSansTTFLight';
        src: local('GmarketSansTTFLight'), local('GmarketSansTTFLight');
        font-style: normal;
        src: url(${GmarketSansTTFLight}) format('truetype');
  }
  @font-face {
        font-family: 'YanoljaTTF';
        src: local('YanoljaTTF'), local('YanoljaTTF');
        font-style: normal;
        src: url(${YanoljaTTF}) format('truetype');
  }
  @import url('https://fonts.googleapis.com/css2?family=Fuggles&family=Gowun+Dodum&display=swap');
  
  :root{
    --navigation-background : #350d36;
    --cell-background: #3F0E40;
    --active-item: #1164A3;
    --active-item-text: #FFFFFF;
    --point-item: #4D2A51;
    --text: #FFF;
    --active-current-status: #2BAC76;
    --mention-badge: #ECE7EC;
    --navigation-background: #350D36;
    --navigation-text: #FFF;
  }

  body {
    margin: 0;
    font-family: GmarketSansTTFMedium,-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;

    background-color: ${(props) => props.theme.recruitmentBack};
    font-size:16px;
    line-height: 1.5;
    width: 100vw;
  }

  a{
    text-decoration:none;
  }

  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
`;

export default GlobalStyle;
