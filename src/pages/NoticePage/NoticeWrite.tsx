import React, { ChangeEvent, useEffect, useState } from 'react';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebaseSDK';
import * as S from '../../styled/NoticePage/NoticeWrite.styles';

function NoticeWrite() {
  const [noticeNumber, setNoticeNumber] = useState(1);
  const [password, setPassword] = useState('');
  const [subject, setSubject] = useState('');
  const [contents, setContents] = useState('');
  const [imageName, setImageName] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const onChangeSubject = (event: ChangeEvent<HTMLInputElement>): void => {
    setSubject(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(event.target.value);
  };

  const onChangeImage = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files !== null) {
      const selectedFile = event.target.files[0];
      setUploadFile(selectedFile);
      setImageName(selectedFile.name);
    }
  };

  // 공지 등록 함수
  const onClickSubmit = async (): Promise<void> => {
    const date = new Date();
    let imageUrl = '';

    try {
      // 이미지 업로드
      if (uploadFile !== null) {
        const imageRef = ref(storage, `notice/${uploadFile.name}`);
        await uploadBytes(imageRef, uploadFile);

        imageUrl = await getDownloadURL(imageRef);
      }

      setDoc(doc(db, 'notice', String(noticeNumber)), {
        noticeNumber,
        password,
        subject,
        contents,
        imageUrl,
        createAt: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      });

      // eslint-disable-next-line no-alert
      alert('공지가 등록됐습니다.');
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setNoticeNumber((prev) => prev + 1);
      setPassword('');
      setSubject('');
      setContents('');
      setImageName('');
      imageUrl = '';
    }
  };

  // 공지 마지막 번호 가져오기 함수
  const NoticeGetLastId = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'notice'));

      if (querySnapshot.docs.length) {
        setNoticeNumber(Number(querySnapshot.docs[querySnapshot.docs.length - 1].id) + 1);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // 랜더링 됐을 때 한 번만 실행
  useEffect(() => {
    NoticeGetLastId();
  }, []);

  return (
    <S.Wrapper>
      <S.Title>공지사항 등록하기</S.Title>
      <S.InputWrapper>
        <S.Label>공지 비밀번호</S.Label>
        <S.Password
          type='password'
          placeholder='비밀번호를 입력해주세요.'
          onChange={onChangePassword}
          value={password}
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>제목</S.Label>
        <S.Subject type='text' placeholder='제목을 입력해주세요.' onChange={onChangeSubject} value={subject} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>공지내용</S.Label>
        <S.Contents onChange={onChangeContents} placeholder='공지내용을 입력해주세요.' value={contents} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>사진첨부</S.Label>

        <S.ImageWrapper>
          <S.ImageName type='text' value={imageName} readOnly />
          <S.ImageLabel htmlFor='input-file'>
            업로드
            <S.ImageUpload id='input-file' type='file' onChange={onChangeImage} />
          </S.ImageLabel>
        </S.ImageWrapper>
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
