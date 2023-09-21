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
import {
  sortRanking,
  getDayAndReset,
  getRankingDocsToArr,
  saveRankingInBrowser,
} from "./utils/timerAndRanking";

function App() {
  const categories = [
    "커리큘럼",
    "교육생 소개",
    "완료된 프로젝트",
    "진행 중인 프로젝트",
    "휴가 정책",
    "복리후생",
  ];

  useEffect(() => {
    if (!sessionStorage.getItem("teamList")) {
      SaveTeam().then(() => SaveContents(categories));
    }

    getRankingDocsToArr().then(doc => {
      const sortedData = sortRanking(doc);
      saveRankingInBrowser(sortedData);
    });
    getDayAndReset();

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
