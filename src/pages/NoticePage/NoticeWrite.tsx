import React, { ChangeEvent, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import * as S from '../../styled/NoticePage/NoticeWrite.styles';
import { db } from '../../firebaseSDK';

function NoticeWrite() {
  const [noticeNumber, setNoticeNumber] = useState(1); // 게시물 번호 임시
  const [password, setPassword] = useState('');
  const [subject, setSubject] = useState('');
  const [contents, setContents] = useState('');

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const onChangeSubject = (event: ChangeEvent<HTMLInputElement>): void => {
    setSubject(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(event.target.value);
  };

  // 게시물 등록 함수
  const onClickSubmit = async (): Promise<void> => {
    await addDoc(collection(db, 'notice'), {
      noticeNumber,
      password,
      subject,
      contents
    });

    setNoticeNumber((prev) => prev + 1);
    setPassword('');
    setSubject('');
    setContents('');
  };

  return (
    <S.Wrapper>
      <S.Title>Notice</S.Title>
      <S.InputWrapper>
        <S.Label>공지 비밀번호</S.Label>
        <S.Password type='password' onChange={onChangePassword} value={password} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>제목</S.Label>
        <S.Subject type='text' placeholder='제목을 입력해주세요.' onChange={onChangeSubject} value={subject} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>공지내용</S.Label>
        <S.Contents onChange={onChangeContents} value={contents} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>사진첨부</S.Label>
        <S.ImageUpload type='file' />
      </S.InputWrapper>
      <S.BtnWrapper>
        <S.SubmitBtn type='button' onClick={onClickSubmit}>
          등록
        </S.SubmitBtn>
        <S.CancelBtn type='button'>취소</S.CancelBtn>
      </S.BtnWrapper>
    </S.Wrapper>
  );
}

export default NoticeWrite;
