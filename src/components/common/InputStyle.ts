import styled from "styled-components";

export const Input = styled.input`
  font-family: inherit;
  padding: 0.2rem;
  border: 1px solid var(--color-medium-gray);
  outline: none;
  border-radius: .2rem;

  &:focus {
    border: 1px solid var(--color-main);
  }
`;
