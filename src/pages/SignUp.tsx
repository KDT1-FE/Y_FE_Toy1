import { SignUpNext } from 'components/SignUp/SignUpNext';
import { SignUpPrev } from 'components/SignUp/SignUpPrev';
import React, { useState } from 'react';
import '../styles/pages/SignUp.scss';

export interface IUser {
  username: string;
  email: string;
  password: string;
  repassword: string;
  nickname: string;
  image?: string;
}

export type HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type HandleNothing = () => void;

export function SignUp() {
  // 유저정보
  const initialUserData: IUser = {
    username: '',
    email: '',
    password: '',
    repassword: '',
    nickname: '',
    image:
      'https://firebasestorage.googleapis.com/v0/b/togethers-d2a1d.appspot.com/o/User%2Fempty.png?alt=media&token=572e4f5e-80d3-4537-94a2-3812c87cf0a4',
  };
  const [userData, setUserData] = useState<IUser>(initialUserData);
  const [isPrev, setIsPrev] = useState(true);

  // 데이터 세팅
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserData(name, value);
  };

  const updateUserData = (name: string, value: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // 페이지 변경
  const handleTogglePage = () => {
    setIsPrev((prev) => !prev);
  };

  return (
    <div className="signup-container">
      <h3>
        회원가입을 위해
        <br /> 정보를 입력해주세요 :D
      </h3>
      {isPrev ? (
        <SignUpPrev
          user={userData}
          handleTogglePage={handleTogglePage}
          updateUserData={updateUserData}
        />
      ) : (
        <SignUpNext
          user={userData}
          handleInputChange={handleInputChange}
          handleTogglePage={handleTogglePage}
        />
      )}
    </div>
  );
}
