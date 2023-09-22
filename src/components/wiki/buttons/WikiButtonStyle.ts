import styled from "styled-components";

export const WikiButton = styled.button<{
  $padding: string;
  $margin?: string;
}>`
  border: 0.0625rem solid var(--color-medium-gray);
  border-radius: 0.25rem;

  color: var(--color-dark-gray);
  background: var(--color-white);

  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};

  cursor: pointer;
  font-size: 0.88rem;
  line-height: normal;
  text-align: center;

  &:hover {
    background-color: var(--color-main);
    color: var(--color-white);
  }

  &:disabled {
    background-color: var(--color-light-gray);
    border: 0.0625rem solid var(--color-medium-gray);
    color: rgba(34, 34, 34, 0.7);
  }
`;
