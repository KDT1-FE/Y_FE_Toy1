import styled from "styled-components";

export const Container = styled.button<{
  $padding: string;
  $margin?: string;
  $normal?: string;
}>`
  border: ${({ $normal }) =>
    $normal === "reverse"
      ? "0.0625rem solid var(--color-light-gray)"
      : "0.0625rem solid var(--color-main)"};

  border-radius: 0.25rem;
  background: var(--color-white);

  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};

  cursor: pointer;

  color: ${({ $normal }) =>
    $normal === "reverse" ? "#000" : "var(--color-main)"};
  font-size: 0.88rem;
  line-height: normal;
  text-align: center;

  &:hover {
    background-color: var(--color-main);
    color: var(--color-white);
  }
`;
