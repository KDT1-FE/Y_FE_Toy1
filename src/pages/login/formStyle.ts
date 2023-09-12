import styled from "styled-components";


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
    height: 2.5rem;
    gap: 1.81rem;
`;