import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 600;

  display: block;
  background-color: #96a0ff;
  border: none;
  width: 176px;
  height: 64px;
  border-radius: 50px;
  line-height: 2.6;
`;

export const P = styled.p`
  font-size: 24px;
  margin-bottom: 0;
`;

export const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  width: 500px;
`;

export const LoginTitle = styled.h1`
  font-size: 96px;
  color: #484aad;
  font-family: 'PlayfairDisplay';
  margin-top: 96px;
  margin-bottom: 96px;
`;

export const SignUpText = styled.span`
  position: absolute;
  font-size: 15px;
  text-align: center;
  bottom: 80px;
  left: 33px;
  color: gray;
`;

export const LoginInputBox = styled.div`
  margin-top: 30px;
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

export const LoginInput = styled.input<{ $isFalse: boolean }>`
  width: 500px;
  height: 40px;
  border: none;
  outline: none;
  border-bottom: 1px solid #96a0ff;
  ${(props) =>
    !props.$isFalse &&
    css`
      &::placeholder {
        transition: all 1s;
      }
    `};
  transition: ${(props) =>
    !props.$isFalse &&
    css`
      all 1s;
    `};
  ${(props) =>
    props.$isFalse &&
    css`
      animation: ${inputError} 0.13s 3 linear backwards;
      border-color: red;
      color: red;
      &::placeholder {
        color: red;
      }
    `};
`;

export const SignUpBtn = styled.button`
  position: relative;

  background-color: #96a0ff;
  border: none;
  width: 176px;
  height: 64px;
  border-radius: 50px;
  font-size: 24px;
`;

export const LoginBtn = styled.button`
  background-color: #484aad;
  border: none;
  width: 176px;
  height: 64px;
  border-radius: 50px;
  font-size: 24px;
  font-weight: 600;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;
