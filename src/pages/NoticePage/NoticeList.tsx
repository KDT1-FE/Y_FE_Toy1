import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import * as S from "../../styled/NoticePage/NoticeList.styles";
import FetchNoticeData from "../../utils/NoticePage/FetchNoticeData";
import Pagination from "../../components/NoticePage/Pagination";

function NoticeList() {
  const [noticeList, setNoticeList] = useState<DocumentData[] | null>([]);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil((noticeList?.length ?? 10) / 5);
  const startNotice = (page - 1) * 5;
  const currentPageList = noticeList?.slice(startNotice, startNotice + 5);

  const navigate = useNavigate();

  // 공지사항 전체 가져오기
  const getNoticeList = async (): Promise<void> => {
    try {
      const dataList = await FetchNoticeData();
      setNoticeList(dataList);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  return (
    <S.Wrapper>
      <S.SearchDiv>
        <S.SearchInput
          type="text"
          placeholder="공지사항 제목을 입력해주세요."
        />
        <S.SearchButton type="button">검색하기</S.SearchButton>
      </S.SearchDiv>
      <S.TableTop> </S.TableTop>

      <S.HeaderRow>
        <S.ColumnHeaderBasic>번호</S.ColumnHeaderBasic>
        <S.ColumnHeaderSubject>제목</S.ColumnHeaderSubject>
        <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
      </S.HeaderRow>
      {currentPageList?.map((notice) => (
        <S.Row
          key={notice.noticeNumber}
          onClick={() => navigate(`/notice/${notice.noticeNumber}`)}
        >
          <S.ColumnHeaderBasic>{notice.noticeNumber}</S.ColumnHeaderBasic>
          <S.ColumnHeaderSubject>{notice.subject}</S.ColumnHeaderSubject>
          <S.ColumnHeaderBasic>{notice.createAt}</S.ColumnHeaderBasic>
        </S.Row>
      ))}
      <S.TableBottom />
      <S.Footer>
        <S.PaginationDiv>
          <Pagination totalPages={totalPages} setPage={setPage} />
        </S.PaginationDiv>
        <S.WriteBtn type="button">
          <Link to="/notice/write">공지 등록하기</Link>
        </S.WriteBtn>
      </S.Footer>
    </S.Wrapper>
  );
}

export default NoticeList;
