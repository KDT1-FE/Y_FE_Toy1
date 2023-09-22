import React from "react";
import MainSwiper from "../components/Main/MainSwiper";
import "../styles/Main.css";
import MainTeam from "../components/Main/MainTeam";
import MainWidget from "../components/Main/MainWidget";

const Main = () => {
  return (
    <main>
      <MainSwiper />
      <MainTeam />
      <MainWidget />
    </main>
  );
};

export default Main;
