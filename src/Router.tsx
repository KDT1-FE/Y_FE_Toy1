import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "pages/home/Home";
import Wiki from "pages/wiki/Wiki";
import Gallery from "./pages/gallery/Gallery";
import Rank from "pages/rank/Rank";
import Login from "pages/auth/Login";
import SignUp from "pages/auth/SignUp";
import styled from "styled-components";
import { IsMobile } from "utils/mediaQuery";

const Router = () => {
  let topmargin = 60
  if(IsMobile()){
    topmargin = 100
  }

  return (
    <>
      <Container topmargin={topmargin}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wiki/*" element={<Wiki />} />
          <Route path="/gallery/*" element={<Gallery />} />
          <Route path="/rank/*" element={<Rank />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Container>
    </>
  );
};

const Container = styled.main<IContainer>`
  margin: 0 auto;
  max-width: 1200px;
  position: relative;
  top: ${props=>props.topmargin}px;
`;

interface IContainer{
  topmargin : number
}

export default Router;
