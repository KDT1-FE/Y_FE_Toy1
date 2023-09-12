import styled from "styled-components";

export const ButtonSet = styled.div`
`;

export const HighlightButton = styled.button`
    border-radius: 0.25rem;
    background: var(--color-white);
    border: 0.06rem solid var(--color-main);
    width: 15.88rem;
    height: 2.5rem;
    color: var(--color-main);

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px rgba(30, 30, 30, 0.1);
          }
`;

export const NormalButton = styled.button`
    border-radius: 0.25rem;
    background: var(--color-white);
    border: 0.06rem solid var(--color-medium-gray);
    width: 15.88rem;
    height: 2.5rem;
    color:  var(--color-dark-gray);
    margin-top: 0.31rem;

    &:hover {
    cursor: pointer;
    box-shadow: 0 0 5px rgba(30, 30, 30, 0.1);
      }

`;

