import React from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-js-pagination';

const MyPaginate = styled.div`
  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;
    margin: 0 5px;
    border-radius: 50%;
    text-decoration: none;
    color: black;
    cursor: pointer;
  }

  & .pagination {
    display: flex;
    justify-content: center;

    margin-top: 40px;
    list-style-type: none;

    li.active a {
      background-color: var(--color-primary);
      color: black;
    }

    li.disabled a {
      color: lightgray;
    }

    li.disable,
    li.disabled a {
      cursor: default;
    }
  }
`;

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  activePage: number;
  handlePageChange: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  activePage,
  totalItems,
  itemsPerPage,
  handlePageChange,
}) => {
  return (
    <MyPaginate>
      <ReactPaginate
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalItems}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </MyPaginate>
  );
};

export default PaginationComponent;
