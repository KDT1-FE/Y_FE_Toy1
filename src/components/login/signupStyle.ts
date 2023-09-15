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

  animation: modaldown 0.5s linear;

@keyframes modaldown {
  from {
    transform: translate(-50%, -60%);
  }
  to {
    transform: translate(-50%, -50%);
  }
}

.close {
  position: absolute;
  right: 15px;
  top: 5px;
  cursor: pointer;
  font-size: 25px;
}

`;

export const ModalTitle = styled.div`
  font-size: 1.13rem;
  font-weight: 500;
  margin: 2rem 0 0 0;
  letter-spacing: -0.1rem;
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const JoinBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.81rem;
`;


export const Content = styled.form`
 display: flex;
 justify-content: center;
 padding: 1.1rem 3.38rem 3.19rem 3.13rem;
 gap: 7.06rem;

`;


export const Info = styled.form`
 white-space: pre-line;
 font-size: 0.88rem;
 border-radius: 0.94rem;
 background: #FCFCFC;
 border: 0.06rem solid  var(--color-light-gray);
 padding: 0.88rem 2.06rem 1rem 1rem ;
`;

export const InfoTitle = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const InputWrap = styled.div`
  color: var(--color-gray);
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

export const ButtonWrap = styled.div``;


export const HighlightButton = styled.button`
  margin-top: 1.81rem;
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
  color: var(--color-dark-gray);
  margin-top: 0.31rem;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 5px rgba(30, 30, 30, 0.1);
  }
`;
