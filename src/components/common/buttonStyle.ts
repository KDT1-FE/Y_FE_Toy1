import styled from "styled-components";

export const Container = styled.button<{
  padding: string;
  margin?: string;
  normal?: string;
}>`
  border: ${({ normal }) =>
    normal === "reverse"
      ? "0.0625rem solid var(--color-light-gray)"
      : "0.0625rem solid var(--color-main)"};

  border-radius: 0.25rem;
  background: var(--color-white);

  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};

  cursor: pointer;

  color: ${({ normal }) =>
    normal === "reverse" ? "#000" : "var(--color-main)"};
  font-size: 0.875rem;
  line-height: normal;
  text-align: center;

  &:hover {
    background-color: var(--color-main);
    color: var(--color-white);
  }

  &:disabled {
    background: #f9f9f9;
    border: 1px solid var(--color-light-gray);
    color: var(--color-disabled);
    cursor: not-allowed;
  }
`;
