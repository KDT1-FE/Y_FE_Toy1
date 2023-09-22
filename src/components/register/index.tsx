import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { emailState, uidState } from '../../recoil/authRecoil';
import { loginFunciton, registerFunction } from '../../hooks/getAuth';
import registerImg from '../../assets/free-icon-lunch.png';
import logoImg from '../../assets/yelloBg.avif';

type Inputs = {
  email: string;
  password: string;
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 90vh;
  margin-top: 4.6rem;

  background-image: url(${logoImg});
  background-size: cover;
  background-repeat: no-repeat;

  gap: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 5rem 0;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 3px solid var(--color-beige);

  background-color: #ffd850;
  max-width: 20rem;
  width: 60%;
  height: 100%;
  z-index: 2;
`;

const FormImg = styled.div`
  width: 6rem;
  border-radius: 50%;
  border: 4px solid #f09136;
  padding: 1.5rem;
  background-color: #fff5d2;
  img {
    width: 100%;
  }
`;

const SubmitInput = styled.button`
  font-family: 'IBMPlexSansKR-Regular';
  padding: 0.5rem 1.5rem;
  margin-top: 2rem;

  border: none;
  border-radius: 1rem;

  font-size: 1.3rem;
  background-color: var(--color-beige);
  transition: 0.1s;
  box-shadow: 0 3px 0 0 #ffae44;

  &:active {
    color: #000;
    box-shadow: 0 0 0 0 #ffae44;
    transform: translateY(3px);
  }
`;

const StyledInput = styled.input`
  font-family: 'BMDOHYEON';
  margin-top: 2rem;
  width: 100%;
  height: 3rem;
  padding: 0 2rem;

  box-sizing: border-box;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.2s;

  &:focus {
    border: 3px solid #f09136;
    outline: none;
  }
`;

const LastStyledInput = styled.input`
  margin-top: 2rem;
  width: 100%;
  height: 3rem;
  padding: 0 2rem;

  box-sizing: border-box;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.2s;

  &:focus {
    border: 3px solid #f09136;
    outline: none;
  }

  &::placeholder {
    font-family: 'BMDOHYEON';
  }
`;

const Register = () => {
  const setEmail = useSetRecoilState(emailState);
  const setUid = useSetRecoilState(uidState);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault();
    const { email, password } = data;
    await registerFunction(email, password, setEmail, setUid, navigate);
  };

  return (
    <InputWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormImg>
          <img
            src={registerImg}
            alt="점심 아이콘  제작자: Eucalyp - Flaticon"
          />
        </FormImg>
        <StyledInput
          {...register('email', { required: '이메일을 입력하세요 !' })}
          placeholder="Write your email"
          type="email"
        />
        <p>{errors.email?.message}</p>
        <LastStyledInput
          {...register('password', {
            required: '패스워드를 입력하세요 !',
            minLength: {
              value: 8,
              message: '패스워드는 8자리 이상이어야 합니다 !',
            },
          })}
          placeholder="Write your password"
          type="password"
        />
        <p>{errors.password?.message}</p>
        <SubmitInput type="submit">회원 가입</SubmitInput>
      </Form>
    </InputWrapper>
  );
};

export default Register;
