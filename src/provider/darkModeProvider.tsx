import React, { useState, createContext, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";

const lightTheme = {
  body: "#fff",
  text: "#1f2023",
  carouselDots: "#373a3c",
  Userinfo: "#ffffff",
};

const darkTheme = {
  body: "#1f2023",
  text: "#fff",
  carouselDots: "#dddddd",
  Userinfo: "#373a3c",
};

export const ThemeContext = createContext<() => void>(() => {});
interface PropsType {
  children: ReactNode;
}
const DarkMode = ({ children }: PropsType) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={toggleTheme}>
      <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

const GlobalStyle = createGlobalStyle`

  nav {
    background-color: ${(props) => props.theme.body} !important
  }

  .wiki__title, .header__link-wrapper a, .sidebar__menu, .sidebar__menu a, .sidebar__item a { color: ${(props) =>
    props.theme.text} !important} 

  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: all 0.25s linear; // 다크/라이트 모드 전환 빠르기
  }

  .Gallery__title { color: ${(props) => props.theme.text}; }

  .slick-dots li button:before {
    color: ${(props) => props.theme.text};    
  }

  .slick-dots li.slick-active button:before {
    color: ${(props) => props.theme.carouselDots}; 
  }
`;

export default DarkMode;
