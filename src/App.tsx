import React from "react";
import {Routes, Route} from "react-router-dom";
import "./styles/App.css";
import "./styles/reset.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" />
        <Route path="/wiki" />
        <Route path="/gallery" />
      </Routes>
    </div>
  );
}

export default App;
