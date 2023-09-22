import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { emailState, uidState } from '../../recoil/authRecoil';

const ChooseEmailButtons = styled.a`
  display: block;
  font-size: 1rem;
  color: var(--color-black);
  background-color: var(--color-beige);
  border: none;
  border-radius: 0.5rem;
  padding: 0.8rem 1.3rem;

  cursor: pointer;
  transition: 0.1s;
  box-shadow: 0 3px 0 0 #ffae44;

  &:active {
    color: #000;
    box-shadow: 0 0 0 0 #ffae44;
    transform: translateY(3px);
  }
  }
`;

const getParsedData = (data: string) => {
  return JSON.parse(data);
};

type ChooseEmailButtonProps = {
  data: string;
};

const ChooseEmailButton = ({ data }: ChooseEmailButtonProps) => {
  const { enrollEmail, value } = getParsedData(data);
  const setEnrollEmail = useSetRecoilState(emailState);
  const setValue = useSetRecoilState(uidState);
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setEnrollEmail(enrollEmail);
    setValue(value);
    navigate('/');
  };

  return (
    <ChooseEmailButtons onClick={handleLogin}>
      {enrollEmail}로 접속하기!!
    </ChooseEmailButtons>
  );
};

export default ChooseEmailButton;
