import Header from "components/layout/Header";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "Router";
import AuthProvider from "provider/userProvider";
import DarkMode from "provider/darkModeProvider";

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
