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
  left: 140px;
  height: calc(100% - 60px);
  width: calc(100% - 140px);
`;

export default Gallery;
