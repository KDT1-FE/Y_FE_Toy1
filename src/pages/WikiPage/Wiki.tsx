import React from "react";
import WikiBar from "./components/WikiBar";
import WikiContent from "./components/WikiContent";
import {Container, RowContainer } from "../../styled/wiki/Container";
import GlobalStyle from "../../styled/wiki/GlobalStyle";

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
