import React from "react";
import WikiBar from "./components/WikiBar";
import WikiContent from "./components/WikiContent";
import {Container, RowContainer } from "../../styled/WikiPage/Container";
import GlobalStyle from "../../styled/WikiPage/GlobalStyle";

export default function Wiki() {
  return (
    <Container>
        <GlobalStyle />
        <RowContainer >
            <WikiBar />
            <WikiContent />
        </RowContainer>
    </Container>
  );
}
