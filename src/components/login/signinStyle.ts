import styled from "styled-components";

export const LoginBox = styled.div`
    margin: 5rem 3.38rem 5rem 3.38rem;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
`;


export const Title = styled.h3`
    font-size: 1.13rem;
    line-height: normal;
    letter-spacing: -0.1rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    
`;

export const InputWrap = styled.div`
    color: var( --color-gray);
    font-weight: medium;
    font-size: 0.88rem;
    line-height: normal;
    margin-bottom: 0.69rem;
    display: flex;
    flex-direction: column;
    gap: 0.69rem;
`;

export const Input = styled.input`
    border-radius: 0.25rem;
    background: var(--color-white);
    border: 0.06rem solid var(--color-light-gray);
    width: 15.88rem;
    height: 2.5rem;
    gap: 1.81rem;
`;

export const ButtonWrap = styled.div`
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
