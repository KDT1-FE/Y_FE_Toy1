import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SignUpLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 100px;
  margin-top: 64px;
`;

export const SignUpTitle = styled.h1`
  font-size: 48px;
  color: #484aad;
  font-family: 'PlayfairDisplay';
  font-weight: 600;
`;

export const SignUpBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 90px;
`;

export const SignUpTitleETC = styled.span`
  font-size: 40px;
  color: black;
  font-weight: 400;
`;

export const SignUpBox = styled.div`
  width: 480px;
  height: 64px;
  background-color: #dfe3ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GitHubSignUpBoxSpan = styled.span`
  font-size: 20px;
`;

export const DivideBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const DivideLine = styled.div`
  height: 1px;
  width: 300px;
  border-bottom: 1px solid black;
`;

export const DivideSpan = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

export const ToCreateLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 20px;
`;

export const ToLoginLink = styled(Link)`
  text-decoration: none;
  color: blue;
  margin-left: 30px;
`;
