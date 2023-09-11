import React  from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route , BrowserRouter, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Wiki from './Pages/Wiki';
import Gallery from './Pages/Gallery';

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/wiki" element={<Wiki/>}></Route>
          <Route path="/gallery" element={<Gallery/>}></Route>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
