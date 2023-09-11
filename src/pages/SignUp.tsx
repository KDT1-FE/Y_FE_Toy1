import { createUser } from 'data/user';
import React, { useState } from 'react';

export function SignUp() {
  // 필요한 정보
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
  });

  const [isChecked, setIsChecked] = useState(false);

  // 데이터 세팅
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 데이터 추가!
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { password, repassword } = formData;
    if (password !== repassword) {
      return;
    }
    if (!isChecked) {
      return;
    }
    createUserAuth();
  };

  // user auth 생성
  const createUserAuth = () => {
    const { email, password } = formData;
    createUser(email, password);
  };

  // user 정보 생성
  //   const createUserData = () => {};

  // checkbox 확인
  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <h2>
        회원가입을 위해
        <br /> 정보를 입력해주세요 :D
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="name">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="* 이름"
            required
          />
        </div>
        <div className="email">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="* 이메일"
            required
          />
        </div>
        <div className="password">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="* 비밀번호"
            required
          />
          <input
            type="password"
            name="repassword"
            value={formData.repassword}
            onChange={handleInputChange}
            placeholder="* 비밀번호 재입력"
            required
          />
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            onClick={handleCheck}
            id="agree"
            checked={isChecked}
          />
          <label htmlFor="agree">
            이용약관 개인정보 수집 및 정보이용에 동의합니다.
          </label>
        </div>
        <div className="button">
          <button type="submit">가입하기</button>
        </div>
      </form>
    </>
  );
}
