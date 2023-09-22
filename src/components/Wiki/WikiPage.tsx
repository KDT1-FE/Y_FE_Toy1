import React from "react";

// Style
import styled from "styled-components";

// components
import WikiSubPage from "./WikiSubPage";
import WikiDefaultPage from "./WikiDefaultPage";

// Recoil
import { useRecoilValue } from "recoil";
import { currentFileTitle } from "../../store/wiki";

const Page = () => {
  const currentFile = useRecoilValue(currentFileTitle);
  return (
    <Container>
      {currentFile !== "" ? <WikiSubPage /> : <WikiDefaultPage />}
    </Container>
  );
};

export default Page;

const Container = styled.div`
  width: 100%;
`;
