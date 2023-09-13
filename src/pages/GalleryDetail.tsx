import Sidebar from 'components/Sidebar'
import React, { useState, useEffect } from "react"
import { db } from "../firebase"
import { doc, collection, getDocs, deleteDoc } from  "firebase/firestore"
import { Link, useParams } from "react-router-dom";

const GalleryDetail = () => {


  interface userData {
    id: string,
    category: string,
    title: string,
    date: string,
    writer: string,
    desc: string
  }

  const { id } = useParams<string>();

  const [users, setUsers] = useState<any[]>([]);
  const usersCollectionRef = collection(db, "user");

  // useEffect(() => {
  //   // 데이터 가져오기
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     const user = data.docs.find(doc => doc.id === id);
      
  //     if (user) {
  //       setUsers([ {...user.data(), id: user.id} ])
  //     }
  //   };
  
  //   getUsers();
  // }, [id, usersCollectionRef]);
  
  const deleteGallery = async (id: string) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)
    alert('삭제 완료되었습니다')
  }


  return (
    <>
    <Sidebar />
    {
      users.map((user: userData) => {
        return (
            <div key={user.id} style={{borderBottom: '1px solid #ddd'}}>
              <p>카테고리 : {user.category}</p>
              <p>제목 : {user.title}</p>
              <p>날짜 : {user.date}</p>
              <p>글쓴이 : {user.writer}</p>
              <div dangerouslySetInnerHTML={{  __html: user.desc}}></div>
            </div>
        )
      })
    }
       <Link to="/edit">
          <button>수정</button>
       </Link>

      <button onClick={() => {deleteGallery(users[0].id)}}>삭제</button>
    </>
  )
}

export default GalleryDetail
