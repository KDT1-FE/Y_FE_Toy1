import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wiki from "./pages/Wiki";
import Gallery from "./pages/Gallery";
import Rank from "./pages/Rank";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import styled from "styled-components";

const Router = () => {
  return (
    <>
      <Container>
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

const Container = styled.main`
  margin: 0 auto;
  max-width: 1200px;
  position: relative;
  top: 60px;
`;

export default Router;
