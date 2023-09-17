import React, { ChangeEvent, useEffect, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../firebaseSDK";
import * as S from "../../styled/NoticePage/NoticeWrite.styles";
import FetchNoticeData from "../../utils/NoticePage/FetchNoticeData";

function NoticeWrite({ isEdit, data }: any) {
  const [noticeNumber, setNoticeNumber] = useState(1);
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");
  const [imageName, setImageName] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const navigate = useNavigate();

  type UpdatedData = {
    noticeNumber: number;
    createAt: string;
    password?: string;
    subject?: string;
    contents?: string;
    imageUrl?: string;
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

  // 공지 등록 or 수정 함수
  const onClickSubmit = async (): Promise<void> => {
    const date = new Date();
    let imageUrl = "";

    try {
      // 이미지 업로드
      if (uploadFile !== null) {
        const imageRef = ref(storage, `notice/${uploadFile.name}`);
        await uploadBytes(imageRef, uploadFile);

        imageUrl = await getDownloadURL(imageRef);
      }

      if (isEdit) {
        const updatedData: UpdatedData = {
          noticeNumber: data?.noticeNumber,
          createAt: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`,
        };

        if (password !== "") {
          updatedData.password = password;
        }
        if (subject !== "") {
          updatedData.subject = subject;
        }
        if (contents !== "") {
          updatedData.contents = contents;
        }
        if (imageUrl !== "") {
          updatedData.imageUrl = imageUrl;
        }

        await updateDoc(
          doc(db, "notice", String(data.noticeNumber)),
          updatedData
        );
      } else {
        await setDoc(doc(db, "notice", String(noticeNumber)), {
          noticeNumber,
          password,
          subject,
          contents,
          imageUrl,
          imageName,
          createAt: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`,
        });
      }

      // eslint-disable-next-line no-alert
      alert(`공지가 ${isEdit ? "수정" : "등록"} 되었습니다.`);
      navigate(`/notice/${isEdit ? data.noticeNumber : noticeNumber}`);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // 공지사항 게시물 마지막 번호 가져오기 함수
  const getNoticeLastId = async (): Promise<void> => {
    try {
      const dataList = await FetchNoticeData();

      if (dataList) {
        const lastNumber = dataList[0].noticeNumber;
        setNoticeNumber(lastNumber + 1);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // 랜더링 됐을 때 한 번만 실행
  useEffect(() => {
    getNoticeLastId();
  }, []);

  return (
    <S.Wrapper>
      <S.Title>공지사항 {isEdit ? "수정" : "등록"}하기</S.Title>
      <S.InputWrapper>
        <S.Label>공지 비밀번호</S.Label>
        <S.Password
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={onChangePassword}
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>제목</S.Label>
        <S.Subject
          type="text"
          placeholder="제목을 입력해주세요."
          onChange={onChangeSubject}
          defaultValue={data?.subject}
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>공지내용</S.Label>
        <S.Contents
          onChange={onChangeContents}
          placeholder="공지내용을 입력해주세요."
          defaultValue={data?.contents}
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>사진첨부</S.Label>

        <S.ImageWrapper>
          <S.ImageName
            type="text"
            value={data?.imageName ?? imageName}
            readOnly
          />
          <S.ImageLabel htmlFor="input-file">
            업로드
            <S.ImageUpload
              id="input-file"
              type="file"
              onChange={onChangeImage}
            />
          </S.ImageLabel>
        </S.ImageWrapper>
      </S.InputWrapper>
      <S.BtnWrapper>
        <S.SubmitBtn type="button" onClick={onClickSubmit}>
          {isEdit ? "수정" : "등록"}
        </S.SubmitBtn>
        <S.CancelBtn type="button" onClick={() => navigate(-1)}>
          취소
        </S.CancelBtn>
      </S.BtnWrapper>
    </S.Wrapper>
  );
}

export default NoticeWrite;
