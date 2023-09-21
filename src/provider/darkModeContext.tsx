import React, { useContext, useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { ThemeContext } from "./darkModeProvider";

const DarkModeBtn: React.FC = () => {
  const [DarkMode, setDarkMode] = useState(() => false);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <DarkModeToggle
      onChange={() => {
        setDarkMode((prevMode) => !prevMode);
        toggleTheme();
      }}
      checked={DarkMode}
      size={70}
    />
  );
};

export default DarkModeBtn;
