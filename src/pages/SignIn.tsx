import { getLoginUserUid } from 'data/user';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from 'redux/action';

export function SignIn() {
  const [email, setEmail] = useState(localStorage.getItem('email') ?? '');
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberEmail((prev) => !prev);
  };

  const rememberUser = (email: string) => {
    localStorage.setItem('email', email);
  };

  // 로그인
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const uid = await getLoginUserUid(email, password);
      dispatch(loginAction(uid));
      if (rememberEmail) {
        rememberUser(email);
      }
      navigate('/');
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
      handleError(error);
    }
  };

  // 로그인 실패 error 핸들링
  const handleError = (error: any) => {
    switch (error.code) {
      case 'auth/user-not-found':
        setErrorMessage('존재하지 않는 이메일 입니다.');
        break;
      case 'auth/wrong-password':
        setErrorMessage('비밀번호가 일치하지 않습니다.');
        break;
      case 'auth/too-many-requests':
        setErrorMessage('너무 많이 시도했어요. 잠시후 다시 시도해주세요.');
        break;
      default:
        setErrorMessage('알 수 없는 오류가 발생했어요.');
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberEmail}
              onChange={handleRememberMeChange}
            />
            이메일 기억하기
          </label>
        </div>
        {errorMessage ?? <p>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  );
}
