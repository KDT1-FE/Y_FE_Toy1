import React, { Dispatch, SetStateAction, useState } from 'react';
import * as S from '../../styled/NoticePage/Pagination.styles';

interface IPaginationProps {
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

function Pagination({ totalPages, setPage }: IPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber > totalPages) {
      alert('마지막 페이지입니다.');
      return;
    }

    if (pageNumber <= 0) {
      alert('처음 페이지입니다.');
      return;
    }

    setCurrentPage(pageNumber);
    setPage(pageNumber);
  };

  // 총 페이지 갯수만큼 넘버가 들어간 배열 만드는 함수
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i += 1) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pagesToShow = 5; // 한 번에 보여줄 페이지 갯수
  const lastPage = Math.ceil(currentPage / pagesToShow) * pagesToShow;
  const firstPage = lastPage - pagesToShow;

  return (
    <S.Wrapper>
      <S.Page>
        <S.MoveBtn type='button' onClick={() => handlePageClick(firstPage)}>
          이전
        </S.MoveBtn>
      </S.Page>
      {renderPageNumbers()
        .slice(firstPage, lastPage)
        .map((pageNumber) => (
          <S.Page key={pageNumber}>
            <S.PageBtn type='button' onClick={() => handlePageClick(pageNumber)}>
              {pageNumber}
            </S.PageBtn>
          </S.Page>
        ))}
      <S.Page>
        <S.MoveBtn type='button' onClick={() => handlePageClick(lastPage + 1)}>
          다음
        </S.MoveBtn>
      </S.Page>
    </S.Wrapper>
  );
}

export default Pagination;
