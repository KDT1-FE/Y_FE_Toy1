import React, { ChangeEvent, useEffect, useState } from 'react';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebaseSDK';
import * as S from '../../styled/NoticePage/NoticeWrite.styles';
import getNoticesData from '../../utils/NoticePage/getNoticesData';

function NoticeWrite({ isEdit, noticeData }: any) {
  const [noticeNumber, setNoticeNumber] = useState(1);
  const [password, setPassword] = useState('');
  const [subject, setSubject] = useState('');
  const [contents, setContents] = useState('');
  const [imageName, setImageName] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [contentsError, setContentsError] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const navigate = useNavigate();

  type UpdatedData = {
    noticeNumber: number;
    createAt: string;
    password?: string;
    subject?: string;
    contents?: string;
    imageUrl?: string;
    imageName?: string;
    imageId?: string;
  };

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

  // 공지사항 등록 유효성 검사
  const isFormValid = (): boolean => {
    let isValid = true;

    if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isEdit) {
      if (subject === '') {
        setSubjectError('제목을 입력해주세요.');
        isValid = false;
      } else {
        setSubjectError('');
      }

      if (contents === '') {
        setContentsError('공지내용을 입력해주세요.');
        isValid = false;
      } else {
        setContentsError('');
      }
    }

    return isValid;
  };

  // 공지 등록 함수
  const onClickSubmit = async (): Promise<void> => {
    try {
      const date = new Date();
      let imageUrl = '';
      let imageId = '';

      if (!isFormValid()) return;

      if (uploadFile !== null) {
        // 이미지 업로드
        imageId = uuid();
        const imageRef = ref(storage, `notice/${imageId}`);

        await uploadBytes(imageRef, uploadFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      await setDoc(doc(db, 'notice', String(noticeNumber)), {
        noticeNumber,
        password,
        subject,
        contents,
        imageUrl,
        imageName,
        imageId,
        createAt: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      });

      // eslint-disable-next-line no-alert
      alert(`공지가 등록 되었습니다.`);
      navigate(`/notice/${noticeNumber}`);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // 공지 수정 함수
  const onClickUpdate = async (): Promise<void> => {
    try {
      const date = new Date();
      let imageUrl = '';
      let imageId = '';

      if (!isFormValid()) return;

      if (password !== noticeData.password) {
        alert('비밀번호가 잘못되었습니다.');
        setPassword('');
        return;
      }

      // 이미지 업로드
      if (uploadFile !== null) {
        // 기존 이미지 삭제
        if (noticeData?.imageId) {
          const desertRef = ref(storage, `notice/${noticeData?.imageId}`);
          await deleteObject(desertRef);
        }

        imageId = uuid();
        const imageRef = ref(storage, `notice/${imageId}`);
        await uploadBytes(imageRef, uploadFile);

        imageUrl = await getDownloadURL(imageRef);
      }

      const updatedData: UpdatedData = {
        noticeNumber: noticeData?.noticeNumber,
        createAt: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      };

      if (password !== '') {
        updatedData.password = password;
      }
      if (subject !== '') {
        updatedData.subject = subject;
      }
      if (contents !== '') {
        updatedData.contents = contents;
      }
      if (imageUrl !== '') {
        updatedData.imageUrl = imageUrl;
      }

      if (imageName !== '') {
        updatedData.imageName = imageName;
      }

      if (imageId !== '') {
        updatedData.imageId = imageId;
      }

      await updateDoc(doc(db, 'notice', String(noticeData.noticeNumber)), updatedData);
    } catch (error) {
      console.log('Error: ', error);
    }

    // eslint-disable-next-line no-alert
    alert(`공지가 수정 되었습니다.`);
    navigate(`/notice/${noticeData.noticeNumber}`);
  };

  // 공지사항 게시물 마지막 번호 가져오기 함수
  const getNoticeLastId = async (): Promise<void> => {
    try {
      const dataList = await getNoticesData();

      if (dataList) {
        const lastNumber = dataList[0].noticeNumber;
        setNoticeNumber(lastNumber + 1);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // 랜더링 됐을 때 한 번만 실행
  useEffect(() => {
    getNoticeLastId();
  }, []);

  return (
    <S.Wrapper>
      <S.Title>공지사항 {isEdit ? '수정' : '등록'}하기</S.Title>
      <S.InputWrapper>
        <S.Label>공지 비밀번호</S.Label>
        <S.Password
          type='password'
          placeholder='비밀번호를 입력해주세요.'
          value={password}
          onChange={onChangePassword}
        />
        <S.ErrorDiv>{passwordError}</S.ErrorDiv>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>제목</S.Label>
        <S.Subject
          type='text'
          placeholder='제목을 입력해주세요.'
          onChange={onChangeSubject}
          defaultValue={noticeData?.subject}
        />
        <S.ErrorDiv>{subjectError}</S.ErrorDiv>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>공지내용</S.Label>
        <S.Contents
          onChange={onChangeContents}
          placeholder='공지내용을 입력해주세요.'
          defaultValue={noticeData?.contents}
        />
        <S.ErrorDiv>{contentsError}</S.ErrorDiv>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>사진첨부</S.Label>

        <S.ImageWrapper>
          <S.ImageName type='text' value={imageName || noticeData?.imageName || ''} readOnly />
          <S.ImageLabel htmlFor='input-file'>
            업로드
            <S.ImageUpload id='input-file' type='file' onChange={onChangeImage} />
          </S.ImageLabel>
        </S.ImageWrapper>
      </S.InputWrapper>
      <S.BtnWrapper>
        <S.SubmitBtn type='button' onClick={isEdit === true ? onClickUpdate : onClickSubmit}>
          {isEdit ? '수정' : '등록'}
        </S.SubmitBtn>
        <S.CancelBtn type='button' onClick={() => navigate(-1)}>
          취소
        </S.CancelBtn>
      </S.BtnWrapper>
    </S.Wrapper>
  );
}

export default NoticeWrite;
