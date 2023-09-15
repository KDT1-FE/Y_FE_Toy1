import React from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './common/Header';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Wiki from './pages/Wiki';
import Gallery from './pages/Gallery';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/wiki" element={<Wiki />}></Route>
                    <Route path="/gallery" element={<Gallery />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
