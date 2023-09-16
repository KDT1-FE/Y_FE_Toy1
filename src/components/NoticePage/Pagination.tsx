import React, { Dispatch, SetStateAction } from "react";
import * as S from "../../styled/NoticePage/Pagination.styles";

interface IPaginationProps {
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

function Pagination({ totalPages, setPage }: IPaginationProps) {
  return (
    <S.Wrapper>
      {new Array(totalPages).fill(1).map((_, index) => (
        <S.Page key={index}>
          <S.PageBtn type="button" onClick={() => setPage(index + 1)}>
            {index + 1}
          </S.PageBtn>
        </S.Page>
      ))}
    </S.Wrapper>
  );
}

export default Pagination;
