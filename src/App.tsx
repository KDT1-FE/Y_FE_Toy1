import React from "react";
import "./styles/App.css";
import Router from "./router/Router";
import AuthStateChanged from "./components/Signin/AuthStateChanged";

function App() {
  return (
    <>
      <AuthStateChanged />
      <Router />
    </>
  );
}

export default App;
