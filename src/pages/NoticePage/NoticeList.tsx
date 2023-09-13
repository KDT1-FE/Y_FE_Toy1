import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import * as S from '../../styled/NoticePage/NoticeList.styles';
import { db } from '../../firebaseSDK';

interface NoticeData {
  noticeNumber: string;
  subject: string;
  createAt: string;
}

function NoticeList() {
  const [noticeList, setNoticeList] = useState<NoticeData[]>([]);

  // 공지사항 전체 가져오기
  const FetchNoticeData = async (): Promise<void> => {
    const querySnapshot: any = await getDocs(collection(db, 'notice'));
    const data: NoticeData[] = querySnapshot.docs.map((doc: any) => doc.data());
    setNoticeList(data);
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
      {noticeList.map((notice) => (
        <S.Row key={notice.noticeNumber}>
          <S.ColumnHeaderBasic>{notice.noticeNumber}</S.ColumnHeaderBasic>
          <S.ColumnHeaderSubject>{notice.subject}</S.ColumnHeaderSubject>
          <S.ColumnHeaderBasic>{notice.createAt}</S.ColumnHeaderBasic>
        </S.Row>
      ))}
      <S.TableBottom />
      <S.Footer>
        <S.Pagination>prev 1,2,3,4,5 next</S.Pagination>

        <Link to='/noticewrite'>
          <S.WriteBtn type='button'>공지 등록하기</S.WriteBtn>
        </Link>
      </S.Footer>
    </S.Wrapper>
  );
}

export default NoticeList;
