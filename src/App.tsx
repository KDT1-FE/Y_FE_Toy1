import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Wiki from "./pages/Wiki";
import "./styles/Reset.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wiki" element={<Wiki />}>
          <Route path=":id" element={<Wiki />} />
        </Route>
        <Route path="/gallery" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
