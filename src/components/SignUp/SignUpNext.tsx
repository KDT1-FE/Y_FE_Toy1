import { IHandleChange, IHandleNothing, IUser } from 'pages/SignUp';
import React, { useState } from 'react';
import { createAuth } from 'data/user';
import { useNavigate } from 'react-router-dom';
import './SignUpNext.scss';

interface ISignUpNextProps {
  user: IUser;
  handleInputChange: IHandleChange;
  handleTogglePage: IHandleNothing;
}

export function SignUpNext({
  user,
  handleInputChange,
  handleTogglePage,
}: ISignUpNextProps) {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  //   데이터 추가!
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { password, repassword } = user;
    if (password !== repassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!isChecked) {
      setErrorMessage('개인정보 약관에 동의해주세요.');
      return;
    }
    await createNewUser();
  };

  // user auth 생성 후 정보 추가
  const createNewUser = async () => {
    try {
      await createAuth(user);
      alert(`${user.nickname}님 반갑습니다!`);
      navigate('/signin');
    } catch (error: any) {
      handleError(error);
    }
  };

  // error 핸들링
  const handleError = (error: any) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setErrorMessage('이미 존재하는 이메일입니다.');
        break;
      case 'auth/weak-password':
        setErrorMessage('비밀번호는 6자리 이상이어야 합니다.');
        break;
      default:
        setErrorMessage('알 수 없는 오류가 발생했어요.');
    }
  };

  return (
    <form className="info-form" onSubmit={handleSubmit}>
      <div className="form-name">
        <input
          className="form-control form-control-lg"
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
          placeholder="* 이름"
          required
        />
      </div>
      <div className="form-email">
        <input
          className="form-control form-control-lg"
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          placeholder="* 이메일"
          required
        />
      </div>
      <div className="form-password">
        <input
          className="form-control form-control-lg"
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          placeholder="* 비밀번호"
          required
        />
        <input
          className="form-control form-control-lg"
          type="password"
          name="repassword"
          value={user.repassword}
          onChange={handleInputChange}
          placeholder="* 비밀번호 재입력"
          required
        />
      </div>
      <div className="checkbox">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={handleCheck}
          id="agree"
          checked={isChecked}
        />
        <label htmlFor="agree">
          이용약관 개인정보 수집 및 정보이용에 동의합니다.
        </label>
      </div>
      <p className="error">{errorMessage ?? errorMessage}</p>
      <div className="button">
        <button
          className="btn btn-prev"
          type="button"
          onClick={handleTogglePage}
        >
          이전으로
        </button>
        <button className="btn btn-submit" type="submit">
          가입하기
        </button>
      </div>
    </form>
  );
}
