import React, { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, getDocs } from  "firebase/firestore"

const GalleryDetail = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "user");

  useEffect(() => {
    // 데이터 가져오기
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
  
    getUsers();
  }, []);
  

  return (
    <>
      {users.map((user) => {
        return (
          <div key={user.id} style={{borderBottom: '1px solid #ddd'}}>
            <p>카테고리 : {user.category}</p>
            <p>제목 : {user.title}</p>
            <p>날짜 : {user.date}</p>
            <p>글쓴이 : {user.writer}</p>
            <div dangerouslySetInnerHTML={{  __html: user.desc}}></div>
          </div>
        )
      })}
    </>
  )
}

export default GalleryDetail
