import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const DialogBox = styled.dialog`
  width: 51.88rem;
  height: 31.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 0.94rem;
  box-sizing: border-box;
  background-color: var(--color-white);
  z-index: 10000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ModalTitle = styled.div `
  font-size: 1.13rem;
  font-weight: bold;
  margin: 2rem 0  0 0;
  letter-spacing: -0.1rem;
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const JoinBox = styled.div `
display:flex;
flex-direction: column;
align-items: center;
gap: 1.81rem;
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
