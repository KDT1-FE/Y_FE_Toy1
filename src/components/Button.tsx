import React, { ReactElement } from "react";
import styled from "styled-components";

function Button(): ReactElement {
  return <StyledButton>Button</StyledButton>;
}

const StyledButton = styled.button``;

export default Button;
