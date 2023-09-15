import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentData, collection, getDocs } from 'firebase/firestore';
import * as S from '../../styled/NoticePage/NoticeList.styles';
import { db } from '../../firebaseSDK';
import { INoticeListProps } from '../../types/NoticePage/NoticeList.types';

function NoticeList() {
  const [noticeList, setNoticeList] = useState<INoticeListProps[]>([]);
  const navigate = useNavigate();

  // 공지사항 전체 가져오기
  const FetchNoticeData = async (): Promise<void> => {
    try {
      const querySnapshot: any = await getDocs(collection(db, 'notice'));
      const data = querySnapshot.docs.map((doc: DocumentData) => doc.data());

      setNoticeList(data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    FetchNoticeData();
  }, []);

  return (
    <S.Wrapper>
      <S.SearchDiv>
        <S.SearchInput type='text' placeholder='공지사항 제목을 입력해주세요.' />
        <S.SearchButton type='button'>검색하기</S.SearchButton>
      </S.SearchDiv>
      <S.TableTop> </S.TableTop>

      <S.HeaderRow>
        <S.ColumnHeaderBasic>번호</S.ColumnHeaderBasic>
        <S.ColumnHeaderSubject>제목</S.ColumnHeaderSubject>
        <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
      </S.HeaderRow>
      {noticeList.map((notice: INoticeListProps) => (
        <S.Row key={notice.noticeNumber} onClick={() => navigate(`/notice/${notice.noticeNumber}`)}>
          <S.ColumnHeaderBasic>{notice.noticeNumber}</S.ColumnHeaderBasic>
          <S.ColumnHeaderSubject>{notice.subject}</S.ColumnHeaderSubject>
          <S.ColumnHeaderBasic>{notice.createAt}</S.ColumnHeaderBasic>
        </S.Row>
      ))}
      <S.TableBottom />
      <S.Footer>
        <S.Pagination>prev 1,2,3,4,5 next</S.Pagination>

        <S.WriteBtn type='button'>
          <Link to='/noticewrite'>공지 등록하기</Link>
        </S.WriteBtn>
      </S.Footer>
    </S.Wrapper>
  );
}

export default NoticeList;
