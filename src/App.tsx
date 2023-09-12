import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout, Home, About } from "./pages/TestPage/Test"
import Wiki from './pages/WikiPage/Wiki';
import WikiItem from './pages/WikiPage/WikiItem';


function App() {
  return (
    <div className="App">
      안녕하세요 wikinity 입니다!
      <div>
        <Routes>
          {/* Route는 아래처럼 중첩 라우팅이 가능합니다! */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="wiki" element={<Wiki />} />
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<WikiItem />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
