import { useEffect, useState } from "react";
import './scss/pagenation.scss'

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }:Pagination) => {
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(5);
    
    useEffect(() => {
      if (currentPage > endPage) {
        setStartPage(prevStart => prevStart + 5);
        setEndPage(prevEnd => prevEnd + 5);
      } else if (currentPage < startPage) {
        setStartPage(prevStart => prevStart - 5);
        setEndPage(prevEnd => prevEnd - 5);
      }
    }, [currentPage]);
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log(pageNumbers);
    return (
      <div style={{display:'flex'}}>
    <button onClick={()=>paginate((prev) => prev === 1 ? 1 : prev-1)}>-</button>
      <nav>
        <ul className="pagination">
          {pageNumbers.slice(startPage - 1, endPage).map((number) => (
            <li key={number} className="page-item" style={{backgroundColor:currentPage === number ? 'red' : ''}}>
              <span onClick={() => paginate(number)} className="page-link">
                {number}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={()=>paginate((prev) => prev+1)}>+</button>
    </div>
    );
  };
  
  export default Pagination;

  interface Pagination {
    postsPerPage:number,
    totalPosts:number,
    paginate:React.Dispatch<React.SetStateAction<number>>,
    currentPage:number
  }