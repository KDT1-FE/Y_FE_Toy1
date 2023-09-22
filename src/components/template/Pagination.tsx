import styled from "styled-components";

const PageUl = styled.ul`
  display:flex;
  justify-content: center;
  gap:10px;
  margin-top: 50px;
`;

const PageLi = styled.li`
  cursor: pointer;
  border: 1px solid var(--main-color);
  color: var(--main-color);
  font-size: 16px;
  font-weight: 500;
  display:inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height:40px;
  transition: all 0.2s;
  &:hover, &.active {
    background-color: var(--main-color);
    color: white;
  }
  @media screen and (max-width:1200px) {
    font-size:14px;
    width: 25px;
    height: 25px;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  setCurrentPage: (number: number) => void;
  currentPage: number; 
}

const Pagination: React.FC<PaginationProps> = ({ postsPerPage, totalPosts, setCurrentPage, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <PageUl className="pagination" >
          {pageNumbers.map((number) => (
            <PageLi key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <PageSpan onClick={() => setCurrentPage(number)} className="page-link">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;