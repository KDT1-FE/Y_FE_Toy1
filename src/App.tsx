import React from "react";
import {Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./styles/Reset.css";
import Carousel from "./components/Home/Carousel";

function App() {
  return (
    <div className="App">
      <Header />
      <Carousel />
      <Routes>
        <Route path="/Home" />
        <Route path="/wiki" />
        <Route path="/gallery" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
