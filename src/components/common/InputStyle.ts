import styled from "styled-components";

export const Input = styled.input<{ width?: string }>`
  font-family: inherit;
  padding: 0.2rem;
  border: 1px solid var(--color-medium-gray);
  outline: none;
  border-radius: 0.2rem;
  width: ${({ width }) => width};

  &:focus {
    border: 1px solid var(--color-main);
  }
`;
