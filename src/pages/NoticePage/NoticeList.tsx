import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';
import * as S from '../../styled/NoticePage/NoticeList.styles';
import getNoticesData from '../../utils/NoticePage/getNoticesData';
import Pagination from '../../components/NoticePage/Pagination';

function NoticeList() {
  const [keyword, setKeyword] = useState('');
  const [dataFetch, setDataFetch] = useState<DocumentData[] | null>([]); // 공지를 한 번 호출해오기 위해 바뀌지 않는 전체 공지 배열
  const [noticeList, setNoticeList] = useState<DocumentData[] | null>([]);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil((noticeList?.length ?? 10) / 5);
  const startNotice = (page - 1) * 5;
  const currentNoticeList = noticeList?.slice(startNotice, startNotice + 5);
  const navigate = useNavigate();

  // 공지사항 전체 가져오기
  const getNoticeList = async (): Promise<void> => {
    try {
      const dataList = await getNoticesData();
      setDataFetch(dataList);
      setNoticeList(dataList);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const onChangeKeywords = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  // 검색 함수
  const formSearch = (): void => {
    const searchList = dataFetch?.filter((el: any) => el.subject.includes(keyword));
    if (searchList !== undefined) setNoticeList(searchList);
    else setNoticeList(noticeList);

    setPage(1);
  };

  // Enter키로 검색하기 함수
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      formSearch();
    }
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  return (
    <S.Wrapper>
      <S.Header>
        <S.HeaderTitle>NOTICE</S.HeaderTitle>
        <S.WriteBtn type='button'>
          <Link to='/notice/write'>공지 등록하기</Link>
        </S.WriteBtn>
      </S.Header>

      <S.Main>
        <S.SearchDiv>
          <S.SearchInput
            onChange={onChangeKeywords}
            onKeyDown={handleKeyDown}
            type='text'
            placeholder='공지사항 제목을 입력해주세요.'
          />
          <S.SearchButton onClick={formSearch} type='button'>
            검색하기
          </S.SearchButton>
        </S.SearchDiv>
        <S.TableTop> </S.TableTop>
        <S.HeaderRow>
          <S.ColumnHeaderBasic>번호</S.ColumnHeaderBasic>
          <S.ColumnHeaderSubject text-align='center'>제목</S.ColumnHeaderSubject>
          <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
        </S.HeaderRow>
        {noticeList?.length === 0 && keyword && (
          <S.SearchNoResultMessage>일치하는 공지사항이 없습니다.</S.SearchNoResultMessage>
        )}
        {noticeList?.length !== 0 &&
          currentNoticeList?.map((notice) => (
            <S.Row key={notice.noticeNumber} onClick={() => navigate(`/notice/${notice.noticeNumber}`)}>
              <S.ColumnHeaderBasic>{notice.noticeNumber}</S.ColumnHeaderBasic>
              <S.ColumnHeaderSubject>{notice.subject}</S.ColumnHeaderSubject>
              <S.ColumnHeaderBasic>{notice.createAt}</S.ColumnHeaderBasic>
            </S.Row>
          ))}
        <S.TableBottom />
      </S.Main>

      <S.Footer>
        <Pagination totalPages={totalPages} setPage={setPage} />
      </S.Footer>
    </S.Wrapper>
  );
}

export default NoticeList;
