import React from "react";
import {Routes, Route} from "react-router-dom";
import "./styles/App.css";
import "./styles/reset.css";
import Wiki from "./pages/Wiki";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" />
        <Route path="/wiki" element={<Wiki />}>
          <Route path=":id" element={<Wiki />} />
        </Route>
        <Route path="/gallery" />
      </Routes>
    </div>
  );
}

export default App;
