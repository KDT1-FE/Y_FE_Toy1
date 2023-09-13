import Sidebar from 'components/Sidebar'
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { db } from "../firebase"
import { collection, getDocs } from  "firebase/firestore"
import { Link } from "react-router-dom";

// 리스트 래퍼 스타일
const ListWrapper = styled.div`
  display:flex;
  flex-wrap:wrap;
   > a {
    /* 수치 추후에 조정 */
    display: block;
    flex: 1 0 31.7%;
    max-width: 31.7%;
    padding: 0 10px;
    display:flex;
    flex-direction:column;
    align-items: flex-start;
  }
  .img-bx{
    width:100%;
    text-align:center;
    border-radius:20px;
    height: 100px;
    background-color:#ddd;
  }
  img {
    max-width: 100%;
    height: 100%;
  }
`

const GalleryBtn = styled.button`
  border: 0;
  display:block;
  margin-left: auto;
  margin-top: 20px;
  background-color: #ED234B;
  color:white;
  padding: 10px 20px;
  border-radius:10px;
`

const GalleryList: React.FC = () => {
  
  // user의 문서정보 상태관리
  const [users, setUsers] = useState<any[]>([]);
  const usersCollectionRef = collection(db, "user");

  // useEffect(() => {
  //   const getUsers = async () => {
  //     // 비동기로 user의 데이터 가져오기
  //     const data = await getDocs(usersCollectionRef);
  //     // 가져온 데이터 setUsers에 데이터 할당
  //     setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  //   };
  //   getUsers();
  // }, [usersCollectionRef]);
  
  return (
    <>
    <Link to="/gallery/edit">
          <GalleryBtn type="button">새 글 작성</GalleryBtn>
    </Link>
    <ListWrapper>
      {users.map((user) => {
        return (
          <Link to={`/gallery/detail/${user.id}`} key={user.id}>
            <div  className="Gallery_link">
              <p className="img-bx"><img src={user.thumbnail} alt=""/></p>
              <p>{user.title}</p>
              <p>
                <span>{user.date} | </span>
                <span>{user.writer}</span>
              </p>
            </div>
          </Link>
        )
      })}
      </ListWrapper>
    </>
  )
}

export default GalleryList
