import Sidebar from "components/Sidebar";
import React from "react";
import styled from "styled-components";

const Gallery = () => {
  return (
    <>
      <Sidebar />
      <Container></Container>
    </>
  );
};

const Container = styled.section`
  position: relative;
  left: 180px;
  height: calc(100% - 60px);
  width: calc(100% - 180px);
  padding: 5px;
  box-sizing: border-box;
`;

export default Gallery;
