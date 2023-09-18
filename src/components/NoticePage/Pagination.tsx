import React, { Dispatch, SetStateAction, useState } from 'react';
import * as S from '../../styled/NoticePage/Pagination.styles';

interface IPaginationProps {
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

function Pagination({ totalPages, setPage }: IPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber: number) => {
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

  const pagesToShow = 1; // 한 번에 보여줄 페이지 갯수
  const lastPage = Math.ceil(currentPage / pagesToShow) * pagesToShow;
  const firstPage = lastPage - pagesToShow;

  return (
    <S.Wrapper>
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
        <S.PageBtn type='button' onClick={() => handlePageClick(lastPage + 1)}>
          다음
        </S.PageBtn>
      </S.Page>
    </S.Wrapper>
  );
}

export default Pagination;
