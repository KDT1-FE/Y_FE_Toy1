import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
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