import Header from "components/Header";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "Router";
import AuthProvider from "./authentication/authProvider";
import DarkMode from "./components/DarkMode";

const App = () => {
  return (
    <DarkMode>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </DarkMode>
  );
};

export default App;
