import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout, Home, About, Dashboard, NoMatch } from "./pages/TestPage/Test";
import ProjectInputPage from "./pages/ProjectPage/ProjectDetailUpdate";

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
            <Route path="dashboard" element={<Dashboard />} />
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/projectinput" element={<ProjectInputPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
