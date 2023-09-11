import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/fonts/font.css";
import GlobalStyle from "./styles/globalStyle";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
