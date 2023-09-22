import styled, { css, keyframes } from 'styled-components';

export const CreateAccountLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CreateAccountTitle = styled.h2`
  color: #484aad;
  margin-top: 64px;
`;

export const CreateAccountInputTitle = styled.p`
  margin: 0;
  margin-top: 20px;
`;

const inputError = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(0px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
`;

export const CreateAccountInput = styled.input<{ $isFalse: boolean }>`
  border: none;
  border-bottom: 1px solid #96a0ff;
  width: 400px;
  height: 30px;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  transition: ${(props) =>
    !props.$isFalse &&
    css`
      all 1s;
    `};
  outline: none;
  ${(props) =>
    props.$isFalse &&
    css`
      border-color: red;
      animation: ${inputError} 0.13s 3 linear backwards;
    `}
`;

export const CreateAccountSelectBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
`;

export const CreateAccountSelect = styled.select`
  width: 100px;
  border-color: #96a0ff;
  text-align: center;
`;

export const CreateAccountApproveBox = styled.div`
  margin-top: 20px;
`;

export const CreateAccountApproveCheck = styled.input`
  margin-right: 25px;
`;

export const CreateAccountBtn = styled.button<{ $isFormCorrect: boolean }>`
  width: 400px;
  height: 40px;
  border: 2px solid #96a0ff;
  border-radius: 20px;
  background-color: white;
  margin-top: 20px;
  color: black;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }

  transition: all 0.5s;
  ${(props) =>
    props.$isFormCorrect &&
    css`
      background-color: #96a0ff;
      color: white;
    `}
`;
