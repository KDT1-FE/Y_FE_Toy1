import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Wiki.css";
import { AuthContext } from "provider/userContext";
import userData from "./UserData";
import Swal from "sweetalert2";
import Pagination from "components/template/Pagination";

const GalleryList: React.FC<{ galleryData: userData[], activeCategory: string }> = ({ galleryData, activeCategory }) => {

  const user = useContext(AuthContext);
  const navigate = useNavigate();
 
// 페이지네이션
const [currentPage, setCurrentPage] = useState<number>(1);
const [postsPerPage, setPostsPerPage] = useState<number>(6);
const indexOfLast = currentPage * postsPerPage;
const indexOfFirst = indexOfLast - postsPerPage;
const currentPosts = (posts: userData[]) => {
  let currentPosts
  currentPosts = posts.slice(indexOfFirst, indexOfLast);
  return currentPosts;
};

const pageData = currentPosts(galleryData)

  return (
    <>
      <section className="wiki__wrapper">
        <div className="wiki__header">
          <div className="wiki__title">
            {activeCategory === 'all' && '전체보기'}
            {activeCategory === 'notice' && '공지사항'}
            {activeCategory === 'news' && '모집공고'}
            {activeCategory === 'random' && '랜덤토크'}
          </div>
          {
            user?.displayName ? (
              <Link to="/Gallery/edit">
              <button type="button" className="wiki__btn-edit">
                새 글 작성
              </button>
            </Link> )
           : (
            <button
              type="button"
              className="wiki__btn-edit"
              onClick={() => {
                Swal.fire({
                  icon: "question",
                  title: "로그인해야 이용할 수 있습니다. 로그인 하시겠습니까?",
                  showCancelButton: true,
                  confirmButtonText: "확인",
                  cancelButtonText: "취소",
                }).then((res) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (res.isConfirmed) {
                    //삭제 요청 처리
                    navigate("/login");
                  }
                });
              }}
            >
              새 글 작성
            </button>
          )}
        </div>
        <ListWrapper>
          {pageData.map((user) => {
            return (
              <div key={user.id}>
              <Link to={`/Gallery/detail/${user.id}`} >
                <div className="Gallery__link">
                  <p className="img-bx">
                    <img src={user.thumbnail} alt="썸네일" />
                  </p>
                  <p className="Gallery__title">{user.title}</p>
                  <p className="Gallery__desc">
                    <span>{user.date}</span>
                    <span>{user.writer}</span>
                  </p>
                </div>
              </Link>
              </div>
            );
          })}
        </ListWrapper>

        <Pagination postsPerPage={postsPerPage} totalPosts={galleryData.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </section>
    </>
  );
};

// 스타일
const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
   >div {
    /* 수치 추후에 조정 */
    display: block;
    flex: 1 0 31.2%;
    max-width: 31.2%;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: transform 0.3s;
    @media screen and (max-width:1100px) {
      flex: 1 0 47.8%;
      max-width: 47.8%;
    }
    @media screen and (max-width:700px) {
      flex: 1 0 100%;
      max-width: 100%;
    }
    a{
      width:100%; 
      display:block;
    }
    &:hover{
      transform:translateY(-10px);
    }
  }
  .Gallery__link {
    width: 100%;
  }
  .img-bx {
    width: 100%;
    text-align: center;
    border-radius: 20px;
    background-color: #ddd;
    display: block;
    position: relative;
    overflow: hidden;
  }
  img {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    min-width: 1000%;
    min-height: 1000%;
    max-width: none;
    max-height: none;
    transform: translate(-50%, -50%) scale(0.1);
  }
  .img-bx:after {
    content: "";
    display: block;
    padding-bottom: 62.5%;
  }
  .Gallery__title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Gallery__desc {
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    position: relative;
    overflow: hidden;
    left: -0.5em;
    > span {
      position: relative;
      display: inline-block;
      padding: 0 0.5em;
      color: #666;
      font-weight: 400;
      &:before {
        content: "";
        left: -1px;
        height: 0.8em;
        top: 50%;
        margin-top: -0.4em;
        position: absolute;
        border-left: 1px solid #b3b3b3;
      }
    }
  }
`;

export default GalleryList;
