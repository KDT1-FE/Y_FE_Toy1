import { createNickname, uploadUserImage } from 'data/user';
import { IHandleChange, IHandleNothing, IUser } from 'pages/SignUp';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface ISignUpPrevProps {
  user: IUser;
  handleTogglePage: IHandleNothing;
  updateUserData: (name: string, value: string) => void;
}

export function SignUpPrev({
  user,
  handleTogglePage,
  updateUserData,
}: ISignUpPrevProps) {
  const [imageFileName, setImageFileName] = useState('');
  const [imageUrl, setImageUrl] = useState(user.image);
  const [nickname, setNickname] = useState(user.nickname);

  useEffect(() => {
    setImageFileName(Date.now().toString());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewNickname();
    handleTogglePage();
  };

  // 사용자 프로필 사진 설정
  const handleImageInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0];
    const imageUrl = await uploadUserImage(imageFileName, file);
    setImageUrl(imageUrl);
    user.image = imageUrl;
  };

  // 사용자 닉네임 설정
  const setNewNickname = () => {
    updateUserData('nickname', nickname);
  };

  // 사용자 닉네임 추천해주기
  const handleClickNicknameButton = async () => {
    const nickname = await createNickname();
    setNickname(nickname);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="image">
        <label htmlFor="img">
          <span>프로필 사진 변경하기</span>
        </label>
        <input
          type="file"
          id="img"
          accept="image/*"
          hidden
          onChange={handleImageInputChange}
        />
        <img src={imageUrl} />
      </div>
      <div className="nickname">
        <input
          type="text"
          name="nickname"
          value={nickname}
          placeholder="* 닉네임"
          readOnly
          required
        />
        <button type="button" onClick={handleClickNicknameButton}>
          추천받기!
        </button>
      </div>
      <div className="button">
        <button type="submit">다음으로</button>
      </div>
    </form>
  );
}
