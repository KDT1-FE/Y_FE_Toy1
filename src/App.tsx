import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import SaveContents from "./components/Wiki/SaveContents";
import SaveTeam from "./components/Wiki/SaveTeam";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wiki from "./pages/Wiki";
import Gallery from "./pages/Gallery";
import Ranking from "./pages/Ranking";
import "./styles/reset.css";

function App() {
  useEffect(() => {
    SaveContents();
    SaveTeam();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wiki" element={<Wiki />}>
          <Route path=":id" element={<Wiki />} />
        </Route>
        <Route path="/gallery" element={<Gallery />}>
          <Route path=":id" element={<Gallery />} />
        </Route>
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
