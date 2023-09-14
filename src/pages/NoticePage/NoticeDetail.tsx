import React, { useEffect, useState } from 'react';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebaseSDK';
import * as S from '../../styled/NoticePage/NoticeDetail.styles';

function NoticeDetail() {
  const [noticeData, setNoticeData] = useState<DocumentData | undefined>({});
  const { noticeId } = useParams();

  // 공지사항 정보 가져오기 함수
  const FetchNoticeData = async (): Promise<void> => {
    try {
      const docRef = doc(db, 'notice', String(noticeId));
      const docSnap = (await getDoc(docRef)).data();

      setNoticeData(docSnap);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    FetchNoticeData();
  }, []);

  return (
    <S.Wrapper>
      <S.Header>
        <S.Subject>{noticeData?.subject}</S.Subject>
        <S.DateAndActionsWrapper>
          <S.Date>작성일자: {noticeData?.createAt}</S.Date>
          <S.ActionsWrapper>
            <S.EditBtn>수정</S.EditBtn>
            <S.DeleteBtn>삭제</S.DeleteBtn>
          </S.ActionsWrapper>
        </S.DateAndActionsWrapper>
      </S.Header>
      <S.Underline />
      <S.Body>
        <S.Image src={noticeData?.imageUrl} alt={noticeData?.imageUrl} />
        <S.Contents>{noticeData?.contents}</S.Contents>
      </S.Body>
      <S.MoveToListBtn>
        <Link to='/notice'>목록으로</Link>
      </S.MoveToListBtn>
    </S.Wrapper>
  );
}

export default NoticeDetail;
