import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 600;
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
  left: 40px;
  color: gray;
`;

export const LoginInputBox = styled.div`
  margin-top: 30px;
`;

export const LoginInput = styled.input`
  width: 500px;
  height: 40px;
  border: none;
  border-bottom: 1px solid #96a0ff;
`;

export const SignUpBtn = styled.button`
  position: relative;

  background-color: #96a0ff;
  border: none;
  width: 192px;
  height: 73px;
  border-radius: 50px;
  font-size: 24px;
`;

export const LoginBtn = styled.button`
  background-color: #484aad;
  border: none;
  width: 192px;
  height: 73px;
  border-radius: 50px;
  font-size: 24px;
  font-weight: 600;
  color: white;
`;
