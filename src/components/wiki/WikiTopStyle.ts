import styled from "styled-components";
//import Button from "../common/Button";

export const WikiTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin-bottom: 1.25rem;
`;

export const WikiTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-dark-gray);
`;

export const Container = styled.button<{ padding: string; margin?: string }>`
  border: 0.0625rem solid var(--color-main);
  border-radius: 0.25rem;
  background: var(--color-white);

  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};

  cursor: pointer;

  color: var(--color-main);
  font-size: 0.88rem;
  line-height: normal;
  text-align: center;

  &:hover {
    background-color: var(--color-main);
    color: var(--color-white);
  }
`;

export const WikiButton = styled(Container)`
  color: white;
`;
