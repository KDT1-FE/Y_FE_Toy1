import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;

    font-size:16px;
    line-height: 1.5;
    width: 100vw;
    height: 100vh;
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
