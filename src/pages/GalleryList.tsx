import Sidebar from 'components/Sidebar'
import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { db } from "../firebase"
import { collection, getDocs } from  "firebase/firestore"
import { Link, useNavigate } from "react-router-dom";
import "../components/Wiki.css";
import { AuthContext } from "authentication/authContext";

const GalleryList: React.FC = () => {
  
  // user의 문서정보 상태관리
  const [users, setUsers] = useState<any[]>([]);
  const usersCollectionRef = collection(db, "gallery");

  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      // 비동기로 user의 데이터 가져오기
      const data = await getDocs(usersCollectionRef);
      // 가져온 데이터 setUsers에 데이터 할당
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getUsers();
  }, []);
  
  return (
    <>
    <section className="wiki__wrapper">
        <div className="wiki__header">
          <div className="wiki__title"> Gallery의 카테고리 출력영역 </div>
          {
            user?.displayName ?
              <Link to="/Gallery/edit">
              <button type="button" className="wiki__btn-edit">
                새 글 작성
              </button>
              </Link>
              :
              <button type="button" className="wiki__btn-edit" onClick={() => {
                const confirmed = window.confirm("로그인해야 이용할 수 있습니다. 로그인 하시겠습니까?")
                if (confirmed) {
                  navigate('/login')
                } else {
                  return;
                }
              }}>
                새 글 작성
              </button>
          }

        </div>
        <ListWrapper>
          {users.map((user) => {
            return (
              <Link to={`/Gallery/detail/${user.id}`} key={user.id}>
                <div className="Gallery__link">
                  <p className="img-bx"><img src={user.thumbnail} alt="썸네일"/></p>
                  <p className="Gallery__title">{user.title}</p>
                  <p className="Gallery__desc">
                    <span>{user.date}</span>
                    <span>{user.writer}</span>
                  </p>
                </div>
              </Link>
            )
          })}
      </ListWrapper>
      </section>
    </>
  )
}

// 스타일

const ListWrapper = styled.div`
  display:flex;
  flex-wrap:wrap;
  margin-left:-10px;
  margin-right:-10px;
   > a {
    /* 수치 추후에 조정 */
    display: block;
    flex: 1 0 31%;
    max-width: 31%;
    padding: 0 10px;
    display:flex;
    flex-direction:column;
    align-items: flex-start;
  }
  .Gallery__link{
    width:100%;
  }
  .img-bx{
    width:100%;
    text-align:center;
    border-radius:20px;
    background-color:#ddd;
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
    transform: translate(-50%,-50%) scale(0.1);
  }
  .img-bx:after{
    content: "";
    display: block;
    padding-bottom: 62.5%;
  }
  .Gallery__title{
    font-size: 16px;
    font-weight:600;
    margin-top: 25px;
  }
  .Gallery__desc{
    font-size: 14px;
    font-weight:400;
    margin-top: 0px;
    position: relative;
    overflow: hidden;
    left: -0.5em;
    > span{
      position: relative;
      display: inline-block;
      padding: 0 0.5em;
      color: #666;
      font-weight: 400;
      &:before{
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
`

export default GalleryList
