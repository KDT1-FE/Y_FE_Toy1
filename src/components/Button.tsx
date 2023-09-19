import React, { HTMLProps } from "react";
import styled, { css } from "styled-components";

interface Props extends HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
}

const ButtonBase = css`
  border-radius: 5px;
  cursor: pointer;
  p {
    margin: 0 auto;
  }
`;

const StyledButton = styled.button`
  ${ButtonBase}
  color: #fff;
  border: 0.8px solid var(--main-color);
  width: 100px;
  height: 35px;
  background-color: var(--main-color);
`;

const StyledButtonWhite = styled.button`
  ${ButtonBase}
  color: var(--main-color);
  border: 0.8px solid var(--main-color);
  width: 100px;
  height: 35px;
  background-color: #fff;
`;

export const Button: React.FC<Props> = ({ children, onClick, ...rest }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export const ButtonWhite: React.FC<Props> = ({
  children,
  onClick,
  ...rest
}) => {
  return <StyledButtonWhite onClick={onClick}>{children}</StyledButtonWhite>;
};
