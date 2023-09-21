import Header from "components/layout/Header";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "Router";
import AuthProvider from "provider/userProvider";
import DarkMode from "provider/darkModeProvider";

const App = () => {
  const [isStudying, setIsStudying] = useState(false);
  return (
    <DarkMode>
      <AuthProvider>
        <BrowserRouter>
          <Header isStudying={isStudying} onIsStudyingChange={setIsStudying} />
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </DarkMode>
  );
};

export default App;
