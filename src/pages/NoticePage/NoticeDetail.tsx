import React, { useEffect, useState } from 'react';
import { DocumentData, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../../firebaseSDK';
import * as S from '../../styled/NoticePage/NoticeDetail.styles';

function NoticeDetail() {
  const [noticeData, setNoticeData] = useState<DocumentData | undefined>({});
  const { noticeId } = useParams();
  const navigate = useNavigate();

  // 공지사항 정보 가져오기 함수
  const getNoticeData = async (): Promise<void> => {
    try {
      const docRef = doc(db, 'notice', String(noticeId));

      const docSnap = (await getDoc(docRef)).data();
      setNoticeData(docSnap);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  // 공지사항 삭제 함수
  const onClickDeleteData = async (): Promise<void> => {
    try {
      if (noticeData?.imageId) {
        const desertRef = ref(storage, `notice/${noticeData?.imageId}`);
        await deleteObject(desertRef);
      }

      await deleteDoc(doc(db, 'notice', String(noticeId)));
      alert('삭제되었습니다!');
      navigate('/notice');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    getNoticeData();
  }, []);

  return (
    <S.Wrapper>
      <S.Header>
        <S.Subject>{noticeData?.subject}</S.Subject>
        <S.DateAndActionsWrapper>
          <S.Date>작성일자: {noticeData?.createAt}</S.Date>
          <S.ActionsWrapper>
            <S.EditBtn>
              <Link to={`/notice/${noticeId}/edit`}>수정</Link>
            </S.EditBtn>
            <S.DeleteBtn onClick={onClickDeleteData}>삭제</S.DeleteBtn>
          </S.ActionsWrapper>
        </S.DateAndActionsWrapper>
      </S.Header>
      <S.Underline />
      <S.Body>
        <S.ImageWrapper>
          <S.Image src={noticeData?.imageUrl} alt={noticeData?.imageUrl} />
        </S.ImageWrapper>
        <S.Contents>{noticeData?.contents}</S.Contents>
      </S.Body>
      <S.MoveToListBtn>
        <Link to='/notice'>목록으로</Link>
      </S.MoveToListBtn>
    </S.Wrapper>
  );
}

export default NoticeDetail;
