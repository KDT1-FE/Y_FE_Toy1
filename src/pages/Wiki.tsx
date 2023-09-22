import React from "react";

// styles
import styled from "styled-components";

// components
import WikiNav from "../components/Wiki/WikiNav";
import WikiPage from "../components/Wiki/WikiPage";

const Wiki = () => {
  return (
    <StyledContainer>
      <WikiNav />
      <WikiPage />
    </StyledContainer>
  );
};

export default Wiki;

const StyledContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
