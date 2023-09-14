import styled from "styled-components";

export const WikiButton = styled.button<{ padding: string; margin?: string }>`
  border: 0.0625rem solid var(--color-medium-gray);
  border-radius: 0.25rem;
  background: var(--color-white);

  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};

  cursor: pointer;

  color: var(--color-dark-gray);
  font-size: 0.88rem;
  line-height: normal;
  text-align: center;

  &:hover {
    background-color: var(--color-medium-gray);
    color: var(--color-white);
  }
`;
