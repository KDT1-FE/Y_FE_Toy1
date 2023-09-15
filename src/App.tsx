import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import GlobalStyle from "./styles/globalStyle";
import Wiki from "./pages/Wiki";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
