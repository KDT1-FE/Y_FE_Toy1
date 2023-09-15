import { SignUpNext } from 'components/SignUp/SignUpNext';
import { SignUpPrev } from 'components/SignUp/SignUpPrev';
import React, { useState } from 'react';

export interface IUser {
  username: string;
  email: string;
  password: string;
  repassword: string;
  nickname: string;
  image?: string;
}

export type IHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type IHandleNothing = () => void;

export function SignUp() {
  // 유저정보
  const initialUserData: IUser = {
    username: '',
    email: '',
    password: '',
    repassword: '',
    nickname: '',
    image:
      'https://firebasestorage.googleapis.com/v0/b/eotteoghajyo.appspot.com/o/User%2Fempty_user%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.53.26.png?alt=media&token=a064118f-2d15-4d44-858f-a057d288d342',
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
    <>
      <h2>
        회원가입을 위해
        <br /> 정보를 입력해주세요 :D
      </h2>
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
    </>
  );
}
