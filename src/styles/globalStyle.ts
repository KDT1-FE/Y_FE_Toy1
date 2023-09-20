import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: "Noto Sans KR";
    line-height: 1.5;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  html {
    --color-main: #001650;
    --color-secondary: #253256;
    --color-white: #ffffff;
    --color-dark-gray: #222222;
    --color-gray: #4a4a4a;
    --color-disabled: #adadad;
    --color-medium-gray: #d3d3d3;
    --color-light-gray: #e6e6e6;
    --color-area: #f0f2f7;
  }

  * {
    padding: 0;
    margin: 0;
  }

  body {    
    background-color: #f0f2f7;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  div,
  li,
  section {
    box-sizing: border-box;
  }
  
  ul,
  li {
    list-style: none;
  }
  
  input {
    color: inherit;
    font-family: inherit;
  }  

  textarea {
    color: inherit;
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-medium-gray);
    border: 0;
    border-radius: 12px 12px 12px 12px;
  }

  .tui-editor-contents {
    font-family: "Noto Sans KR";
    line-height: 1.5;
    font-size: 16px;
  }

`;

export default GlobalStyle;
